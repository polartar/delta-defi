import React, { useCallback, useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import styled from 'styled-components'
import { useWallet } from '@solana/wallet-adapter-react';

import Logo from './Logo'
import ConnectWallet from './ConnectWallet'
import WalletSetting from './BurgerMenu/WalletSetting'

import useTheme from 'hooks/useTheme'
import { useFetchModal, useModal } from 'store/hooks';
import { HOMEPAGE_LINK } from 'config/constants/constant'

import { Menu, ConnectedWallet } from 'components'
import { TabProps } from 'components/types'

interface ContainerProps {
  theme: any,
  isShrunk: boolean,
}

const MobileWrapper = styled.div`
	flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
	margin: 16px 0;
	padding-left: 31px;
  padding-right: 31px;
  font-family: 'Inter', sans-serif;

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`
const TabletWrapper = styled.div`
  flex: 1;
  display: none;
  align-items: center;
  justify-content: space-between;
	margin: 24px 0;
  padding-left: 76px;
  padding-right: 76px;
  font-family: 'Inter', sans-serif;

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    display: none;
  }
`
const DesktopWrapper = styled.div`
  flex: 1;
  display: none;
  align-items: center;
  justify-content: space-between;
	margin: 24px 0;
  padding-left: 200px;
  padding-right: 200px;
  font-family: 'Inter', sans-serif;

  ${({ theme }) => theme.mediaQueries.xxl} {
    display: flex;
  }
`
const Container = styled.div<ContainerProps>`
	display: flex;
	align-items: center;
	justify-content: center;
  background-color: ${({ theme, isShrunk }) => isShrunk ? theme.colors.background : 'none'};
  z-index: 100;
  position: fixed;
  width: 100%;
  top: 0;
`
const StyledDiv = styled.div`
	display: flex;
	align-items: center;
`
const Tab = styled.div<TabProps>`
  background-color: ${({ active, theme }) => active ? theme.colors.activeTab : 'inherit'};
  border-radius: ${({ active }) => active ? '6px' : 'inherit'};
  color: ${({ active, theme }) => active ? theme.colors.activeTabText : 'inherit'};
  padding: 16px 28px;
  cursor: pointer;
`
const TabDiv = styled.div`
  display: none;
  align-items: center;
  border-radius: 6px;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  margin: 0 7px;
  background-color: ${({ theme }) => theme.colors.tabBackground};
  color: ${({ theme }) => theme.colors.tabColor};
  border-color: ${({ theme }) => theme.colors.tabBackground};
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
  }
`

const Header: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { settingOpen, depositOpen, stakeOpen } = useModal()
  const { setSettingOpen, setDepositOpen, setStakeOpen, setHeaderOpen } = useFetchModal()
  const { connected: isConnectedWallet } = useWallet()
  console.log('connected', isConnectedWallet)

  const [isActive, setActive] = useState(location.pathname.substring(1))
  const [isShrunk, setShrunk] = useState(false)
  const { isDark } = useTheme()

  useEffect(() => {
    if (isConnectedWallet)
      setHeaderOpen(false)
  }, [isConnectedWallet, setHeaderOpen])

  const handleActive = useCallback((path) => {
    if (depositOpen)
      setDepositOpen(false, 0)

    if (stakeOpen)
      setStakeOpen(false, 0)

    history.push(path)
    setActive(path)
  }, [setActive, history, depositOpen, setDepositOpen, stakeOpen, setStakeOpen])

  useEffect(() => {
    setActive(location.pathname.substring(1))
  }, [location])

  useEffect(() => {
    const onScroll = () => {
      setShrunk((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 50 ||
            document.documentElement.scrollTop > 50)
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
    <Container isShrunk={isShrunk}>
      <MobileWrapper>
        <Logo href={HOMEPAGE_LINK} isDark={isDark} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Header, target: Logo" />
        <StyledDiv>
          <ConnectWallet primary="secondary" />
          <Menu isDark={isDark} />
        </StyledDiv>
      </MobileWrapper>
      <TabletWrapper>
        <Logo href={HOMEPAGE_LINK} isDark={isDark} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Header, target: Logo" />
        <StyledDiv>
          <TabDiv>
            <Tab active={isActive === 'swap' ? true : false} onClick={() => handleActive('swap')} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Header, target: Swap">Swap</Tab>
            <Tab active={isActive === 'pools' ? true : false} onClick={() => handleActive('pools')} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Header, target: Pools">Pools</Tab>
            <Tab active={isActive === 'farms' ? true : false} onClick={() => handleActive('farms')} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Header, target: Farms">Farms</Tab>
          </TabDiv>
          <ConnectWallet primary="secondary" />
          <Menu isDark={isDark} />
        </StyledDiv>
      </TabletWrapper>
      <DesktopWrapper>
        <Logo href={HOMEPAGE_LINK} isDark={isDark} />
        <StyledDiv>
          <TabDiv>
            <Tab active={isActive === 'swap' ? true : false} onClick={() => handleActive('swap')} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Header, target: Swap">Swap</Tab>
            <Tab active={isActive === 'pools' ? true : false} onClick={() => handleActive('pools')} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Header, target: Pools">Pools</Tab>
            <Tab active={isActive === 'farms' ? true : false} onClick={() => handleActive('farms')} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Header, target: Farms">Farms</Tab>
          </TabDiv>
          <Menu isDark={isDark} />
        </StyledDiv>
        {!isConnectedWallet ? <ConnectWallet primary="secondary" /> : <ConnectedWallet />}
      </DesktopWrapper>
      {isConnectedWallet && <WalletSetting open={settingOpen} setOpen={setSettingOpen} />}
    </Container>
  )
}

export default Header
