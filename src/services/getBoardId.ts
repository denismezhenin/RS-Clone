const getBoardId = () => {
  const hashReversed = window.location.hash.split('/').reverse().join('/');
  const boardId = hashReversed.slice(0, hashReversed.indexOf('/'));
  return boardId;
};

export default getBoardId;
