
/**
 * ==============================================================================
 *                         E-COMMERCE WEB APPLICATION
 * ==============================================================================
 * Built with: Vanilla JavaScript (ES6+), HTML5, & Modern CSS3
 * Author:     Okoye Otitochukwu Nicodemus / Otikas (<OtikasDev>)
 * 
 * OVERVIEW:
 * Core client-side JavaScript file managing the store's user interface and logic.
 * Handles modular imports, dynamic DOM construction, cart state persistence with 
 * LocalStorage, live search filtering, side-drawer toggling, and theme toggling.
 * 
 * ARCHITECTURE & TASK BREAKDOWN:
 * ------------------------------------------------------------------------------
 * • Task 1 & 4: DOM Node Selection & Creation
 *   Queries top-level page layout elements (headerdiv, main, section, aside, footer)
 *   and dynamically constructs interactive inputs, badges, and headings.
 * 
 * • Task 2 & 3: Persistent State Initialization
 *   Retrieves existing cart items and user theme preferences ('dark'/'light') 
 *   from LocalStorage on page load to maintain state across reloads.
 * 
 * • Task 5, 6 & 8: Dynamic UI Assembly & Catalog Rendering
 *   Appends search controls to the headerdiv and builds product card grids dynamically 
 *   from imported data array templates (`catalogueData`).
 * 
 * • Task 7 & 9: UI Synchronization
 *   Keeps item counts and cart drawer views synced in real-time across user actions.
 * 
 * • Task 10: Event Delegation & Interactivity
 *   - Cart Management: Implements event delegation to handle "Add to Cart" and 
 *     "Remove from Cart" actions, updating LocalStorage and DOM dynamically.
 *   - Live Search: Filters products in real-time by checking input text against 
 *     product titles using string normalization (`.toLowerCase()` and `.includes()`).
 *   - Drawer & Theme Toggling: Controls cart side-panel visibility and window 
 *     double-click theme switching.
 * ==============================================================================
 */




import { catalogueData } from "./product.js";
import { 
itemInPurchasedCart,
createProductCardHTML,
updateUi ,
buildUserMenu,
xIcon,
hamburgerIcon,
} from "./helper.js";

import {
sectionBarToggler,
userMenuToggle,
themeToggleFunction 
} from "./toggler.js"


// Task 1
const headerElem=document.querySelector("header");
const orderedProduts=document.querySelector("#orderedProduts");
const userMenu=document.querySelector("#userMenu");
const mainElem=document.querySelector("main");
const asideElem=document.querySelector("aside");
const footerElem=document.querySelector("footer");

//Task 2
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalCartItems = cart.length;
const rawWishlist = localStorage.getItem("wishlist");
const wishlist = rawWishlist ? JSON.parse(rawWishlist) : []; 
const savedTheme = localStorage.getItem('userTheme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}



// Task 4
const labeldiv= document.createElement("div")
labeldiv.className="labeldiv"

const input = document.createElement("input");
input.type='search'
input.placeholder='What are you looking for?';

const headerdiv=document.createElement("div");
headerdiv.className='headerdiv'
updateUi(headerdiv)

const label = document.createElement('label')
label.textContent= "🔍 Search products..."
const productDiv=document.createElement("div");





//Task 6
headerElem.append(labeldiv,headerdiv)
labeldiv.append(label,input)
mainElem.append(productDiv);


buildUserMenu(userMenu)
orderedProduts.innerHTML = itemInPurchasedCart();
productDiv.innerHTML = catalogueData.map(createProductCardHTML).join("");


  


//-----Event Listeners--------------/
headerdiv.addEventListener("click", (event) => {

if (event.target.classList.contains("totalInCart")){
 sectionBarToggler(orderedProduts) 
};

if (event.target.closest(".headerToggle")){
  userMenuToggle(userMenu)
  if(userMenu.classList.contains("showuserMenu")){
    event.target.innerHTML=xIcon
  }else{
    event.target.innerHTML=hamburgerIcon
  }}

});

productDiv.addEventListener("click",(event)=>{
//Add to cart 
if(event.target.classList.contains("addToCartBtn")){

const products= event.target.closest(".product");
const h2 =products.querySelector("h2").textContent
const price =products.querySelector(".itemPrice").textContent
const saleCurrency =products.querySelector(".saleCurrency").textContent
const img =products.querySelector("img").src;


const cartObj={
  itemName:h2,
  itemPrice:price,
  currency:saleCurrency,
  itemImage:img,
 };

cart.push(cartObj)

totalCartItems = cart.length;
localStorage.setItem("cart", JSON.stringify(cart));

updateUi(headerdiv)
itemInPurchasedCart()
orderedProduts.innerHTML=itemInPurchasedCart()
}

//Add to wishlist
if(event.target.classList.contains("WishlistBtn")){
const productCard = event.target.closest(".product");
const itemName = productCard.querySelector("h2").textContent;
const itemIndex = wishlist.indexOf(itemName);

if (itemIndex === -1) {
    wishlist.push(itemName);
    event.target.textContent = "❤️";
  } else {
    wishlist.splice(itemIndex, 1);
    event.target.textContent = "🤍";
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}


})

//Label Listener
label.addEventListener("click", () => {
input.classList.add('show');
label.style.display="none"
});



//(Aside Element)asideElem Listener
asideElem.addEventListener('click', () => {
sectionBarToggler(orderedProduts);
});


//Event Listener for Items already ordered
orderedProduts.addEventListener('click',()=>{

if(event.target.classList.contains("removefromcartBtn")){
const indexToRemove = Number(event.target.dataset.index);
cart.splice(indexToRemove,1)
localStorage.setItem("cart", JSON.stringify(cart));
totalCartItems = cart.length;
updateUi(headerdiv);
orderedProduts.innerHTML = itemInPurchasedCart();

}

if(event.target.className==="backToShoppingBtn")sectionBarToggler(orderedProduts);
});

//Live Search Event Listener
input.addEventListener('input', (event) => {
const query = input.value.trim().toLowerCase();

const searchResults = catalogueData.filter(item => item.itemName.toLowerCase().includes(query));

if(searchResults.length===0){
productDiv.innerHTML=`<p>No Item found For this search </P>`
} else{
productDiv.innerHTML = searchResults.map(createProductCardHTML).join("");
}


});


//Toogling Theme Event Listener
window.addEventListener('dblclick',themeToggleFunction);








