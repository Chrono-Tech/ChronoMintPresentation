import React from 'react'
import PropTypes from 'prop-types'
import { CookiesProvider } from 'react-cookie'
import PresentationComponent from './PresentationComponent'
import './PresentationApp.scss'

class PresentationApp extends React.PureComponent {

  static propTypes = {
    applicationContainer: PropTypes.instanceOf(Element),
  }

  handleClose () {
    setTimeout(() => {
      // eslint-disable-next-line
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode)
      if (this.props.applicationContainer) {
        this.props.applicationContainer.style.display = null
      }
    }, 500)
  }

  render () {
    if (this.props.applicationContainer) {
      this.props.applicationContainer.style.display = 'none'
    }
    return (
      <CookiesProvider>
        <PresentationComponent onClose={() => this.handleClose()} />
      </CookiesProvider>
    )
  }
}

export default PresentationApp
