const drawLoggedInUser = (id: string, name: string) => {
  const signBlock = document.querySelector('.sign');
  signBlock?.classList.add('hidden');
  const userBlock = document.querySelector('.hidden');
  userBlock?.classList.remove('hidden');
  userBlock?.classList.add('user');

  const userName = document.querySelector('.user-name');
  const icon = document.querySelector('.user-img');
  if (userName instanceof HTMLHeadingElement && icon instanceof HTMLDivElement) {
    userName.textContent = name;
    icon.textContent = name[0].toUpperCase();
  }
};

export default drawLoggedInUser;
