
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
localStorage.clear()

import { authenticaionPage } from './auth.js';
import { catalogueData } from "./product.js";
import { createProductCardHTML } from "./createProductCard.js";
import {itemInPurchasedCart} from "./itemInPurchasedCart.js"
import {headerUI,xIcon,hamburgerIcon,} from './headerUi.js'
import { UserMenu,WishlistUi,} from "./helper.js";

import {
sectionBarToggler,
userMenuToggle,
themeToggleFunction 
} from "./toggler.js"

const  objectOfElement= {
headerElem:document.querySelector("header"),
authScreen:document.querySelector("#authScreen"),
orderedProduts:document.querySelector("#orderedProduts"),
userMenu:document.querySelector("#userMenu"),
mainElem:document.querySelector("main"),
asideElem:document.querySelector("aside"),
footerElem:document.querySelector("footer"),

} 

const {headerElem,authScreen,orderedProduts,userMenu,mainElem,asideElem,footerElem}= objectOfElement




//Task 2

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalCartItems = cart.length;
const rawWishlist = localStorage.getItem("wishlist");
const wishlist = rawWishlist ? JSON.parse(rawWishlist) : []; 
const savedTheme = localStorage.getItem('userTheme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}
 const userIsLogged= localStorage.getItem("userIsLogged")==='true'
if(userIsLogged){
 headerElem.classList.remove("showHeader")
  mainElem.classList.remove("showMain")
  asideElem.classList.remove("showAside")
}else{
 authenticaionPage(authScreen)
  headerElem.classList.add("hideHeader")
  mainElem.classList.add("hideMain")
  asideElem.classList.add("hideAside")  
}


// Task 4
const labeldiv= document.createElement("div")
labeldiv.className="labeldiv"

const input = document.createElement("input");
input.type='search'
input.className='searchInput'
input.placeholder='What are you looking for?';

const headerdiv=document.createElement("div");
headerdiv.className='headerdiv'
headerUI(headerdiv)

const label = document.createElement('label')
label.textContent= "🔍 Search products..."
const productDiv=document.createElement("div");


//Task 6
headerElem.append(labeldiv,headerdiv)
labeldiv.append(label,input)
mainElem.append(productDiv);




UserMenu(userMenu)
itemInPurchasedCart(orderedProduts);
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

//userMenu Listener
userMenu.addEventListener("click",(event)=>{

if(event.target.className===("signOutBtn"))
{
const querySignout=confirm("Are You Sure You want to sign Out")
if(querySignout){
localStorage.setItem("userIsLogged",String(false))
window.location.reload()}
}


if(event.target.closest(".seeWishlist")){
WishlistUi(productDiv)
}

})





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

headerUI(headerdiv)
itemInPurchasedCart(orderedProduts)
}


// Add/Remove from wishlist
if (event.target.classList.contains("WishlistBtn")) {
  const productCard = event.target.closest(".product");

  const wishlistObj = {
    itemName: productCard.querySelector("h2").textContent.trim(),
    itemPrice: productCard.querySelector(".itemPrice").textContent.trim(),
    saleCurrency: productCard.querySelector(".saleCurrency").textContent.trim(),
    img: productCard.querySelector("img").src,
    
  };

  // Check if item is already in wishlist by comparing itemName
  const itemIndex = wishlist.findIndex(
    (item) => item.itemName === wishlistObj.itemName
  );

  if (itemIndex === -1) {
    wishlist.push(wishlistObj);
    event.target.textContent = "❤️";
  } else {
    wishlist.splice(itemIndex, 1);
    event.target.textContent = "🤍";
  }


  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  UserMenu(userMenu);
}



})


mainElem.addEventListener('click',(event)=>{
  if(event.target.closest(".backToShoppingBtn")){
  productDiv.innerHTML = catalogueData.map(createProductCardHTML).join("");
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
headerUI(headerdiv);
itemInPurchasedCart(orderedProduts);

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








