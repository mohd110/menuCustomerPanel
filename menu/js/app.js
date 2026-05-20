// =====================================================
// APP.JS — UI Rendering and Event Listeners
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
  // === DOM Elements ===
  const categoryContainer = document.getElementById('category-container');
  const itemsContainer = document.getElementById('items-container');
  const currentCategoryTitle = document.getElementById('current-category-title');
  const callWaiterBtn = document.getElementById('call-waiter-btn');
  const waiterToast = document.getElementById('waiter-toast');
  const statusBanner = document.getElementById('status-banner');
  const statusText = document.getElementById('status-text');

  // Modal Elements
  const waiterModal = document.getElementById('call-waiter-modal');
  const closeWaiterModal = document.getElementById('close-waiter-modal');
  const submitWaiterCall = document.getElementById('submit-waiter-call');
  const waiterTableInput = document.getElementById('waiter-table-input');
  const waiterNameInput = document.getElementById('waiter-name-input');
  const waiterPhoneInput = document.getElementById('waiter-phone-input');
  const waiterGuestInput = document.getElementById('waiter-guest-input');

  const MACRO_CATEGORIES = [
    {
      name: 'Snacks',
      icon: 'ph-hamburger',
      subCategories: [
        'Appetizers', 'Momos', 'Sandwich & Burger', 'Omelette', 'Maggi', 'Keema', 'Pancakes'
      ]
    },
    {
      name: 'Beverages',
      icon: 'ph-coffee',
      subCategories: [
        'Espresso & Black', 'Brew Coffee', 'Cold Coffee', 'Flavoured Iced Coffee', 
        'Hot Chocolate', 'Hot Coffee', 'Iced Tea', 'Iced Coffee', 'Margherita', 
        'Matcha', 'Mojitos', 'Shakes', 'Soda & Tea'
      ]
    },
    {
      name: 'Mains',
      icon: 'ph-bowl-food',
      subCategories: [
        'Mains', 'Pasta', 'Salad', 'Rice Bowls', 'Soups'
      ]
    },
    {
      name: 'Pizza',
      icon: 'ph-pizza',
      subCategories: [
        'Pizza'
      ]
    },
    {
      name: 'Combos',
      icon: 'ph-gift',
      subCategories: [
        'Combos'
      ]
    }
  ];


  let activeMacroCategoryIndex = 0;

  // === Initialize ===
  async function init() {
    renderCategories();
    renderItems(activeMacroCategoryIndex);
    setupEventListeners();
    setupDragScroll(categoryContainer);

    // Fetch and populate tables dropdown
    await loadTablesDropdown();

    // Check if there is a table in the URL and if it matches the current session
    const urlParams = new URLSearchParams(window.location.search);
    let tableId = urlParams.get('table');
    
    if (tableId) {
      if (!tableId.toString().startsWith('T-')) {
        const num = parseInt(tableId, 10);
        if (!isNaN(num)) tableId = `T-${num.toString().padStart(2, '0')}`;
      }
      
      const { data: tableData } = await window.supabaseClient
        .from('restaurant_tables')
        .select('id')
        .eq('table_number', tableId)
        .single();
        
      if (tableData) {
        // If current session exists but belongs to a different table, clear it!
        if (window.currentSession && window.currentSession.table_id !== tableData.id) {
          if (typeof window.clearSession === 'function') {
            window.clearSession();
          } else if (typeof clearSession === 'function') {
            clearSession();
          }
        }
        
        // If we don't have a session now (either cleared or none existed), fetch active session for this table
        if (!window.currentSession) {
          const { data: sessionData } = await window.supabaseClient
            .from('customer_sessions')
            .select('*')
            .eq('table_id', tableData.id)
            .eq('session_status', 'active')
            .order('started_at', { ascending: false })
            .limit(1)
            .maybeSingle(); 
            
          if (sessionData) {
            window.saveSession(sessionData);
          }
        }
      }
    }

    // Initialize Supabase realtime if session exists
    if (window.currentSession) {
      subscribeToWaiterStatus();
      subscribeToOrderUpdates();
    }
  }

  async function loadTablesDropdown() {
    try {
      const { data, error } = await window.supabaseClient
        .from('restaurant_tables')
        .select('*')
        .order('table_number');

      if (error) throw error;

      if (data && waiterTableInput) {
        waiterTableInput.innerHTML = '<option value="">Select Table</option>';
        data.forEach(table => {
          const option = document.createElement('option');
          option.value = table.table_number;
          option.textContent = `Table ${table.table_number.replace('T-', '')}`;
          waiterTableInput.appendChild(option);
        });

        // Pre-select if table is in URL
        const urlParams = new URLSearchParams(window.location.search);
        let urlTable = urlParams.get('table');
        if (urlTable) {
          if (!urlTable.toString().startsWith('T-')) {
            const num = parseInt(urlTable, 10);
            if (!isNaN(num)) urlTable = `T-${num.toString().padStart(2, '0')}`;
          }
          waiterTableInput.value = urlTable;
        }
      }
    } catch (err) {
      console.error('Error loading tables:', err);
    }
  }

  // === Mouse-drag scroll for category nav (desktop) ===
  function setupDragScroll(el) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging = false;

    el.addEventListener('mousedown', (e) => {
      isDown = true;
      isDragging = false;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    });

    el.addEventListener('mouseleave', () => { isDown = false; });
    el.addEventListener('mouseup', () => { isDown = false; });

    el.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      if (Math.abs(walk) > 5) isDragging = true;
      el.scrollLeft = scrollLeft - walk;
    });

    // Prevent click on buttons when dragging
    el.addEventListener('click', (e) => {
      if (isDragging) e.stopPropagation();
    }, true);
  }

  // === Render Functions ===
  
  // Render category tabs
  function renderCategories() {
    categoryContainer.innerHTML = '';
    MACRO_CATEGORIES.forEach((macroCat, index) => {
      const btn = document.createElement('button');
      const isActive = index === activeMacroCategoryIndex;
      btn.className = `category-btn ${isActive ? 'active' : ''}`;
      btn.innerHTML = `<i class="ph-fill ${macroCat.icon}"></i> <span>${macroCat.name}</span>`;
      
      btn.addEventListener('click', () => {
        activeMacroCategoryIndex = index;
        renderCategories(); 
        renderItems(index);
      });
      
      categoryContainer.appendChild(btn);

      // Auto-scroll the slider to the active button
      if (isActive) {
        setTimeout(() => {
          btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }, 100);
      }
    });

  }

  // Render items for specific category
  function renderItems(macroIndex) {
    const macroCategory = MACRO_CATEGORIES[macroIndex];
    currentCategoryTitle.textContent = macroCategory.name;
    itemsContainer.innerHTML = '';
    
    macroCategory.subCategories.forEach(subCatName => {
      const category = MENU_DATA.find(c => c.name === subCatName);
      if (!category) return;
      
      const subHeading = document.createElement('h3');
      subHeading.className = 'sub-category-title';
      subHeading.textContent = category.name;
      itemsContainer.appendChild(subHeading);

      const grid = document.createElement('div');
      grid.className = 'items-grid';
      
      category.items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.style.cursor = 'pointer';
        
        itemCard.addEventListener('click', () => {
          openDishModal(item);
        });
        
        itemCard.innerHTML = `
          <div class="item-img" style="background-image: url('${item.image}')"></div>
          <div class="item-info">
            <div>
              <h3>${item.name}</h3>
              <p>${item.description}</p>
            </div>
            <div class="item-bottom">
              <span class="price">${CONFIG.CURRENCY}${item.price}</span>
            </div>
          </div>
        `;
        grid.appendChild(itemCard);
      });
      itemsContainer.appendChild(grid);
    });

    // Attach event listeners to newly created buttons
    document.querySelectorAll('.add-btn, .increment').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        addToCart(id);
        renderItems(activeMacroCategoryIndex); // Update specific item UI
      });
    });

    document.querySelectorAll('.decrement').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        removeFromCart(id);
        renderItems(activeMacroCategoryIndex); // Update specific item UI
      });
    });
  }

  // Required globally to be called from cart.js
  window.updateCartUI = function() {
    const count = getCartCount();
    cartBadge.textContent = count;
    
    if (count > 0) {
      cartBadge.classList.add('visible');
      viewCartBtn.querySelector('.cart-text').innerHTML = `View Cart &bull; ${count} Item${count > 1 ? 's' : ''}`;
    } else {
      cartBadge.classList.remove('visible');
      // Reset button text back to default
      viewCartBtn.querySelector('.cart-text').innerHTML = 'View Cart';
      if (checkoutSection.classList.contains('active')) {
        hideCheckout();
      }
    }
  };

  // Render the checkout screen list
  function renderCheckout() {
    const currentCart = getCartItems();
    checkoutItemsList.innerHTML = '';
    
    currentCart.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'checkout-item';
      itemEl.innerHTML = `
        <div class="checkout-item-info">
          <h4>${item.name}</h4>
          <div class="checkout-item-details">
            <span>${item.qty}x Quantity</span>
            <button class="remove-item-btn" data-id="${item.id}">
              <i class="ph ph-trash"></i> Remove
            </button>
          </div>
        </div>
        <div class="checkout-item-price">${CONFIG.CURRENCY}${item.price * item.qty}</div>
      `;
      checkoutItemsList.appendChild(itemEl);
    });

    // Attach listeners for remove buttons
    checkoutItemsList.querySelectorAll('.remove-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        deleteFromCart(id);
        renderCheckout(); // Re-render checkout list
      });
    });

    checkoutTotal.textContent = `${CONFIG.CURRENCY}${getCartTotal()}`;
  }

  // === UI Transitions ===
  function showCheckout() {
    if (getCartCount() === 0) return;
    renderCheckout();
    mainMenuSection.classList.remove('active');
    checkoutSection.classList.add('active');
    window.scrollTo(0, 0);
  }

  function hideCheckout() {
    checkoutSection.classList.remove('active');
    mainMenuSection.classList.add('active');
    window.scrollTo(0, 0);
    renderItems(activeMacroCategoryIndex); // refresh UI
  }

  // === Event Listeners ===
  let toastTimer = null;
  let callCooldown = false;
  let waiterCallSubscription = null;
  let orderSubscription = null;

  function setupEventListeners() {
    // Call Waiter button - Opens Modal if no session, or directly calls if session exists
    callWaiterBtn.addEventListener('click', async () => {
      if (callCooldown) return;

      if (!window.currentSession) {
        // Dynamically check if the table already has an active session before showing the modal
        const urlParams = new URLSearchParams(window.location.search);
        let tableId = urlParams.get('table');
        
        if (tableId) {
          // Format tableId if it's just a number
          if (!tableId.toString().startsWith('T-')) {
            const num = parseInt(tableId, 10);
            if (!isNaN(num)) tableId = `T-${num.toString().padStart(2, '0')}`;
          }

          // Fetch actual table UUID and then check for active session
          const { data: tableData } = await window.supabaseClient
            .from('restaurant_tables')
            .select('id')
            .eq('table_number', tableId)
            .single();

          if (tableData) {
            const { data: sessionData } = await window.supabaseClient
              .from('customer_sessions')
              .select('*')
              .eq('table_id', tableData.id)
              .eq('session_status', 'active')
              .order('started_at', { ascending: false })
              .limit(1)
              .maybeSingle();

            if (sessionData) {
              window.saveSession(sessionData);
              subscribeToWaiterStatus();
              subscribeToOrderUpdates();
            }
          }
        }
      }

      if (!window.currentSession) {
        // Show modal to collect details if STILL no session
        waiterModal.classList.add('active');
      } else {
        // Direct call
        await createWaiterCall();
      }
    });

    // Close Waiter Modal
    closeWaiterModal.addEventListener('click', () => {
      waiterModal.classList.remove('active');
    });

    const placeOrderBtn = document.getElementById('place-order-btn');
    if (placeOrderBtn) {
      placeOrderBtn.addEventListener('click', async () => {
        if (!window.currentSession) {
          waiterModal.classList.add('active');
          return;
        }

        const items = getCartItems();
        if (items.length === 0) return;

        placeOrderBtn.textContent = 'Placing Order...';
        placeOrderBtn.disabled = true;

        const total = getCartTotal();
        const res = await placeOrder({
          items,
          total,
          tax: total * 0.05, // Example 5% tax
          notes: document.getElementById('notes-input')?.value || ''
        });

        if (res.success) {
          showToast('Order Placed Successfully!');
          clearCart();
          document.getElementById('success-modal').classList.add('active');
          setTimeout(() => {
            document.getElementById('success-modal').classList.remove('active');
            if (typeof hideCheckout === 'function') hideCheckout();
          }, 3000);
        } else {
          alert('Error: ' + res.error);
        }

        placeOrderBtn.textContent = 'Place Order';
        placeOrderBtn.disabled = false;
      });
    }

    // Submit Waiter Call Form
    submitWaiterCall.addEventListener('click', async () => {
      // Read the table ID from the dropdown selection
      let tableId = waiterTableInput.value;

      // Format tableId to match database format "T-XX" if only a number was provided
      if (tableId && !tableId.toString().startsWith('T-')) {
        const num = parseInt(tableId, 10);
        if (!isNaN(num)) {
          tableId = `T-${num.toString().padStart(2, '0')}`;
        }
      }

      const customerName = waiterNameInput.value;
      const phoneNumber = waiterPhoneInput.value;
      const guestCount = parseInt(waiterGuestInput.value) || 1;

      if (!tableId || !customerName || !phoneNumber) {
        alert("Please fill in all required fields.");
        return;
      }

      submitWaiterCall.textContent = "Creating Session...";
      submitWaiterCall.disabled = true;

      // 0. Fetch actual table UUID from restaurant_tables based on table number
      const { data: tableData, error: tableError } = await window.supabaseClient
        .from('restaurant_tables')
        .select('id')
        .eq('table_number', tableId)
        .single();

      if (tableError || !tableData) {
        console.error("Table Error:", tableError);
        alert("Invalid table number. Please ensure the QR code is correct.");
        submitWaiterCall.textContent = "Call Now";
        submitWaiterCall.disabled = false;
        return;
      }
      
      const realTableId = tableData.id;

      // 1. Create or Find Session in Supabase
      const { data: sessionData, error: sessionError } = await window.supabaseClient
        .from('customer_sessions')
        .insert({
          table_id: realTableId, 
          customer_name: customerName,
          phone_number: phoneNumber,
          guest_count: guestCount,
          session_status: 'active'
        })
        .select()
        .single();

      if (sessionError) {
        console.error("Session Error:", sessionError);
        alert("Failed to create session.");
        submitWaiterCall.textContent = "Call Now";
        submitWaiterCall.disabled = false;
        return;
      }

      // Save locally
      window.saveSession(sessionData);

      // 2. Update table status to occupied so dashboard reflects it
      await window.supabaseClient
        .from('restaurant_tables')
        .update({ status: 'occupied' })
        .eq('id', realTableId);

      // Close modal
      waiterModal.classList.remove('active');
      submitWaiterCall.textContent = "Call Now";
      submitWaiterCall.disabled = false;

      // Initialize Realtime
      subscribeToWaiterStatus();
      subscribeToOrderUpdates();

      // 3. Create Waiter Call
      await createWaiterCall();
    });
  }

  async function createWaiterCall() {
    if (!window.currentSession) return;
    
    callWaiterBtn.classList.add('ringing');
    callWaiterBtn.addEventListener('animationend', () => {
      callWaiterBtn.classList.remove('ringing');
    }, { once: true });

    // Insert to Supabase
    const { error } = await window.supabaseClient
      .from('waiter_calls')
      .insert({
        session_id: window.currentSession.id,
        table_id: window.currentSession.table_id,
        customer_name: window.currentSession.customer_name,
        request_status: 'pending'
      });

    if (error) {
      console.error("Call Error:", error);
      showToast("Failed to call waiter.");
      return;
    }

    showToast("Waiter has been notified!");
    startCooldown();
  }

  function startCooldown() {
    callCooldown = true;
    callWaiterBtn.classList.add('disabled');
    callWaiterBtn.querySelector('span').textContent = 'Wait 30s...';
    
    let time = 30;
    const interval = setInterval(() => {
      time--;
      if (time <= 0) {
        clearInterval(interval);
        callCooldown = false;
        callWaiterBtn.classList.remove('disabled');
        callWaiterBtn.querySelector('span').textContent = 'Call Waiter';
      } else {
        callWaiterBtn.querySelector('span').textContent = `Wait ${time}s...`;
      }
    }, 1000);
  }

  function showToast(msg) {
    waiterToast.querySelector('span').textContent = msg;
    waiterToast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      waiterToast.classList.remove('show');
    }, 3000);
  }

  function showBanner(msg, isPersistent = false) {
    statusText.textContent = msg;
    statusBanner.classList.remove('hidden');
    if (!isPersistent) {
      setTimeout(() => statusBanner.classList.add('hidden'), 5000);
    }
  }

  function subscribeToWaiterStatus() {
    if (waiterCallSubscription) window.supabaseClient.removeChannel(waiterCallSubscription);
    
    waiterCallSubscription = window.supabaseClient.channel('custom-waiter-channel')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'waiter_calls',
        filter: `session_id=eq.${window.currentSession.id}`
      }, (payload) => {
        const newRecord = payload.new;
        if (newRecord.assigned_waiter_id && newRecord.request_status === 'assigned') {
          showBanner("A waiter is on the way to your table!", true);
        } else if (newRecord.request_status === 'completed') {
          statusBanner.classList.add('hidden');
        }
      })
      .subscribe();
  }

  function subscribeToOrderUpdates() {
    if (orderSubscription) window.supabaseClient.removeChannel(orderSubscription);
    
    orderSubscription = window.supabaseClient.channel('custom-order-channel')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders',
        filter: `session_id=eq.${window.currentSession.id}`
      }, (payload) => {
        const status = payload.new.order_status;
        if (status === 'preparing') {
          showBanner("Your order is now being prepared in the kitchen.");
        } else if (status === 'ready') {
          showBanner("Your order is ready and will be served shortly!", true);
        } else if (status === 'delivered') {
          statusBanner.classList.add('hidden');
        }
      })
      .subscribe();
  }

  // === Dish Modal logic ===
  const dishModal = document.getElementById('dish-modal');
  const dishModalImg = document.getElementById('dish-modal-img');
  const dishModalTitle = document.getElementById('dish-modal-title');
  const dishModalDesc = document.getElementById('dish-modal-desc');
  const dishModalPrice = document.getElementById('dish-modal-price');
  const dishModalCal = document.getElementById('dish-modal-cal');
  const dishModalClose = document.querySelector('.dish-modal-close');
  const dishModalAdd = document.getElementById('dish-modal-add');

  let currentDishId = null;

  function openDishModal(item) {
    currentDishId = item.id;
    dishModalImg.style.backgroundImage = `url('${item.image}')`;
    dishModalTitle.textContent = item.name;
    dishModalDesc.textContent = item.description;
    // ensure price defaults properly based on config
    const priceStr = typeof CONFIG !== 'undefined' ? `${CONFIG.CURRENCY}${item.price}` : `₹${item.price}`;
    dishModalPrice.textContent = priceStr;
    
    // Generate static looking random calories
    const fakeCal = Math.floor(Math.random() * 350) + 150;
    dishModalCal.innerHTML = `<i class="ph-fill ph-fire"></i> ${fakeCal} kcal`;

    dishModal.classList.add('active');
  }

  dishModalClose.addEventListener('click', () => {
    dishModal.classList.remove('active');
  });

  dishModalAdd.addEventListener('click', () => {
    if(typeof addToCart === 'function') {
      addToCart(currentDishId);
      if(window.updateCartUI) window.updateCartUI();
    }
    dishModal.classList.remove('active');
    
    waiterToast.querySelector('span').textContent = 'Item added to order!';
    waiterToast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      waiterToast.classList.remove('show');
      waiterToast.querySelector('span').textContent = 'Waiter has been notified!';
    }, 2000);
  });

  // Start app
  init();
});
