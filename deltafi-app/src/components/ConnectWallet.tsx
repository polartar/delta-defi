import React from 'react';
import FocusLock from 'react-focus-lock';
import styled from 'styled-components'

import { Button } from "components";
import { Variant } from 'components/Button/types'

import Menu from "./BurgerMenu/Menu";

import { useModal, useFetchModal } from 'store/hooks';

interface Props {
  primary?: Variant;
}
const DesktopDiv = styled.div`
  display: none;
  ${({ theme }) => theme.mediaQueries.xxl} {
		display: flex;
  }
  .connect-wallet {
    font-weight: 500;
    font-size: 16px;
    line-height: 45px;
    border-radius: 6px;
    height: 50px;
  }
`
const MobileDiv = styled.div`
  display: flex;
  margin: 0 5px;
  ${({ theme }) => theme.mediaQueries.xxl} {
		display: none;
  }
`
const CustomBtn = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #F43F5E;
  display: flex;
  justify-content: center;
  align-items: center;

  .btn-icon {
    width: 18px;
    height: 16px;
    margin-right: 0;
  }
  ${({ theme }) => theme.mediaQueries.md} {
		width: 50px;
    height: 50px;
    .btn-icon {
      width: 25px;
      height: 23px;
    }
  }
`
const Img = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`

const ConnectWallet: React.FC<Props> = ({primary}) => {
  const { headerOpen } = useModal()
  const { setHeaderOpen } = useFetchModal()

  return (
    <div>
      <FocusLock disabled={!headerOpen}>
        <DesktopDiv>
          <Button className="connect-wallet" variant={primary} onClick={() => setHeaderOpen(!headerOpen)} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Header, target: ConnectWallet">
            <Img src={'/images/connect-img.png'} alt="Connect"/>
            CONNECT WALLET
          </Button>
        </DesktopDiv>
        <MobileDiv>
          <CustomBtn onClick={() => setHeaderOpen(!headerOpen)} data-amp-analytics-on="click" data-amp-analytics-name="click" data-amp-analytics-attrs="page: Header, target: ConnectWallet">
            <Img className="btn-icon" src={'/images/connect-img.png'} alt="Connect"/>
          </CustomBtn>
        </MobileDiv>
        <Menu open={headerOpen} setOpen={setHeaderOpen}/>
      </FocusLock>
    </div>
  );
};

export default React.memo(ConnectWallet);
