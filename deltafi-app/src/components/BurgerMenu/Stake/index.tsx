import { useState } from 'react'
import { bool, func } from 'prop-types';
import styled from 'styled-components';

import { Text, LinkIcon, ConnectedWallet } from 'components';
import StakeBlock from 'components/StakeBlock';
import farms from 'config/constants/deltafi';

import useTheme from 'hooks/useTheme'
import { useModal, useAccount } from 'store/hooks';

import { Scrollbars } from 'react-custom-scrollbars';

interface MenuProps {
  readonly open: boolean;
};

interface CloseProps {
  readonly show: boolean;
};

interface DarkProps {
  readonly isDark: boolean;
};

const StyledMenu = styled.nav<MenuProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.colors.menuBackground};
  transform: ${({ open }) => open ? 'translateY(0)' : 'translateY(100%)'};
  width: 100vw;
  text-align: left;
  position: fixed;
  bottom: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 999;
  .title {
    margin-top: 39px;
    justify-content: center;
  }
  .deposit-share {
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    margin-top: 15px;
  }
  .deposit-amount {
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    margin-top: 8px;
  }
  .pool-stats {
    margin-top: 39px;
    text-align: center;
  }
  .account-information {
    margin-top: 45px;
    text-align: center;    
  }
  .scrollbar {
    width: 100%;
    height: 60vh !important;
    &.full {
      height: 85vh !important;
    }
  }
  .liquid-text {
    text-align: center;
    margin-top: 25px;
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
`
const Img = styled.img`
  width: 20px;
  height: 20px;
  border-radius:50%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 27px;
    height: 27px; 
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 27px;
    height: 27px; 
  }
`
const TitleHeaderDiv = styled.div`
  .deposit-title {
    font-size: 14px;
    font-weight: 500;
    margin-right: 10px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
  display: block;
  margin-top: 10px;
`

const TitleDiv = styled.div`
  .deposit-title {
    font-size: 18px;
    font-weight: 500;
    margin-right: 10px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
  display: none;
`
const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  &.stake {
    margin-top: 30px;
    justify-content: center;
  }
  &.space-between {
    justify-content: space-between;
  }
  .underline {
    text-decoration: underline;
  }
  ${({ theme }) => theme.mediaQueries.md} {
  }
`

const FlexColumnWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  &.first {
    align-items: flex-end;
    margin-right: 18px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
  }
`

const LiquidDiv = styled.div`
  border-radius: 5px;
  margin: 20px 16px 22px 16px;;
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: space-between;
    margin: 30px 32px 28px 37px;
    flex-direction: row;
  }
`

const LiquidItemDiv = styled.div<DarkProps>`
  display: flex;
  flex-direction: column;
  padding: 22px 24px;
  &.first {
    background: ${({ isDark }) => isDark ? 'linear-gradient(5.76deg, #88809C -194.75%, #1B0D3F 165.76%)' : 'linear-gradient(5.76deg, rgba(136, 128, 156, 0.6) -194.75%, rgba(27, 13, 63, 0.6) 165.76%)'};
    border-radius: 5px;
  }
  .liquid-title {
    margin-bottom: 10px;
  }
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background: ${({ isDark }) => isDark ? '#000000' : '#FFFFFF'};
  ${({ theme }) => theme.mediaQueries.md} {
  }
`

const LiquidDescriptonDiv = styled.div<DarkProps>`
  background: ${({ isDark }) => isDark ? 'linear-gradient(5.76deg, #88809C -194.75%, #1B0D3F 165.76%)' : 'linear-gradient(5.76deg, rgba(136, 128, 156, 0.6) -194.75%, rgba(27, 13, 63, 0.6) 165.76%)'};
  border-radius: 5px;
  padding: 24px 26px;
  margin: 0px 16px 40px 16px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin: 30px 32px 43px 37px;
  }
`

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 20px;
  border-radius: 20px 20px 0 0;
  background: ${({ theme }) => theme.colors.footerMain};
  flex-direction: column;
  .position-management {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 16px;
    padding: 13px 15px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    border-radius: 0;
    justify-content: space-between;
    flex-direction: row;
    padding: 25px 20px;
    .position-management {
      font-weight: bold;
      font-size: 18px;
    }
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
  const { isConnectedWallet } = useAccount()
  const isHidden = open ? true : false;
  const { isDark } = useTheme()
  const { stakePid } = useModal()
  const [isFullNavigation, setFullNavigation] = useState(false)

  const farm = farms.find(item => item.sousId === stakePid)

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
      <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
        <Container>
          <DropMenu />
          <StyledDiv onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {isConnectedWallet ? <ConnectedWallet />
              :
                <Text bold color={isDark ? "#FFFFFF" : "#1B0D3F"} textTransform='uppercase' fontFamily="'DM Sans', sans-serif" className="position-management">Position Management</Text>
            }
            <Close show={isFullNavigation} onClick={onClose}>
              <Text color={isDark ? "#FFFFFF" : "#1B0D3F"} className="position-management">&#10006;</Text>
            </Close>
            <TitleHeaderDiv>
              <FlexWrapper className="header-title">
                <Text color={isDark ? "#FFFFFF" : "#000000"} fontFamily="'DM Sans', sans-serif" className="deposit-title">{farm?.stakingToken?.symbol || ''} - {farm?.earningToken?.symbol || ''} Liquidity Mining</Text>
                <Img src={farm?.stakingToken?.link} alt='staking coin' />
                <Img src={farm?.earningToken?.link} alt='earning coin' />
              </FlexWrapper>
            </TitleHeaderDiv>
          </StyledDiv>
          <Scrollbars autoHeightMax={200} className={`scrollbar ${isFullNavigation ? 'full' : null}`}>
            <TitleDiv>
              <FlexWrapper className="title">
              <Text color={isDark ? "#FFFFFF" : "#000000"} fontFamily="'DM Sans', sans-serif" className="deposit-title">{farm?.stakingToken?.symbol || ''} - {farm?.earningToken?.symbol || ''} Liquidity Mining</Text>
                <Img src={farm?.stakingToken?.link} alt='staking coin' />
                <Img src={farm?.earningToken?.link} alt='earning coin' />
              </FlexWrapper>
            </TitleDiv>

            <StakeBlock farm={farm} />

            <FlexWrapper className="stake">
              <FlexColumnWrapper className="first">
                <Text color={"#88809C"} small fontFamily="'Inter', sans-serif">Total Staked</Text>
                <Text fontFamily="'Inter', sans-serif" className="deposit-share">40,378,330 DLT</Text>
              </FlexColumnWrapper>
              <FlexColumnWrapper>
                <Text color={"#88809C"} small fontFamily="'Inter', sans-serif">Pool Rate</Text>
                <Text fontFamily="'Inter', sans-serif" className="deposit-share">240,000 DFI / day</Text>
              </FlexColumnWrapper>
            </FlexWrapper>

            <LiquidDiv>
              <LiquidItemDiv className="first" isDark={isDark}>
                <Text color="#FFFFFF" small fontFamily="'Inter', sans-serif" className="liquid-title">Your liquidity staked</Text>
                <FlexWrapper className="space-between">
                  <Text color="#FFFFFF" fontSize="24px" fontFamily="'PT Mono', sans-serif">0</Text>
                  <Text color="#FFFFFF" small fontFamily="'DM Sans', sans-serif">USDT - USDC Delta LT</Text>
                </FlexWrapper>
              </LiquidItemDiv>
              <LiquidItemDiv isDark={isDark}>
                <Text small fontFamily="'Inter', sans-serif" className="liquid-title">Your unclaimed DFI</Text>
                <FlexWrapper className="space-between">
                  <Text fontSize="24px" fontFamily="'PT Mono', sans-serif">0</Text>
                  <Text color={"#898BA2"} fontWeight={500} fontFamily="'Inter', sans-serif">0 / day</Text>
                </FlexWrapper>
              </LiquidItemDiv>
            </LiquidDiv>

            {isConnectedWallet && (
              <LiquidDescriptonDiv isDark={isDark}>
                <Text small color={'rgba(255, 255, 255, 0.8)'} fontFamily="'DM Sans', sans-serif">
                  DL tokens are tokens which represent a share of the liquidity provided to a DeltaFi staking pool.
                </Text>
                <br />
                <Text small color={'rgba(255, 255, 255, 0.8)'} fontFamily="'DM Sans', sans-serif">
                  You may obtain DL tokens by depositing USD Coin (USDC) or USDT (USDT) into the USDT-USDC pool.
                </Text>
                <br />
                <FlexWrapper>
                  <Text small color={'rgba(255, 255, 255, 0.8)'} fontFamily="'DM Sans', sans-serif" className="underline">
                    Deposit into the USDT-USDC Pool
                  </Text>
                  <LinkIcon className="external-link" isDark={isDark} width="15px" style={{ marginLeft: 6 }} />
                </FlexWrapper>
              </LiquidDescriptonDiv>
            )}
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