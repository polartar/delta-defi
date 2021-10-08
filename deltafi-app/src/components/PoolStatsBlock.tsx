import styled from 'styled-components';

import useTheme from 'hooks/useTheme'

import { Text } from 'components/Text';

const StatsDiv = styled.div`
  margin: 12px 16px 0px 16px;
  border-radius: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin: 17px 32px 0px 37px;
  }
`
const StatsBlack = styled.div`
  background: ${({ theme }) => theme.colors.footerMain};
  border-radius: 10px 10px 0 0;
  padding: 24px 44px 23px 44px;
  .currency {
    text-align: center;
    margin-bottom: 23px;
    font-size: 14px;
  }
  .align {
    align-items: center;
    margin-bottom: 13px;
  }  
  .icon {
    width: 27px;
    height: 27px;
  }
  .staking {
    font-size: 14px;
    margin-left: 5px;
  }
`
const StatsGray = styled.div`
  background: ${({ theme }) => theme.colors.footer};
  border-radius: 0 0 10px 10px;
  padding: 24px 44px 10px 44px;
  .align {
    align-items: center;
    justify-content: center;
    margin-bottom: 13px;
  }
  .description {
    font-size: 14px;
  }
  .value {
    font-size: 14px;
    margin-left: 20px;
  }
`
const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
  }

`
const Img = styled.img`
  width: 27px;
  height: 27px;
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

const PoolStatsBlock = ({ ...props }) => {

  const { isDark } = useTheme()
  const pool = props.pool

  return (
    <>
      <StatsDiv>
        <StatsBlack>
          <Text color={isDark ? "#88809C" : "#88809C"} fontFamily="'Inter', sans-serif" className="currency" >Currency Reserves</Text>
          <FlexWrapper className="align">
            <Img src={pool?.stakingToken?.link} alt='staking coin' className="icon" />
            <Text color={isDark ? "#FFFFFF" : "#000000"} fontFamily="'Inter', sans-serif" className="staking" >16,547,620 USDC (52.51577%)</Text>
          </FlexWrapper>
          <FlexWrapper className="align">
            <Img src={pool?.earningToken?.link} alt='staking coin' className="icon" />
            <Text color={isDark ? "#FFFFFF" : "#000000"} fontFamily="'Inter', sans-serif" className="staking" >16,547,620 USDC (52.51577%)</Text>
          </FlexWrapper>
        </StatsBlack>
        <StatsGray>
          <FlexWrapper className="align">
            <Text color={isDark ? "#88809C" : "#88809C"} fontFamily="'Inter', sans-serif" className="description" >Total Reserves</Text>
            <Text color={isDark ? "#FFFFFF" : "#000000"} fontFamily="'Inter', sans-serif" className="value">US$ 3150390</Text>
          </FlexWrapper>
          <FlexWrapper className="align">
            <Text color={isDark ? "#88809C" : "#88809C"} fontFamily="'Inter', sans-serif" className="description" >APR</Text>
            <Text color={isDark ? "#FFFFFF" : "#000000"} fontFamily="'Inter', sans-serif" className="value">2.5%</Text>
          </FlexWrapper>
        </StatsGray>
      </StatsDiv>
    </>
  )
}

export default PoolStatsBlock;