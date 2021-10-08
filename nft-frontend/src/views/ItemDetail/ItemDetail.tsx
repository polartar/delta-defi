import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Box, Button, Container, Divider, Link, Modal, Typography } from '@material-ui/core'
import LayersOutlinedIcon from '@material-ui/icons/LayersOutlined'
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined'
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined'
import { DataGrid } from '@mui/x-data-grid'

import Page from 'components/layout/Page'
import { HOT_CARD_LIST, TRADER_LIST } from 'views/Home/data.js'
import { BscIcon, ChainItem, ProfileItem } from 'components'
import Report from './components/Report'

const Section = styled(Container)`
  margin: 64px auto 0px;

  &.profile {
    background: rgba(0, 0, 0, 0.04);
    min-height: 200px;
    padding: 80px 64px 40px;
    box-sizing: border-box;
    margin-top: 160px;
    position: relative;
    margin-bottom: 200px;

    .photo {
      display: flex;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      position: absolute;
      left: 0px;
      right: 0px;
      width: 100%;
      top: -64px;

      img {
        border-radius: 50%;
        width: 128px;
        height: 128px;
        object-fit: cover;
        box-shadow: rgb(0 0 0 / 8%) 0px 20px 100px;
      }
    }
    .profile-content {
      margin-top: 32px;
      text-align: center;
    }
  }
`
const LogoArea = styled.div`
  display: flex;
  align-items: center;
  height: 424px;
`
const LogoImage = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  margin: 0px auto;

  img {
    max-height: 424px;
    box-shadow: rgb(0 0 0 / 8%) 0px 20px 100px;
  }
`
const Article = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-top: 92px;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.xxl} {
    flex-direction: row;
  }

  .art-content {
    margin-top: 52px;
  }
  
  .about {
    width: 100%;

    ${({ theme }) => theme.mediaQueries.xxl} {
      padding-right: 64px;
    }
  }
`
const TraderBox = styled(Box)`
  display: flex;
  margin-top: 20px;

  hr {
    margin: 0 15px;
  }
`
const CollectionBox = styled.div`
  background: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 8%) 0px 20px 100px;
  border-radius: 16px;
  margin-top: 32px;
    
  ${({ theme }) => theme.mediaQueries.xxl} {
    min-width: 440px;
    margin-top: 0;
  }
`
const CollectionContent = styled.div`
  padding: 32px;
  box-sizing: border-box;

  .collectible, .collectible-unit {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
  }

  .collectible {
    span {
      font-weight: 500;
      font-size: 24px;
      line-height: 100%;
    }
  }
  .collectible-unit {
    span {
      font-weight: 500;
      font-size: 16px;
      line-height: 32px;
      color: rgba(0, 0, 0, 0.48);
    }
  }

  .buy {
    display: flex;
    width: 100%;
    margin: 24px 0;
  }

  hr {
    margin-top: 24px;
  }

  .actions {
    button {
      justify-content: start;
      margin-top: 12px;
    }
  }
`
const OtherPanel = styled.div`
  margin-top: 100px;
`
const TabBar = styled.div`
  display: flex;
  margin-top: 2rem;
`
const TabItem = styled(Button)`
  margin-right: 60px;
  font-weight: 600;
  font-size: 32px;
  opacity: 0.4;
  text-transform: none;

  &:hover, &:focus, &.active {
    opacity: 1;
  }
`
const TabContent = styled.div`
  margin-top: 2rem;

  .history-table {
    background: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 8%) 0px 20px 100px;
    border-radius: 16px;
    color: black;
    padding: 20px;
    height: 500px;
  }
`
const Owners = styled.ul`
  padding: 0px;
  margin: 0px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
    
  ${({ theme }) => theme.mediaQueries.xxl} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`
const OwnerItem = styled.li`
  list-style: none;
  background: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 8%) 0px 20px 100px;
  border-radius: 16px;
  padding: 16px 16px 11px;
  height: 125px;
  box-sizing: border-box;

  .owner-content {
    height: 100%;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-flow: column;
  }
  .owner-desc {
    display: flex;
    -webkit-box-pack: end;
    justify-content: flex-end;
    align-items: center;
    color: rgba(0, 0, 0, 0.48);
  }
`

interface RouteParams {
  id: string
}
const Home: React.FC = () => {
  const { id } = useParams<RouteParams>()
  const [tabIndex, setTabIndex] = useState("owner")
  const [openModal, setOpenModal] = useState(false)

  const card = HOT_CARD_LIST.find(item => item.id === parseInt(id))
  const traderItem = TRADER_LIST.find(item => item.id === card.id)

  const rows = [
    { id: 1, col1: "Transfer", col2: "Orszagh", col3: "Aya", col4: "transaction", col5: "4 hours ago" },
  ]
  const columns = [
    { field: 'col1', headerName: 'Event', flex: 1 },
    { field: 'col2', headerName: 'From', flex: 1 },
    { field: 'col3', headerName: 'To', flex: 1 },
    { field: 'col4', headerName: 'Transaction', flex: 1 },
    { field: 'col5', headerName: 'Date', flex: 1 },
  ]

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleSubmitReport = (value) => {
    console.log('Report: ', value)
  }

  return (
    <Page>
      <Section>
        <LogoArea>
          <LogoImage>
            <img src={card.image} alt={card.title} />
          </LogoImage>
        </LogoArea>
        <Article>
          <div className="about">
            <Typography variant="h3">{card.title}</Typography>
            <TraderBox>
              <ProfileItem name={traderItem.title} type="Creator" icon={traderItem.icon} href="#" />
              <Divider orientation="vertical" flexItem />
              <ChainItem
                name="BSC"
                type="Network"
                icon={<BscIcon width="40" height="40" color="#f0b90b" font-size="24" />}
              />
            </TraderBox>
            <div className="art-content">
              <p>{card.content}</p>
            </div>
          </div>
          <CollectionBox>
            <CollectionContent>
              <div className="collectible">
                <span>Collectible</span>
                <span>0.004 BNB</span>
              </div>
              <div className="collectible-unit">
                <span>12 of 25</span>
                <span>BSC</span>
              </div>
              <div className="buy">
                <Button color="primary" variant="contained" size="large" fullWidth>Buy now</Button>
              </div>
              <ProfileItem name={traderItem.title} type="Creator" icon={traderItem.icon} href="#" />
              <Divider />
              <div className="actions">
                <Button startIcon={<LayersOutlinedIcon />} size="large" fullWidth>View on IPFS</Button>
                <Button startIcon={<AssessmentOutlinedIcon />} size="large" fullWidth>View on BscScan</Button>
                <Button startIcon={<ReportOutlinedIcon />} size="large" fullWidth onClick={() => setOpenModal(true)}>Report</Button>
              </div>
            </CollectionContent>
          </CollectionBox>
        </Article>
        <OtherPanel>
          <TabBar>
            <TabItem className={tabIndex === "owner" ? "active" : ""} onClick={() => setTabIndex("owner")}>Other editions</TabItem>
            <TabItem className={tabIndex === "owner" ? "" : "active"} onClick={() => setTabIndex("history")}>History</TabItem>
          </TabBar>
          <TabContent>
            {tabIndex === "owner" ? (
              <Owners>
                <OwnerItem>
                  <div className="owner-content">
                    <Typography variant="h6">Other owners</Typography>
                    <div className="owner-desc">
                      <span>13 not for sale</span>
                    </div>
                  </div>
                </OwnerItem>
              </Owners>
            ) : (
              <div className="history-table">
                <DataGrid rows={rows} columns={columns} />
              </div>
            )}
          </TabContent>
        </OtherPanel>
      </Section>
      <Section className="profile">
        <div className="photo">
          <img src="/images/orszagh.jpeg" alt="Orszagh" />
        </div>
        <div className="profile-content">
          <Typography variant="h5">Orszagh</Typography>
          <p>Digital Artist An artist is a person who can take something they see within and physically manifest it with their own hands for others to see. Art involves using a part of the brain that focus's on problem solving and learning how to see. Most people look at things but they do not see what they are looking at!</p>
          <Link href="#">Visit profile</Link>
        </div>
      </Section>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
      >
        <Report handleCloseModal={handleCloseModal} handleSubmitReport={handleSubmitReport} />
      </Modal>
    </Page>
  )
}

export default Home
