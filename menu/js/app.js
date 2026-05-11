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
  function init() {
    renderCategories();
    renderItems(activeMacroCategoryIndex);
    setupEventListeners();
    setupDragScroll(categoryContainer);
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

  function setupEventListeners() {
    // Call Waiter button
    callWaiterBtn.addEventListener('click', () => {
      // Bell shake animation
      callWaiterBtn.classList.add('ringing');
      callWaiterBtn.addEventListener('animationend', () => {
        callWaiterBtn.classList.remove('ringing');
      }, { once: true });

      // Show toast
      waiterToast.querySelector('span').textContent = 'Waiter has been notified!';
      waiterToast.classList.add('show');

      // Clear any existing timer and hide after 3 seconds
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        waiterToast.classList.remove('show');
      }, 3000);
    });
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
