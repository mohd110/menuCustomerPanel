// =====================================================
// ORDER.JS — Supabase Order Placement
// =====================================================

async function placeOrder(orderData) {
  if (!window.currentSession) {
    alert("Please call the waiter first to set up your session.");
    return { success: false, error: "No active session" };
  }

  try {
    // 1. Create the order
    const { data: order, error: orderError } = await window.supabaseClient
      .from('orders')
      .insert({
        session_id: window.currentSession.id,
        table_id: window.currentSession.table_id,
        created_by: window.currentSession.customer_name,
        order_status: 'pending',
        subtotal: orderData.total,
        tax: orderData.tax || 0,
        total: orderData.total,
        notes: orderData.notes || ''
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Prepare order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      menu_item_id: item.id, // Assuming the UI item IDs match the Supabase DB
      quantity: item.qty,
      item_price: item.price,
      total_price: item.price * item.qty,
      special_instructions: ''
    }));

    // 3. Insert order items
    const { error: itemsError } = await window.supabaseClient
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return { 
      success: true, 
      orderId: order.id 
    };

  } catch (err) {
    console.error("Error placing order:", err);
    return { success: false, error: err.message };
  }
}

