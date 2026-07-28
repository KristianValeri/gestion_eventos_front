import "./Button.css"

export const Button = ({ text, fnc, className }) => {
  const button = document.createElement('button');
  button.textContent = text;
  button.classList.add('main-button');
  if (className) {
    button.classList.add(...className.split(' '));
  }
  button.addEventListener('click', fnc);
  return button;
}