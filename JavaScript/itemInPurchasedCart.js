export function itemInPurchasedCart(element) {
const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
const totalPrice = currentCart.reduce((sum, item) => {
    const numericPrice = parseFloat(String(item.itemPrice).replace(/[^0-9.]/g, '')) || 0;
    const qty = item.quantity || 1;
    return sum + (numericPrice * qty);
  }, 0);
 

  const productsHTML = currentCart.map((order, index) => {
    // 💡 Read the actual quantity for THIS specific product:
    const itemQty = order.quantity || 1;

    return `
      <div class='cartProducts'>
        <img src="${order.itemImage}" alt="${order.itemName}" />
        <h1>${order.itemName}</h1>
        <div class="price-container">
          <span class="itemPrice">${order.itemPrice}</span>
          <span class="saleCurrency">${order.currency}</span>
        </div>
        
        <span class="orderedProductQuantity">Qty: ${itemQty}</span>
        <button class='removefromcartBtn' data-index="${index}">Remove</button>
      </div>`;
  }).join("");

  if (currentCart.length === 0) {
    element.innerHTML = `
      <div class="empty-cart">
        <h1>Oops! You have nothing here</h1>
        <button class='backToShoppingBtn'>Back to Shopping</button>
      </div>`;
  } else {
    element.innerHTML = `
        ${productsHTML}
        <div class="checkout-container">
          <div class="cart-total">
            <span>Total:</span>
            <strong>${totalPrice.toLocaleString()} NGN</strong>
          </div>
          <button class="checkoutBtn">Continue to Checkout</button>
        </div>`;
  } 
}