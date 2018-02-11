/**
 * PresentationApp
 */

import React from 'react'
import Swiper from 'swiper'
import componentData from './PresentationApp.json'
import './PresentationApp.scss'

class PresentationApp extends React.PureComponent {

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
              {componentData.slides.map((slide, index)  => (
                <div className='swiper-slide' key={slide.name}>
                  <img styleName='slide-bg' src={slide.bg} alt={`Slide ${index + 1}`} />
                  <div styleName='cells'>
                    <div styleName='cell cell-1' />
                    <div styleName='cell cell-2'>
                      <img styleName='slide-fg' src={slide.fg} alt={`Slide ${index + 1}`} />
                      <div styleName='details' style={{ margin: slide.detailsMargin }}>
                        <div styleName='message' dangerouslySetInnerHTML={{ __html: slide.promo }} />
                        <button styleName='button button-next' className='swiper-button-next'>Next</button>
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
