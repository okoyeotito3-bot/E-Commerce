export function WishlistUi(element){

const rawWishlist = localStorage.getItem("wishlist");
const wishlist = rawWishlist ? JSON.parse(rawWishlist) : [];

const wishListMap = wishlist.map(product=>{
 return `
      <div class="WishlistProducts"   data-name="${product.itemName}">
      <h2 class="itemName">${product.itemName}</h2>
        <div class="price-container">
        <span class="itemPrice">${product.itemPrice}</span>
        <span class="saleCurrency">${product.saleCurrency}</span>
      </div>
        <img src="${product.img}" alt="${product.itemName}">
        <button class="removeFromWishlistBtn">Remove from wishList</button>
      </div>     
 ` 
}).join('')



if(wishlist.length===0){
  element.innerHTML=`
<div class="empty-wishlist-wrapper">
<button class='backToShoppingBtn'>
  <i class="fa-solid fa-arrow-left"></i> Back to Shopping
</button>
  <div class="box-animation-container">
    <div class="floating-text-badge">Oops!</div>
    <svg class="box-svg" width="120" height="120" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 10V20C4 20.55 4.45 21 5 21H19C19.55 21 20 20.55 20 20V10" />
      <path d="M2 10H22" />
      <path class="box-flap flap-left" d="M4 10L1 4H8L5 10" />
      <path class="box-flap flap-right" d="M20 10L23 4H16L19 10" />
      <path d="M12 10V16" stroke-dasharray="2 2" />
    </svg>
    <div class="box-shadow"></div>
  </div>

  <h2 class="empty-wishlist-title">There is nothing here!</h2>
  <p class="empty-subtitle">Explore our products and save your favorites.</p>
</div>
`
}else{
element.innerHTML= `<div class="wishlistContainer">

                      <button class='backToShoppingBtn'>
                        <i class="fa-solid fa-arrow-left"></i> Back to Shopping
                      </button>
                       ${wishListMap}
                     </div>
                     `
}



}

