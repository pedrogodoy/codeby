import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database';

describe("Claps", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();

    await request(app).post("/articles")
      .send({
        title: 'test article',
        text: 'lorem ipsum'
      });

    await request(app).post("/users")
      .send({
        name: 'name',
        email: 'test@test.com'
      })
  });

  afterAll(async() => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a row in table clap", async() => {
    const response = await request(app).post("/articles/claps")
      .send({
        claps: 30
      });

      expect(response.status).toBe(200);
  });

  it("Should not be able to send claps bigger than 50", async () => {
    const response = await request(app).post("/articles/claps")
      .send({
        claps: 60
      });

    expect(response.status).toBe(400);
  });


})