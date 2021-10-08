import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import styled from 'styled-components'
import { Box, Button, Checkbox, Container, Divider, Grid, Link, ListItemText, MenuItem, Select, Typography } from '@material-ui/core'

import Page from 'components/layout/Page'
import { BrandCard, NFCard, TraderItem } from 'components';
import { CARD_LIST, HOT_CARD_LIST, TRADER_LIST, CHAIN_LIST, ORDER_OPTIONS, DIRECTIONS } from './data';

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
const Title = styled(Container)`
  margin: 20px 0;
  padding: 24px 0 8px;

  .link-title {
    color: #777;
    margin-left: 30px;
    &:hover {
      color: #000;
      text-decoration: none;
    }
  }
`
const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px
`
const ShowAllButton = styled(Button)`
  border-bottom: 2px solid #000;
  border-radius: 0;
  padding: 2px 0;
  text-transform: none;
  &:hover {
    color: #fff;
    background: #000;
  }
`
const TraderBox = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background: white;
  border-radius: 16px;
  box-shadow: rgb(0 0 0 / 8%) 0px 20px 100px;
  padding: 20px 30px;

  .MuiDivider-flexItem {
    margin-left: -1px;
  }
`

const Home: React.FC = () => {
  const history = useHistory()
  const [orderBy, setOrderBy] = useState("Created")
  const [direction, setDirection] = useState("desc")
  const [chain, setChain] = useState<string[]>(["BSC"])

  const onCard = (path: string) => {
    history.push(path)
  }

  const onShowAll = () => {
    history.push('/leaderboard')
  }

  return (
    <Page>
      <Section>
        <Grid container spacing={2}>
          {CARD_LIST.map(card =>
            <Grid key={`cit-${card.id}`} item xs={12} sm={6} md={4} lg={3}>
              <BrandCard
                image={card.image}
                title={card.title}
                content={card.content}
                handleClick={() => onCard(card.path)}
              />
            </Grid>
          )}
        </Grid>
      </Section>
      <Section>
        <Title>
          <Typography variant="h4">Hot right now</Typography>
        </Title>
        <Grid container spacing={2}>
          {HOT_CARD_LIST.map(card =>
            <CustomGrid key={`hcit-${card.id}`} item>
              <NFCard
                image={card.image}
                title={card.title}
                content={card.content}
                price={card.price}
                handleClick={() => history.push(`item/${card.id}`)}
              />
            </CustomGrid>
          )}
        </Grid>
      </Section>
      <Section>
        <Title>
          <Typography variant="h4">Top traders</Typography>
          <Typography color="textSecondary">Based on the last 30 days</Typography>
        </Title>
        <ActionBar>
          <ShowAllButton onClick={onShowAll}>Show all</ShowAllButton>
        </ActionBar>
        <TraderBox component="div">
          {TRADER_LIST.map((item, index) =>
            <TraderItem
              key={`tid-${index}`}
              href="#"
              title={item.title}
              point={item.point}
              icon={item.icon}
              handleClick={() => {}}
            />
          )}
        </TraderBox>
      </Section>
      <Section>
        <Title>
          <Typography variant="h4">
            Explore
            <Link className="link-title" href="#" onClick={() => {}}>
              Ending soon
            </Link>
          </Typography>
        </Title>
        <ActionBar>
          <Select
            labelId="chain-select-label"
            id="chain-select"
            multiple
            value={chain}
            renderValue={(selected) => "Chain"}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => setChain(event.target.value as string[])}
          >
            {CHAIN_LIST.map(item =>
              <MenuItem key={item.id} value={item.title}>
                <Checkbox checked={chain.indexOf(item.title) > -1} />
                <ListItemText primary={item.title} />
              </MenuItem>
            )}
          </Select>
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
        <Grid container spacing={2}>
          {HOT_CARD_LIST.map(card =>
            <CustomGrid key={`acit-${card.id}`} item>
              <NFCard
                image={card.image}
                title={card.title}
                content={card.content}
                price={card.price}
                handleClick={() => history.push(`item/${card.id}`)}
              />
            </CustomGrid>
          )}
        </Grid>
      </Section>
    </Page>
  )
}

export default Home
