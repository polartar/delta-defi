import React from 'react'
import styled from 'styled-components'
import { Container,  } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Page from 'components/layout/Page'
import { Text } from 'components';
import { TABLE_DATA, CONTRIBUTORS } from './data'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    '& .MuiTableCell-root': {
      fontSize: 20,
      padding: '20px 0'
    },
    '& .id': {
      fontSize: 26,
      padding: '20px 25px'
    },
    '& th': {
      fontSize: '14px !important',
      color: 'rgba(0, 0, 0, 0.48)',
    },
  },
});

const Section = styled(Container)`
  .page-title {
    margin-top: 60px;
    font-size: 56px;
    text-align: center;
  }
  .description {
    margin-top: 43px;
    font-size: 24px;
    line-height: 26px;
    color: #000;
    word-break: break-word;
    text-align: center;
    margin-bottom: 80px;
  }
  .memo {
    margin-bottom: 1em;
    word-break: break-word;
    font-size: 16px;
    text-align: center;
    color: rgba(0, 0, 0, 0.4);
    max-width: 700px;
    margin: 0 auto;
    margin-top: 15px;
  }
  .contributor-chart {
    margin-top: 96px;
    margin-bottom: 83px;
    font-size: 24px;
    text-align: center;
  }
`

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.xxl} {
    align-items: center;
    flex-direction: row;
  }
  img {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    background: black;
    border-radius: 30px;
    margin-right: 12px;
    overflow: hidden;
  }
`

const FlexWrapperDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 120px;
  text-align: center;
`

const ContributorDiv = styled.div`
  background: #ffffff;
  box-shadow: 0px 20px 100px rgb(0 0 0 / 8%);
  border-radius: 16px;
  padding: 12px 21px;
  margin: 12px;
`

const ContributorLink = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    max-height: 100%;
    object-fit: cover;
    margin-right: 12px;
  }
  span {
    margin: 0;
    font-weight: 500;
    font-size: 20px;
    color: black;
    overflow: hidden;
    word-break: break-all;
  }
`

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <Page>
      <Section>
        <Text color={'#000000'} className="page-title">Top traders</Text>
        <Text color={'#000000'} className="description">
          <span>FINE Traders Program: The top 10 users with the highest monthly trading volume will share a pool of $1000 $FINE in proportion to their volume. <br /><br />
          The first reward cycle will commence July 1st, 2021 with the payouts starting the month after.</span>
        </Text>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center"></TableCell>
                <TableCell align="left">Contributor</TableCell>
                <TableCell align="left">Total volumn past 30d</TableCell>
                <TableCell align="left">Rewards received ($FINE)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {TABLE_DATA.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row" className="id" align="center">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">
                    <FlexDiv>
                      <img src={row.image} alt="contributor" />
                      <Text color={'#000000'} className="contributor">{row.contributor}</Text>
                    </FlexDiv>
                  </TableCell>
                  <TableCell align="left">{row.total}</TableCell>
                  <TableCell align="left">{row.reward}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Text color={'#000000'} className="memo">The leaderboard is calculated every day based on the past 30 days. Given this, note that the user ranks can still change throughout the month up until payout day.</Text>
        <Text color={'#000000'} className="contributor-chart">These contributors just missed the chart:</Text>
        <FlexWrapperDiv>
          {CONTRIBUTORS.map((contributor, index) => (
            <ContributorDiv key={index}>
              <ContributorLink>
                <img src={contributor.image} alt="chart" />
                <span>{contributor.name}</span>
              </ContributorLink>
            </ContributorDiv>
          ))}
        </FlexWrapperDiv>
      </Section>
    </Page>
  )
}

export default Home
