/**
 * Tests for PresentationApp
 */

import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import PresentationApp from './'
import { getData } from '../../../internals/utils'

let data = getData('PresentationApp')

describe('<PresentationApp />', () => {
  it('Renders an empty PresentationApp', () => {
    const wrapper = mount(<PresentationApp />)
    expect(wrapper.find(PresentationApp)).to.have.length(1)
  })

  it('Renders PresentationApp with data', () => {
    const wrapper = mount(<PresentationApp {...data} />)
    expect(wrapper.find(PresentationApp)).to.have.length(1)
  })
})
