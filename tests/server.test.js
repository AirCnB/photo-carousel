import app from '../server/app.js';
import mongoose from 'mongoose';
import request from 'supertest';

/**
 * @jest-environment node
 */

describe('Test the root path', () => {
  test('It should response the GET method', () => {
    return request(app).get("/photos/19/").then(response => {
      console.log(response.statusCode);
      expect(response.statusCode).toBe(200)
    }).catch(err => console.log(err))
  });
})
