
function WishlistUi(element){

const rawWishlist = localStorage.getItem("wishlist");
const wishlist = rawWishlist ? JSON.parse(rawWishlist) : []; 

const wishListMap = wishlist.map(product=>{
 return `
      <div class="WishlistProducts">
      <h2>${product.itemName}</h2>
        <div class="price-container">
        <span class="itemPrice">${product.itemPrice}</span>
        <span class="saleCurrency">${product.saleCurrency}</span>
      </div>
        <img src="${product.img}" alt="${product.itemName}">
        <button>Remove from wishList</button>
      </div>
       
 ` 
}).join('')

element.innerHTML= `<div class="wishlistContainer">

                      <button class='backToShoppingBtn'>
                        <i class="fa-solid fa-arrow-left"></i> Back to Shopping
                      </button>
                       ${wishListMap}
                     </div>
                     `
}









function UserMenu(element){
const userName=localStorage.getItem("userFullName")
const rawWishlist = localStorage.getItem("wishlist");
const wishlist = rawWishlist ? JSON.parse(rawWishlist) : []; 
const wishlistCount= wishlist.length;


element.innerHTML = `
  <div class="menu-header">
    <span class="avatar-icon">👤</span>
    <span class="username-display">Hello ${userName}</span>
  </div>

  <div class="menu-actions">
    <button class='seeWishlist'>
      <span>❤️ Wishlist</span>
      <span class="badge">${wishlistCount}</span>
    </button>
    <button class='order'>📦 My Orders</button>
    <button class='settingsBtn'>⚙️ Settings</button>
    <button class='themeToggleBtn'>🌙 Toggle Dark Mode</button>
    <hr>
    <button class='helpBtn'>❓ Help & Support</button>
    <button class='aboutDevBtn'>👨‍💻 About Developer</button>
    <hr>
    <button class='signOutBtn'>🚪 Sign Out</button>
  </div>

  <div class="menu-footer">
    <span class="app-version">v1.0.0</span>
  </div>
`;




}



export {  
  UserMenu,
  WishlistUi,
};