import { useCallback, useState, useEffect } from 'react'
import { bool, func } from 'prop-types';
import styled from 'styled-components';
import { useWallet } from '@solana/wallet-adapter-react';

import { Text } from 'components/Text';
import { ChangeNetworkIcon, MigrateTokensIcon, CopyAddressIcon, DisconnectWalletIcon } from 'components';

import useTheme from 'hooks/useTheme'
import { useToast } from 'store/hooks'
import ConnectedWallet from 'components/ConnectedWallet';

interface MenuProps {
  readonly open: boolean;
  readonly full: boolean;
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
  border-radius: 20px 20px 0 0;
  z-index: 999;
  ${({ theme }) => theme.mediaQueries.md} {
		transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    border-radius: 0;
    width: inherit;
    max-width: 405px;
    height: 100vh;
    top: 0;
    right: 0;
    left: auto;
    flex-direction: row;
  }
`;
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
  .menu-label {
    font-size: 18px;
    font-weight: 700;
    padding-top: 27px;
    text-align: center;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 18px;
    }
  }
  .connect-btn {
    width: 220px;
    height: 35px;
    ${({ theme }) => theme.mediaQueries.md} {
      width: 171px;
      height: 50px;
    }
    ${({ theme }) => theme.mediaQueries.xxl} {
      width: 207px;
    }
  }
`
const ConnectList = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`
const ConnectItem = styled.div`
  background: ${({ theme }) => theme.colors.connectItem};
  border-radius: 8px;
  width: 112px;
  height: 112px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px;
  position: relative;
  text-align: center;
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 138px;
    height: 138px; 
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 162px;
    height: 162px; 
  }
  .connect-type {
    font-size: 14px;
    font-weight: 400;
    padding: 5px 10px;
    ${({ theme }) => theme.mediaQueries.md} {
      padding: 10px;
      font-size: 16px;
    }
  }
  .icon {
    width: 30px;
    padding: 5px;
    ${({ theme }) => theme.mediaQueries.md} {
      padding: 10px;
      width: 30px;
    }
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
  background: ${({ theme }) => theme.colors.footerMain};
  ${({ theme }) => theme.mediaQueries.md} {
    border-radius: 0;
    justify-content: space-between;
    padding: 25px 32px;
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
const Setting = ({ open, setOpen, ...props }) => {
  const { toastSuccess } = useToast()
  const { disconnect, publicKey } = useWallet();
  const isHidden = open ? true : false;
  const { isDark } = useTheme()
  const [isFullNavigation, setFullNavigation] = useState(false)

  useEffect(() => {
    if (open) {
      setFullNavigation(false)
    }
  }, [open])

  const onCopyAddress = () => {
    navigator.clipboard.writeText(publicKey.toString())
    toastSuccess('Address', 'Copied')
  }

  const onClose = useCallback(() => {
    setFullNavigation(false)
    setOpen(false, 0)
  }, [setOpen])

  const onDisconnectWallet = useCallback(() => {
    disconnect()
    onClose()
  }, [disconnect, onClose])

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
            <ConnectedWallet />
            <Close show={isFullNavigation} onClick={() => setOpen(false)}>
              <Text color={isDark ? "#FFFFFF" : "#1B0D3F"} fontFamily="'DM Sans', sans-serif" className="connect-wallet">&#10006;</Text>
            </Close>
          </StyledDiv>
          <Text
            color={isDark ? "#EFCBD7" : "#1B0D3F"}
            fontFamily="'DM Sans', sans-serif"
            className="menu-label">
            WALLET SETTINGS
          </Text>
          <Wrapper>
            <ConnectList>
              <ConnectItem onClick={onCopyAddress} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: WalletSetting, target: CopyAddress">
                <CopyAddressIcon isDark={isDark} className="icon" />
                <Text color={isDark ? "#FFF" : "#23242F"} fontFamily="'DM Sans', sans-serif" className="connect-type">Copy Address</Text>
              </ConnectItem>
              <ConnectItem onClick={onDisconnectWallet} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: WalletSetting, target: DisconnectWallet">
                <DisconnectWalletIcon isDark={isDark} className="icon" />
                <Text color={isDark ? "#FFF" : "#23242F"} fontFamily="'DM Sans', sans-serif" className="connect-type">Disconnet Wallet</Text>
              </ConnectItem>
            </ConnectList>
          </Wrapper>
        </Container>
      </StyledMenu>
      {open && <BlurBackground onClick={() => setOpen(false)} />}
    </>
  )
}

Setting.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
}

export default Setting;
