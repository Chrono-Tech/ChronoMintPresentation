import React from 'react'
import { CookiesProvider } from 'react-cookie'
import PresentationComponent from './PresentationComponent'

class PresentationApp extends React.PureComponent {
  render () {
    return (
      <CookiesProvider>
        <PresentationComponent />
      </CookiesProvider>
    )
  }
}

export default PresentationApp
