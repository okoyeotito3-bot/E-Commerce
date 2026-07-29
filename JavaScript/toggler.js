function sectionBarToggler(element) {
  if (element) element.classList.toggle("show");
}

function userMenuToggle(element) {
 element.classList.toggle("showuserMenu");
}

function themeToggleFunction(){
const isTheme = document.body.classList.toggle('dark-mode');
localStorage.setItem('userTheme',isTheme ? 'dark':'light' ) 
}

export {
 sectionBarToggler,userMenuToggle,themeToggleFunction
}