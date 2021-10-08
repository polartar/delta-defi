import styled from 'styled-components';
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip'

import { DepositIcon } from 'components';
import { WithdrawIcon } from 'components/Svg';
import { Text } from 'components/Text';

import useTheme from 'hooks/useTheme'
import DepositTransaction from './DepositTransaction';
import WithdrawTransaction from './WithdrawTransaction';
import SettingsPanel from './SettingsPanel/SettingsPanel';
// import TransactionWorking from './TransactionWorking';
// import TransactionComplete from './TransactionComplete';

const ShareDiv = styled.div`
  margin: 16px 16px 0px 16px;
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
    color: #EFCBD7;
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

const DepositBlock = ({ ...props }) => {
  const pool = props.pool;

  const { isDark } = useTheme()
  const [isDepositClicked, setButtonState] = useState(true);
  const [priceImpact, setPriceImpact] = useState("2.0")
  const [isIncludeDecimal, setIsIncludeDecimal] = useState(true)
  const [openSettings, setOpenSettings] = useState(false)

  const buttonClciked = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.currentTarget.name === "depositButton") {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }

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
    <>
      {/* <TransactionWorking />
      <TransactionComplete /> */}

      <ShareDiv>
        <FlexWrapper className="deposit">
          <FlexWrapper>
            <DepositButton name="depositButton" onClick={buttonClciked} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Deposit, target: Deposit">
              <DepositIcon isDark={isDark} isSelected={isDepositClicked} className="icon" />
              <Text color={isDepositClicked ? isDark ? "#FFFFFF" : "#000000" : "#88809C"} fontFamily="'Inter', sans-serif" className="button-label">DEPOSIT</Text>
            </DepositButton>
            <DepositButton name="withdrawButton" onClick={buttonClciked} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Deposit, target: Withdraw">
              <WithdrawIcon isDark={isDark} isSelected={!isDepositClicked} className="icon" />
              <Text color={isDepositClicked ? "#88809C" : isDark ? "#FFFFFF" : "#000000"} fontFamily="'Inter', sans-serif" className="button-label">WITHDRAW</Text>
            </DepositButton>
          </FlexWrapper>
        </FlexWrapper>
        <ReactCardFlip isFlipped={openSettings}>
          <>
            {isDepositClicked ?
              <DepositTransaction pool={pool} />
              :
              <WithdrawTransaction pool={pool} />
            }
          </>
          <SettingsPanel
            priceImpact={priceImpact}
            isIncludeDecimal={isIncludeDecimal}
            isSmall
            handleChangeImpact={handleChangeImpact}
            handleChangeInclude={handleChangeInclude}
            handleClose={handleOpenSettings}
          />
        </ReactCardFlip>
      </ShareDiv>
    </>
  )
}

export default DepositBlock;