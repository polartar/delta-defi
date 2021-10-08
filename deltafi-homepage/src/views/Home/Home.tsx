import React from 'react'
import Page from 'components/layout/Page'

import AssetManager from './components/AssetManager'
import Investors from './components/Investors'
import DeltaFi from './components/DeltaFi'

const Home: React.FC = () => {

  return (
    <Page>
      <AssetManager />
      <DeltaFi />
      <Investors />
    </Page>
  )
}

export default Home
