import React, { useCallback, useState } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import styled from 'styled-components'

import { TabProps } from 'components/types'
import Page from 'components/layout/Page'
import { Text, DepositMenu } from 'components'

import useTheme from 'hooks/useTheme'
import { convertDoller } from 'util/utils'

import PoolCard from './components/Card'
import { useModal, useFetchModal } from 'store/hooks';
import { PoolConfig } from 'config/constants/types'
import pools from 'config/constants/pools'

interface ContainerProps {
  open: boolean;
}
const Container = styled.div<ContainerProps>`
	display: flex;
	align-items: center;
	justify-content: center;
  flex-direction: column;
  padding: 0 16px;

  ${({ theme }) => theme.mediaQueries.xxl} {
		transform: ${({ open }) => open ? 'translateX(-225px)' : 'translateX(0)'};
    transition: transform 0.3s ease-in-out;
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
    font-size: 14px;
    font-weight: 500;
    ${({ theme }) => theme.mediaQueries.xs} {
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
const Home: React.FC = () => {
  const history = useHistory()
  const location = useLocation()

  const [isActive, setActive] = useState(location.pathname.substring(1))
  const { isDark } = useTheme()
  const { headerOpen, depositOpen, stakeOpen, menuOpen, settingOpen } = useModal()
  const { setDepositOpen } = useFetchModal()

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
        <Text textTransform='uppercase' color='#C94A75' fontFamily="'Inter', sans-serif" className="title">POOLS</Text>
        <Text mb="16px" className="content" fontFamily="'DM Sans', sans-serif">Deposit & Earn</Text>
        <Text color={isDark ? "#949292" : "#6B7280"} className="sub-content" fontFamily="'DM Sans', sans-serif">TVL {convertDoller(172197969)}</Text>
        {pools.map((pool: PoolConfig, index) => <PoolCard key={index} pool={pool} />)}
      </Container>
      <DepositMenu open={depositOpen} setOpen={setDepositOpen} />
    </Page>
  )
}

export default Home
