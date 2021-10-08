import React, { useMemo, useState } from 'react'
import CurrencyInput from 'react-currency-input-field';
import styled from 'styled-components'

import tokens from 'config/constants/tokens'
import { Text, DropDown, SwapDownIcon } from 'components'
import useTheme from 'hooks/useTheme'
import { CardProps } from './types'

const Container = styled.div`
  margin-top: 8px;
  border-radius: 5px;
  padding: 26px 20px 21px 27px;
  position: relative;
  background: ${({ theme }) => theme.colors.menuBackground};
  box-shadow: ${({ theme }) => theme.colors.swapCardShadow};
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 10px;
  }

  .unit {
    margin-left: 10px;
  }
  .token-balance {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  }
  .token-unit {
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
  }
  .token-percent {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    text-align: right;
  }
  .info {
    margin-top: 29px;
    justify-content: space-between;    
  }
  .token-unit {
    font-family: Inter;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: 12px;
    letter-spacing: 0em;
  }
  .currency {
    text-align: right;
    border: none;
    background: transparent;
    outline: none;
    font-size: 18px;
    font-family: 'PT Mono';
    color: #515369;
    width: 100%;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 24px;
    }
  }
`
const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
  }
`
const Wrapper = styled.div`
`
const Img = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  box-shadow: rgb(0 0 0 / 8%) 0px 6px 10px;
  color: rgb(86, 90, 105);
`

const IconWrapper = styled.div`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SwapIcon = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  right: 12px;
  top: -16px;
  background: ${({ theme }) => theme.colors.swapIconBackground};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  svg {
    width: 12.5px;
    height: 12.5px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 40px;
    height: 40px;
    top: -25px;
    right: 15px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`

const SwapCard: React.FC<CardProps> = ({card, isLast, handleChangeCard}) => {
  const { isDark } = useTheme()
  const [selectedToken, setSelectedToken] = useState(card.token)
  const tokenList = useMemo(() => {
    return Object.keys(tokens).map(token => { return {id: tokens[token].symbol, title: tokens[token].symbol}});
  }, [])

  const handleChangeToken = (symbol) => {
    const newToken = tokens[symbol.toLowerCase()]
    setSelectedToken(newToken)
    handleChangeCard({ ...card, token: newToken })
  }

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^\d.-]/g, '');
    console.log(value);
    console.log(parseFloat(value));
    handleChangeCard({ ...card, amount: isNaN(parseFloat(value)) ? "" : value })
  };

  return (
    <Container>
      {isLast &&
        <SwapIcon>
          <SwapDownIcon isDark={isDark} />
        </SwapIcon>
      }
      <FlexWrapper>
        <FlexWrapper>
          <IconWrapper>
            <Img src={card.token.link} alt={`${card.token.symbol} coin`}/>
          </IconWrapper>
          <Wrapper className="unit">
            <DropDown selectedItem={{id: selectedToken.symbol, title: selectedToken.symbol}} itemList={tokenList} handleClick={handleChangeToken} />
            <Text color={isDark ? "#999999" : "#999999"} fontFamily="'Inter', sans-serif" className="token-unit">{card.token.symbol || ''}</Text>
          </Wrapper>
        </FlexWrapper>
        <CurrencyInput name="currency" className="currency" autoComplete="off" placeholder="0.00" minLength={0} maxLength={20} decimalsLimit={20} value={card.amount} onChange={inputHandler} />
      </FlexWrapper>
      <FlexWrapper className="info">
        <Text color={isDark ? "#515369" : "#515369"} fontFamily="'Inter', sans-serif" className="token-balance">Balance: --</Text>
        <Text color={isDark ? "#515369" : "#515369"} fontFamily="'Inter', sans-serif" className="token-percent">%--</Text>
      </FlexWrapper>
    </Container>
  )
}

export default SwapCard