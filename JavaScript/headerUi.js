
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




function headerUI(element){
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

export {headerUI,xIcon,hamburgerIcon,}