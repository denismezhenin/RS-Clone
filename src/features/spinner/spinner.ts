import { Spinner } from 'spin.js';
import { tsQuerySelector } from '../../helpers/helpers';

export const getSpinner = () => {
  let options = {
    lines: 11, 
    length: 6, 
    width: 17, 
    radius: 34, 
    scale: 0.5, 
    corners: 1, 
    speed: 1.8, 
    rotate: 0, 
    animation: 'spinner-line-shrink', 
    direction: 1, 
    color: '#b19bf3', 
    fadeColor: 'transparent', 
    top: '50%', 
    left: '50%',
    shadow: '0 0 1px transparent', 
    zIndex: 2000, 
    className: 'spinner', 
    position: 'absolute', 
  };
  let target = document.body;
  new Spinner(options).spin(target);
};

export const removeSpinner = () => {
  const spinner = tsQuerySelector(document, '.spinner');
  if (spinner) {
    spinner.remove();
  }
};
