
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
 *   Queries top-level page layout elements (header, main, section, aside, footer)
 *   and dynamically constructs interactive inputs, badges, and headings.
 * 
 * • Task 2 & 3: Persistent State Initialization
 *   Retrieves existing cart items and user theme preferences ('dark'/'light') 
 *   from LocalStorage on page load to maintain state across reloads.
 * 
 * • Task 5, 6 & 8: Dynamic UI Assembly & Catalog Rendering
 *   Appends search controls to the header and builds product card grids dynamically 
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
sectionBarToggler,
itemInPurchasedCart,
 createProductCardHTML,
themeToggleFunction } from "./helper.js";


// Task 1
const headerElem=document.querySelector("header");
const sectionElem=document.querySelector("section");
const mainElem=document.querySelector("main");
const asideElem=document.querySelector("aside");
const footerElem=document.querySelector("footer");

//Task 2
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let numberOfItemsInCart = cart.length;

//Task 3
const savedTheme = localStorage.getItem('userTheme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

// Task 4
const div=document.createElement("div");
const input = document.createElement("input")
const header=document.createElement("h1");
const label = document.createElement('label')

//Task 5
input.type='search'
input.placeholder='What are you looking for?'
label.textContent= "🔍 Search products..."
header.innerHTML= `<span>
                    E-commerce Website 
                  </span>
                  <span id="totalInCart">
                   Total Item In Cart
                    ${numberOfItemsInCart}     
                  </span>`


//Task 6
mainElem.append(div);
headerElem.append(
label,
input,
header)


//Task 7
sectionElem.innerHTML = itemInPurchasedCart();

//Task 8
div.innerHTML = catalogueData.map(createProductCardHTML).join("");


//Task 9
function updateUi(){
 header.innerHTML= 
  `<span>
    E-commerce Website 
  </span>
  <span id="totalInCart">
    Total Item In Cart
    ${numberOfItemsInCart}     
 </span>`}



//Task 10
div.addEventListener("click",(event)=>{
  
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
numberOfItemsInCart = cart.length;
updateUi();

localStorage.setItem("cart", JSON.stringify(cart));
itemInPurchasedCart()
sectionElem.innerHTML=itemInPurchasedCart()



}})


label.addEventListener("click", () => {
input.classList.add('show');
label.style.display="none"
});

header.addEventListener("click", (event) => {
  if (event.target.id === 'totalInCart') {
    sectionBarToggler(sectionElem);
  }
});


asideElem.addEventListener('click', () => {
sectionBarToggler(sectionElem);
});



sectionElem.addEventListener('click',()=>{

  if(event.target.classList.contains("removefromcartBtn")){
const indexToRemove = Number(event.target.dataset.index);
cart.splice(indexToRemove,1)
localStorage.setItem("cart", JSON.stringify(cart));
numberOfItemsInCart = cart.length;
updateUi();
sectionElem.innerHTML = itemInPurchasedCart();
  }

});

//Live Search Event Listener
input.addEventListener('input', () => {
const query = input.value.trim().toLowerCase();

const searchResults = catalogueData.filter(item => item.itemName.toLowerCase().includes(query));

if(searchResults.length===0){
div.innerHTML=`<p>No Item found For this search </P>`
} else{
div.innerHTML = searchResults.map(createProductCardHTML).join("");
}


});


//Toogling Theme Event Listener
window.addEventListener('dblclick',themeToggleFunction);









