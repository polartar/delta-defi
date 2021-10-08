import React, { lazy } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'

import useEagerConnect from 'hooks/useEagerConnect';

import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import PageLoader from 'components/PageLoader'
import Header from 'components/Header'

import GlobalStyle from './style/Global'

const Home = lazy(() => import('./views/Home'))
const Create = lazy(() => import('./views/Create'))
const Collections = lazy(() => import('./views/Collections'))
const Profile = lazy(() => import('./views/Profile'))
const ItemDetail = lazy(() => import('./views/ItemDetail'))
const LeaderBoard = lazy(() => import('./views/LeaderBoard'))

const App: React.FC = () => {
  useEagerConnect()
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <SuspenseWithChunkError fallback={<PageLoader />}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create" exact component={Create} />
          <Route path={`/collections/:collectionId`} exact component={Collections} />
          <Route path={`/profile/:profileId`} exact component={Profile} />
          <Route path="/item/:id" exact component={ItemDetail} />
          <Route path="/leaderboard" exact component={LeaderBoard} />
          <Redirect from="*" to="/" />
        </Switch>
      </SuspenseWithChunkError>
    </BrowserRouter>
  )
}

export default React.memo(App)