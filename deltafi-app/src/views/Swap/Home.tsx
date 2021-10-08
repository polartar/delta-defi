import React, { useCallback, useState } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import ReactCardFlip from 'react-card-flip'
import styled from 'styled-components'

import { TabProps } from 'components/types'
import Page from 'components/layout/Page'
import { Text, Button } from 'components'

import useTheme from 'hooks/useTheme'

import SwapCard from './components/Card'
import { useAccount, useFetchModal, useModal } from 'store/hooks'
import tokens from 'config/constants/tokens'
import SettingsPanel from 'components/SettingsPanel/SettingsPanel'

interface ContainerProps {
  open: boolean;
}
const Container = styled.div<ContainerProps>`
	display: flex;
	align-items: center;
	justify-content: center;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.xxl} {
		transform: ${({ open }) => open ? 'translateX(-225px)' : 'translateX(0)'};
    transition: transform 0.3s ease-in-out;
  }
  .title {
    font-size: 14px;
    font-weight: 700;
    line-height: 44px;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 18px;
    }
  }
  .content {
    font-family: 'DM Sans', sans-serif;
    font-size: 18px;
    font-weight: 500;
    padding: 0 38px;
    text-align: center;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 30px;
    }
  }
  .sub-content {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 14px;
    }
  }
  .connect-wallet {
    margin-top: 13px;
    width: 100%;
    height: 50px;
    color: #EFCBD7;
    font-size: 16px;
    ${({ theme }) => theme.mediaQueries.md} {
      margin-top: 26px;
    }
  }
`

const Section = styled.div`
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.gradients.card};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  margin: 16px 18px;
  padding: 21px 18px 35px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 32px;
    padding: 55px;
  }
`

const MobileDiv = styled.div`
  display: flex;
  ${({ theme }) => theme.mediaQueries.md} {
		display: none;
  }
`
const Tab = styled.div<TabProps>`
  background-color: ${({ active, theme }) => active ? theme.colors.activeTab : 'inherit'};
  border-radius: ${({ active }) => active ? '6px' : 'inherit'};
  color: ${({ active, theme }) => active ? theme.colors.activeTabText : 'inherit'};
  padding: 16px 28px;
  cursor: pointer;
`
const TabDiv = styled.div`
  display: flex;
  align-items: center;
  border-radius: 6px;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  margin: 7px;
  background-color: ${({ theme }) => theme.colors.tabBackground};
  color: ${({ theme }) => theme.colors.tabColor};
`
const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
  }
`
const DepositDetailImg = styled.img`
  width: 27px;
  height: 27px;
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 27px;
    height: 27px; 
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 28px;
    height: 34px; 
  }
`
const ButtonIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`

const Home: React.FC = () => {
  const history = useHistory()
  const location = useLocation()

  const { isConnectedWallet } = useAccount()
  const { setHeaderOpen } = useFetchModal()

  const [tokenFrom, setTokenFrom] = useState({
    token: tokens.usdc,
    amount: "",
    unit: "",
    balance: "",
  })
  const [tokenTo, setTokenTo] = useState({
    token: tokens.usdt,
    amount: "",
    unit: "",
    balance: "",
  })
  const [priceImpact, setPriceImpact] = useState("2.0")
  const [isIncludeDecimal, setIsIncludeDecimal] = useState(true)
  const [openSettings, setOpenSettings] = useState(false)

  const [isActive, setActive] = useState(location.pathname.substring(1))
  const { isDark } = useTheme()
  const { headerOpen, depositOpen, stakeOpen, menuOpen, settingOpen } = useModal()

  const handleActive = useCallback((path) => {
    history.push(path)
    setActive(path)
  }, [setActive, history])

  const handleChangeImpact = (value) => {
    setPriceImpact(value)
  }

  const handleChangeInclude = () => {
    setIsIncludeDecimal(!isIncludeDecimal)
  }

  const handleOpenSettings = () => {
    setOpenSettings(!openSettings)
  }

  return (
    <Page>
      <Container open={headerOpen || depositOpen || stakeOpen || menuOpen || settingOpen}>
        <MobileDiv>
          <TabDiv>
            <Tab active={isActive === 'swap' ? true : false} onClick={() => handleActive('swap')}>Swap</Tab>
            <Tab active={isActive === 'pools' ? true : false} onClick={() => handleActive('pools')}>Pools</Tab>
            <Tab active={isActive === 'farms' ? true : false} onClick={() => handleActive('farms')}>Farms</Tab>
          </TabDiv>
        </MobileDiv>
        <Text textTransform='uppercase' color='#C94A75' fontFamily="'Inter', sans-serif" className="title">SWAP</Text>
        <Text mb="16px" className="content">Zero Price Slippage</Text>
        <Section>
          <FlexWrapper>
            <FlexWrapper>
              <Text color={isDark ? "#FFFFFFB2" : "#23242F"} className="sub-content">
                {`1 ${tokenFrom.token.symbol} = 0.9999 ${tokenTo.token.symbol}`}
              </Text>
            </FlexWrapper>
            <DepositDetailImg src={`/images/deposit-detail-${isDark ? 'dark' : 'light'}.png`} alt="Deposit Detail" onClick={handleOpenSettings} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Swap, target: Settings" />
          </FlexWrapper>
          <ReactCardFlip isFlipped={openSettings}>
            <>
              <SwapCard card={tokenFrom} handleChangeCard={card => setTokenFrom(card)} />
              <SwapCard card={tokenTo} isLast={true} handleChangeCard={card => setTokenTo(card)} />
              {isConnectedWallet ?
                <Button name="amount" className="connect-wallet" borderRadius="5px" onClick={() => {}} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Swap, target: EnterAmount">
                  ENTER AMOUNT
                </Button>
              :
                <Button name="approve" variant='secondary' className="connect-wallet" borderRadius="5px" onClick={() => setHeaderOpen(true)} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Swap, target: ConnectWallet">
                  <ButtonIcon src={'/images/connect-img.png'} alt="Connect" />
                  CONNECT WALLET
                </Button>
              }
            </>
            <SettingsPanel
              priceImpact={priceImpact}
              isIncludeDecimal={isIncludeDecimal}
              handleChangeImpact={handleChangeImpact}
              handleChangeInclude={handleChangeInclude}
              handleClose={handleOpenSettings}
            />
          </ReactCardFlip>
        </Section>
      </Container>
    </Page>
  )
}

export default Home
