const getBoardId = () => {
  const hashReversed = window.location.hash.split('/').reverse().join('/');
  let boardId = hashReversed.slice(0, hashReversed.indexOf('/'));
  if (boardId.includes('#')) {
    boardId = boardId.slice(0, boardId.indexOf('#'));
  }

  return boardId;
};

export default getBoardId;
