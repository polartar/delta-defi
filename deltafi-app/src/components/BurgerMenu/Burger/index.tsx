import React from 'react';
import { bool, func } from 'prop-types';
import styled from 'styled-components';

import { MenuIcon } from 'components'

export const StyledBurger = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  .menu-icon {
    width: 35px;
    ${({ theme }) => theme.mediaQueries.md} {
      width: 48px;
    }
  }
`;


const Burger = ({ isDark, open, setOpen, ...props }) => {
  
  const isExpanded = open ? true : false;
  
  return (
    <StyledBurger aria-label="Toggle menu" aria-expanded={isExpanded} onClick={() => setOpen(!open)} {...props}>
      <MenuIcon isDark={isDark} className="menu-icon"/>
    </StyledBurger>
  )
}

Burger.propTypes = {
  isDark: bool.isRequired,
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default Burger;
