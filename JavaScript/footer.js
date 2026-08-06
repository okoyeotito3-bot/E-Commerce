export function createFooter(element) {
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalCartItems = cart.length;
totalCartItems = totalCartItems > 9 ? "9+" : totalCartItems;

element.innerHTML = `
<div class="nav-item" id="home">
    <i class="fa-solid fa-house"></i>
    <span>Home</span>
  </div>



  <div class="nav-item" id="cart">
    <i class="fa-solid fa-cart-shopping"></i>
    <span>Cart</span>
    <span class="badge">${totalCartItems}</span>
  </div>

  <div class="nav-item" id="wishlist">
    <i class="fa-solid fa-heart"></i>
    <span>Wishlist</span>
  </div>

  <div class="nav-item" id="profile">
    <i class="fa-solid fa-user"></i>
    <span>Profile</span>
  </div>

  <div class="nav-item" id="settings">
    <i class="fa-solid fa-gear"></i>
    <span>Settings</span>
  </div>`
}

export function getProfileDashboardHTML(element) {
  const userName = localStorage.getItem("userName") || "User";

  function getAvatarInnerHTML() {
    const photo = localStorage.getItem("profilephoto");
    if (photo) {
      return `<img src="${photo}" alt="Profile Photo" class="profile-photo" />`;
    }
    return `<i class="fa-solid fa-user"></i>`;
  }

  element.innerHTML = `
    <div class="profile-panel">

      <div class="profile-panel-header">
        <button class="profile-close" id="profileCloseBtn">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
      </div>

      <div class="profile-user-info">
        <div class="profile-avatar">
          <label for="profilePhotoInput" class="profile-photo-label">
            ${getAvatarInnerHTML()}
          </label>
          <input type="file" id="profilePhotoInput" accept="image/*" style="display: none;" />
        </div>

        <h3 class="profile-name">${userName}</h3>
      </div>

      <ul class="profile-menu">
        <li class="profile-menu-item" id="ordersBtn">
          <span class="menu-icon"><i class="fa-solid fa-box"></i></span>
          <span>Orders</span>
          <span class="chevron"><i class="fa-solid fa-chevron-right"></i></span>
        </li>

        <li class="profile-menu-item" id="helpBtn">
          <span class="menu-icon"><i class="fa-solid fa-circle-question"></i></span>
          <span>Help & Support</span>
          <span class="chevron"><i class="fa-solid fa-chevron-right"></i></span>
        </li>

        <li class="profile-menu-item" id="aboutDevBtn">
          <span class="menu-icon"><i class="fa-solid fa-code"></i></span>
          <span>About Developer</span>
          <span class="chevron"><i class="fa-solid fa-chevron-right"></i></span>
        </li>
      </ul>

      <button class="profile-logout-btn" id="logoutBtn">
        <i class="fa-solid fa-right-from-bracket"></i>
        <span>Log Out</span>
      </button>
    </div>
  `;

  const fileInput = element.querySelector('#profilePhotoInput');
  const photoLabel = element.querySelector('.profile-photo-label');

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      localStorage.setItem("profilephoto", dataUrl);
      photoLabel.innerHTML = `<img src="${dataUrl}" alt="Profile Photo" class="profile-photo" />`;
    };
    reader.readAsDataURL(file);
  });
}