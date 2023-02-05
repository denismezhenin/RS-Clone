const togglePopup = () => {
  const shadow = document.querySelector('.shadow');
  if (shadow) {
    shadow.classList.toggle('shadow-active');
  }

  const popup = document.querySelector('.popup');
  if (popup) {
    popup.classList.toggle('popup-active');
  }
};

export default togglePopup;
