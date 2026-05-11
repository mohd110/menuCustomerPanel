// =====================================================
// ORDER.JS — Static UI Simulated Order Placement
// =====================================================

async function placeOrder(orderData) {
  console.log("STATIC UI MODE: Simulating order placement...", orderData);
  
  // Simulate a network delay
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Order simulation complete.");
      resolve({ 
        success: true, 
        simulated: true, 
        orderId: 'mock_' + Date.now() 
      });
    }, 1200);
  });
}

