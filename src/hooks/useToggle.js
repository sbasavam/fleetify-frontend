import { useState } from 'react';

export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  
  const toggle = () => setState(!state);
  const setOn = () => setState(true);
  const setOff = () => setState(false);
  
  return [state, toggle, setOn, setOff];
};