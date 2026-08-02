export function sectionBarToggler(element) {
element.classList.toggle("show");
}

export function userMenuToggle(element) {
 element.classList.toggle("showuserMenu");
}

export function themeToggleFunction(){
const isTheme = document.body.classList.toggle('dark-mode');
localStorage.setItem('userTheme',isTheme ? 'dark':'light' ) 
}





 