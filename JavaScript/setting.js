// ---------- EDIT PROFILE ----------
export function editProfile(element) {
  const name = localStorage.getItem("userName") || "";
  const email = localStorage.getItem("userEmail") || "";
  const phone = localStorage.getItem("userPhone") || "";

  element.innerHTML = `
    <div class="settings-container">
      <div class="settings-panel-header">
        <button class="settings-back" id="backBtn">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <h3>Edit Profile</h3>
      </div>

      <form class="settings-form" id="editProfileForm">
        <label class="form-label" for="nameInput">Full Name</label>
        <input type="text" id="nameInput" class="form-input" value="${name}" placeholder="Your name" />

        <label class="form-label" for="emailInput">Email</label>
        <input type="email" id="emailInput" class="form-input" value="${email}" placeholder="you@example.com" />

        <label class="form-label" for="phoneInput">Phone Number</label>
        <input type="tel" id="phoneInput" class="form-input" value="${phone}" placeholder="+1 234 567 8900" />

        <button type="submit" class="save-btn">Save Changes</button>
      </form>
    </div>
  `;

  const form = element.querySelector('#editProfileForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.setItem("userName", element.querySelector('#nameInput').value);
    localStorage.setItem("userEmail", element.querySelector('#emailInput').value);
    localStorage.setItem("userPhone", element.querySelector('#phoneInput').value);
    alert("Profile updated!");
  });

  element.querySelector('#backBtn').addEventListener('click', () => {
    // hook into your router, e.g. navigateTo('settings')
  });


}


// ---------- SAVED ADDRESSES ----------
export function savedAddresses(element) {
  const addresses = JSON.parse(localStorage.getItem("userAddresses") || "[]");

  const addressListHTML = addresses.length
    ? addresses.map((addr, i) => `
        <li class="address-item" data-index="${i}">
          <div class="item-info">
            <span class="item-title">${addr.label || "Address " + (i + 1)}</span>
            <span class="item-subtitle">${addr.street}, ${addr.city}, ${addr.zip}</span>
          </div>
          <button class="delete-address-btn" data-index="${i}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </li>
      `).join("")
    : `<p class="empty-state">No saved addresses yet.</p>`;

  element.innerHTML = `
    <div class="settings-container">
      <div class="settings-panel-header">
        <button class="settings-back" id="backBtn">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <h3>Saved Addresses</h3>
      </div>

      <ul class="settings-list">
        ${addressListHTML}
      </ul>

      <button class="save-btn" id="addAddressBtn">+ Add New Address</button>

      <form class="settings-form" id="addAddressForm" style="display:none;">
        <label class="form-label" for="labelInput">Label</label>
        <input type="text" id="labelInput" class="form-input" placeholder="Home, Work..." />

        <label class="form-label" for="streetInput">Street</label>
        <input type="text" id="streetInput" class="form-input" placeholder="123 Main St" />

        <label class="form-label" for="cityInput">City</label>
        <input type="text" id="cityInput" class="form-input" placeholder="City" />

        <label class="form-label" for="zipInput">ZIP Code</label>
        <input type="text" id="zipInput" class="form-input" placeholder="ZIP" />

        <button type="submit" class="save-btn">Save Address</button>
      </form>
    </div>
  `;

  const form = element.querySelector('#addAddressForm');

  element.querySelector('#addAddressBtn').addEventListener('click', () => {
    form.style.display = form.style.display === 'none' ? 'flex' : 'none';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newAddress = {
      label: element.querySelector('#labelInput').value,
      street: element.querySelector('#streetInput').value,
      city: element.querySelector('#cityInput').value,
      zip: element.querySelector('#zipInput').value,
    };
    const updated = [...addresses, newAddress];
    localStorage.setItem("userAddresses", JSON.stringify(updated));
    savedAddresses(element); // re-render with new list
  });

  element.querySelectorAll('.delete-address-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = Number(btn.dataset.index);
      const updated = addresses.filter((_, i) => i !== index);
      localStorage.setItem("userAddresses", JSON.stringify(updated));
      savedAddresses(element); // re-render
    });
  });

  element.querySelector('#backBtn').addEventListener('click', () => {
    // navigateTo('settings')
  });
}


// ---------- PAYMENT METHODS ----------
export function paymentMethods(element) {
  const cards = JSON.parse(localStorage.getItem("userCards") || "[]");

  const cardListHTML = cards.length
    ? cards.map((card, i) => `
        <li class="settings-item" data-index="${i}">
          <div class="item-info">
            <span class="item-title">${card.brand} •••• ${card.last4}</span>
            <span class="item-subtitle">Expires ${card.expiry}</span>
          </div>
          <button class="delete-card-btn" data-index="${i}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </li>
      `).join("")
    : `<p class="empty-state">No payment methods added.</p>`;

  element.innerHTML = `
    <div class="settings-container">
      <div class="settings-panel-header">
        <button class="settings-back" id="backBtn">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <h3>Payment Methods</h3>
      </div>

      <ul class="settings-list">
        ${cardListHTML}
      </ul>

      <button class="save-btn" id="addCardBtn">+ Add Card</button>

      <form class="settings-form" id="addCardForm" style="display:none;">
        <label class="form-label" for="cardNumberInput">Card Number</label>
        <input type="text" id="cardNumberInput" class="form-input" placeholder="1234 5678 9012 3456" maxlength="19" />

        <label class="form-label" for="expiryInput">Expiry (MM/YY)</label>
        <input type="text" id="expiryInput" class="form-input" placeholder="MM/YY" maxlength="5" />

        <label class="form-label" for="cvvInput">CVV</label>
        <input type="password" id="cvvInput" class="form-input" placeholder="123" maxlength="4" />

        <button type="submit" class="save-btn">Save Card</button>
      </form>
    </div>
  `;

  const form = element.querySelector('#addCardForm');

  element.querySelector('#addCardBtn').addEventListener('click', () => {
    form.style.display = form.style.display === 'none' ? 'flex' : 'none';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const number = element.querySelector('#cardNumberInput').value.replace(/\s/g, '');
    const expiry = element.querySelector('#expiryInput').value;

    // NOTE: never store full card numbers/CVV in localStorage in a real app —
    // this is placeholder logic only. Real payment data must go through a
    // PCI-compliant processor (Stripe, etc.), never plain localStorage.
    const newCard = {
      brand: "Card", // you'd normally detect Visa/Mastercard/etc. from the number
      last4: number.slice(-4),
      expiry,
    };
    const updated = [...cards, newCard];
    localStorage.setItem("userCards", JSON.stringify(updated));
    paymentMethods(element);
  });

  element.querySelectorAll('.delete-card-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = Number(btn.dataset.index);
      const updated = cards.filter((_, i) => i !== index);
      localStorage.setItem("userCards", JSON.stringify(updated));
      paymentMethods(element);
    });
  });

  element.querySelector('#backBtn').addEventListener('click', () => {
    // navigateTo('settings')
  });
}


// ---------- SECURITY & PASSWORD ----------
export function securityPassword(element) {
  element.innerHTML = `
    <div class="settings-container">
      <div class="settings-panel-header">
        <button class="settings-back" id="backBtn">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <h3>Security & Password</h3>
      </div>

      <form class="settings-form" id="changePasswordForm">
        <label class="form-label" for="currentPasswordInput">Current Password</label>
        <input type="password" id="currentPasswordInput" class="form-input" placeholder="••••••••" />

        <label class="form-label" for="newPasswordInput">New Password</label>
        <input type="password" id="newPasswordInput" class="form-input" placeholder="••••••••" />

        <label class="form-label" for="confirmPasswordInput">Confirm New Password</label>
        <input type="password" id="confirmPasswordInput" class="form-input" placeholder="••••••••" />

        <button type="submit" class="save-btn">Update Password</button>
      </form>

      <section class="settings-group">
        <h3 class="group-title">Two-Factor Authentication</h3>
        <ul class="settings-list">
          <li class="settings-item">
            <div class="item-info">
              <span class="item-title">Enable 2FA</span>
              <span class="item-subtitle">Add an extra layer of security</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="twoFactorToggle" ${localStorage.getItem("twoFactorEnabled") === "true" ? "checked" : ""}>
              <span class="slider"></span>
            </label>
          </li>
        </ul>
      </section>
    </div>
  `;

  const form = element.querySelector('#changePasswordForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const current = element.querySelector('#currentPasswordInput').value;
    const newPass = element.querySelector('#newPasswordInput').value;
    const confirm = element.querySelector('#confirmPasswordInput').value;

    if (newPass !== confirm) {
      alert("New passwords don't match.");
      return;
    }

    // NOTE: real password changes must go through your backend/auth API,
    // never handled purely client-side. This is placeholder logic only.
    alert("Password updated!");
    form.reset();
  });

  element.querySelector('#twoFactorToggle').addEventListener('change', (e) => {
    localStorage.setItem("twoFactorEnabled", e.target.checked);
  });

  element.querySelector('#backBtn').addEventListener('click', () => {
    // navigateTo('settings')
  });
}
