import React from 'react';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import { render } from 'enzyme';

import App from '../src/components/app.jsx';
import PhotoView from '../src/components/photoview.jsx';
import Slider from '../src/components/slider.jsx';

describe('<App />', () => {

  it('renders main App', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders PhotoView and Slider', () => {
    const component = mount(<App />);
    component.find('.viewphotos').simulate('click');
    let x = component.find('.text').length
    expect(x).toBe(1);
  });

  it('unmounts PhotoView when X is clicked', () => {
    const component = mount(<App />);
    component.find('.container').simulate('click');
    component.find('.exit').simulate('click');
    let x = component.find('.outer').length
    expect(x).toBe(0);
  });

  it('changes display photo in PhotoView on forward click', () => {
    const component = mount(<PhotoView content={ {'photos':[{'url':'1'},{'url':'2'},{'url':'3'}]} }/>);
    component.find('.forward').simulate('click');
    let x = component.state().mainPhoto.url
    expect(x).toBe('2');
  });

  it('changes display photo in PhotoView on backward click', () => {
    const component = mount(<PhotoView content={ {'photos':[{'url':'1'},{'url':'2'},{'url':'3'}]} }/>);
    component.find('.back').simulate('click');
    let x = component.state().mainPhoto.url
    expect(x).toBe('3');
  });

  it('changes display photo in PhotoView on backward click', () => {
    const component = mount(<PhotoView content={ {'photos':[{'url':'1', 'desc':'a'},{'url':'2', 'desc':'a'},{'url':'3', 'desc':'a'},{'url':'4', 'desc':'a'},{'url':'5', 'desc':'a'},{'url':'6', 'desc':'a'},{'url':'7', 'desc':'a'},{'url':'8', 'desc':'a'},{'url':'9', 'desc':'a'}]} } />);
    let x = component.state().mainPhoto.url;
    component.find('.thumbnail').at(0).simulate('click');
    component.find('.thumbnail').at(1).simulate('click');
    component.find('.thumbnail').at(2).simulate('click');
    component.find('.thumbnail').at(3).simulate('click');
    component.find('.thumbnail').at(4).simulate('click');
    component.find('.thumbnail').at(5).simulate('click');
    component.find('.thumbnail').at(6).simulate('click');
    component.find('.thumbnail').at(7).simulate('click');
    component.find('.thumbnail').at(8).simulate('click');
    let y = component.state().mainPhoto.url;
    expect(x === y).toBe(false);
  });

  it('mounts the share component on click', () => {
    const component = mount(<App />);
    let x = component.state().showShareView;
    component.find('.share').simulate('click');
    let y = component.state().showShareView;
    expect(x === y).toBe(false);
  });

  it('dismounts the share component on click', () => {
    const component = mount(<App />);
    component.find('.share').simulate('click');
    component.find('.exitshare').simulate('click');
    let x = component.state().showShareView;
    expect(x).toBe(false);
  });

  it('dismounts the share component on click', () => {
    const component = mount(<App />);
    let x = component.state().showSaveView;
    component.find('.save').simulate('click');
    let y = component.state().showSaveView;
    expect(x === y).toBe(false);
  });

})
