import app from '../server/app.js';
import mongoose from 'mongoose';
import request from 'supertest';

/**
 * @jest-environment node
 */

describe('Test the root path', () => {
  test('It should response the GET method', (done) => {
    return request(app).get("/api/listings/1/photos").then(response => {
      console.log(response.statusCode);
      expect(response.statusCode).toBe(200)
    }).then(() => { done() }).catch(err => console.log(err))
  });
})
