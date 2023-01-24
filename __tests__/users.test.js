// @ts-check

import _ from 'lodash';
import fastify from 'fastify';
import init from '../server/plugin.js';
import encrypt from '../server/lib/secure.cjs';
import { truncateAllTables, getTestData, prepareData, signIn } from './helpers/index.js';

describe('test users CRUD', () => {
  let app;
  let knex;
  let models;
  const testData = getTestData();

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;
    await knex.migrate.latest();
  });

  beforeEach(async () => {
    await prepareData(app);
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('users'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newUser'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = testData.users.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);
    const expected = {
      ..._.omit(params, 'password'),
      passwordDigest: encrypt(params.password),
    };
    const user = await models.user.query().findOne({ email: params.email });
    expect(user).toMatchObject(expected);
  });

  it('edit', async () => {
    const cookies = await signIn(app, testData.users.existing);

    const currentUser = await models.user.query()
      .findOne({ email: testData.users.existing.email });
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editUser', { id: currentUser.id }),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('update', async () => {
    const cookies = await signIn(app, testData.users.existing);

    const currentUser = await models.user.query()
      .findOne({ email: testData.users.existing.email });
    const params = testData.users.new;
    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('updateUser', { id: currentUser.id }),
      cookies,
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);
    const expected = {
      ..._.omit(params, 'password'),
      passwordDigest: encrypt(params.password),
    };
    const user = await models.user.query().findById(currentUser.id);
    expect(user).toMatchObject(expected);
  });

  it('delete', async () => {
    const cookie = await signIn(app, testData.users.deleted);

    const currentUser = await models.user.query()
      .findOne({ email: testData.users.deleted.email });

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('deleteUser', { id: currentUser.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);
    const user = await models.user.query().findById(currentUser.id);

    expect(user).toBeUndefined();
  });

  afterEach(async () => {
    await truncateAllTables(app);
  });

  afterAll(async () => {
    await app.close();
  });
});