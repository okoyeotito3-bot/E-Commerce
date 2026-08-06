

export function labelListener(element){
element.addEventListener("click", () => {
document.querySelector("input").classList.add('show');
element.style.display="none"
});
}

export function popUp(message, accept, reject) {
  const popUpDiv = document.createElement("div");
  popUpDiv.className = 'popUpDiv';

  const popUpMessage = document.createElement("p");
  popUpMessage.textContent = message;
  popUpMessage.className = 'popUpMessage';

  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = 'buttonWrapper';

  const acceptBtn = document.createElement("button");
  acceptBtn.textContent = accept;
  acceptBtn.className = 'acceptBtn';

  const rejectBtn = document.createElement("button");
  rejectBtn.textContent = reject;
  rejectBtn.className = 'rejectBtn';

  buttonWrapper.appendChild(acceptBtn);
  buttonWrapper.appendChild(rejectBtn);

  popUpDiv.appendChild(popUpMessage);
  popUpDiv.appendChild(buttonWrapper);

  document.body.appendChild(popUpDiv);

  return { popUpDiv, acceptBtn, rejectBtn };
}