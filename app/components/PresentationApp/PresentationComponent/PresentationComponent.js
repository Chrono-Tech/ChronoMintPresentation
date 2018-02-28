/**
 * PresentationApp
 */

import React from 'react'
import PropTypes from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import classnames from 'classnames'
import Swiper from 'swiper'
// eslint-disable-next-line
import packageJson from 'package.json'
import componentData from './PresentationComponent.json'
import './PresentationComponent.scss'

const COOKIE_NAME = 'chronomint-presentation-version'

class PresentationComponent extends React.PureComponent {

  static propTypes = {
    cookies: PropTypes.instanceOf(Cookies).isRequired,
    onClose: PropTypes.func,
  }

  componentWillMount () {
    const { cookies } = this.props
    const shown = cookies.get(COOKIE_NAME) === packageJson.version
    // eslint-disable-next-line
    this.setState({
      open: !shown,
    })
    if (!shown) {
      const expires = new Date()
      expires.setFullYear(expires.getFullYear() + 1)
      // eslint-disable-next-line
      cookies.set(COOKIE_NAME, packageJson.version, { path: '/', expires })
    } else {
      this.handleSignin()
    }
  }

  componentDidMount () {
    this.swiper = new Swiper(this.swiperContainer, {
      pagination: {
        el: this.swiperPagination,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
  }

  handleSignin () {
    this.setState({
      open: false,
    })
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  render () {
    return (
      <div styleName={
        classnames({
          'PresentationComponent': true,
          'PresentationComponent-closed': !this.state.open,
        })
      }
      >
        <header>
          <ul>
            <li>
              <button styleName='logo logo-desktop' onClick={() => this.handleSignin()}>
                <img src='/chronomint-presentation/img/logo-chronobank.svg' alt='ChronoBank Logo' />
              </button>
              <button styleName='logo logo-mobile' onClick={() => this.handleSignin()}>
                <img src='/chronomint-presentation/img/logo-chronobank-mobile.svg' alt='ChronoBank Logo' />
              </button>
            </li>
          </ul>
          <ul>
            <li>
              <button styleName='button' onClick={() => this.handleSignin()}>Sign In</button>
            </li>
          </ul>
        </header>
        <section>
          <div className='swiper-container' ref={(el) => { this.swiperContainer = el }}>
            <div className='swiper-wrapper'>
              {componentData.slides.map((slide, index)  => (
                <div className='swiper-slide' key={slide.name}>
                  <img styleName='background background-desktop' src={slide.bg} alt={`Slide ${index + 1}`} />
                  <img styleName='background background-mobile' src={slide.bgMobile} alt={`Slide ${index + 1}`} />
                  <div styleName='cells'>
                    <div styleName='cell cell-1 cell-desktop' />
                    <div
                      styleName='cell cell-1 cell-mobile'
                      style={{
                        height: slide.mobileTopSpacerHeight,
                      }}
                    />
                    <div styleName='cell cell-2'>
                      <img
                        styleName='foreground foreground-desktop'
                        src={slide.fg}
                        alt={`Slide ${index + 1}`}
                        style={{
                          width: slide.fgWidth,
                          transform: slide.fgTransform,
                        }}
                      />
                      <img styleName='foreground foreground-mobile' src={slide.fg} alt={`Slide ${index + 1}`} />
                      <div
                        styleName='details details-desktop'
                        style={{
                          width: slide.detailsWidth,
                          transform: slide.detailsTransform,
                        }}
                      >
                        <div styleName='message' dangerouslySetInnerHTML={{ __html: slide.promo }} />
                        <div styleName='buttons'>
                          {index === 0
                            ? null
                            : <button styleName='button button-prev' className='swiper-button-prev'>Prev</button>
                          }
                          {index === componentData.slides.length - 1
                            ? <button styleName='button' onClick={() => this.handleSignin()}>Sign In</button>
                            : <button styleName='button button-next' className='swiper-button-next'>Next</button>
                          }
                        </div>
                      </div>
                      <div styleName='details details-mobile'>
                        <div styleName='message' dangerouslySetInnerHTML={{ __html: slide.promo }} />
                        <div styleName='buttons'>
                          {index === componentData.slides.length - 1
                            ? <button styleName='button' onClick={() => this.handleSignin()}>Sign In</button>
                            : <button styleName='button button-next' className='swiper-button-next'>Next</button>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='swiper-pagination' ref={(el) => { this.swiperPagination = el }} />
          </div>
        </section>
      </div>
    )
  }
}

export default withCookies(PresentationComponent)
