import React, { useState } from 'react';
import { bool, func } from 'prop-types';
import styled from 'styled-components';

import Logo from 'components/Logo';
import { StyledLink } from 'components/LinkList';

import { SunIcon, MoonIcon } from "components";
import { Text } from 'components/Text';

import useTheme from 'hooks/useTheme'
import { HOMEPAGE_LINK, BLOG_LINK, TWITTER_LINK, GITHUB_LINK, DISCORD_LINK, CAREERS_LINK, PRIVACY_LINK, APP_LINK, TELEGRAM_LINK } from 'config/constants/constant'

interface MenuProps {
  readonly open: boolean;
};
interface ExpandProps {
  my: string;
}

const StyledMenu = styled.nav<MenuProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.menuBackground};
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
  height: 100vh;
  text-align: left;
  position: fixed;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 999;
  width: 275px;
  .one-line {
    display: flex;
    align-items: center;
    padding: 22px;
    width: calc(100% - 44px);
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 320px;
  }
`;
const BlurBackground = styled.div`
  position: absolute;
  width: 100vw;
  filter: blur(100px);
  height: 100vh;
  left: 0;
  top: 0;
  background: ${({ theme }) => theme.colors.panelBackground};
  z-index: 10;
`
const MenuHeader = styled.div`
  justify-content: space-between;
`
const Close = styled.div`
  cursor: pointer;
`
const StyledDiv = styled.div`
`
const ExpandMenu = styled.div<ExpandProps>`
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.expandMenu};
  margin: ${({ my }) => `${my} 0px`};
  cursor: pointer;
  .expand-title {
    font-size: 14px;
    text-transform: uppercase;
    padding: 0;
    ${({ theme }) => theme.mediaQueries.md} {
      font-weight: 500;
    }
  }
`
const SubMenu = styled.div`
  padding: 22px;
  width: calc(100% - 44px);
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.subMenu};
  .sub-menu {
    font-size: 14px;
    padding: 9px 0;
    font-size: 14px;
    ${({ theme }) => theme.mediaQueries.md} {
      font-weight: 400;
    }
  }
`

const Menu = ({ open, setOpen, ...props }) => {
  
  const isHidden = open ? true : false;
  const { isDark, toggleTheme } = useTheme()
  const [community, setCommunity] = useState(false)
  const [about, setAbout] = useState(false)
  const textColor = isDark ? '#FFF' : '#000' 

  return (
    <>
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <MenuHeader className='one-line'>
        <Logo href={HOMEPAGE_LINK} isDark={isDark}/>
        <Close onClick={() => setOpen(false)}>&#10006;</Close>
      </MenuHeader>
      <ExpandMenu className='one-line' my="0px">
        <StyledLink color={textColor} href={APP_LINK} target="_blank" rel="noreferrer noopener" className="expand-title">Launch App</StyledLink>
        <Text>&#8594;</Text>
      </ExpandMenu>
      <ExpandMenu className='one-line' my="2px" onClick={() => setCommunity(!community)}>
        <Text textTransform='uppercase' className="expand-title">Community</Text>
        <Text>{community ? '+' : '-'}</Text>
      </ExpandMenu>
      {community && <SubMenu>
        <StyledLink color={textColor} href={GITHUB_LINK} target="_blank" rel="noreferrer noopener" className="sub-menu">Github</StyledLink>
        <StyledLink color={textColor} href={TWITTER_LINK} target="_blank" rel="noreferrer noopener" className="sub-menu">Twitter</StyledLink>
        <StyledLink color={textColor} href={DISCORD_LINK} target="_blank" rel="noreferrer noopener" className="sub-menu">Discord</StyledLink>
        <StyledLink color={textColor} href={TELEGRAM_LINK} target="_blank" rel="noreferrer noopener" className="sub-menu">Telegram</StyledLink>
      </SubMenu>}
      <ExpandMenu className='one-line' my={community ? "2px" : '0px 2px'} onClick={() => setAbout(!about)}>
        <Text textTransform='uppercase' className="expand-title">About</Text>
        <Text>{about ? '+' : '-'}</Text>
      </ExpandMenu>
      {about && <SubMenu>
        <StyledLink color={textColor} href={BLOG_LINK} target="_blank" rel="noreferrer noopener" className="sub-menu">Blog</StyledLink>
        <StyledLink color={textColor} href={CAREERS_LINK} className="sub-menu">Careers</StyledLink>
        <StyledLink color={textColor} href={PRIVACY_LINK} className="sub-menu">Privacy Policy</StyledLink>
      </SubMenu>}
      <StyledDiv onClick={() => toggleTheme()} className='one-line'>
        {isDark ? <SunIcon /> : <MoonIcon />}
        <Text ml="12px">{isDark ? "Light Mode" : "Dark Mode"}</Text>
      </StyledDiv>
    </StyledMenu>
    {open && <BlurBackground onClick={() => setOpen(false)}/>}
    </>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
}

export default Menu;
