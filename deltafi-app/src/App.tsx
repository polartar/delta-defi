import React, { lazy } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import Amplify, { Analytics } from 'aws-amplify'

import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import PageLoader from 'components/PageLoader'
import Header from 'components/Header'
import Footer from 'components/Footer'

import awsconfig from './aws-exports'
import GlobalStyle from './style/Global'

import Pool from 'views/Pool';

Amplify.configure(awsconfig)
Analytics.autoTrack('event', {
  enable: true,
  events: ['click'],
  selectorPrefix: 'data-amp-analytics-',
  provider: 'AWSPinpoint',
  attributes: {
    page: 'page'
  }
})
Analytics.record({ name: 'App'})

const Farm = lazy(() => import('./views/Farm'))
const Swap = lazy(() => import('./views/Swap'))

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <SuspenseWithChunkError fallback={<PageLoader />}>
        <Switch>
          <Redirect exact from="/" to="/swap" />
          <Route path="/swap" exact component={Swap} />
          <Route path="/pools" exact component={Pool} />
          <Route path="/farms" exact component={Farm} />
          <Redirect from="*" to="/pools" />
        </Switch>
      </SuspenseWithChunkError>
      <Footer />
    </BrowserRouter>
  )
}

export default React.memo(App)