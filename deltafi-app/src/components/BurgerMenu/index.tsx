import React from 'react';
import FocusLock from 'react-focus-lock';

import Burger from "./Burger";
import Menu from "./Setting";

import { useModal, useFetchModal } from 'store/hooks';

const BurgerMenu = ({isDark}) => {
  const { menuOpen } = useModal()
  const { setMenuOpen } = useFetchModal()

  return (
    <div>
      <FocusLock disabled={!menuOpen}>
        <Burger isDark={isDark} open={menuOpen} setOpen={setMenuOpen}/>
        <Menu open={menuOpen} setOpen={setMenuOpen}/>
      </FocusLock>
    </div>
  )
}

export default BurgerMenu