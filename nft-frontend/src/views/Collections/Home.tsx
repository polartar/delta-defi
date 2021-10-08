import React, { useState } from 'react'
import styled from 'styled-components'
import { Container, Divider, Grid, MenuItem, Select } from '@material-ui/core'

import Page from 'components/layout/Page'
import { NFCard, Text } from 'components';
import { HOT_CARD_LIST } from './data';
import { ORDER_OPTIONS, DIRECTIONS } from '../Home/data'

const Section = styled(Container)`
  padding: 24px 0;

  .sort-by {
    display: flex;
    align-items: center;

    span {
      color: #777;
      margin-right: 8px;
    }

    hr {
      margin: 8px;
    }
  }
  .description {
    font-size: 20px;
    line-height: 26px;
    color: #000;
    margin-bottom: 1em;
    word-break: break-word;
    margin-bottom: 40px;
    max-width: 700px;
  }
`
const CustomGrid = styled(Grid)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 50%;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 33.3333%;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 25%;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 20%;
  }
`
const Title = styled.div`
  margin: 17px 20px 30px 0;
  display: flex;
  align-items: center;
  .title {
    font-weight: 500;
    font-size: 40px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    .title {
      font-size: 50px;
    }
  }
`
const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 18px;
  img {
    width: 100%;
    border-radius: 50%;
  }
`
const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px
`

const Home: React.FC = () => {
  const [orderBy, setOrderBy] = useState("Created")
  const [direction, setDirection] = useState("desc")

  return (
    <Page>
      <Section>
        <Title>
          <Avatar>
            <img src="/images/djs-of-defi.jpeg" alt="avatar" />
          </Avatar>
          <Text color={'#000000'} className="title">Seascape</Text>
        </Title>
        <Text color={'#000000'} className="description">Scapes are the official NFTs of the Seascape Network, a game platform designed around the DeFi economy. Your game, your rules Enjoy the Seascape</Text>
        <ActionBar>
          <div className="sort-by">
            <span>Sort by:</span>
            <Select
              labelId="orderby-select-label"
              id="orderby-select"
              value={orderBy}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => setOrderBy(event.target.value as string)}
            >
              {ORDER_OPTIONS.map(item => <MenuItem key={item.key} value={item.value}>{item.value}</MenuItem>)}
            </Select>
            <Divider orientation="vertical" flexItem />
            <Select
              labelId="direction-select-label"
              id="direction-select"
              value={direction}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => setDirection(event.target.value as string)}
            >
              {DIRECTIONS.map(item => <MenuItem key={item.key} value={item.key}>{item.value}</MenuItem>)}
            </Select>
          </div>
        </ActionBar>
        <Grid container spacing={4}>
          {HOT_CARD_LIST.map(card =>
            <CustomGrid key={`acit-${card.id}`} item>
              <NFCard
                image={card.image}
                title={card.title}
                content={card.content}
                price={card.price}
                handleClick={() => {}}
              />
            </CustomGrid>
          )}
        </Grid>
      </Section>
    </Page>
  )
}

export default Home
