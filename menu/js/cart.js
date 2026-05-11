// =====================================================
// CART.JS — Manages the shopping cart state
// =====================================================

let cart = [];

// Helper function to find item details from MENU_DATA
function findItemById(id) {
  for (const category of MENU_DATA) {
    const item = category.items.find(i => i.id === id);
    if (item) return item;
  }
  return null;
}

// Add item to cart or increment quantity
function addToCart(itemId) {
  const itemData = findItemById(itemId);
  if (!itemData) return;

  const existingItem = cart.find(item => item.id === itemId);
  
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      id: itemData.id,
      name: itemData.name,
      price: itemData.price,
      qty: 1
    });
  }
  
  updateCartUI();
}

// Remove one unit from cart, or remove entirely if qty becomes 0
function removeFromCart(itemId) {
  const existingItem = cart.find(item => item.id === itemId);
  
  if (existingItem) {
    existingItem.qty -= 1;
    if (existingItem.qty <= 0) {
      cart = cart.filter(item => item.id !== itemId);
    }
  }
  
  updateCartUI();
}

// Completely remove item regardless of quantity
function deleteFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  updateCartUI();
}

// Calculate total items (sum of quantities)
function getCartCount() {
  return cart.reduce((total, item) => total + item.qty, 0);
}

// Calculate total price
function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.qty), 0);
}

// Empty the cart
function clearCart() {
  cart = [];
  updateCartUI();
}

// Returns the current cart state
function getCartItems() {
  return cart;
}
