import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import MenuIcon from '@material-ui/icons/Menu';

import { Button, ConnectWalletDialog, TermsServiceDialog } from 'components';

const Container = styled.div`
	display: block;
`

const TermsPolicyContainer = styled.div`
  text-align: center;
  padding: 10px;
  background: #000;
  color: #fff;
`

const TermsPolicy = styled.div`
  width: 70%;
  text-align: center;
  margin: 0 auto;
  .custom-link {
    font-size: 16px;
    color: white;
    text-decoration: underline 3px rgb(255, 255, 255);
    padding: 4px 6px 0px 6px;
    font-size: 16px;
    text-underline-offset: 5px;
    line-height: 32px;
    display: inline-flex;
    &:hover {
      box-shadow: none;
      color: #fff;
      background: #000;
      text-decoration: none;
    }
  }
`

const HeaderDivWrapper = styled.div`
  height: 80px;
  color: #000;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 5;
  padding: 0 24px;
  .connect-wallet {
    height: 40px;
    font-size: 20px;
    padding: 0 20px;
    background: #000;
    color: #fff;
    border: 2px solid #000;
    margin-left: 56px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    padding: 0 40px;
  }
`

const DesktopHeaderDiv = styled.div`
  display: none;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .home-link {
    font-weight: 500;
    font-size: 24px;
    color: #000;
    text-decoration: none;
    margin-left: 56px;
  }
  .create {
    font-weight: 500;
    font-size: 24px;
    color: #000;
    text-decoration: none;
    margin-left: 16px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    display: flex;
    .create {
      margin-left: 56px;
    }
  }
`

const MobileHeaderDiv = styled.div`
	flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .connect-wallet {
    margin-left: 16px;
  }
  .menu-button {
    font-size: 40px;
    margin-left: 16px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-left: 16px;
  ${({ theme }) => theme.mediaQueries.xxl} {
    margin-left: 56px;
  }
`

const Input = styled.input`
  color: #000;
  background: #f0f0f0;
  border-radius: 40px;
  padding: 4px 20px!important;
  height: 30px;
  width: 100%;
  font-size: 16px;
  line-height: 26px;
  position: relative;
  border: 2px solid rgba(0, 0, 0, 0.01);
  border-color: transparent!important;
  outline: none;
`

const Header: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [openTerms, setOpenTerms] = useState(true)
  
  return (
    <Container>
      <TermsPolicyContainer>
        <TermsPolicy>
          Please read our
          <Link to={'/terms-of-service'} onClick={() => setOpenTerms(true)} className="custom-link" >Terms of Service</Link>.
          <Link to={'/privacy-policy'} className="custom-link">Privacy Policy</Link>
        </TermsPolicy>
      </TermsPolicyContainer>
      <HeaderDivWrapper>
        <MobileHeaderDiv>
          <InputWrapper>
            <Input type="text" placeholder="Search for creator or collectible" value="" />
          </InputWrapper>
          <Button className="connect-wallet" borderRadius="40px" onClick={() => setOpen(true)}>Connect</Button>
          <MenuIcon className="menu-button" />
        </MobileHeaderDiv>
        <DesktopHeaderDiv>
          <Link to={'/'} className="home-link" >MarketPlace</Link>
          <InputWrapper>
            <Input type="text" placeholder="Search for creator or collectible" value="" />
          </InputWrapper>
          <nav>
            <Link to={'/create'} className="create" >Create</Link>  
            <Button className="connect-wallet" borderRadius="40px" onClick={() => setOpen(true)}>Connect Wallet</Button>
          </nav>
        </DesktopHeaderDiv>
      </HeaderDivWrapper>
      <ConnectWalletDialog open={open} setOpen={setOpen} />
      <TermsServiceDialog open={openTerms} setOpen={setOpenTerms} />
    </Container>
  )
}

export default Header
