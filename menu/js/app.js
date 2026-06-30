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
  const waiterNameInput = document.getElementById('waiter-name-input');
  const waiterPhoneInput = document.getElementById('waiter-phone-input');
  const waiterGuestInput = document.getElementById('waiter-guest-input');

  // Table Number Modal Elements
  const tableNumberModal = document.getElementById('table-number-modal');
  const tableNumberInput = document.getElementById('table-number-input');
  const tableNumberSubmit = document.getElementById('table-number-submit');

  // Wishlist Elements
  const wishlistNavBtn = document.getElementById('wishlist-nav-btn');
  const wishlistBadge = document.getElementById('wishlist-badge');
  const wishlistModal = document.getElementById('wishlist-modal');
  const closeWishlistModal = document.getElementById('close-wishlist-modal');
  const wishlistItemsList = document.getElementById('wishlist-items-list');
  const wishlistEmptyState = document.getElementById('wishlist-empty-state');

  // Sections
  const mainMenuSection = document.getElementById('main-menu-section');
  const checkoutSection = document.getElementById('checkout-section');

  // Floating Cart Button
  const viewCartBtn = document.getElementById('view-cart-btn');
  const cartBadge = document.getElementById('cart-badge');

  // Added Items Page Elements
  const backToMenuBtn = document.getElementById('back-to-menu');
  const clearCartBtn = document.getElementById('clear-cart-btn');
  const addedItemsCount = document.getElementById('added-items-count');
  const addedItemsTbody = document.getElementById('added-items-tbody');
  const cartEmptyState = document.getElementById('cart-empty-state');
  const browseMenuBtn = document.getElementById('browse-menu-btn');
  const orderTotalCard = document.getElementById('order-total-card');
  const orderSubtotal = document.getElementById('order-subtotal');
  const orderTax = document.getElementById('order-tax');
  const checkoutTotal = document.getElementById('checkout-total');
  const deliveryDetailsCard = document.getElementById('delivery-details-card');
  const checkoutAction = document.getElementById('checkout-action');

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

  // Table resolved from the QR/table URL param or popup, cached for the session-creation form
  let resolvedTableId = null;

  // Get saved table number from localStorage
  function getSavedTableNumber() {
    return localStorage.getItem('customer_table_number') || null;
  }

  // Save table number to localStorage
  function saveTableNumber(num) {
    localStorage.setItem('customer_table_number', num);
  }

  async function resolveTableFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    let tableId = urlParams.get('table');
    
    // Also check localStorage if not in URL
    if (!tableId) {
      tableId = getSavedTableNumber();
    }
    if (!tableId) return null;

    if (!tableId.toString().startsWith('T-')) {
      const num = parseInt(tableId, 10);
      if (!isNaN(num)) tableId = `T-${num.toString().padStart(2, '0')}`;
    }

    const { data: tableData } = await window.supabaseClient
      .from('restaurant_tables')
      .select('id')
      .eq('table_number', tableId)
      .single();

    if (!tableData) return null;

    resolvedTableId = tableData.id;
    return tableData.id;
  }

  // Show table number popup
  function showTableNumberPopup() {
    tableNumberModal.classList.add('active');
    setTimeout(() => tableNumberInput.focus(), 350);
  }

  // Handle table number submission
  tableNumberSubmit.addEventListener('click', async () => {
    const inputVal = tableNumberInput.value.trim();
    if (!inputVal) {
      const wrapper = tableNumberInput.closest('.table-input-wrapper');
      wrapper.classList.add('error');
      setTimeout(() => wrapper.classList.remove('error'), 500);
      return;
    }

    const tableNum = parseInt(inputVal, 10);
    if (isNaN(tableNum) || tableNum < 1) {
      const wrapper = tableNumberInput.closest('.table-input-wrapper');
      wrapper.classList.add('error');
      setTimeout(() => wrapper.classList.remove('error'), 500);
      return;
    }

    const tableStr = `T-${tableNum.toString().padStart(2, '0')}`;
    tableNumberSubmit.querySelector('span').textContent = 'Finding table...';
    tableNumberSubmit.disabled = true;

    const { data: tableData } = await window.supabaseClient
      .from('restaurant_tables')
      .select('id')
      .eq('table_number', tableStr)
      .single();

    if (!tableData) {
      // Table not found in DB — show error
      const wrapper = tableNumberInput.closest('.table-input-wrapper');
      wrapper.classList.add('error');
      setTimeout(() => wrapper.classList.remove('error'), 500);
      tableNumberSubmit.querySelector('span').textContent = 'Continue';
      tableNumberSubmit.disabled = false;
      showToast('Table not found. Please check the number.');
      return;
    }

    // Save the table number and resolve
    saveTableNumber(tableStr);
    resolvedTableId = tableData.id;

    tableNumberModal.classList.remove('active');
    tableNumberSubmit.querySelector('span').textContent = 'Continue';
    tableNumberSubmit.disabled = false;

    showToast(`Table ${tableStr} set!`);

    // Prompt for session details right away if no session exists
    if (!window.currentSession) {
      waiterModal.classList.add('active');
    }
  });

  // Allow Enter key to submit
  tableNumberInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      tableNumberSubmit.click();
    }
  });

  // === Initialize ===
  async function init() {
    renderCategories();
    renderItems(activeMacroCategoryIndex);
    renderWishlistBadge();
    setupEventListeners();
    setupDragScroll(categoryContainer);

    // Resume Call Waiter Cooldown if it exists
    const storedCooldownEnd = localStorage.getItem('call_waiter_cooldown_end');
    if (storedCooldownEnd) {
      const endTime = parseInt(storedCooldownEnd, 10);
      if (endTime > Date.now()) {
        startCooldown(endTime);
      } else {
        localStorage.removeItem('call_waiter_cooldown_end');
      }
    }

    // Check if there is a table in the URL and if it matches the current session
    const realTableId = await resolveTableFromUrl();

    if (realTableId) {
      // If current session exists but belongs to a different table, clear it!
      if (window.currentSession && window.currentSession.table_id !== realTableId) {
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
          .eq('table_id', realTableId)
          .eq('session_status', 'active')
          .order('started_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (sessionData) {
          window.saveSession(sessionData);
        }
      }
    } else {
      // No table found in URL or localStorage — show table number popup
      showTableNumberPopup();
    }

    // Initialize Supabase realtime if session exists, otherwise prompt the
    // customer for their details right away so a session can be created
    if (window.currentSession) {
      subscribeToWaiterStatus();
      subscribeToOrderUpdates();
    } else if (realTableId) {
      // If table is set but no session exists, show the waiter call (session details) popup
      waiterModal.classList.add('active');
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
        
        itemCard.addEventListener('click', (e) => {
          // Don't open modal if wishlist button was clicked
          if (e.target.closest('.item-wishlist-btn')) return;
          openDishModal(item);
        });

        const wishlisted = isInWishlist(item.id);
        
        itemCard.innerHTML = `
          <button class="item-wishlist-btn ${wishlisted ? 'active' : ''}" data-id="${item.id}" aria-label="Toggle wishlist">
            <i class="${wishlisted ? 'ph-fill' : 'ph'} ph-heart"></i>
          </button>
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

    // Attach wishlist toggle listeners on item cards
    document.querySelectorAll('.item-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'));
        const added = toggleWishlist(id);
        // Update icon
        const icon = btn.querySelector('i');
        btn.classList.toggle('active', added);
        icon.className = added ? 'ph-fill ph-heart' : 'ph ph-heart';
        // Pop animation
        btn.classList.add('pop');
        btn.addEventListener('animationend', () => btn.classList.remove('pop'), { once: true });
        // If the dish modal has this item open, sync the state
        if (currentDishId === id) renderWishlistState(id);
      });
    });
  }

  // Required globally to be called from cart.js
  window.updateCartUI = function() {
    const count = getCartCount();
    cartBadge.textContent = count;
    
    if (count > 0) {
      viewCartBtn.classList.remove('hidden');
    } else {
      viewCartBtn.classList.add('hidden');
    }

    // Refresh checkout view if active
    if (checkoutSection.classList.contains('active')) {
      renderCheckout();
    }
  };

  // Render the checkout/added items screen list as a table
  function renderCheckout() {
    const currentCart = getCartItems();
    addedItemsTbody.innerHTML = '';
    
    // Update items summary text
    const totalCount = getCartCount();
    addedItemsCount.textContent = `${totalCount} item${totalCount !== 1 ? 's' : ''} in your order`;

    const hasItems = currentCart.length > 0;
    
    // Toggle table wrapper and other cards visibility
    const tableEl = document.getElementById('added-items-table');
    if (hasItems) {
      tableEl.style.display = 'table';
      cartEmptyState.style.display = 'none';
      orderTotalCard.style.display = 'block';
      deliveryDetailsCard.style.display = 'block';
      checkoutAction.style.display = 'block';
    } else {
      tableEl.style.display = 'none';
      cartEmptyState.style.display = 'flex';
      orderTotalCard.style.display = 'none';
      deliveryDetailsCard.style.display = 'none';
      checkoutAction.style.display = 'none';
    }

    currentCart.forEach(item => {
      // Find full details from MENU_DATA to get the image
      const fullItem = findItemById(item.id);
      const imageSrc = fullItem ? fullItem.image : 'assets/images/logo.png';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="td-item">
          <div class="table-item-detail">
            <div class="table-item-img" style="background-image: url('${imageSrc}')"></div>
            <div class="table-item-info">
              <span class="table-item-name">${item.name}</span>
              <button class="table-edit-btn" data-id="${item.id}">
                <i class="ph ph-note-pencil"></i> Edit
              </button>
            </div>
          </div>
        </td>
        <td class="td-price">${CONFIG.CURRENCY}${item.price}</td>
        <td class="td-qty">
          <div class="qty-control-table">
            <button class="qty-btn-table dec-btn" data-id="${item.id}">
              <i class="ph ph-minus"></i>
            </button>
            <span class="qty-val-table">${item.qty}</span>
            <button class="qty-btn-table inc-btn" data-id="${item.id}">
              <i class="ph ph-plus"></i>
            </button>
          </div>
        </td>
        <td class="td-total">${CONFIG.CURRENCY}${item.price * item.qty}</td>
        <td class="td-actions">
          <button class="table-delete-btn" data-id="${item.id}" aria-label="Delete item">
            <i class="ph-fill ph-trash"></i>
          </button>
        </td>
      `;
      addedItemsTbody.appendChild(tr);
    });

    // Attach row button event listeners
    addedItemsTbody.querySelectorAll('.dec-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        removeFromCart(id);
        renderCheckout();
      });
    });

    addedItemsTbody.querySelectorAll('.inc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        addToCart(id);
        renderCheckout();
      });
    });

    addedItemsTbody.querySelectorAll('.table-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        deleteFromCart(id);
        renderCheckout();
      });
    });

    addedItemsTbody.querySelectorAll('.table-edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        const fullItem = findItemById(id);
        if (fullItem) {
          openDishModal(fullItem);
        }
      });
    });

    // Calculate subtotal, tax, total
    const subtotal = getCartTotal();
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;

    orderSubtotal.textContent = `${CONFIG.CURRENCY}${subtotal}`;
    orderTax.textContent = `${CONFIG.CURRENCY}${tax}`;
    checkoutTotal.textContent = `${CONFIG.CURRENCY}${total}`;
  }

  // === UI Transitions ===
  function showCheckout() {
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
    // Call Waiter button — first ensure table is set, then session, then call
    callWaiterBtn.addEventListener('click', async () => {
      if (callCooldown) return;

      // If no table is resolved, show table number popup first
      if (!resolvedTableId) {
        showTableNumberPopup();
        return;
      }

      if (!window.currentSession) {
        // Show modal to collect details if there's still no session
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
        // First ensure table is set
        if (!resolvedTableId) {
          showTableNumberPopup();
          return;
        }

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

    // Input Restrictions for Waiter Form
    if (waiterPhoneInput) {
      waiterPhoneInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, ''); // only digits
        if (this.value.length > 10) {
          this.value = this.value.slice(0, 10);
        }
        
        // Clear error visually when typing
        const phoneWrapper = this.closest('.input-wrapper');
        const phoneErrorMsg = document.getElementById('phone-error-msg');
        if (phoneWrapper) phoneWrapper.classList.remove('error');
        if (phoneErrorMsg) phoneErrorMsg.style.display = 'none';
      });
    }

    if (waiterGuestInput) {
      waiterGuestInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, ''); // only digits
        
        if (this.value !== '') {
          let val = parseInt(this.value, 10);
          if (val > 12) {
            this.value = '12'; // Clamp to 12
            
            // Trigger shake and show error
            const guestWrapper = this.closest('.input-wrapper');
            const guestErrorMsg = document.getElementById('guest-error-msg');
            if (guestWrapper) {
              guestWrapper.classList.remove('error');
              void guestWrapper.offsetWidth;
              guestWrapper.classList.add('error');
            }
            if (guestErrorMsg) {
              guestErrorMsg.textContent = 'Maximum 12 guests allowed.';
              guestErrorMsg.style.display = 'block';
            }
          } else {
             // Clear error if valid
             const guestWrapper = this.closest('.input-wrapper');
             const guestErrorMsg = document.getElementById('guest-error-msg');
             if (guestWrapper) guestWrapper.classList.remove('error');
             if (guestErrorMsg) guestErrorMsg.style.display = 'none';
          }
        }
      });
    }

    // Submit Waiter Call Form
    submitWaiterCall.addEventListener('click', async () => {
      const customerName = waiterNameInput.value;
      const phoneNumber = waiterPhoneInput.value;
      const guestCount = parseInt(waiterGuestInput.value) || 1;

      // Reset errors
      const nameWrapper = waiterNameInput.closest('.input-wrapper');
      const phoneWrapper = waiterPhoneInput.closest('.input-wrapper');
      const guestWrapper = waiterGuestInput.closest('.input-wrapper');
      
      const nameErrorMsg = document.getElementById('name-error-msg');
      const phoneErrorMsg = document.getElementById('phone-error-msg');
      const guestErrorMsg = document.getElementById('guest-error-msg');
      
      [nameWrapper, phoneWrapper, guestWrapper].forEach(wrapper => {
        if (wrapper) {
          wrapper.classList.remove('error');
          void wrapper.offsetWidth; // trigger reflow
        }
      });
      
      if (nameErrorMsg) nameErrorMsg.style.display = 'none';
      if (phoneErrorMsg) phoneErrorMsg.style.display = 'none';
      if (guestErrorMsg) guestErrorMsg.style.display = 'none';

      let hasError = false;

      // Name validation
      if (!customerName.trim()) {
        if (nameWrapper) nameWrapper.classList.add('error');
        if (nameErrorMsg) {
          nameErrorMsg.textContent = 'Please enter your name.';
          nameErrorMsg.style.display = 'block';
        }
        hasError = true;
      }

      // Phone validation (exactly 10 digits)
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phoneNumber)) {
        if (phoneWrapper) phoneWrapper.classList.add('error');
        if (phoneErrorMsg) {
          phoneErrorMsg.textContent = 'Please enter a valid 10-digit phone number.';
          phoneErrorMsg.style.display = 'block';
        }
        hasError = true;
      }

      // Guest count validation (min 1, max 12)
      if (guestCount < 1 || guestCount > 12 || isNaN(guestCount)) {
        if (guestWrapper) guestWrapper.classList.add('error');
        if (guestErrorMsg) {
          guestErrorMsg.textContent = 'Maximum 12 guests allowed.';
          guestErrorMsg.style.display = 'block';
        }
        hasError = true;
      }

      if (hasError) return;

      // Table comes from the QR code URL, not a manual selection
      const realTableId = resolvedTableId || await resolveTableFromUrl();

      if (!realTableId) {
        if (typeof showToast === 'function') showToast("Unable to detect table. Scan QR code.");
        return;
      }

      submitWaiterCall.textContent = "Creating Session...";
      submitWaiterCall.disabled = true;

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
        if (typeof showToast === 'function') showToast("Failed to create session.");
        submitWaiterCall.textContent = "Submit";
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
      submitWaiterCall.textContent = "Submit";
      submitWaiterCall.disabled = false;

      // Initialize Realtime
      subscribeToWaiterStatus();
      subscribeToOrderUpdates();
    });

    // ==============================================
    // SOS / COMPLAIN LOGIC
    // ==============================================
    const resolveSosBtn = document.getElementById('resolve-sos-btn');
    const sosBtn = document.getElementById('sos-btn');
    const sosModal = document.getElementById('sos-modal');
    const closeSosModal = document.getElementById('close-sos-modal');
    const submitSosBtn = document.getElementById('submit-sos');
    const sosReasonInput = document.getElementById('sos-reason-input');
    const sosOtherReasonGroup = document.getElementById('sos-other-reason-group');
    const sosOtherReasonInput = document.getElementById('sos-other-reason-input');

    let sosCooldown = false;
    let activeSosCallId = localStorage.getItem('active_sos_call_id') || null;

    function updateSosUi() {
      if (activeSosCallId) {
        if (sosBtn) sosBtn.classList.add('hidden');
        if (resolveSosBtn) resolveSosBtn.classList.remove('hidden');
      } else {
        if (sosBtn) sosBtn.classList.remove('hidden');
        if (resolveSosBtn) resolveSosBtn.classList.add('hidden');
      }
    }
    
    updateSosUi();

    if (sosReasonInput) {
      sosReasonInput.addEventListener('change', (e) => {
        if (e.target.value === 'Other') {
          sosOtherReasonGroup.style.display = 'block';
        } else {
          sosOtherReasonGroup.style.display = 'none';
        }
      });
    }

    if (sosBtn) {
      sosBtn.addEventListener('click', () => {
        if (sosCooldown) return;

        // If no table is resolved, show table number popup first
        if (!resolvedTableId) {
          showTableNumberPopup();
          return;
        }

        if (!window.currentSession) {
          alert("Please start a session (by clicking 'Call Waiter' or scanning the QR code) before sending an SOS.");
          return;
        }
        sosModal.classList.add('active');
      });
    }

    if (closeSosModal) {
      closeSosModal.addEventListener('click', () => {
        sosModal.classList.remove('active');
      });
    }

    if (submitSosBtn) {
      submitSosBtn.addEventListener('click', async () => {
        let reason = sosReasonInput.value;
        if (!reason) {
          alert("Please select a reason.");
          return;
        }
        if (reason === 'Other') {
          reason = sosOtherReasonInput.value;
          if (!reason.trim()) {
            alert("Please specify the reason.");
            return;
          }
        }

        submitSosBtn.textContent = "Sending...";
        submitSosBtn.disabled = true;

        const { data, error } = await window.supabaseClient
          .from('waiter_calls')
          .insert({
            session_id: window.currentSession.id,
            table_id: window.currentSession.table_id,
            customer_name: `${window.currentSession.customer_name} (SOS: ${reason})`,
            request_status: 'pending'
          })
          .select()
          .single();

        if (error) {
          console.error("SOS Error:", error);
          alert("Failed to send SOS. Please try again.");
        } else {
          showToast("SOS sent! A manager will attend to you.");
          
          if (data && data.id) {
            activeSosCallId = data.id;
            localStorage.setItem('active_sos_call_id', data.id);
            updateSosUi();
          }

          sosModal.classList.remove('active');
          sosReasonInput.value = "";
          sosOtherReasonGroup.style.display = "none";
          sosOtherReasonInput.value = "";
          
          sosCooldown = true;
          sosBtn.classList.add('disabled');
          sosBtn.querySelector('span').textContent = 'Wait 60s...';
          
          let time = 60;
          const interval = setInterval(() => {
            time--;
            if (time <= 0) {
              clearInterval(interval);
              sosCooldown = false;
              sosBtn.classList.remove('disabled');
              sosBtn.querySelector('span').textContent = 'SOS / Complain';
            } else {
              sosBtn.querySelector('span').textContent = `Wait ${time}s...`;
            }
          }, 1000);
        }

        submitSosBtn.textContent = "Send SOS";
        submitSosBtn.disabled = false;
      });
    }

    if (resolveSosBtn) {
      resolveSosBtn.addEventListener('click', async () => {
        if (!activeSosCallId) return;

        resolveSosBtn.textContent = "Resolving...";
        resolveSosBtn.disabled = true;

        const { error } = await window.supabaseClient
          .from('waiter_calls')
          .update({ request_status: 'completed' })
          .eq('id', activeSosCallId);

        if (error) {
          console.error("Resolve SOS Error:", error);
          alert("Failed to resolve SOS. Please try again.");
        } else {
          showToast("Issue marked as resolved. Thank you!");
          activeSosCallId = null;
          localStorage.removeItem('active_sos_call_id');
          updateSosUi();
        }

        resolveSosBtn.innerHTML = '<i class="ph-fill ph-check-circle"></i><span>Issue Resolved</span>';
        resolveSosBtn.disabled = false;
      });
    }

    // Navigation and Cart Actions
    viewCartBtn.addEventListener('click', () => {
      showCheckout();
    });

    backToMenuBtn.addEventListener('click', () => {
      hideCheckout();
    });

    clearCartBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all items from your order?')) {
        clearCart();
        renderCheckout();
      }
    });

    browseMenuBtn.addEventListener('click', () => {
      hideCheckout();
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

  function startCooldown(existingEndTime = null) {
    let endTime = existingEndTime;
    
    if (!endTime) {
      endTime = Date.now() + 30000;
      localStorage.setItem('call_waiter_cooldown_end', endTime);
    }

    callCooldown = true;
    callWaiterBtn.classList.add('disabled');
    
    const updateButton = () => {
      const remainingTime = Math.ceil((endTime - Date.now()) / 1000);
      
      if (remainingTime <= 0) {
        clearInterval(interval);
        callCooldown = false;
        callWaiterBtn.classList.remove('disabled');
        callWaiterBtn.querySelector('span').textContent = 'Call Waiter';
        localStorage.removeItem('call_waiter_cooldown_end');
      } else {
        callWaiterBtn.querySelector('span').textContent = `Wait ${remainingTime}s...`;
      }
    };
    
    updateButton();
    const interval = setInterval(updateButton, 1000);
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
  const dishModalWishlist = document.getElementById('dish-modal-wishlist');
  const dishModalWishlistIcon = dishModalWishlist.querySelector('i');

  let currentDishId = null;

  // === Wishlist (persisted in localStorage) ===
  function getWishlist() {
    try {
      return JSON.parse(localStorage.getItem('wishlist_items')) || [];
    } catch {
      return [];
    }
  }

  function isInWishlist(itemId) {
    return getWishlist().includes(itemId);
  }

  function toggleWishlist(itemId) {
    const list = getWishlist();
    const index = list.indexOf(itemId);
    if (index === -1) {
      list.push(itemId);
    } else {
      list.splice(index, 1);
    }
    localStorage.setItem('wishlist_items', JSON.stringify(list));
    renderWishlistBadge();
    return index === -1; // true if the item was just added
  }

  function renderWishlistState(itemId) {
    const active = isInWishlist(itemId);
    dishModalWishlist.classList.toggle('active', active);
    dishModalWishlistIcon.className = active ? 'ph-fill ph-heart' : 'ph ph-heart';
  }

  function renderWishlistBadge() {
    const count = getWishlist().length;
    wishlistBadge.textContent = count;
    wishlistBadge.classList.toggle('hidden', count === 0);
  }

  function renderWishlistModal() {
    const items = getWishlist().map(findItemById).filter(Boolean);
    wishlistItemsList.innerHTML = '';
    wishlistEmptyState.classList.toggle('hidden', items.length > 0);

    items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'wishlist-item';
      row.innerHTML = `
        <div class="wishlist-item-img" style="background-image: url('${item.image}')"></div>
        <div class="wishlist-item-info">
          <h4>${item.name}</h4>
          <span class="price">${CONFIG.CURRENCY}${item.price}</span>
        </div>
        <div class="wishlist-item-actions">
          <button class="wishlist-remove-btn" data-id="${item.id}" aria-label="Remove from wishlist">
            <i class="ph-fill ph-heart"></i>
          </button>
          <button class="wishlist-add-btn" data-id="${item.id}" aria-label="Add to order">
            <i class="ph ph-plus"></i>
          </button>
        </div>
      `;
      wishlistItemsList.appendChild(row);
    });
  }

  wishlistNavBtn.addEventListener('click', () => {
    renderWishlistModal();
    wishlistModal.classList.add('active');
  });

  closeWishlistModal.addEventListener('click', () => {
    wishlistModal.classList.remove('active');
  });

  wishlistItemsList.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.wishlist-remove-btn');
    const addBtn = e.target.closest('.wishlist-add-btn');

    if (removeBtn) {
      const id = parseInt(removeBtn.getAttribute('data-id'));
      toggleWishlist(id);
      if (currentDishId === id) renderWishlistState(id);
      renderWishlistModal();
    } else if (addBtn) {
      const id = parseInt(addBtn.getAttribute('data-id'));
      addToCart(id);
      if (window.updateCartUI) window.updateCartUI();
      showToast('Item added to order!');
    }
  });

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

    renderWishlistState(item.id);

    dishModal.classList.add('active');
  }

  dishModalClose.addEventListener('click', () => {
    dishModal.classList.remove('active');
  });

  dishModalWishlist.addEventListener('click', () => {
    if (currentDishId == null) return;
    toggleWishlist(currentDishId);
    renderWishlistState(currentDishId);
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
