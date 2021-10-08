import styled from 'styled-components';
import { useState } from 'react';

// import TransactionWorking from 'components/TransactionWorking';
// import TransactionComplete from 'components/TransactionComplete';
import { WithdrawIcon, StakeIcon } from 'components/Svg';
import { Text } from 'components/Text';

import useTheme from 'hooks/useTheme'
import StakeTransaction from './StakeTransaction';
import UnstakeTransaction from './UnstakeTransaction';

const ShareDiv = styled.div`
  margin: 24px 16px 20px 16px;
  background: ${({ theme }) => theme.colors.transactionBackground};
  border-radius: 10px;
  padding: 32px 15px 21px 14px;
  .deposit {
    display: flex;
    justify-content: space-between;
    padding-bottom: 6px;
  }
  .connect-wallet {
    margin-top: 23px;
    width: 100%;
    color: #FFFFFF;
  }
  .view {
    font-size: 14px;
    text-align: center;
  }
  .transaction-failed {
    color: #FF3939;
    margin-left: 5px;
  }
  .failed {
    margin-top: 18px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin: 24px 32px 0px 37px;
  }
`
const DepositButton = styled.button`
  display: flex;
  background: transparent;
  border: none;
  cursor: pointer;
  align-items: center;
  .icon {
    width: 16px;
    ${({ theme }) => theme.mediaQueries.md} {
      width: 16px;
    }
  }
  .button-label {
    font-size: 14px;
    font-weight: 400;
    margin-left: 2px;
    margin-right: 16px;
    
  }
`
const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
  }
`

const StakeBlock = ({ ...props }) => {
  const farm = props.farm;

  const { isDark } = useTheme()
  const [isStakeClicked, setButtonState] = useState(true);

  const buttonClciked = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.currentTarget.name === "depositButton") {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }

  return (
    <>
      <Text color={isDark ? "#FFFFFF" : "#000000"} fontFamily="'Inter', sans-serif" className="liquid-text">LIQUIDITY MINING</Text>
      {/* <TransactionWorking />
      <TransactionComplete /> */}

      <ShareDiv>
        <FlexWrapper className="deposit">
          <FlexWrapper>
            <DepositButton name="depositButton" onClick={buttonClciked} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Stake, target: Stake">
              <StakeIcon isDark={isDark} isSelected={isStakeClicked} className="icon" />
              <Text color={isStakeClicked ? isDark ? "#FFFFFF" : "#000000" : "#88809C"} fontFamily="'Inter', sans-serif" className="button-label">STAKE</Text>
            </DepositButton>
            <DepositButton name="withdrawButton" onClick={buttonClciked} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Stake, target: Unstake">
              <WithdrawIcon isDark={isDark} isSelected={!isStakeClicked} className="icon" />
              <Text color={isStakeClicked ? "#88809C" : isDark ? "#FFFFFF" : "#000000"} fontFamily="'Inter', sans-serif" className="button-label">UNSTAKE</Text>
            </DepositButton>
          </FlexWrapper>
        </FlexWrapper>
        {isStakeClicked ?
          <StakeTransaction farm={farm} />
          :
          <UnstakeTransaction farm={farm} />
        }
      </ShareDiv>
    </>
  )
}

export default StakeBlock;