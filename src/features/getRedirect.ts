const getRedirect = (response: string) => {
  if (response === 'Invalid token') {
    window.location.href = '#/signin';
  }
};
export default getRedirect;
