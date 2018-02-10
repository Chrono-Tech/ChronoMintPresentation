/**
 * PresentationApp
 */

import React from 'react'
import Swiper from 'swiper'
import './PresentationApp.scss'

class PresentationApp extends React.PureComponent {

  componentDidMount () {
    this.swiper = new Swiper(this.swiperContainer, {
      pagination: {
        el: this.swiperPagination,
      },
    })
  }

  render () {
    return (
      <div styleName='PresentationApp'>
        <header>
          <ul>
            <li>
              <a styleName='logo' href='/'>
                <img src='/static/img/logo-chronobank.svg' alt='ChronoBank Logo' />
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a styleName='button' href='/'>Sign In</a>
            </li>
          </ul>
        </header>
        <section>
          <div className='swiper-container' ref={(el) => { this.swiperContainer = el }}>
            <div className='swiper-wrapper'>
              <div className='swiper-slide'>
                <img styleName='slide-bg' src='/static/img/slides/slide-01-bg.jpg' alt='Slide 01' />
                <div styleName='cells'>
                  <div styleName='cell cell-1' />
                  <div styleName='cell cell-2'>
                    <img styleName='slide-fg' src='/static/img/slides/slide-01-fg.svg' alt='Slide 01' />
                  </div>
                </div>
              </div>
              <div className='swiper-slide'>
                <img styleName='slide-bg' src='/static/img/slides/slide-02-bg.jpg' alt='Slide 02' />
                <div styleName='cells'>
                  <div styleName='cell cell-1' />
                  <div styleName='cell cell-2'>
                    <img styleName='slide-fg' src='/static/img/slides/slide-02-fg.svg' alt='Slide 02' />
                  </div>
                </div>
              </div>
            </div>
            <div className='swiper-pagination' ref={(el) => { this.swiperPagination = el }} />
          </div>
        </section>
      </div>
    )
  }
}

export default PresentationApp
