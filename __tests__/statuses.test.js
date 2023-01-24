// @ts-check

import fastify from 'fastify';
import init from '../server/plugin.js';
import { getTestData, prepareData, signIn } from './helpers/index.js';

describe('test statuses CRUD', () => {
  let app;
  let knex;
  let models;
  let cookies;
  const testData = getTestData();

  beforeAll(async () => {
    app = fastify({ logger: { prettyPrint: true } });
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;
  });

  beforeEach(async () => {
    await knex.migrate.latest();
    await prepareData(app);
    cookies = await signIn(app, testData.users.existing);
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('statuses'),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newStatus'),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = testData.statuses.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('statuses'),
      payload: {
        data: params,
      },
      cookies,
    });

    expect(response.statusCode).toBe(302);
    const taskStatus = await models.taskStatus.query().findOne({ name: params.name });
    expect(taskStatus).toMatchObject(params);
  });

  it('update', async () => {
    const { id } = await models.taskStatus.query().findOne({
      name: testData.statuses.existing.name,
    });
    const params = testData.statuses.new;

    const responseUpdate = await app.inject({
      method: 'PATCH',
      url: app.reverse('deleteStatus', { id }),
      cookies,
      payload: {
        data: params,
      },
    });

    expect(responseUpdate.statusCode).toBe(302);
    const updatedStatus = await models.taskStatus.query().findById(id);
    expect(updatedStatus).toMatchObject(params);
  });

  it('delete', async () => {
    const { id } = await models.taskStatus.query().findOne({
      name: testData.statuses.existing.name,
    });

    const responseDelete = await app.inject({
      method: 'DELETE',
      url: app.reverse('deleteStatus', { id }),
      cookies,
    });

    expect(responseDelete.statusCode).toBe(302);
    const deletedStatus = await models.taskStatus.query().findById(id);
    expect(deletedStatus).toBeUndefined();
  });

  afterEach(async () => {
    await knex('task_statuses').truncate();
  });

  afterAll(async () => {
   await app.close();
  });
});
