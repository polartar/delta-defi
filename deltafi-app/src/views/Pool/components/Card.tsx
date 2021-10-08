import React from 'react'
import styled from 'styled-components'

import { Text, Button } from 'components'
import { convertDoller } from 'util/utils'

import useTheme from 'hooks/useTheme'
import { useFetchModal } from 'store/hooks';

import { CardProps } from './types'

const Container = styled.div`
  margin: 8px 0;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.gradients.card};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 694px;
    height: 146px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 600px;
    height: 146px;
  }
`
const WalletPair = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 30px 0;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 16px 30px;
    flex-direction: row;
    justify-content: space-between;
  }
  .deposit-btn {
    width: 100%;
    height: 35px;
    ${({ theme }) => theme.mediaQueries.md} {
      width: 171px;
      height: 50px;
    }
    ${({ theme }) => theme.mediaQueries.xxl} {
      width: 129px;
    }
  }
`
const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 0 30px 16px;
    justify-content: space-between;
  }
  .wallet-text {
    font-weight: 500;
    font-size: 12px;
    line-height: 45px;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 18px;
    }
  }
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  .wallet-pair {
    font-size: 16px;
    font-weight: 500;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 24px;
    }
  }
`
const Img = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  box-shadow: rgb(0 0 0 / 8%) 0px 6px 10px;
  color: rgb(86, 90, 105);

  ${({ theme }) => theme.mediaQueries.md} {
    width: 50px;
    height: 50px;
  }

  &.coin-earning {
    margin-left: -5px;
  }
`

const PoolCard: React.FC<CardProps> = ({pool}) => {
  const { isDark } = useTheme()
  const { setDepositOpen } = useFetchModal()
  return (
    <Container>
      <WalletPair>
        <Wrapper>
          <Img src={pool.stakingToken.link} alt={`${pool.stakingToken.symbol} coin`}/>
          <Img src={pool.earningToken.link} alt={`${pool.earningToken.symbol} coin`} className="coin-earning" />
          <Text fontFamily="'DM Sans', sans-serif" ml="16px" className="wallet-pair">{`${pool.stakingToken.symbol} - ${pool.earningToken.symbol}`}</Text>
        </Wrapper>
        <Button variant='secondary' className="deposit-btn" onClick={() => setDepositOpen(true, pool.sousId)} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs={`page: Pools, target: Deposit(${pool.stakingToken.symbol} - ${pool.earningToken.symbol})`}>
          DEPOSIT
        </Button>
      </WalletPair>
      <FlexWrapper>
        <Text fontFamily="'DM Sans', sans-serif" mr="5px" color={isDark ? "#949292" : "#6B7280"} className="wallet-text">Total Deposits:</Text>
        <Text fontFamily="'DM Sans', sans-serif" color={isDark ? "#949292" : "#6B7280"} className="wallet-text">{convertDoller(pool.tvl)}</Text>
      </FlexWrapper>
    </Container>
  )
}

export default PoolCard