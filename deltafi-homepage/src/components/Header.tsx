import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import LaunchApp from './LaunchApp'
import LinkList from './LinkList'
import DarkMode from './DarkMode'

import useTheme from 'hooks/useTheme'
import { HOMEPAGE_LINK } from 'config/constants/constant'

import { Menu } from 'components'
import Container from './layout/Container'

interface ContainerProps {
  theme: any,
  isShrunk: boolean,
}

const HeaderWrapper = styled.div<ContainerProps>`
  z-index: 100;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: ${({ theme, isShrunk }) => isShrunk ? theme.colors.background : 'none'};
`
const FlexWrapper = styled.div`
	flex: 1;
  display: flex;
  align-items: center;
	justify-content: space-between;
	margin: 9px 0;
  font-family: 'Inter', sans-serif;
  padding: 0 24px;

  ${({ theme }) => theme.mediaQueries.md} {
		margin: 24px 0;
    padding: 0;
  }
`
const StyledDiv = styled.div`
	display: flex;
	align-items: center;
`
const DesktopDiv = styled.div`
  display: none;
  ${({ theme }) => theme.mediaQueries.md} {
		display: flex;
  }
`
const MobileDiv = styled.div`
  display: flex;
  ${({ theme }) => theme.mediaQueries.md} {
		display: none;
  }
`

const Header: React.FC = () => {
	const { isDark, toggleTheme } = useTheme()
  const [isShrunk, setShrunk] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShrunk((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 98 ||
            document.documentElement.scrollTop > 98)
        ) {
          return true
        }

        if (
          isShrunk &&
          document.body.scrollTop < 4 &&
          document.documentElement.scrollTop < 4
        ) {
          return false
        }

        return isShrunk
      })
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
		<HeaderWrapper isShrunk={isShrunk}>
      <Container>
        <FlexWrapper>
          <Logo href={HOMEPAGE_LINK} isDark={isDark}/>
          <StyledDiv>
            <LinkList isDark={isDark}/>
            <DarkMode toggleTheme={toggleTheme} isDark={isDark}/>
            <DesktopDiv>
              <LaunchApp primary="primary"/>
            </DesktopDiv > 
            <MobileDiv>
              <Menu isDark={isDark}/>
            </MobileDiv>
          </StyledDiv>
        </FlexWrapper>
      </Container>
		</HeaderWrapper>
  )
}

export default Header
