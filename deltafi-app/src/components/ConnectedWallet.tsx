import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

import styled from 'styled-components';
import { Variant } from 'components/Button/types'
import { Text } from 'components/Text';

import { useFetchModal } from 'store/hooks';
import useTheme from 'hooks/useTheme';

import { DownArrowIcon } from 'components';

interface Props {
  primary?: Variant;
}

const ConnectedButton = styled.div`
  background: ${({ theme }) => theme.colors.connectedButton};
  border-radius: 50px;  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  text-align: center;
  cursor: pointer;
  width: 275px;
  height: 50px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 275px;
    height: 50px; 
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 275px;
    height: 50px; 
  }
  .icon {
    width: 8px;
  }
`
const WalletButton = styled.div` {  
  background: ${({ theme }) => theme.colors.menuBackground};
  width: 187px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: #F43F5E;
  border-style: solid;
  border-radius: 50px;
}
`
const Img = styled.img`
  width: 40px;
  height: 40px;
  padding-right: 12px;
  border-radius:50%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 50px;
    height: 50px; 
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 34px;
    height: 34px; 
  }
`
const GreenDot = styled.div` {  
  background: #24FF00;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-left: 20px;
}
`

const ConnectedWallet: React.FC<Props> = ({ primary }) => {
  const { isDark } = useTheme()
  const { setSettingOpen } = useFetchModal()
  const { wallet, publicKey } = useWallet()
  const accountAddress = publicKey.toString()
  
  return (
    <ConnectedButton onClick={() => setSettingOpen(true)}>
      <GreenDot />
      <Text
        color="#FFF"
        fontFamily="'DM Sans',  sans-serif" fontSize="14px" fontWeight="700" className="eth"
      >
        {wallet.name}
      </Text>
      <DownArrowIcon isDark={isDark} className="icon" />
      <WalletButton>
        <Img src={wallet.icon} alt={wallet.name} />
        <Text
          color="#88809C"
          fontFamily="'DM Sans',  sans-serif" fontSize="14px" fontWeight="700"
        >{accountAddress?.substring(0, 5)}...{accountAddress?.substring(accountAddress?.length - 4)}</Text>
      </WalletButton>
    </ConnectedButton>
  );
};

export default React.memo(ConnectedWallet);
