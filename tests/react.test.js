import React from 'react';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import { render } from 'enzyme';
import request from 'supertest';

import App from '../src/components/app.jsx';
import PhotoView from '../src/components/photoview.jsx';
import Slider from '../src/components/slider.jsx';
// import app from '../server/server.js';
//const app = require('../server/server')

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

  it('changes display photo in PhotoView on arrow key press', () => {
    const component = mount(<PhotoView content={ {'photos':[{'url':'1'},{'url':'2'},{'url':'3'}]} }/>);
    console.log(component.find('document'))
    // let y = component.state().mainPhoto.url
    // component.find('.popup').simulate('keydown', {key: 'ArrowRight'});
    // let x = component.state().mainPhoto.url
    // console.log(x)
    // console.log(y)
    //expect(x).toBe('3');
  });

})

// describe('GET aircnb/:id', () => {
//   test('should respond with status code 200', () => {
//     return request(app)
//       .get('/aircnb/1')
//       .expect(200);
//   });
// })

// describe('Test the root path', () => {
//   test('It should response the GET method', () => {
//     return request(app).get("/photos/1").then(response => {
//       expect(response.statusCode).toBe(200)
//     })
//   });
// })
