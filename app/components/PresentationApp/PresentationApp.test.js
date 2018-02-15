/**
 * Tests for PresentationComponent
 */

import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import PresentationComponent from './'
import { getData } from '../../../../internals/utils'

let data = getData('PresentationComponent')

describe('<PresentationComponent />', () => {
  it('Renders an empty PresentationComponent', () => {
    const wrapper = mount(<PresentationComponent />)
    expect(wrapper.find(PresentationComponent)).to.have.length(1)
  })

  it('Renders PresentationComponent with data', () => {
    const wrapper = mount(<PresentationComponent {...data} />)
    expect(wrapper.find(PresentationComponent)).to.have.length(1)
  })
})
