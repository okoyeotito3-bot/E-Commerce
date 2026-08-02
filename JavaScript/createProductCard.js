export function createProductCardHTML(product, index) {
  const rawWishlist = localStorage.getItem("wishlist");
  const wishlist = rawWishlist ? JSON.parse(rawWishlist) : []; 
  const isSaved = wishlist.some(item => item.itemName === product.itemName);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItem = cart.find(item => item.itemName === product.itemName);
  const qty = cartItem ? (cartItem.quantity || 1) : 0;

  // 3. Render split control IF qty > 0, otherwise render standard Add button
  const actionButtonHTML = qty > 0 
    ? `<div class="qty-stepper">
        <button class="decreaseQtyBtn" type="button">-</button>
        <span class="qtyCount">${qty}</span>
        <button class="addToCartBtn" type="button">+</button>
       </div>`
    : `<button class="addToCartBtn" type="button">${product.buyButton || "Add to Cart"}</button>`;

  // Escape special double quotes in text attributes to prevent HTML breakage
  const safeName = String(product.itemName).replace(/"/g, "&quot;");

  return `
    <div class="product" data-index="${index}" data-name="${safeName}">
      <h2 class="itemName">${product.itemName}</h2>
      <div class="price-container">
        <span class="itemPrice">${product.itemPrice}</span>
        <span class="saleCurrency">NGN</span>
      </div>
      <img src="${product.itemImage}" alt="${safeName}">
      <h4 class="ItemDescription">${product.itemDescription}</h4>
      <span class="WishlistBtn">${isSaved ? "❤️" : "🤍"}</span>  
      <div class="addOrRemoveBtn">
        ${actionButtonHTML}
      </div>
    </div>`;
}