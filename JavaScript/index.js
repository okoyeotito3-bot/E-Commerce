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

import { authenticaionPage } from './auth.js';
import { catalogueData } from "./product.js";
import { createProductCardHTML } from "./createProductCard.js";
import {itemInPurchasedCart} from "./itemInPurchasedCart.js"
import {headerUI,} from './headerUi.js'
import {WishlistUi} from "./wishlistUi.js"
import { UserMenu,settings,orders,helpAndSupport,aboutDeveloper} from "./menu.js";
import {labelListener,popUp} from "./eventListeners.js"
import {sectionBarToggler,userMenuToggle} from "./toggler.js"
import {createFooter,getProfileDashboardHTML} from "./footer.js"


//settings

import { editProfile,savedAddresses ,paymentMethods,securityPassword,} from "./setting.js";



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
if (savedTheme === 'dark-mode') {
  document.body.classList.add('dark-mode');
}

 const userIsLogged= localStorage.getItem("userIsLogged")==='true'
if(userIsLogged){
  authScreen.classList.add("hideAuthScreen")  
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
productDiv.setAttribute("id","productDiv")


//Task 6
headerElem.append(labeldiv,headerdiv)
labeldiv.append(label,input)
mainElem.append(productDiv);
createFooter(footerElem)



UserMenu(userMenu)
itemInPurchasedCart(orderedProduts);
productDiv.innerHTML = catalogueData.map(createProductCardHTML).join("");
labelListener(label)

function renderView(view) {
  switch (view) {
    case "wishlist":
      WishlistUi(mainElem);
      break;
    case "orders":
      orders(mainElem);
      break;
    case "settings":
      settings(mainElem);
      break;
    case "help":
      helpAndSupport(mainElem);
      break;
    case "about":
      aboutDeveloper(mainElem);
      break;
    default:
      mainElem.innerHTML = "";
      mainElem.appendChild(productDiv);
  }
}

history.replaceState({ view: "home" }, "", "#home");

window.addEventListener("popstate", (event) => {
  const view = event.state ? event.state.view : "home";
  renderView(view);
});
  


//-----Event Listeners--------------/


headerdiv.addEventListener("click", (event) => {
if (event.target.classList.contains("totalInCart")){
 sectionBarToggler(orderedProduts) 
};
if (event.target.closest(".headerToggle")){
  userMenuToggle(userMenu)
}

});



userMenu.addEventListener("click",(event)=>{

if(event.target.closest(".closeMenuBtn")){
  userMenu.classList.remove("showuserMenu")
 
 
}

if(event.target.closest(".menu-actions") ){
labeldiv.classList.add("hidelabeldiv")
}


if(event.target.closest(".seeWishlist") && userMenu.classList.contains("showuserMenu")){
WishlistUi(mainElem)
history.pushState({ view: "wishlist" }, "", "#wishlist");
}

if(event.target.className==="order" && userMenu.classList.contains("showuserMenu")){
 orders(mainElem)
 history.pushState({ view: "orders" }, "", "#orders");
  userMenu.classList.remove("showuserMenu")
 
}

if(event.target.className==="settingsBtn" && userMenu.classList.contains("showuserMenu")){
 userMenu.classList.remove("showuserMenu")
 
settings(mainElem)
history.pushState({ view: "settings" }, "", "#settings");
}

if(event.target.className==="helpBtn"  && userMenu.classList.contains("showuserMenu")){
helpAndSupport(mainElem)
history.pushState({ view: "help" }, "", "#help");
 userMenu.classList.remove("showuserMenu")
 
}


if(event.target.className==="aboutDevBtn"  && userMenu.classList.contains("showuserMenu")){
 aboutDeveloper(mainElem)
history.pushState({ view: "about" }, "", "#about");
  userMenu.classList.remove("showuserMenu")
 
}


if (event.target.className === "signOutBtn") {
  const { popUpDiv, acceptBtn, rejectBtn } = popUp('Are You Sure You want to Sign Out?', 'Yes', 'No');

  acceptBtn.addEventListener("click", () => {
   localStorage.setItem("userIsLogged",String(false))
  window.location.reload()
    popUpDiv.remove();
  });

  rejectBtn.addEventListener("click", () => {
    popUpDiv.remove();
  });
}
})

mainElem.addEventListener("click", (event) => {
if(event.target.closest(".backToShoppingBtn")){
window,location.reload()
}

if (event.target.classList.contains("WishlistBtn")) {
const productCard = event.target.closest(".product");
if (productCard) {
const wishlistObj = {
itemName: productCard.querySelector("h2").textContent.trim(),
itemPrice: productCard.querySelector(".itemPrice").textContent.trim(),
saleCurrency: productCard.querySelector(".saleCurrency").textContent.trim(),
img: productCard.querySelector("img").src,};

const itemIndex = wishlist.findIndex((item) => item.itemName === wishlistObj.itemName);

if (itemIndex === -1) {
wishlist.push(wishlistObj);
event.target.textContent = "❤️";
} else {
wishlist.splice(itemIndex, 1);
event.target.textContent = "🤍";}
localStorage.setItem("wishlist", JSON.stringify(wishlist));
UserMenu(userMenu)}}

if (event.target.classList.contains("removeFromWishlistBtn")) {
const selectedWishlistCard = event.target.closest(".WishlistProducts");
if (selectedWishlistCard) {
const productName = selectedWishlistCard.dataset.name; 
const itemIndex = wishlist.findIndex((item) => item.itemName === productName);

if (itemIndex !== -1) {
wishlist.splice(itemIndex, 1);
localStorage.setItem("wishlist", JSON.stringify(wishlist));
selectedWishlistCard.remove()}
WishlistUi(mainElem);
UserMenu(userMenu);}
}


  // 2. Cart Increment / Decrement
  const isAdd = event.target.classList.contains("addToCartBtn");
  const isDecrease = event.target.classList.contains("decreaseQtyBtn");

  if (isAdd || isDecrease) {
    const productCard = event.target.closest(".product");
    if (productCard) {
      const h2 = productCard.querySelector("h2").textContent.trim();
      const price = productCard.querySelector(".itemPrice").textContent.trim();
      const saleCurrency = productCard.querySelector(".saleCurrency").textContent.trim();
      const img = productCard.querySelector("img").src;

      let itemIndex = cart.findIndex((item) => item.itemName === h2);

      if (isAdd) {
        if (itemIndex > -1) {
          cart[itemIndex].quantity = (cart[itemIndex].quantity || 1) + 1;
        } else {
          cart.push({
            itemName: h2,
            itemPrice: price,
            currency: saleCurrency,
            itemImage: img,
            quantity: 1
          });
        }
      } else if (isDecrease) {
        if (itemIndex > -1) {
          cart[itemIndex].quantity = (cart[itemIndex].quantity || 1) - 1;
          if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
          }
        }
      }

      
  
      // Re-render button container for this card
      const buttonContainer = productCard.querySelector(".addOrRemoveBtn");
      const updatedItem = cart.find((item) => item.itemName === h2);
      const updatedQty = updatedItem ? updatedItem.quantity : 0;

      if (buttonContainer) {
        if (updatedQty > 0) {
          buttonContainer.innerHTML = `
            <div class="qty-stepper">
              <button class="decreaseQtyBtn">-</button>
              <span class="qtyCount">${updatedQty}</span>
              <button class="addToCartBtn">+</button>
            </div>
          `;
        } else {
          buttonContainer.innerHTML = `
            <button class="addToCartBtn">Add to Cart</button>
          `;
        }
      }}
  }

 localStorage.setItem("cart", JSON.stringify(cart));
headerUI(headerdiv);
itemInPurchasedCart(orderedProduts);
createFooter(footerElem);

if (event.target.closest("#profileCloseBtn")) {
  mainElem.innerHTML = "";
  mainElem.appendChild(productDiv);
  history.pushState({ view: "home" }, "", "#home");
}





//setting event listener

if(event.target.closest('#backBtn')){
  settings(mainElem)
  history.pushState({ view: "settings" }, "", "#settings"); 
}

if(event.target.closest('#account-security')){
  editProfile(mainElem);
}


if(event.target.closest("#saved-addresses")){
 savedAddresses(mainElem )
}

if(event.target.closest("#payment-methods")){
  console.log("payment method clicked") 
  paymentMethods(mainElem) }



  if(event.target.closest("#security-password")){
    securityPassword(mainElem)}
    
if(event.target.className==="signOutBtn"){
  const { popUpDiv, acceptBtn, rejectBtn } = popUp('Are You Sure You want to Sign Out?', 'Yes', 'No');

  acceptBtn.addEventListener("click", () => {
   localStorage.setItem("userIsLogged",String(false))
  window.location.reload()
    popUpDiv.remove();
  });

  rejectBtn.addEventListener("click", () => {
    popUpDiv.remove();
  });
}

if(event.target.id==='deleteAcctBtn'){
const { popUpDiv, acceptBtn, rejectBtn } = popUp('Are You Sure You want to Delete Your Account?', 'Yes', 'No');

  acceptBtn.addEventListener("click", () => {
  localStorage.clear()
  window.location.reload()
    popUpDiv.remove();
  });

  rejectBtn.addEventListener("click", () => {
    popUpDiv.remove();
  });

}

if(event.target.id==='notify-orders' ){
if(event.target.checked){
const { popUpDiv, acceptBtn, rejectBtn } = popUp('Where do you want to receive order Notifications?', 'Email','SMS');

acceptBtn.addEventListener("click", () => {
 
    popUpDiv.remove();
  });
  rejectBtn.addEventListener("click", () => {
 
    popUpDiv.remove();
  });
}
  
}


});




//Event Listener for Items already ordered
orderedProduts.addEventListener('click',()=>{

if(event.target.classList.contains("removefromcartBtn")){
const indexToRemove = Number(event.target.dataset.index);
cart.splice(indexToRemove,1)
localStorage.setItem("cart", JSON.stringify(cart));
totalCartItems = cart.length;
headerUI(headerdiv);
createFooter(footerElem);
itemInPurchasedCart(orderedProduts);
productDiv.innerHTML = catalogueData.map(createProductCardHTML).join("");
}

if(event.target.className==="backToShoppingBtn"){

orderedProduts.classList.remove("show")
mainElem.innerHTML = "";
mainElem.appendChild(productDiv);
history.pushState({ view: "home" }, "", "#home");
};

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







footerElem.addEventListener("click",(event)=>{

  if(event.target.closest('#home')){
mainElem.innerHTML = "";
mainElem.appendChild(productDiv);
history.pushState({ view: "home" }, "", "#home");
if(labeldiv.classList.contains("hidelabeldiv")){
labeldiv.classList.remove("hidelabeldiv")
}
return
}

 labeldiv.classList.add("hidelabeldiv")

if(event.target.closest('#cart')){
  mainElem.innerHTML = "";
  mainElem.innerHTML = orderedProduts.innerHTML
  history.pushState({ view: "cart" }, "", "#cart");
  itemInPurchasedCart(orderedProduts);
}

if(event.target.closest('#wishlist')){
WishlistUi(mainElem)
history.pushState({ view: "wishlist" }, "", "#wishlist");
}

if(event.target.closest('#profile')){
 getProfileDashboardHTML(mainElem)
  history.pushState({ view: "profile" }, "", "#profile");
}




if(event.target.closest('#settings')){
  settings(mainElem)
  history.pushState({ view: "settings" }, "", "#settings"); 
}



})

window.addEventListener("keydown", (event) => {
if(event.key === "Escape"){

if(userMenu.classList.contains("showuserMenu")){
userMenu.classList.remove("showuserMenu")

}

if(orderedProduts.classList.contains("show")){
sectionBarToggler(orderedProduts)
}

}
});


