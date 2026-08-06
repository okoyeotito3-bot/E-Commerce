
import { editProfile } from "./setting.js";




 export function UserMenu(element){
const userName=localStorage.getItem("userName")
const rawWishlist = localStorage.getItem("wishlist");
const wishlist = rawWishlist ? JSON.parse(rawWishlist) : []; 
const wishlistCount= wishlist.length;


element.innerHTML = `
  <span class="closeMenuBtn">
  <svg class="headerToggle" width="24" height="24" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <line x1="18" y1="6" x2="6" y2="18" style="pointer-events: none;"></line>
      <line x1="6" y1="6" x2="18" y2="18" style="pointer-events: none;"></line>
  </svg>
  </span>
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
    <hr>
    <button class='helpBtn'>❓ Help & Support</button>
    <button class='aboutDevBtn'>👨‍💻 About Developer</button>
    <hr>
    <button class='signOutBtn'>🚪 Sign Out</button>
  </div>

  <div class="menu-footer">
    <span class="app-version">v1.0.0</span>
  </div>
`

}

export function settings(element){
element.innerHTML = `
<div class="settings-container">



  <!-- SECTION 1: ACCOUNT & SECURITY -->
  <section class="settings-group" >

    <h3 class="group-title">Account & Security</h3>
    <ul class="settings-list">
      <li class="settings-item" id="account-security">
        <div class="item-info">
          <span class="item-title">Edit Profile</span>
          <span class="item-subtitle">Name, email, phone number</span>
        </div>
        <span class="chevron">&rsaquo;</span>
      </li>

      <li class="settings-item" id="saved-addresses">
        <div class="item-info">
          <span class="item-title">Saved Addresses</span>
          <span class="item-subtitle">Manage shipping & billing addresses</span>
        </div>
        <span class="chevron">&rsaquo;</span>
      </li>

      <li class="settings-item" id="payment-methods">
        <div class="item-info">
          <span class="item-title">Payment Methods</span>
          <span class="item-subtitle">Cards, Apple Pay, Google Pay</span>
        </div>
        <span class="chevron">&rsaquo;</span>
      </li>

      <li class="settings-item" id="security-password">
        <div class="item-info">
          <span class="item-title">Security & Password</span>
          <span class="item-subtitle">Change password, 2FA</span>
        </div>
        <span class="chevron">&rsaquo;</span>
      </li>
    </ul>
  </section>

  <!-- SECTION 2: PREFERENCES & REGIONAL -->
  <section class="settings-group">
    <h3 class="group-title">Preferences</h3>
    <ul class="settings-list">
      <li class="settings-item">
        <div class="item-info">
          <label for="theme-select" class="item-title">App Theme</label>
        </div>
        <select id="theme-select" class="settings-control" onchange="changeTheme(this.value)">
          <option value="system">System Default</option>
          <option value="light">Light Mode</option>
          <option value="dark-mode">Dark Mode</option>
        </select>
      </li>

      <li class="settings-item">
        <div class="item-info">
          <label for="currency-select" class="item-title">Currency</label>
        </div>
        <select id="currency-select" class="settings-control">
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
        </select>
      </li>

      <li class="settings-item">
        <div class="item-info">
          <label for="language-select" class="item-title">Language</label>
        </div>
        <select id="language-select" class="settings-control">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </li>
    </ul>
  </section>

  <!-- SECTION 3: NOTIFICATIONS -->
  <section class="settings-group">
    <h3 class="group-title">Notifications</h3>
    <ul class="settings-list">
      <li class="settings-item">
        <div class="item-info">
          <span class="item-title">Order Updates</span>
          <span class="item-subtitle">Shipping status, delivery tracking</span>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" id="notify-orders" checked>
          <span class="slider"></span>
        </label>
      </li>

      <li class="settings-item">
        <div class="item-info">
          <span class="item-title">Promotions & Flash Sales</span>
          <span class="item-subtitle">Discounts and special offers</span>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" id="notify-promos">
          <span class="slider"></span>
        </label>
      </li>
    </ul>
  </section>

  <!-- SECTION 4: ACCOUNT ACTIONS -->
  <section class="settings-group">
        <button class='signOutBtn'>Log Out</button>
        <button class="item-title">Delete Account</button>
  </section>
</div>
`;

element.addEventListener("change", (event) => {



  
if(event.target.id==='theme-select' && event.target.value==='light'){
document.body.classList.remove('dark-mode')
localStorage.setItem('userTheme','light' ) 
}

if(event.target.id==='theme-select' && event.target.value==='dark-mode'){
 document.body.classList.add('dark-mode') 
 localStorage.setItem('userTheme','dark-mode' ) 
}


})


}

export function orders(element){
  element.innerHTML = `
<div class="orders-container">


  <!-- STATUS FILTER TABS -->
  <nav class="order-tabs">
    <button class="tab-btn active" onclick="filterOrders('all')">All</button>
    <button class="tab-btn" onclick="filterOrders('active')">In Progress</button>
    <button class="tab-btn" onclick="filterOrders('completed')">Delivered</button>
    <button class="tab-btn" onclick="filterOrders('cancelled')">Cancelled</button>
  </nav>

  <!-- ORDERS LIST -->
  <div class="orders-list">

    <!-- ORDER ITEM CARD 1: ACTIVE -->
    <div class="order-card">
      <div class="order-card-header">
        <div>
          <span class="order-id">Order #ORD-8821</span>
          <span class="order-date">Placed on Oct 22, 2026</span>
        </div>
        <span class="status-badge status-shipped">Shipped</span>
      </div>

      <div class="order-card-body">
        <div class="product-item">
          <img src="product-thumb-1.jpg" alt="Product" class="product-thumb" />
          <div class="product-details">
            <h4 class="product-title">Ergonomic Wireless Mouse</h4>
            <p class="product-meta">Qty: 1 • $45.00</p>
          </div>
        </div>
      </div>

      <div class="order-card-footer">
        <div class="order-total">
          <span>Total: <strong>$48.50</strong></span>
        </div>
        <div class="order-actions">
          <button class="btn btn-secondary" onclick="viewOrderDetails('ORD-8821')">Details</button>
          <button class="btn btn-primary" onclick="trackOrder('ORD-8821')">Track Package</button>
        </div>
      </div>
    </div>

    <!-- ORDER ITEM CARD 2: DELIVERED -->
    <div class="order-card">
      <div class="order-card-header">
        <div>
          <span class="order-id">Order #ORD-7419</span>
          <span class="order-date">Placed on Sep 14, 2026</span>
        </div>
        <span class="status-badge status-delivered">Delivered</span>
      </div>

      <div class="order-card-body">
        <div class="product-item">
          <img src="product-thumb-2.jpg" alt="Product" class="product-thumb" />
          <div class="product-details">
            <h4 class="product-title">Noise Cancelling Headphones</h4>
            <p class="product-meta">Qty: 1 • $120.00</p>
          </div>
        </div>
      </div>

      <div class="order-card-footer">
        <div class="order-total">
          <span>Total: <strong>$120.00</strong></span>
        </div>
        <div class="order-actions">
          <button class="btn btn-secondary" onclick="leaveReview('ORD-7419')">Write Review</button>
          <button class="btn btn-primary" onclick="reorderItems('ORD-7419')">Buy Again</button>
        </div>
      </div>
    </div>

  </div>
</div>
`;
}
export function helpAndSupport(element){
element.innerHTML = `
<div class="support-container">
  <!-- FAQ SECTION -->
  <section class="support-section">
    <h3 class="section-title">Frequently Asked Questions</h3>
    
    <div class="faq-list">
      
      <!-- FAQ ITEM 1 -->
      <details class="faq-item" open>
        <summary class="faq-question">
          <span>How long does it take to complete my delivery?</span>
          <span class="faq-icon">&rsaquo;</span>
        </summary>
        <div class="faq-answer">
          <p>Standard delivery typically takes <strong>3 to 5 business days</strong> depending on your location. Once your order is processed, you will receive a tracking link via email to monitor its real-time progress.</p>
        </div>
      </details>

      <!-- FAQ ITEM 2 -->
      <details class="faq-item">
        <summary class="faq-question">
          <span>How does the app work?</span>
          <span class="faq-icon">&rsaquo;</span>
        </summary>
        <div class="faq-answer">
          <p>Our app allows you to browse products, add items to your cart, and check out securely. Once an order is placed, you can track its progress in real-time under the <strong>My Orders</strong> section in your profile.</p>
        </div>
      </details>

      <!-- FAQ ITEM 3 -->
      <details class="faq-item">
        <summary class="faq-question">
          <span>How do I track my current order status?</span>
          <span class="faq-icon">&rsaquo;</span>
        </summary>
        <div class="faq-answer">
          <p>Go to <strong>Settings &rsaquo; My Orders</strong>, select your active order, and tap <strong>Track Package</strong> to view step-by-step status updates from our delivery team.</p>
        </div>
      </details>

      <!-- FAQ ITEM 4 -->
      <details class="faq-item">
        <summary class="faq-question">
          <span>Can I cancel or modify my order after placing it?</span>
          <span class="faq-icon">&rsaquo;</span>
        </summary>
        <div class="faq-answer">
          <p>You can cancel or modify an order as long as its status is still marked as <strong>Processing</strong>. Once the status changes to <strong>Shipped</strong>, cancellations are no longer possible, but you can request a return upon delivery.</p>
        </div>
      </details>

      <!-- FAQ ITEM 5 -->
      <details class="faq-item">
        <summary class="faq-question">
          <span>What payment methods are supported?</span>
          <span class="faq-icon">&rsaquo;</span>
        </summary>
        <div class="faq-answer">
          <p>We accept major debit/credit cards (Visa, Mastercard), mobile wallets, and direct bank transfers depending on your regional preferences.</p>
        </div>
      </details>

    </div>
  </section>

  <!-- CONTACT SUPPORT SECTION -->
  <section class="support-section">
    <div class="contact-card">
      <div class="contact-info">
        <h3>Still need help?</h3>
        <p>Our customer support team is ready to assist you with any questions or order issues.</p>
      </div>
      <a href="mailto:okoyotito3@gmail.com?subject=App%20Support%20Request" class="contact-btn">
        <svg class="mail-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
        Send an Email
      </a>
    </div>
  </section>
</div>
`;  
}

export function aboutDeveloper(element){
 element.innerHTML = `
<div class="developer-container">
  <header class="developer-header">
    <h2>About the Developer</h2>
  </header>

  <div class="developer-card">
    <div class="developer-profile">
      <div class="developer-avatar">
        <i class="fa-solid fa-code"></i>
      </div>
      <div class="developer-info">
        <h3>Okoye Otitochukwu</h3>
        <span class="developer-title">JavaScript Developer</span>
        <span class="developer-location">
          <i class="fa-solid fa-location-dot"></i> Anambra State, Nigeria
        </span>
      </div>
    </div>

    <p class="developer-bio">
      Passionate JavaScript Developer dedicated to building responsive, efficient, and user-friendly web applications. Open to full-time roles, freelance projects, and contract work. Let's work together to bring your ideas to life!
    </p>

    <!-- CONTACT & LINKS -->
    <div class="developer-actions">
      <!-- PORTFOLIO LINK -->
      <a href="http://myportfolio124.netlify.app" target="_blank" rel="noopener noreferrer" class="dev-btn btn-primary">
        <i class="fa-solid fa-globe"></i>
        <span>Portfolio</span>
      </a>

      <!-- EMAIL LINK -->
      <a href="mailto:okoyeotito3@gmail.com?subject=Work%20Inquiry" class="dev-btn btn-secondary">
        <i class="fa-solid fa-envelope"></i>
        <span>Email Me</span>
      </a>

    <!-- WHATSAPP LINK -->
<a href="https://wa.me/2349038679275" target="_blank" rel="noopener noreferrer" class="dev-btn btn-whatsapp">
  <i class="fa-brands fa-whatsapp"></i>
  <span>Chat on WhatsApp</span>
</a>
    </div>
  </div>
</div>
`; 
}