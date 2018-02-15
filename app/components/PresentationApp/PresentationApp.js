/**
 * PresentationApp
 */

import React from 'react'
// import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Swiper from 'swiper'
import componentData from './PresentationApp.json'
import './PresentationApp.scss'

class PresentationApp extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      open: true,
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
    setTimeout(() => {
      // eslint-disable-next-line
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode)
    }, 500)
  }

  render () {
    return (
      <div styleName={
        classnames({
          'PresentationApp': true,
          'PresentationApp-closed': !this.state.open,
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
                      <img styleName='foreground foreground-desktop' style={{ margin: slide.fgMargin }} src={slide.fg} alt={`Slide ${index + 1}`} />
                      <img styleName='foreground foreground-mobile' src={slide.fg} alt={`Slide ${index + 1}`} />
                      <div styleName='details details-desktop' style={{ margin: slide.detailsMargin }}>
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

export default PresentationApp
