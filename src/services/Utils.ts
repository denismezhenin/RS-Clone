interface Irequest {
  resource: null | string;
  id: null | string;
  verb: null | string;
}
const Utils = {
  parseRequestURL: () => {
    const url = window.location.hash.slice(1).toLowerCase() || '/';
    const r = url.split('/');
    const request: Irequest = {
      resource: null,
      id: null,
      verb: null,
    };
    [request.resource, request.id, request.verb] = [r[1], r[2], r[3]];

    return request;
  },
};

export default Utils;
