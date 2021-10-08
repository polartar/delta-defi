import React, { useState, useRef } from 'react';
import FocusLock from 'react-focus-lock';

import Burger from "./Burger";
import Menu from "./Menu";

import { useOnClickOutside } from 'hooks';

const BurgerMenu = ({isDark}) => {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";

  useOnClickOutside(node, () => setOpen(false));

  return (
    <div ref={node}>
      <FocusLock disabled={!open}>
        <Burger isDark={isDark} open={open} setOpen={setOpen} aria-controls={menuId} />
        <Menu open={open} setOpen={setOpen} id={menuId} />
      </FocusLock>
    </div>
  )
}

export default BurgerMenu