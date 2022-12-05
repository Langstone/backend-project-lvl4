  import fastify from 'fastify';
  import init from '../server/plugin.js';
  // import knex from '../node_modules/knex/types/index.js';
  // import { getTestData, prepareData } from './helpers/index.js';
  
  describe('test statuses CRUD with login', () => {
    let app;
    // let knex1;
    let cookie;
    let models;
  
    beforeAll(async () => {
      app = fastify();
      await init(app);
      await app.objection.knex.migrate.latest();
    });
  
    beforeEach(async () => {
      console.log(1);
      // await knex1.migrate.latest();
      // await prepareData(app);
      // cookie = await getTestData(app);
      await app.objection.models.taskStatus.insert({ name: 'новый' });
      console.log(2);
      const responseSignIn = await app.inject({
        method: 'POST',
        url: '/session',
        payload: {
          data: {
            email: 'lawrence.kulas87@outlook.com',
            password: 'O6AvLIQL1cbzrre',
          },
        }
      });
  
      const [sessionCookie] = responseSignIn.cookies;
      const { name, value } = sessionCookie;
      cookie = { [name]: value };
    });
  
    it('GET /statuses', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/statuses',
        cookies: cookie,
      });
      expect(response.statusCode).toBe(302);
    });
  
    it('GET /statuses/new', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/statuses/new',
      });
      expect(response.statusCode).toBe(302);
    });
  
    it('GET /statuses/1/edit', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/statuses/1/edit',
      });
      expect(response.statusCode).toBe(302);
    });
  
    it('PATCH /statuses/1', async () => {
      const response = await app.inject({
        method: 'PATCH',
        url: '/statuses/1',
      });
      expect(response.statusCode).toBe(302);
    });
  
    it('DELETE /users/1', async () => {
      const response = await app.inject({
        method: 'DELETE',
        url: '/statuses/1',
      });
      expect(response.statusCode).toBe(302);
    });
  
    it('DELETE /statuses', async () => {
      await app.inject({
        method: 'DELETE',
        url: '/statuses/1',
        cookies: cookie,
      });
      const users = await app.objection.models.taskStatus.query();
      expect(users).toEqual([]);
    });
  
    it('GET /statuses', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/statuses',
        cookies: cookie,
      });
      expect(response.statusCode).toBe(200);
    });
  
    afterEach(async () => {
      const deleteAllTables = async (app) => {
        await app.objection.knex('taskStatuses').del();
      };
      await deleteAllTables(app);
      await knex('taskStatuses').truncate();
    });
  
    afterAll(async () => {
      await app.close();
    });
  });