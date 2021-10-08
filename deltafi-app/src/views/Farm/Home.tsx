import React, { useCallback, useState } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import styled from 'styled-components'

import { TabProps } from 'components/types'
import Page from 'components/layout/Page'
import { Text, LinkIcon, StakeMenu } from 'components'

import useTheme from 'hooks/useTheme'
import farms from 'config/constants/deltafi'

import FarmCard from './components/Card'
import { FarmConfig } from 'config/constants/types'
import { useModal, useFetchModal } from 'store/hooks'

interface ContainerProps {
  open: boolean;
}
const Container = styled.div<ContainerProps>`
	display: flex;
	align-items: center;
	justify-content: center;
  flex-direction: column;
  padding: 0 16px 35px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-bottom: 98px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
		transform: ${({ open }) => open ? 'translateX(-225px)' : 'translateX(0)'};
    transition: transform 0.3s ease-in-out;
    padding-bottom: 120px;
  }
  .title {
    font-size: 14px;
    font-weight: 700;
    line-height: 44px;
    ${({ theme }) => theme.mediaQueries.xs} {
      font-size: 18px;
    }
  }
  .content {
    font-size: 18px;
    font-weight: 500;
    padding: 0 38px;
    text-align: center;
    ${({ theme }) => theme.mediaQueries.xs} {
      font-size: 30px;
    }
  }
  .sub-content {
    padding: 24px 0;
    width: 100%;
    background: ${({ theme }) => theme.colors.gradients.farmNoticeBackground};
    border-radius: 5px;

    font-size: 14px;
    font-weight: 500;
    text-align: center;
    ${({ theme }) => theme.mediaQueries.xs} {
      font-size: 16px;
      text-align: center;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      padding: 24px 46px;
      width: 600px;
    }
    ${({ theme }) => theme.mediaQueries.xxl} {
      width: 508px;
    }
  }
  .sub-content-price {
    font-size: 14px;
    font-weight: 500;
    line-height: 45px;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 18px;
    }
  }
  sub-content-link {
    font-size: 14px;
    font-weight: 500;
    margin-top: 20px;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 18px;
    }
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
const ExternalLink = styled.a`
  color: #949292;
  outline: none;
  margin-left: 5px;
  display: inline-flex;
  .external-link {
    display: flex;
    align-items: flex-end;
    margin: 0 2px;
  }
`
const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 694px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 600px;   
  }
`
const Home: React.FC = () => {
  const history = useHistory()
  const location = useLocation()

  const [isActive, setActive] = useState(location.pathname.substring(1))
  const { isDark } = useTheme()
  const { headerOpen, depositOpen, stakeOpen, menuOpen, settingOpen } = useModal()
  const { setStakeOpen } = useFetchModal()

  const handleActive = useCallback((path) => {
    history.push(path)
    setActive(path)
  }, [setActive, history])

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
        <Text textTransform='uppercase' color='#C94A75' fontFamily="'Inter', sans-serif" className="title">FARMS</Text>
        <Text mb="16px" className="content" fontFamily="'DM Sans', sans-serif">DeltaFi Liquidity Mining</Text>
        <Text color={isDark ? "#949292" : "#6B7280"} className="sub-content" fontFamily="'DM Sans', sans-serif">Deposit your Liquidity Provider tokens to receive DLT, the DeltaFi governance token. Read more about
          <ExternalLink href="/DLT" target="_blank" rel="noreferrer noopener" data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Farms, target: DLT">
            DLT
            <LinkIcon className="external-link" isDark={isDark} width="15px" />
          </ExternalLink>
        </Text>
        <FlexWrapper>
          <Text color={isDark ? "#FFF" : "#23242F"} className="sub-content-price" fontFamily="'DM Sans', sans-serif">Last DLT Price: US$ 0.08581</Text>
          <Text fontFamily="'DM Sans', sans-serif" ml="16px" className="sub-content-link">
            <ExternalLink href="/DLT" target="_blank" rel="noreferrer noopener" data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Farms, target: ViewSerum">
              View on Serum
              <LinkIcon className="external-link" isDark={isDark} width="15px" />
            </ExternalLink>
          </Text>
        </FlexWrapper>
        <Text textTransform='uppercase' color='#C94A75' fontFamily="'Inter', sans-serif" className="title">ACTIVE FARMS</Text>
        {farms.map((farm: FarmConfig, index) => <FarmCard key={index} farm={farm} />)}
      </Container>
      <StakeMenu open={stakeOpen} setOpen={setStakeOpen}/>
    </Page>
  )
}

export default Home
