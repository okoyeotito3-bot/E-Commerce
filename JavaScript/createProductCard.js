
export  function createProductCardHTML(product) {

const rawWishlist = localStorage.getItem("wishlist");
const wishlist = rawWishlist ? JSON.parse(rawWishlist) : []; 
const isSaved = wishlist.some(item => item.itemName === product.itemName);

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