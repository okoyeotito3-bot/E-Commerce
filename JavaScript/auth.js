function authenticaionPage(element) {

let userIsLogged = localStorage.getItem("userIsLogged")==='true'
let userIsRegsitered= localStorage.getItem("userIsRegistered")==="true"

const userPassword = Number(localStorage.getItem("userPassword"))
const userName=localStorage.getItem("userFullName")

  if (!userIsLogged && !userIsRegsitered) {
    element.innerHTML = `
    <div class="auth-card">
        <div class="brand-header">
            <h1 class="brand-title">OtikasXpress</h1>
            <p class="brand-subtitle">Join us! Create your account below.</p>
        </div>

        <form  class="auth-form">
            
            <!-- Full Name Input -->
            <div class="input-group">
                <label for="regFullNameInput" class="input-label">Full Name</label>
                <input 
                    type="text" 
                    id="regFullNameInput" 
                    class="form-input" 
                    placeholder="Enter your full name"
                    autocomplete="name" 
                    required
                >
            </div>


            <!-- Password Input -->
            <div class="input-group">
                <label for="regPasswordInput" class="input-label">Password</label>
                <div class="password-wrapper">
                    <input 
                        type="password" 
                        id="regPasswordInput" 
                        class="form-input" 
                        placeholder="Create a strong password" 
                        autocomplete="new-password"
                        required
                    >
                    <button type="button" id="toggleRegPasswordBtn" class="toggle-password-btn">👁️</button>
                </div>
            </div>

            <!-- Confirm Password Input -->
            <div class="input-group">
                <label for="confirmPasswordInput" class="input-label">Confirm Password</label>
                <div class="password-wrapper">
                    <input 
                        type="password" 
                        id="confirmPasswordInput" 
                        class="form-input" 
                        placeholder="Re-enter your password" 
                        autocomplete="new-password"
                        required
                    >
                    <button type="button" id="toggleConfirmPasswordBtn" class="toggle-password-btn">👁️</button>
                </div>
            </div>

            <!-- Terms Checkbox -->
            <div class="terms-group">
                <input type="checkbox" id="termsCheckbox" required>
                <label for="termsCheckbox" class="checkbox-label">
                    I agree to the <a href="#" id="termsLink" class="terms-link">Terms & Conditions</a>
                </label>
            </div>

            <!-- Submit Button -->
            <button type="submit" id="registerBtn" class="submit-btn">Create Account</button>
            
            <!-- Account Login Link -->
            <div class="form-footer">
                <p>Already have an account? <a href="#" id="loginLink" class="auth-link">Log In</a></p>
            </div>

        </form>
    </div>
`;

    // Query elements specifically for Registration Form
    
    const regFullNameInput = element.querySelector("#regFullNameInput");
    const passwordInput = element.querySelector("#regPasswordInput");
    const toggleRegPasswordBtn = element.querySelector("#toggleRegPasswordBtn");
    const confirmPasswordInput = element.querySelector("#confirmPasswordInput");
    const toggleConfirmPasswordBtn = element.querySelector("#toggleConfirmPasswordBtn");
    const registerBtn = element.querySelector("#registerBtn");
    const loginLink = element.querySelector("#loginLink");
const authForm =element.querySelector(".auth-form")
authForm.addEventListener("submit",(e)=>{
    e.preventDefault();})


element.addEventListener("click",(event)=>{

if (event.target.id === "toggleRegPasswordBtn" ||event.target.id === "toggleConfirmPasswordBtn" ) {   
if(passwordInput.type==='password' && confirmPasswordInput.type==="password"){
   passwordInput.type='text'
   confirmPasswordInput.type ="text"
   toggleRegPasswordBtn.textContent="🙈"
   toggleConfirmPasswordBtn.textContent="🙈"
}else{
   passwordInput.type='password' 
   confirmPasswordInput.type ="password"
  toggleRegPasswordBtn.textContent="👁️"
   toggleConfirmPasswordBtn.textContent="👁️"
}
}




if(event.target.id==='registerBtn'){
 if( passwordInput.value !== confirmPasswordInput.value){
   alert("password doesnt match")
   return;
    }


localStorage.setItem("userFullName",regFullNameInput.value.toLowerCase().trim())
localStorage.setItem("userPassword",String(passwordInput.value))
localStorage.setItem("userIsRegistered",String(true))
localStorage.setItem("userIsLogged",String(true))
element.classList.add('hide')
window.location.reload()
  }




  })


  } 
  
  
  
  if(userIsRegsitered && !userIsLogged) {
    element.innerHTML = `
    <div class="auth-card">
        <div class="brand-header">
            <h1 class="brand-title">OtikasXpress</h1>
            <p class="brand-subtitle">Welcome back! Please enter your details.</p>
        </div>

        <form class="auth-form">
            
             <!-- Full Name Input -->
            <div class="input-group">
                <label for="loginNameInput" class="input-label"> Name</label>
                <input 
                    type="text" 
                    id="loginNameInput" 
                    class="form-input" 
                    placeholder="Enter your registered username"
                    autocomplete="username" 
                    required
                >
            </div>

            <!-- Password Input with Toggle Button -->
            <div class="input-group">
                <label for="loginPasswordInput" class="input-label">Password</label>
                <div class="password-wrapper">
                    <input 
                        type="password" 
                        id="loginPasswordInput" 
                        class="form-input" 
                        placeholder="Enter your security pass" 
                        autocomplete="current-password"
                        required
                    >
                    <button type="button" id="toggleLoginPasswordBtn" class="toggle-password-btn" >👁️</button>
                </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" id="loginBtn" class="submit-btn">Login</button>
            
            <!-- Account Creation Link -->
            <div class="form-footer">
                <p>Not registered? <a href="#" id="signupLink" class="auth-link">Create an account with us</a></p>
                <a href="#" id="loginTermsLink" class="terms-link">Terms & Conditions</a>
            </div>

        </form>
    </div>
  `;

    // Query elements specifically for Login Form
    const loginNameInput = element.querySelector("#loginNameInput");
    const loginPasswordInput = element.querySelector("#loginPasswordInput");
    const toggleLoginPasswordBtn = element.querySelector("#toggleLoginPasswordBtn");
    const loginBtn = element.querySelector("#loginBtn");
    const signupLink = element.querySelector("#signupLink");


const authForm =element.querySelector(".auth-form")
authForm.addEventListener("submit",(e)=>{
    e.preventDefault();})


element.addEventListener("click",(event)=>{

if(event.target.id==="toggleLoginPasswordBtn"){

if(loginPasswordInput.type==='password'){
loginPasswordInput.type='text'
event.target.textContent="🙈"
}else{
loginPasswordInput.type='password'
event.target.textContent="👁️"
}}

if(event.target.id==='loginBtn'){
    console.log(userName)
    console.log(userPassword)
   

const checkingUserName= loginNameInput.value.toLowerCase().trim()===userName 
const checkingPassword=Number(loginPasswordInput.value)===userPassword;

if(checkingUserName && checkingPassword){
localStorage.setItem("userIsLogged",String(true))
window.location.reload()
}else{
alert('wrong credentials')
}
}





})





}





}
export { authenticaionPage };