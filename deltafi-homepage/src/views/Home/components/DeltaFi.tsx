import React from 'react'
import styled from 'styled-components'

import { Text, BoundedLiquidityIcon, CrossChainIcon, IntelligentMarketIcon } from 'components'
import LaunchApp from 'components/LaunchApp'

import useTheme from 'hooks/useTheme'
import Container from 'components/layout/Container'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 64px 0;
  text-align: center;

  .delta-title {
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
  }
  .delta-content {
    font-family: DM Sans;
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
  }
  .deposit-earn {
    font-family: DM Sans;
    font-weight: bold;
    font-size: 18px;
    line-height: 32px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 70px 0 47px;
    .delta-title {
      font-size: 18px;
      line-height: 44px;
    }
    .delta-content {
      font-size: 24px;
      line-height: 31px;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 109px 0 71px;
    .delta-title {
      font-size: 24px;
    }
    .delta-content {
      font-size: 36px;
      line-height: 47px;
    }
    .deposit-earn {
      font-size: 36px;
      line-height: 32px;
    }
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 181px 0 148px;
    .delta-title {
      font-weight: 500;
    }
    .delta-content {
      font-weight: bold;
      font-size: 48px;
      line-height: 62px;
    }
  }
`
const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 480px;
  margin: 10px 24px;
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
  border-radius: 10px;

  .card-title {
    font-family: DM Sans;
    font-weight: bold;
    font-size: 18px;
    line-height: 28px;
    max-width: 50%;

    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 20px;
      line-height: 30px;
      max-width: 40%;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      font-size: 32px;
      line-height: 44px;
    }
    ${({ theme }) => theme.mediaQueries.xl} {
      font-size: 36px;
      line-height: 54px;
    }
  }
  .card-content {
    font-weight: 300;
    font-size: 14px;
    line-height: 22px;
    max-width: 70%;
    ${({ theme }) => theme.mediaQueries.lg} {
      font-weight: normal;
      font-size: 18px;
      line-height: 28px;
    }
    ${({ theme }) => theme.mediaQueries.xl} {
      font-size: 24px;
      line-height: 40px;
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    border-radius: 20px;
    flex-direction: row;
    height: 343px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin: 10px 0;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 535px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    height: 750px;
  }
`
const DesktopDiv = styled.div`
  display: none;
  ${({ theme }) => theme.mediaQueries.sm} {
		display: flex;
    order: 2;
    width: 50%;
    height: 100%;
  }
`
const MobileDiv = styled.div`
  display: flex;
  order: 1;
  width: 100%;
  height: 45%;
  ${({ theme }) => theme.mediaQueries.sm} {
		display: none;
  }
`
const Img = styled.img`
  border-radius: 10px 10px 0 0;
  width: 100%;
  object-fit: cover;
  ${({ theme }) => theme.mediaQueries.sm} {
    border-radius: 0 20px 20px 0;
  }
`
const CustomDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  order: 2;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  height: 60%;
  border-radius: 0 0 10px 10px;

  ${({ theme }) => theme.mediaQueries.sm} {
    order: 1;
    border-radius: 20px 0 0 20px;
    width: 50%;
    height: 100%;
  }

  svg {
    width: 40px;
    ${({ theme }) => theme.mediaQueries.md} {
      width: 50px;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      width: 70px;
    }
    ${({ theme }) => theme.mediaQueries.xl} {
      width: 80px;
    }
  }
`

const DeltaFi: React.FC = () => {
  const { isDark } = useTheme()
  const primary = isDark ? 'dark' : 'secondary'

  const CARD_LIST = [
    {
      icon: <IntelligentMarketIcon width="70" color={isDark ? "#FFFFFF" : "#000000"}/>,
      title: `Intelligent Market Making`,
      content: "Adaptive algorithms are developed for efficient pricing under various market dynamics.",
      image: isDark ? '/images/intelligent-market-making-dark.png' : '/images/intelligent-market-making-light.png',
      imageMobile: isDark ? '/images/intelligent-market-making-mobile-dark.png' : '/images/intelligent-market-making-mobile-light.png',
    },
    {
      icon: <CrossChainIcon width="70" color={isDark ? "#FFFFFF" : "#000000"}/>,
      title: "Cross Chain Trading",
      content: "Ease of trading for any token builds the liquidity hub and optimal user experience.",
      image: isDark ? '/images/cross-chain-trading-dark.png' : '/images/cross-chain-trading-light.png',
      imageMobile: isDark ? '/images/cross-chain-trading-mobile-dark.png' : '/images/cross-chain-trading-mobile-light.png',
    },
    {
      icon: <BoundedLiquidityIcon width="70" color={isDark ? "#FFFFFF" : "#000000"}/>,
      title: "Bounded Liquidity Risk",
      content: "Provisioned liquidity is protected from impermanent loss despite market volatilities.",
      image: isDark ? '/images/bounded-liquidity-risk-dark.png' : '/images/bounded-liquidity-risk-light.png',
      imageMobile: isDark ? '/images/bounded-liquidity-risk-mobile-dark.png' : '/images/bounded-liquidity-risk-mobile-light.png',
    },
  ]

  return (
    <Container>
      <StyledDiv>
        <Text textTransform='uppercase' color='#C94A75' mb="24px" className="delta-title">HIGHER EFFICIENCY, LOWER SLIPPAGE</Text> 
        <Text className="delta-content">DeltaFi optimizes capital efficiency with zero slippage,</Text>
        <Text color={isDark ? "#949292" : "#6B7280"} className="delta-content" mb="36px">while minimizing impermanent loss.</Text>
        {CARD_LIST.map((card, index) => (
          <Card key={`card-${index}`}>
            <CustomDiv>
              {card.icon}
              <Text color={isDark ? "#FFFFFF" : "#4F4F4F"} mt="16px" mb="24px" className="card-title">{card.title}</Text>
              <Text color={isDark ? "#F2F2F2" : "#4F4F4F"} className="card-content">{card.content}</Text>
            </CustomDiv>
            <DesktopDiv><Img src={card.image} alt="Yields"/></DesktopDiv>
            <MobileDiv><Img src={card.imageMobile} alt="Yields"/></MobileDiv>
          </Card>
        ))}
        <Text color={isDark ? "#FFFFFF" : "#23242F"} mb="20px" mt="48px" className="deposit-earn">Deposit and Earn!</Text>
        <LaunchApp primary={primary}/>
      </StyledDiv>
    </Container>
  )
}

export default DeltaFi
