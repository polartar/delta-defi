import React from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import { Text, MetaMaskIcon, BinanceIcon, SafepalIcon, TrustWalletIcon, WalletConnectIcon } from 'components';
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';

interface ConnectWalletDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const Container = styled.div`
  position: relative;
`;

const DialogContainer = styled.div`
  outline: none;
  background: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 8%) 0px 20px 100px;
  border-radius: 16px;
  width: 100%;
  overflow-y: auto;
  position: relative;
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 438px;
    max-height: inherit;
  }
`

const DialogContent = styled.div`
  padding: 48px 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
  text-align: center;
  .title {
    font-size: 25px;
    text-align: left;
  }
  .description {
    font-size: 20px;
    line-height: 26px;
    word-break: break-word;
    margin-bottom: 12px;
    margin-top: 32px;
  }
  .private {
    word-break: break-word;
    margin: 60px auto 0px;
    max-width: 238px;
    font-size: 16px !important;
    line-height: 19px !important;
    text-align: center !important;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    .title {
      font-size: 32px;
    }
  }
`

const CustomButton = styled.div`
    font-weight: 500;
    text-decoration: none;
    box-sizing: border-box;
    font-style: normal;
    align-items: center;
    justify-content: flex-start;
    height: 72px;
    border-radius: 8px;
    border: 2px solid rgb(0, 0, 0);
    background: transparent;
    color: rgb(0, 0, 0);
    width: 100%;
    padding: 20px 24px !important;
    text-align: left !important;
    display: flex !important;
    font-size: 24px !important;
    margin-top: 32px;
    cursor: pointer;
    &.noTop {
      margin-top: 0;
    }
    .button-title {
      margin-left: 22px;
      font-size: 24px;
    }
  }
`

const useStyles = makeStyles(theme => ({
  paper: {
    margin: 16
  }
}));

const ConnectWalletDialog: React.FC<ConnectWalletDialogProps> = ({ open, setOpen }) => {
  const classes = useStyles()

  const onClose = () => {
    setOpen(false)
  }

  return (
    <Container>
      <Dialog
        onClose={onClose}
        open={open}
        classes={{
          paper: classes.paper
        }}
      >
        <DialogContainer>
          <DialogContent>
            <Text color={"#000000"} className="title">Connect Your Wallet</Text>
            <CustomButton>
              <MetaMaskIcon />
              <Text color={"#000000"} className="button-title">MetaMask</Text>
            </CustomButton>
            <CustomButton>
              <BinanceIcon />
              <Text color={"#000000"} className="button-title">Binance Chain Wallet</Text>
            </CustomButton>
            <CustomButton>
              <SafepalIcon />
              <Text color={"#000000"} className="button-title">Safepal</Text>
            </CustomButton>
            <CustomButton>
              <TrustWalletIcon />
              <Text color={"#000000"} className="button-title">TrustWallet</Text>
            </CustomButton>
            <Text color={"#000000"} className="description">Don't see your wallet? Connect over 71 wallets through WalletConnect</Text>
            <CustomButton className="noTop">
              <WalletConnectIcon />
              <Text color={"#000000"} className="button-title">WalletConnect</Text>
            </CustomButton>
            <Text color={"#000000"} className="private">We do not own your private keys and cannot access your funds without your confirmation.</Text>
          </DialogContent>
          <CloseIcon className="close" onClick={onClose} />
        </DialogContainer>
      </Dialog>
    </Container>
  );
};

export default ConnectWalletDialog;
