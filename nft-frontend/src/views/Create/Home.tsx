import React from 'react'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import { Text, Button } from 'components';

const Container = styled.div`
  text-align: center;
  width: 100%;
  margin: 0px auto;
  display: flex;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  height: 500px;
  flex-direction: column;

  .title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    word-break: break-word;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
  }

  .description {
    font-size: 1rem;
    line-height: 26px;
    margin-bottom: 1em;
    word-break: break-word;
  }

  .connect-wallet {
    font-weight: 500;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 72px;
    font-size: 24px;
    border-radius: 8px;
    padding: 0px 30px;
    background: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    border: 2px solid rgb(0, 0, 0);
    width: 100%;
    margin-top: 3rem;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 700px;
  }
`
const ButtonWrapper = styled.div`
`

const Home: React.FC = () => {

  return (
    <Page>
      <Container>
        <Text color={"#000000"} className="title">Sign in with your wallet</Text>
        <Text color={"#000000"} className="description">You have to login in order to create an NFT. Click the "Connect wallet" button to get started</Text>
        <ButtonWrapper>
          <Button className="connect-wallet" borderRadius="40px">Connect Wallet</Button>
        </ButtonWrapper>
      </Container>
    </Page>
  )
}

export default Home
