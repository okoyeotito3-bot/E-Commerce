

export function labelListener(element){
element.addEventListener("click", () => {
document.querySelector("input").classList.add('show');
element.style.display="none"
});
}
