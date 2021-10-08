import styled from 'styled-components';
import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useWallet } from '@solana/wallet-adapter-react';

import { Button, ViewTransactionIcon, ErrorIcon } from 'components';
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
  .slider-drop-down {
    width: 16px;
    margin-left: 5px;
    ${({ theme }) => theme.mediaQueries.md} {
      width: 16px;
    }
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

const DepositTransaction = ({ ...props }) => {
  const { connected: isConnectedWallet } = useWallet()
  const pool = props.pool;

  const { isDark } = useTheme()
  const [stakingAmount, setStakingAmount] = useState('');
  const [earningAmount, setEarningAmount] = useState('');

  const { setHeaderOpen } = useFetchModal()

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^\d.-]/g, '');
    console.log(value);
    console.log(parseFloat(value));
    if (event.target.name === "stakingCurrency") {
      isNaN(parseFloat(value)) ?
        setStakingAmount("") : setStakingAmount(value);
    } else {
      isNaN(parseFloat(value)) ?
        setEarningAmount("") : setEarningAmount(value);
    }
  };

  return (
    <>
      <InputBlock>
        <FlexWrapper>
          <FlexWrapper>
            <Img src={pool?.stakingToken?.link} alt='staking coin' />
            <Wrapper className="unit">
              <Text color={isDark ? "#FFFFFF" : "#000000"} fontFamily="'Inter', sans-serif" className="stake-symbol">{pool?.stakingToken?.symbol || ''}</Text>
              <Text color={isDark ? "#999999" : "#999999"} fontFamily="'Inter', sans-serif" className="stake-unit">{pool?.stakingToken?.symbol || ''}</Text>
            </Wrapper>
          </FlexWrapper>
          <CurrencyInput name="stakingCurrency" className="currency" autoComplete="off" placeholder="0.00" minLength={0} maxLength={20} decimalsLimit={20} value={stakingAmount} onChange={inputHandler} />
        </FlexWrapper>
        <FlexWrapper className="info">
          <Text color={isDark ? "#515369" : "#515369"} fontFamily="'Inter', sans-serif" className="stake-symbol">Balance: --</Text>
          <Text color={isDark ? "#515369" : "#515369"} fontFamily="'Inter', sans-serif" className="stake-unit">%--</Text>
        </FlexWrapper>
      </InputBlock>
      <InputBlock>
        <FlexWrapper>
          <FlexWrapper>
            <Img src={pool?.earningToken?.link} alt='staking coin' />
            <Wrapper className="unit">
              <Text color={isDark ? "#FFFFFF" : "#000000"} fontFamily="'Inter', sans-serif" className="stake-symbol">{pool?.earningToken?.symbol || ''}</Text>
              <Text color={isDark ? "#999999" : "#999999"} fontFamily="'Inter', sans-serif" className="stake-unit">{pool?.earningToken?.symbol || ''}</Text>
            </Wrapper>
          </FlexWrapper>
          <CurrencyInput name="earningCurrency" className="currency" autoComplete="off" placeholder="0.00" minLength={1} maxLength={20} decimalsLimit={20} value={earningAmount} onChange={inputHandler} />
        </FlexWrapper>
        <FlexWrapper className="info">
          <Text color={isDark ? "#515369" : "#515369"} fontFamily="'Inter', sans-serif" className="stake-symbol">Balance: --</Text>
          <Text color={isDark ? "#515369" : "#515369"} fontFamily="'Inter', sans-serif" className="stake-unit">%--</Text>
        </FlexWrapper>
      </InputBlock>

      {isConnectedWallet ?
        parseFloat(stakingAmount) > 0.0 ?
          parseFloat(stakingAmount) > 100.0 ?
            <Button name="insufficient" variant='primary' disabled={true} className="connect-wallet" borderRadius="5px" data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Deposit, target: InsufficientBalance">INSUFFICIENT BALANCE</Button>
            :
            <Button name="connect" variant='secondary' className="connect-wallet" borderRadius="5px" data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Deposit, target: ApproveTransaction">APPROVE TRANSACTION</Button>
          :
          <Button name="amount" variant='primary' disabled={true} className="connect-wallet" borderRadius="5px" data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Deposit, target: EnterAmount">ENTER AMOUNT</Button>
        :
        <>
          <>
            <Button name="approve" variant='secondary' className="connect-wallet" borderRadius="5px" onClick={() => setHeaderOpen(true)} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Deposit, target: ConnectWallet">
              <ButtonIcon src={'/images/connect-img.png'} alt="Connect" />
              CONNECT WALLET
            </Button>
          </>
          <>
            <Button name="approve" variant='secondary' className="connect-wallet" borderRadius="5px" data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Deposit, target: SubmitAgain">SUBMIT AGAIN</Button>
            <FlexWrapper className="failed">
              <FlexWrapper>
                <ErrorIcon isDark={isDark} isSelected={true} className="icon" />
                <Text color={isDark ? "#515369" : "#515369"} fontFamily="'Inter', sans-serif" className="transaction-failed">Sorry, Transaction Failed!</Text>
              </FlexWrapper>
              <Text color={isDark ? "#88809C" : "#6B7280"} className="view" fontFamily="'Inter', sans-serif">
                <ExternalLink href="/VIEWTRANSACTION" target="_blank" rel="noreferrer noopener" data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Deposit, target: ViewTransaction">
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

export default DepositTransaction;