import React from 'react'
import styled from 'styled-components'

import { Text } from 'components'
import LaunchApp from 'components/LaunchApp'

import useTheme from 'hooks/useTheme'
import Container from 'components/layout/Container'

const Main = styled.div`
  background-image: ${({ theme }) => theme.colors.backgroundDelta};
  background-size: cover;
`

const StyledDiv = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 82px 0 0;
  min-height: auto;
  min-height: calc(100vh - 82px);

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    padding: 98px 0 0;
    min-height: calc(100vh - 98px);
  }
`
const Wrapper = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 50%;
    align-items: start;
    padding: 0;
  }

  img {
    max-height: 150px;

    ${({ theme }) => theme.mediaQueries.md} {
      max-height: 328px;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      max-height: 100%;
    }
  }

  .asset-title {
    font-weight: normal;
    font-size: 12px;
    line-height: 22px;
    text-align: center;
    font-size: 12px;
    line-height: 22px;

    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 16px;
      line-height: 30px;
      font-weight: 500;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      text-align: left;
      font-size: 14px;
    }
    ${({ theme }) => theme.mediaQueries.xl} {
      font-size: 20px;
    }
  }
  .asset-sub-title {
    font-family: DM Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 32px;
    text-align: center;

    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 72px;
      line-height: 60px;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      font-size: 80px;
      line-height: 80px;
      text-align: left;
    }
    ${({ theme }) => theme.mediaQueries.xl} {
      font-size: 120px;
      line-height: 100px;
    }
  }
  .asset-sub-titles {
    font-family: DM Sans;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    text-align: center;

    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 48px;
      line-height: 60px;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      font-size: 60px;
      line-height: 65px;
      text-align: left;
    }
    ${({ theme }) => theme.mediaQueries.xl} {
      font-weight: normal;
      font-size: 96px;
      line-height: 100px;
    }
  }
  .asset-content {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    text-align: center;

    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 24px;
      line-height: 50px;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      text-align: left;
    }
    ${({ theme }) => theme.mediaQueries.xl} {
      font-size: 34px;
    }
  }
`
const MobileWrapper = styled.div`
  display: flex;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`
const TabletWrapper = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`
const DesktopWrapper = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
  }
`

const AssetManager: React.FC = () => {
  const { isDark } = useTheme()
  const primary = isDark ? 'dark' : 'secondary'

  return (
    <Main>
      <StyledDiv>
        <Wrapper>
          <Text textTransform='uppercase' className="asset-title">POWERED BY SOLANA</Text>
          <Text color="#F43F5E" mt="16px" className="asset-sub-title">Trade</Text>
          <Text mb="16px" className="asset-sub-titles">Everything</Text>
          <Text mb="24px" className="asset-content">Lightning speed and DAO governed</Text>
          <DesktopWrapper><LaunchApp primary={primary} /></DesktopWrapper>
        </Wrapper>
        <TabletWrapper><LaunchApp primary={primary} /></TabletWrapper>
        <Wrapper>
          <img src="/images/asset.png" alt="asset" />
        </Wrapper>
        <MobileWrapper><LaunchApp primary={primary} /></MobileWrapper>
      </StyledDiv>
    </Main>
  )
}

export default AssetManager
