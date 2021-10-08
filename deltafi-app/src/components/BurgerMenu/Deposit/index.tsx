import { useState, useEffect } from 'react'
import { bool, func } from 'prop-types';
import styled from 'styled-components';
import { useWallet } from '@solana/wallet-adapter-react';

import { Text, ConnectedWallet } from 'components';
import DepositBlock from 'components/DepositBlock';
import pools from 'config/constants/pools';

import useTheme from 'hooks/useTheme'
import { useModal } from 'store/hooks';
import PoolStatsBlock from 'components/PoolStatsBlock';
import AccountInfoBlock from 'components/AccountInfoBlock';

import { Scrollbars } from 'react-custom-scrollbars';

interface MenuProps {
  readonly open: boolean;
};

interface CloseProps {
  readonly show: boolean;
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
  ${({ theme }) => theme.mediaQueries.md} {
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
  const { connected: isConnectedWallet } = useWallet()
  const isHidden = open ? true : false;
  const { isDark } = useTheme()
  const { depositPid } = useModal()
  const [isFullNavigation, setFullNavigation] = useState(false)

  const pool = pools.find(item => item.sousId === depositPid)

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
      <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
        <Container>
          <DropMenu />
          <StyledDiv onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {isConnectedWallet ? <ConnectedWallet />
              :
                <Text color={isDark ? "#FFFFFF" : "#1B0D3F"} textTransform='uppercase' className="position-management">Position Management</Text>
            }
            <Close show={isFullNavigation} onClick={onClose}>
              <Text color={isDark ? "#FFFFFF" : "#1B0D3F"} className="position-management">&#10006;</Text>
            </Close>
            <TitleHeaderDiv>
              <FlexWrapper className="header-title">
                <Text color={isDark ? "#FFFFFF" : "#000000"} fontFamily="'DM Sans', sans-serif" className="deposit-title">{pool?.stakingToken?.symbol || ''} - {pool?.earningToken?.symbol || ''} Pool</Text>
                <Img src={pool?.stakingToken?.link} alt='staking coin' />
                <Img src={pool?.earningToken?.link} alt='earning coin' />
              </FlexWrapper>
            </TitleHeaderDiv>
          </StyledDiv>
          <Scrollbars autoHeightMax={200} className={`scrollbar ${isFullNavigation ? 'full' : null}`}>
            <TitleDiv>
              <FlexWrapper className="title">
                <Text color={isDark ? "#FFFFFF" : "#000000"} fontFamily="'DM Sans', sans-serif" className="deposit-title">{pool?.stakingToken?.symbol || ''} - {pool?.earningToken?.symbol || ''} Pool</Text>
                <Img src={pool?.stakingToken?.link} alt='staking coin' />
                <Img src={pool?.earningToken?.link} alt='earning coin' />
              </FlexWrapper>
            </TitleDiv>

            <Text color={isDark ? "#EBECF1" : "#23242F"} fontFamily="'Inter', sans-serif" className="deposit-share">YOUR SHARE</Text>
            <Text color="#88809C" fontFamily="'DM Sans', sans-serif" className="deposit-amount">US $0.000(--%)</Text>
            <DepositBlock pool={pool} />

            <Text color={isDark ? "#EBECF1" : "#23242F"} fontFamily="'Inter', sans-serif" className="pool-stats">POOL STATS</Text>
            <PoolStatsBlock pool={pool} />

            <Text color={isDark ? "#EBECF1" : "#23242F"} fontFamily="'Inter', sans-serif" className="account-information">ACCOUNT INFORMATION</Text>
            <AccountInfoBlock pool={pool} />
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