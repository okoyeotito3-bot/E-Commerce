
function itemInPurchasedCart() {
  const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

  if (currentCart.length === 0) {
    return `
      <div class="empty-cart">
        <h1>Oops! You have nothing here</h1>
      </div>`;
  }


  const totalPrice = currentCart.reduce((sum, item) => {
    const numericPrice = parseFloat(String(item.itemPrice).replace(/[^0-9.]/g, '')) || 0;
    return sum + numericPrice;
  }, 0);

  const productsHTML = currentCart.map((order, index) => `
    <div class='cartProducts'>
      <h1>${order.itemName}</h1>
      <div class="price-container">
        <span class="itemPrice">${order.itemPrice}</span>
        <span class="saleCurrency">${order.currency}</span>
      </div>
      <img src="${order.itemImage}" alt="${order.itemName}" />
      <button class='removefromcartBtn' data-index="${index}">Remove</button>
    </div>`
  ).join("");

  return `
    ${productsHTML}
    <div class="checkout-container">
      <div class="cart-total">
        <span>Total:</span>
        <strong>${totalPrice.toLocaleString()} NGN</strong>
      </div>
      <button class="checkoutBtn">Continue to Checkout</button>
    </div>`;
}

// --- 2. Catalog Product Card Template ---
// Reused for initial catalog render and search results
function createProductCardHTML(product) {
  return `
    <div class="product">
      <h2>${product.itemName}</h2>
      <div class="price-container">
        <span class="itemPrice">${product.itemPrice}</span>
        <span class="saleCurrency">NGN</span>
      </div>
      <img src="${product.itemImage}" alt="${product.itemName}">
      <h4>${product.itemDescription}</h4>
      <button class="addToCartBtn">${product.buyButton}</button>    
    </div>`;
}

// --- 3. UI Toggles ---
function sectionBarToggler(element) {
  if (element) element.classList.toggle("show");
}

function themeToggleFunction(){
const isTheme = document.body.classList.toggle('dark-mode');
localStorage.setItem('userTheme',isTheme ? 'dark':'light' ) 
}





export { 
  sectionBarToggler, 
  itemInPurchasedCart, 
  createProductCardHTML ,
  themeToggleFunction
};