import { useState, useCallback, useEffect } from 'react';
import { bool, func } from 'prop-types';
import styled from 'styled-components';
import Switch from "react-switch";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { Scrollbars } from 'react-custom-scrollbars';
import {
    getLedgerWallet,
    getPhantomWallet,
    getSolflareWallet,
    getSolflareWebWallet,
    getSolletExtensionWallet,
    getSolletWallet,
    getMathWallet,
} from '@solana/wallet-adapter-wallets';

import { SolflareIcon, SolletIcon } from 'components';
import { Text } from 'components/Text';
import { WALLETS } from 'config/constants/constant'

import useTheme from 'hooks/useTheme'

interface MenuProps {
  readonly open: boolean;
  readonly full: boolean;
};
interface ConnectProps {
  readonly isAccept: boolean;
};

interface CloseProps {
  readonly show: boolean;
};

const StyledMenu = styled.nav<MenuProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ full }) => full ? 'flex-start' : 'center'};
  background: ${({ theme }) => theme.colors.menuBackground};
  transform: ${({ open }) => open ? 'translateY(0)' : 'translateY(100%)'};
  width: 100vw;
  text-align: left;
  position: fixed;
  bottom: 0;
  left: 0;
  top: ${({ full }) => full ? 0 : 'unset'};
  transition: transform 0.3s ease-in-out;
  z-index: 999;

  .scrollbar {
    width: 100%;
    height: 60vh !important;
    &.full {
      height: 85vh !important;
    }
  }
  ${({ theme }) => theme.mediaQueries.md} {
		transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    width: inherit;
    max-width: 405px;
    height: 100vh;
    top: 0;
    right: 0;
    left: auto;
    flex-direction: row;
    .scrollbar {
      width: 405px !important;
      height: 85vh !important;
    }
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    max-width: 450px;
    .scrollbar {
      width: 450px !important;
    }
  }
`;
const FlexWrapper = styled.div`
  display: flex;
  padding: 27px 19px 0;
  ${({ theme }) => theme.mediaQueries.md} {
		padding: 27px 32px 0;
  }
`
const DropMenu = styled.div`
  width: 30px;
  height: 0;
  border: 2px solid rgba(154, 154, 154, 0.4); 
  border-radius: 5px;
  position: absolute;
  top: -10px;
  left: calc(50% - 15px);
  ${({ theme }) => theme.mediaQueries.md} {
		display: none;
  }
`
const Container = styled.div`
  padding: 0;
  .connect-wallet {
    font-size: 16px;
    font-weight: bold;
    font-family: 'DM Sans', sans-serif;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 18px;
    }
  }
  .agree-service {
    font-size: 14px;
    font-weight: 500;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 18px;
    }
  }
`
const ExternalLink = styled.a`
  color: #0177FB;
  outline: none;
`
const ConnectList = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`
const ConnectItem = styled.div<ConnectProps>`
  background: ${({ theme, isAccept }) => isAccept? theme.colors.connectItem: 'rgb(50,50,50,0.9)'};
  border-radius: 8px;
  width: 128px;
  height: 128px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 5px;
  position: relative;
  text-align: center;
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 138px;
    height: 138px; 
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 160px;
    height: 160px; 
  }
  .connect-type {
    font-size: 14px;
    font-weight: 700;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 16px;
    }
  }
`
const Img = styled.img`
  width: 40px;
  height: 40px;
  // border-radius:50%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 50px;
    height: 50px; 
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 60px;
    height: 60px; 
  }
`
const Wrapper = styled.div`
  padding: 27px;
`
const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 28px 19px;
  border-radius: 20px 20px 0 0;
  background: ${({theme}) => theme.colors.footerMain};
  ${({ theme }) => theme.mediaQueries.md} {
    border-radius: 0;
    justify-content: space-between;
    padding: 38px 32px;
  }
`
const Close = styled.div<CloseProps>`
  cursor: pointer;
  display: ${({ show }) => show ? 'block' : 'none'};
  position: absolute;
  left: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
    position: unset;
  }
`

const BlurBackground = styled.div`
  position: absolute;
  width: 100vw;
  backdrop-filter: blur(10px);
  height: 100vh;
  left: 0;
  top: 0;
  background: ${({ theme }) => theme.colors.blurBackground};
  z-index: 100;
  ${({ theme }) => theme.mediaQueries.xxl} {
    display: none;
  }
`
let ts
const Menu = ({ open, setOpen, ...props }) => {
  const { select } = useWallet();
  const network = WalletAdapterNetwork.Devnet;

  const isHidden = open ? true : false;
  const { isDark } = useTheme()
  const [isAccept, setAccept] = useState(false)
  const [isFullNavigation, setFullNavigation] = useState(false)

  useEffect(() => {
    if (open) {
      setFullNavigation(false)
    }
  }, [open])

  const onClose = useCallback(() => {
    setFullNavigation(false)
    setOpen(false, 0)
  }, [setOpen])

  const onConnectWallet = (type: any) => {
    if (!isAccept) {
      return;
    }

    let wallet = null
    switch (type) {
      case WALLETS.LEDGER:
        getLedgerWallet();
        break
      case WALLETS.SOLFLARE:
        wallet = getSolflareWebWallet({ network })
        break
      case WALLETS.SOLFLARE_EXTENSION:
        wallet = getSolflareWallet()
        break
      case WALLETS.SOLLET:
        wallet = getSolletWallet()
        break
      case WALLETS.SOLLET_EXTENSION:
        wallet = getSolletExtensionWallet({ network })
        break
      case WALLETS.PHANTOM:
        wallet = getPhantomWallet()
        break
      case WALLETS.MATHWALLLET:
        wallet = getMathWallet();
        break
      default:
        break
    }

    if (wallet) {
      select(wallet.name)
    }
  }

  const onTouchStart = (e) => {
    ts = e.touches[0].clientY;
  }

  const onTouchEnd = (e) => {
    var te = e.changedTouches[0].clientY;
    if (ts > te + 5) {
      setFullNavigation(true)
    } else if (ts < te - 5) {
      if (isFullNavigation)
        setFullNavigation(false)
      else onClose()
    }
  }

  return (
    <>
      <StyledMenu open={open} full={isFullNavigation} aria-hidden={!isHidden} {...props}>
        <Container onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <DropMenu />
          <StyledDiv>
            <Text color={isDark ? "#FFFFFF" : "#1B0D3F"} textTransform='uppercase' fontFamily="'DM Sans', sans-serif" className="connect-wallet">Connect Wallet</Text>
            <Close show={isFullNavigation} onClick={() => setOpen(false)}>
              <Text color={isDark ? "#FFFFFF" : "#1B0D3F"} fontFamily="'DM Sans', sans-serif" className="connect-wallet">&#10006;</Text>
            </Close>
          </StyledDiv>
          <Scrollbars autoHeightMax={200} className={`scrollbar ${isFullNavigation ? 'full' : null}`}>
            <FlexWrapper>
              <Text
                color={isDark ? "rgb(255, 255, 255, 0.5)" : "rgba(29, 29, 29, 0.84)"}
                fontFamily="'DM Sans', sans-serif"
                className="agree-service">
                I have read, understand, and agree to the <ExternalLink href="/terms" target="_blank" rel="noreferrer noopener">Terms of Service</ExternalLink>
              </Text>
              <Switch
                onColor="#76EE59"
                offColor="#DFDFDF"
                width={50}
                checkedIcon={false}
                uncheckedIcon={false}
                checked={isAccept}
                onChange={(value) => setAccept(value)}
              />
            </FlexWrapper>
            <Wrapper>
              <ConnectList>
                <ConnectItem isAccept={isAccept} onClick={() => onConnectWallet(WALLETS.LEDGER)} data-amp-analytics-name="click" data-amp-analytics-attrs="page: Menu, target: ConnectLedger">
                  <Img src={isDark ? '/images/dark-ledger.png' : '/images/light-ledger.png'}  alt="Ledger Connect"/>
                  <Text 
                    color="#88809C"
                    fontFamily="'DM Sans', sans-serif" className="connect-type"
                  >
                    {WALLETS.LEDGER}
                  </Text>
                </ConnectItem>
                <ConnectItem onClick={() => onConnectWallet(WALLETS.SOLFLARE)} isAccept={isAccept} data-amp-analytics-name="click" data-amp-analytics-attrs="page: Menu, target: ConnectSolflare">
                  <SolflareIcon />
                  <Text 
                    color="#88809C"
                    fontFamily="'DM Sans', sans-serif" className="connect-type"
                  >
                    {WALLETS.SOLFLARE}
                  </Text>
                </ConnectItem>
                <ConnectItem onClick={() => onConnectWallet(WALLETS.SOLFLARE_EXTENSION)} isAccept={isAccept} data-amp-analytics-name="click" data-amp-analytics-attrs="page: Menu, target: ConnectSolflareExtention">
                  <SolflareIcon />
                  <Text 
                    color="#88809C"
                    fontFamily="'DM Sans', sans-serif" className="connect-type"
                  >
                    {WALLETS.SOLFLARE_EXTENSION}
                  </Text>
                </ConnectItem>
                <ConnectItem onClick={() => onConnectWallet(WALLETS.SOLLET)} isAccept={isAccept} data-amp-analytics-name="click" data-amp-analytics-attrs="page: Menu, target: ConnectSollet">
                  <SolletIcon />
                  <Text 
                    color="#88809C"
                    fontFamily="'DM Sans', sans-serif" className="connect-type"
                  >
                    {WALLETS.SOLLET}
                  </Text>
                </ConnectItem>
                <ConnectItem onClick={() => onConnectWallet(WALLETS.SOLLET_EXTENSION)} isAccept={isAccept} data-amp-analytics-name="click" data-amp-analytics-attrs="page: Menu, target: ConnectSolletExtention">
                  <SolletIcon />
                  <Text 
                    color="#88809C"
                    fontFamily="'DM Sans', sans-serif" className="connect-type"
                  >
                    {WALLETS.SOLLET_EXTENSION}
                  </Text>
                </ConnectItem>
                <ConnectItem onClick={() => onConnectWallet(WALLETS.PHANTOM)} isAccept={isAccept} data-amp-analytics-name="click" data-amp-analytics-attrs="page: Menu, target: ConnectPhantom">
                  <img alt="Phantom" width="20" height="20" src="https://www.phantom.app/img/logo.png" style={{ width: 60 }}/>
                  <Text 
                    color="#88809C"
                    fontFamily="'DM Sans', sans-serif" className="connect-type"
                  >
                    {WALLETS.PHANTOM}
                  </Text>
                </ConnectItem>
                <ConnectItem isAccept={isAccept} onClick={() => onConnectWallet(WALLETS.MATHWALLLET)} data-amp-analytics-name="click" data-amp-analytics-attrs="page: Menu, target: ConnectMathWallet">
                  <img alt="MathWallet" width="20" height="20" src="https://cdn.jsdelivr.net/gh/solana-labs/oyster@main/assets/wallets/mathwallet.svg" style={{ width: 60 }} />
                  <Text 
                    color="#88809C"
                    fontFamily="'DM Sans', sans-serif" className="connect-type"
                  >
                    {WALLETS.MATHWALLLET}
                  </Text>
                </ConnectItem>
                <ConnectItem isAccept={isAccept} data-amp-analytics-name="click" data-amp-analytics-attrs="page: Menu, target: ConnectLedger">
                  <Text 
                    color="#88809C"
                    fontFamily="'DM Sans', sans-serif" className="connect-type"
                  >More <br/> Coming Soon</Text>
                </ConnectItem>
              </ConnectList>
            </Wrapper>
          </Scrollbars>
        </Container>
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
