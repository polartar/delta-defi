import styled from 'styled-components';
import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import ReactSlider from "react-slider";
import { useWallet } from '@solana/wallet-adapter-react';

import { Button, ViewTransactionIcon, ErrorIcon } from 'components';
import { DownArrowIcon } from 'components/Svg';
import { Text } from 'components/Text';

import useTheme from 'hooks/useTheme'
import { useFetchModal } from 'store/hooks';

const InputBlock = styled.div`
  margin-top: 8px;
  border-radius: 5px;
  padding: 16px 22px;
  background: ${({ theme }) => theme.colors.menuBackground};
  .stake-symbol {
    font-size: 14px;
    font-weight: 400
  }
  .stake-unit {
    font-size: 12px;
    font-weight: 500
  }
  .unit {
    margin-left: 10px;
  }
  .info {
    margin-top: 29px;
    justify-content: space-between;    
  }
  .currency {
    text-align: right;
    border: none;
    background: transparent;
    outline: none;
    font-size: 24px;
    font-family: 'PT Mono';
    color: #515369;
    width: 100%;
    margin-right: 5px;
  }
  .down-arrow {
    width: 16px;
    margin-left: 5px;
    ${({ theme }) => theme.mediaQueries.md} {
      width: 16px;
    }
  }
  .drop-down {
    cursor: pointer;
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
const SliderInputBlock = styled.div`
  margin-top: 8px;
  border-radius: 5px;
  padding: 17px 22px;
  background: ${({ theme }) => theme.colors.gradients.slider};
`
const SliderInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
  border-radius: 10px;
  .horizontal-slider {
    width: 100%;
    max-width: 500px;
    height: 40px;
    margin: auto;
  }
  .slider-thumb {
    cursor: pointer;
    position: absolute;
    z-index: 100;
    background: #F43F5E;
    border: 2px solid white;
    border-radius: 100%;
    display: block;
    box-shadow: 0 0 2px 0 rgb(0 0 0 / 44%);
  }
  .slider-thumb.active {
    background-color: #F43F5E;
  }
  .slider-track {
    position: relative;
    background: #ddd;
    border-radius: 5px;
  }
  .slider-track.slider-track-0 {
    background: #F43F5E;
  }
  .horizontal-slider .slider-track {
    top: 20px;
    height: 9px;
  }
  .horizontal-slider .slider-thumb {
    top: 16.5px;
    width: 12px;
    height: 12px;
    outline: none;
    line-height: 38px;
  }
  .slider-value {
    margin-right: 28px;
    text-align: right;
    width: 25px;
  }
`
const Wrapper = styled.div`
  ${({ theme }) => theme.mediaQueries.md} {
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
  }
`
const ExternalLink = styled.a`
  color: #88809C;
  outline: none;
  margin-left: 5px;
  display: inline-flex;
  text-decoration: none;
  .external-link {
    display: flex;
    align-items: flex-end;
    margin: 0 5px;
  }  
`
const ButtonIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 5px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 50px;
    height: 50px; 
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 20px;
    height: 20px; 
  }
`

const WithdrawTransaction = ({ ...props }) => {
  const pool = props.pool;
  const maxWithdrawal = 120;
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const { connected: isConnectedWallet } = useWallet()
  const { isDark } = useTheme()
  const [stakingPercentage, setStakingPercentage] = useState(0);
  const [earningAmount, setEarningAmount] = useState('');

  const { setHeaderOpen } = useFetchModal()

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^\d.-]/g, '');
    const name = event.target.name;
    if (isNaN(parseFloat(value))) {
      setStakingPercentage(0);
      if (name === 'earningCurreny') {
        setEarningAmount("");
      } else {
        setWithdrawAmount('');
      }
    } else {
      if (name === 'earningCurreny') {
        setEarningAmount(value);
      } else {
        setWithdrawAmount(value);
      }
      if (Math.round(parseFloat(value) / maxWithdrawal * 100) > 100) {
        setStakingPercentage(100);
      } else {
        setStakingPercentage(Math.round(parseFloat(value) / maxWithdrawal * 100));
      }

    }
  };

  const sliderHandler = (value: any) => {
    console.log(value);
    setStakingPercentage(value);
    setEarningAmount(String(maxWithdrawal * value / 100));
  }

  return (
    <>
      <SliderInputBlock>
        <Text color={isDark ? "#EBECF1" : "#414141"} fontSize="12px" fontWeight={500} fontFamily="'Inter', sans-serif">
          Select your percentage of your position to withdraw:
        </Text>
        <SliderInputDiv>
          <Text color={isDark ? "#EBECF1" : "#0B0B0B"} className="slider-value" fontFamily="'Inter', sans-serif">{stakingPercentage}%</Text>
          <ReactSlider
            name="stakingCurrency"
            className="horizontal-slider"
            thumbClassName="slider-thumb"
            trackClassName="slider-track"
            value={stakingPercentage}
            onChange={sliderHandler}
          />
        </SliderInputDiv>
      </SliderInputBlock>
      <InputBlock>
        <FlexWrapper>
          <FlexWrapper>
            <Img src={pool?.stakingToken?.link} alt='staking coin' />
            <Wrapper className="unit">
              <Text color={isDark ? "#FFFFFF" : "#000000"} fontFamily="'Inter', sans-serif" className="stake-symbol">{pool?.stakingToken?.symbol || ''}</Text>
              <Text color={isDark ? "#999999" : "#999999"} fontFamily="'Inter', sans-serif" className="stake-unit">{pool?.stakingToken?.symbol || ''}</Text>
            </Wrapper>
          </FlexWrapper>
          <CurrencyInput name="withdrawCurrency" className="currency" autoComplete="off" placeholder="0.00" minLength={0} maxLength={20} decimalsLimit={20} value={withdrawAmount} onChange={inputHandler} />
        </FlexWrapper>
        <FlexWrapper className="info">
          <Text color={isDark ? "#515369" : "#515369"} fontFamily="'Inter', sans-serif" className="stake-symbol">Balance: --</Text>
          <Text color={isDark ? "#515369" : "#515369"} fontFamily="'Inter', sans-serif" className="stake-unit">%--</Text>
        </FlexWrapper>
      </InputBlock>
      <InputBlock>
        <FlexWrapper>
          <FlexWrapper className="drop-down" onClick={() => {alert("Show drop-down");}}>
            <Img src={pool?.earningToken?.link} alt='staking coin' />
            <Wrapper className="unit">
              <Text color={isDark ? "#FFFFFF" : "#000000"} fontFamily="'Inter', sans-serif" className="stake-symbol">{pool?.earningToken?.symbol || ''}</Text>
              <Text color={isDark ? "#999999" : "#999999"} fontFamily="'Inter', sans-serif" className="stake-unit">{pool?.earningToken?.symbol || ''}</Text>
            </Wrapper>
            <DownArrowIcon isDark={isDark} className="down-arrow" />
          </FlexWrapper>
          <CurrencyInput name="earningCurrency" className="currency" autoComplete="off" placeholder="0.00" minLength={1} maxLength={20} decimalsLimit={20} value={earningAmount} onChange={inputHandler} />
        </FlexWrapper>
        <FlexWrapper className="info">
          <Text color={isDark ? "#515369" : "#515369"} fontFamily="'Inter', sans-serif" className="stake-symbol">Max Withdrawal: {maxWithdrawal}</Text>
          <Text color={isDark ? "#515369" : "#515369"} fontFamily="'Inter', sans-serif" className="stake-unit">%--</Text>
        </FlexWrapper>
      </InputBlock>

      {
        isConnectedWallet ?
        parseFloat(earningAmount) > 0.0 ?
            parseFloat(earningAmount) > maxWithdrawal ?
              <Button name="insufficient" variant='primary' disabled={true} className="connect-wallet" borderRadius="5px" data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Withdraw, target: InsufficientBalance">INSUFFICIENT BALANCE</Button>
              :
              <Button name="connect" variant='secondary' className="connect-wallet" borderRadius="5px" data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Withdraw, target: ApproveTransaction">APPROVE TRANSACTION</Button>
            :
            <Button name="amount" variant='primary' disabled={true} className="connect-wallet" borderRadius="5px" data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Withdraw, target: EnterAmount">ENTER AMOUNT</Button>
          :
          <>
            <>
              <Button name="approve" variant='secondary' className="connect-wallet" borderRadius="5px" onClick={() => setHeaderOpen(true)} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Withdraw, target: ConnectWallet">
                <ButtonIcon src={'/images/connect-img.png'} alt="Connect" />
                CONNECT WALLET
              </Button>
            </>
            <>
              <Button name="approve" variant='secondary' className="connect-wallet" borderRadius="5px" data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Withdraw, target: SubmitAgain">SUBMIT AGAIN</Button>
              <FlexWrapper className="failed">
                <FlexWrapper>
                  <ErrorIcon isDark={isDark} isSelected={false} className="icon" />
                  <Text color={isDark ? "#515369" : "#515369"} fontFamily="'Inter', sans-serif" className="transaction-failed">Sorry, Transaction Failed!</Text>
                </FlexWrapper>
                <Text color={isDark ? "#88809C" : "#6B7280"} className="view" fontFamily="'Inter', sans-serif">
                  <ExternalLink href="/VIEWTRANSACTION" target="_blank" rel="noreferrer noopener" data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Withdraw, target: ViewTransaction">
                    VIEW
                    <ViewTransactionIcon className="external-link" isDark={isDark} width="18px" />
                  </ExternalLink>
                </Text>
              </FlexWrapper>
            </>
          </>
      }
    </>
  )
}

export default WithdrawTransaction;