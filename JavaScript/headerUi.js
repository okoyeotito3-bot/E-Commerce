




export function headerUI(element){
if (!element) return;

const cart = JSON.parse(localStorage.getItem("cart")) || []
let totalCartItems = cart.length;



element.innerHTML=
`<div class='appName'>
   OtikasXpress
  </div>

  <div class="totalInCart">
    <i class="fa-solid fa-cart-shopping"></i>
    <span>Cart</span>
    <span class="badge">${totalCartItems}</span>   
 </div>

<button class= "headerToggle" >
<svg class="headerToggle" width="24" height="24" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <line x1="3" y1="6" x2="21" y2="6" style="pointer-events: none;"></line>
      <line x1="3" y1="12" x2="21" y2="12" style="pointer-events: none;"></line>
      <line x1="3" y1="18" x2="21" y2="18" style="pointer-events: none;"></line>
  </svg>
</button>
 `
 }

