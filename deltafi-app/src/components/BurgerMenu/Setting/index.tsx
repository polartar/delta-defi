import { useState, useEffect } from 'react'
import { bool, func } from 'prop-types';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import { Button } from 'components';

import { Text } from 'components/Text';
import { AboutIcon, DocumentsIcon, CodeIcon, DiscordIcon, AnalyticsIcon, LanguageIcon, MoonIcon, SunIcon } from 'components';

import useTheme from 'hooks/useTheme'
import { useAccount, useModal, useFetchModal } from 'store/hooks';
import ConnectedWallet from 'components/ConnectedWallet';
import { DISCORD_LINK, GITHUB_LINK } from 'config/constants/constant';

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
  .scrollbar {
    width: 100%;
    height: 60vh !important;
    &.full {
      height: 85vh !important;
    }
  }
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
    text-align: center;
    padding-top: 27px;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 18px;
    }
  }
  .connect-btn {
    width: auto;
    height: 50px;
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
  width: 87px;
  height: 87px;
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
  background: ${({theme}) => theme.colors.footerMain};
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
const ButtonIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`

let ts
const Setting = ({ open, setOpen, ...props }) => {
  const { isConnectedWallet } = useAccount()
  const { headerOpen } = useModal()
  const { setHeaderOpen } = useFetchModal()
  const isHidden = open ? true : false;
  const { isDark, toggleTheme } = useTheme()
  const [isFullNavigation, setFullNavigation] = useState(false)

  useEffect(() => {
    if (open) {
      setFullNavigation(false)
    }
  }, [open])

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

  const onClose = () => {
    setFullNavigation(false)
    setOpen(false, 0)
  }

  return (
    <>
    <StyledMenu open={open} full={isFullNavigation} aria-hidden={!isHidden} {...props}>
      <Container onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <DropMenu />
        <StyledDiv>
          {isConnectedWallet ? <ConnectedWallet />
            :
            <Button variant='secondary' className="connect-btn" borderRadius="5px" onClick={() => setHeaderOpen(!headerOpen)} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Setting, target: ConnectWallet">
              <ButtonIcon src={'/images/connect-img.png'} alt="Connect" />
              CONNECT WALLET
            </Button>
          }
          <Close show={isFullNavigation} onClick={() => setOpen(false)}>
            <Text color={isDark ? "#FFFFFF" : "#1B0D3F"} fontFamily="'DM Sans', sans-serif" className="connect-wallet">&#10006;</Text>
          </Close>
        </StyledDiv>
        <Scrollbars autoHeightMax={200} className={`scrollbar ${isFullNavigation ? 'full' : null}`}>
          <Text
            color={isDark ? "#EFCBD7" : "#1B0D3F"}
            fontFamily="'DM Sans', sans-serif"
            className="menu-label">
            MENU
          </Text>
          <Wrapper>
            <ConnectList>
              <ConnectItem data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Setting, target: About">
                <AboutIcon isDark={isDark} className="icon" />
                <Text
                  color={isDark ? "#FFF" : "#23242F"}
                  fontFamily="'DM Sans', sans-serif" className="connect-type"
                >About</Text>
              </ConnectItem>
              <ConnectItem onClick={() => window.open(`https://docs.deltafi.ai/`, "_blank")} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Setting, target: Documents">
                <DocumentsIcon isDark={isDark} className="icon" />
                <Text
                  color={isDark ? "#FFF" : "#23242F"}
                  fontFamily="'DM Sans', sans-serif" className="connect-type"
                >Documents</Text>
              </ConnectItem>
              <ConnectItem onClick={() => window.open(GITHUB_LINK, "_blank")} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Setting, target: Code">
                <CodeIcon isDark={isDark} className="icon" />
                <Text
                  color={isDark ? "#FFF" : "#23242F"}
                  fontFamily="'DM Sans', sans-serif" className="connect-type"
                >Code</Text>
              </ConnectItem>
              <ConnectItem onClick={() => window.open(DISCORD_LINK, "_blank")} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Setting, target: Discord">
                <DiscordIcon isDark={isDark} className="icon" />
                <Text
                  color={isDark ? "#FFF" : "#23242F"}
                  fontFamily="'DM Sans', sans-serif" className="connect-type"
                >Discord</Text>
              </ConnectItem>
              <ConnectItem data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Setting, target: Analytics">
                <AnalyticsIcon isDark={isDark} className="icon" />
                <Text
                  color={isDark ? "#FFF" : "#23242F"}
                  fontFamily="'DM Sans', sans-serif" className="connect-type"
                >Analytics</Text>
              </ConnectItem>
              <ConnectItem data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Setting, target: Language">
                <LanguageIcon isDark={isDark} className="icon" />
                <Text
                  color={isDark ? "#FFF" : "#23242F"}
                  fontFamily="'DM Sans', sans-serif" className="connect-type"
                >Language</Text>
              </ConnectItem>
              <ConnectItem onClick={toggleTheme}>
                {isDark ? <SunIcon className="icon"/> : <MoonIcon className="icon"/>}
                <Text
                  color={isDark ? "#FFF" : "#23242F"}
                  fontFamily="'DM Sans', sans-serif" className="connect-type"
                >{isDark ? 'Light Mode' : 'Dark Mode'}</Text>
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

Setting.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
}

export default Setting;
