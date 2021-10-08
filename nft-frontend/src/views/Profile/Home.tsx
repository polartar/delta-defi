import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import { Container, Grid, Tabs, Tab } from '@material-ui/core'

import FullPage from 'components/layout/FullPage'
import { NFCard, Text, TabPanel } from 'components';
import { PROFILE_LIST, HOT_CARD_LIST } from './data';

const Section = styled(Container)`
  padding: 24px 24px;

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
    margin-top: 51px;
    max-width: 800px;
  }

  .profile-tab {
    margin: 2em 0;
    .MuiTab-root {
      font-size: 32px;
      color: rgba(0, 0, 0, 0.4);
      text-transform: unset;
    }
    .MuiTab-textColorPrimary.Mui-selected {
      color: #000000;
    }
    .MuiTabs-indicator {
      display: none;
    }
  }
`
const ImageContainer = styled.div`
  overflow: hidden;
  height: 0;
  padding-top: 25%;
  position: relative;
  object-fit: contain;
  z-index: 1;
`
const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgb(0, 0, 0, 0.1);
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
const ContentDiv = styled.div`
  padding: 0 0 100px 0;
  z-index: 2;
  position: relative;
  display: flex;
  margin-top: 0px;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.xxl} {
    flex-direction: row;
    margin-top: -80px;
  }
`
const ImageDiv = styled.div`
  width: 100%;
  height: 128px;
  margin-right: 40px;
  text-align: center;
  img {
    width: 128px;
    height: 128px;
    border-radius: 50%!important;
    object-fit: cover;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 200px;
    height: 200px;
    img {
      width: 200px;
      height: 200px;
    }
  }
`
const TextWrapper = styled.div`
  margin-top: 40px;
  ${({ theme }) => theme.mediaQueries.xxl} {
    margin-top: 100px;
  }
`
const TextTitleWrapper = styled.div`
  position: relative;
  display: flex;
  .big {
    font-weight: 500;
    font-size: 56px;
    word-break: break-word;
    font-size: 48px;
    margin-right: 5px;
  }
`
const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.xxl} {
    align-items: center;
    flex-direction: row;
  }
`
const FlexSpan = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  line-height: 26px;
  color: black;
  ${({ theme }) => theme.mediaQueries.xxl} {
    &:not(:first-child) {
      margin-left: 38px;
    }
  }
`

interface RouteParams {
  profileId: string
}

const Home: React.FC = () => {
  const { profileId } = useParams<RouteParams>()
  const findProfile = PROFILE_LIST.find((profile) => profile.id === profileId)

  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <FullPage>
      <ImageContainer>
        <ImageWrapper>
          {findProfile && findProfile.overlayImage && (
            <img
              alt="banner"
              src={findProfile.overlayImage}
            />
          )}
        </ImageWrapper>
      </ImageContainer>
      <Section>
        <ContentDiv>
          <ImageDiv>
          {findProfile && findProfile.image && (
            <img src={findProfile.image} alt="" />
          )}
          </ImageDiv>
          <TextWrapper>
            <TextTitleWrapper>
              <Text color={'#000000'} className="big">{findProfile.title}</Text>
              <svg height="32" width="32" preserveAspectRatio="xMidYMin meet" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.639 13.487V6.511c0-.783-.402-1.506-1.056-1.897L9.75 1.126a2.054 2.054 0 0 0-2.113 0L1.806 4.614A2.203 2.203 0 0 0 .75 6.511v6.976c0 .783.402 1.506 1.056 1.897l5.83 3.488c.654.39 1.46.39 2.114 0l5.831-3.488a2.205 2.205 0 0 0 1.058-1.897z" fill="#000"></path><path d="M7.588 14.172c-.281 0-.55-.116-.749-.32L3.915 10.82a1.125 1.125 0 0 1 0-1.55 1.033 1.033 0 0 1 1.496 0l2.177 2.256 4.39-4.55a1.033 1.033 0 0 1 1.496 0 1.125 1.125 0 0 1 0 1.55l-5.137 5.326c-.199.206-.468.32-.749.32z" fill="#fff"></path></svg>
            </TextTitleWrapper>
            <FlexDiv>
              <FlexSpan>{findProfile.id?.substring(0, 5)}...{findProfile.id?.substring(findProfile.id?.length - 4)}
                <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 8 }}>
                  <path d="M9.84 1.193H1.194v8.633H9.84V1.193z" stroke="#000" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="square"></path>
                  <path d="M13.343 6.174h1.463v8.633H6.16v-1.484" stroke="#000" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="square"></path>
                </svg>
              </FlexSpan>
              <FlexSpan>
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="m19.898 6.214.318.925c.293-.036.584-.085.872-.15a8.107 8.107 0 0 1-.909.764l-.218.158.011.27.002.031c.007.167.014.332.014.493a11.498 11.498 0 0 1-1.82 6.228l.42.27-.42-.27c-3.067 4.781-9.079 6.531-14.14 4.4a9.069 9.069 0 0 0 4.576-1.861l1.11-.865-1.407-.03a3.651 3.651 0 0 1-3.109-1.864l.127.002c.49 0 .98-.054 1.458-.162l.008-.973a3.35 3.35 0 0 1-2.53-2.799c.29.072.615.11.92.12l.263-.934A4.215 4.215 0 0 1 3.35 6.854c.003-.403.071-.801.201-1.18a12.497 12.497 0 0 0 8.553 4.006l.662.033-.15-.645a3.73 3.73 0 0 1 6.35-3.393l.19.2.27-.053a8.921 8.921 0 0 0 1.4-.396 3.74 3.74 0 0 1-.928.788z" fill="#000" stroke="#000"></path>
                </svg>
                <a href="https://twitter.com/SatorSAO" target="_blank" rel="noopener noreferrer">@SatorSAO</a>
              </FlexSpan>
              <FlexSpan>
                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.99 4.85c-2.84 0-5.14 2.3-5.14 5.13s2.3 5.13 5.14 5.13 5.14-2.3 5.14-5.13c0-2.84-2.3-5.13-5.14-5.13zm0 8.46c-1.84 0-3.34-1.49-3.34-3.33s1.49-3.33 3.34-3.33c1.85 0 3.34 1.49 3.34 3.33 0 1.83-1.5 3.33-3.34 3.33zm5.34-9.85c-.66 0-1.2.54-1.2 1.2 0 .66.54 1.2 1.2 1.2.66 0 1.2-.54 1.2-1.2 0-.66-.54-1.2-1.2-1.2zm4.61 2.44c-.01-.84-.17-1.67-.47-2.46A5.12 5.12 0 0 0 16.55.52c-.78-.29-1.6-.45-2.43-.47C13.05.01 12.71 0 10 0S6.94 0 5.88.06c-.83.02-1.66.17-2.43.46A5.107 5.107 0 0 0 .52 3.44c-.29.78-.45 1.6-.47 2.43C.01 6.93 0 7.27 0 9.98c0 2.71 0 3.05.06 4.11.02.83.17 1.65.47 2.43a5.12 5.12 0 0 0 2.92 2.92c.78.3 1.6.47 2.43.5 1.07.05 1.4.06 4.12.06s3.06 0 4.12-.06c.83-.02 1.65-.17 2.43-.47a5.12 5.12 0 0 0 2.92-2.92c.29-.78.45-1.6.47-2.43.05-1.07.06-1.41.06-4.11s0-3.05-.06-4.11zm-1.81 8.11h-.01c-.01.64-.12 1.27-.35 1.87-.34.87-1.03 1.56-1.9 1.9-.59.22-1.22.34-1.85.34-1.06.05-1.35.06-4.06.06-2.71 0-2.98 0-4.06-.06-.64 0-1.26-.12-1.86-.34a3.283 3.283 0 0 1-1.91-1.9c-.22-.59-.34-1.22-.35-1.85-.05-1.05-.06-1.35-.06-4.05 0-2.7 0-2.98.06-4.05.02-.64.13-1.27.35-1.87a3.34 3.34 0 0 1 1.91-1.9c.6-.22 1.22-.34 1.86-.35 1.06-.05 1.35-.06 4.06-.06 2.71 0 2.98 0 4.06.06.63.01 1.26.12 1.85.34.87.34 1.56 1.03 1.9 1.9.22.59.34 1.22.35 1.85.05 1.05.06 1.35.06 4.05 0 2.71 0 3-.05 4.06z" fill="#000"></path>
                </svg>
                <a href="https://instagram.com/SatorSAO" target="_blank" rel="noopener noreferrer">@SatorSAO</a>
              </FlexSpan>
            </FlexDiv>
            <Text color={'#000000'} className="description">{findProfile.content}</Text>
          </TextWrapper>
        </ContentDiv>
        <Tabs
          value={value}
          textColor="primary"
          onChange={handleChange}
          aria-label="tabs"
          className="profile-tab"
        >
          <Tab label="For Sale" />
          <Tab label="All Items" />
        </Tabs>
        <TabPanel value={value} index={0}>
          {findProfile.cardList.length > 0
          ?
            <Grid container spacing={4}>
              {HOT_CARD_LIST.map(card =>
                <CustomGrid key={`acit-${card.id}`} item>
                  <NFCard
                    image={card.image}
                    title={card.title}
                    content={card.content}
                    price={card.price}
                    handleClick={() => { }}
                  />
                </CustomGrid>
              )}
            </Grid>
          :
            <>
              No collectibles found.
            </>
          }
        </TabPanel>
        <TabPanel value={value} index={1}>
          No collectibles found.
        </TabPanel>
      </Section>
    </FullPage>
  )
}

export default Home
