
function itemInPurchasedCart() {
const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
  if (currentCart.length === 0) {
    return `
      <div class="empty-cart">
        <h1>Oops! You have nothing here</h1>
        <button class='backToShoppingBtn'>Back to Shopping</button>
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


const xIcon = `
  <svg class="headerToggle" width="24" height="24" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <line x1="18" y1="6" x2="6" y2="18" style="pointer-events: none;"></line>
      <line x1="6" y1="6" x2="18" y2="18" style="pointer-events: none;"></line>
  </svg>`;

const hamburgerIcon = `
  <svg class="headerToggle" width="24" height="24" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <line x1="3" y1="6" x2="21" y2="6" style="pointer-events: none;"></line>
      <line x1="3" y1="12" x2="21" y2="12" style="pointer-events: none;"></line>
      <line x1="3" y1="18" x2="21" y2="18" style="pointer-events: none;"></line>
  </svg>`;






function updateUi(element){
if (!element) return;
const storedItemCount = JSON.parse(localStorage.getItem("cart")) || []
let totalCartItems = storedItemCount.length;

element.innerHTML=
`<div class='appName'>
   OtikasXpress
  </div>

  <div class="totalInCart">
    Total Item In Cart
    ${totalCartItems}     
 </div>

<button class= "headerToggle" >${hamburgerIcon}</button>
 `

 }

function createProductCardHTML(product) {

const rawWishlist = localStorage.getItem("wishlist");
const wishlist = rawWishlist ? JSON.parse(rawWishlist) : []; 
const isSaved = wishlist.includes(product.itemName);

  return `
    <div class="product">
      <h2>${product.itemName}</h2>
      <div class="price-container">
        <span class="itemPrice">${product.itemPrice}</span>
        <span class="saleCurrency">NGN</span>
      </div>
      <img src="${product.itemImage}" alt="${product.itemName}">
       <h4>${product.itemDescription}</h4>
       <span class="WishlistBtn">${isSaved ? "❤️" : "🤍"}</span>  
      <button class="addToCartBtn">${product.buyButton}</button>
     
    </div>`;
}



function buildUserMenu(element){
  element.innerHTML=
  `<button class='seeWishlist'>See Wishlist</button>
   <button class='order'>Orders</button>
   <button class='auth'>Sign Out</button>
  `
}



export { 
  itemInPurchasedCart, 
  createProductCardHTML ,
  updateUi,
  buildUserMenu,
  xIcon,
  hamburgerIcon,
};