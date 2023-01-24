import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks' }, async (req, reply) => {
      if (!req.isAuthenticated(req, reply)) {
        req.flash('errors', i18next.t('flash.users.authorizationError'));
        return reply;
      }
      const taskStatuses = await app.objection.models.taskStatus.query();
      const label = await app.objection.models.label.query();
      const creatorId = await req.user.id;
      const user = await app.objection.models.user.query();
      const queryStatusId = req.query['data[statusId]'];
      const queryExecutorId = req.query['data[executorId]'];
      const queryLabelId = req.query['data[labelId]'];
      const queryCreatorId = req.query.isCreatorUser;
      const tasksFiltred = await app.objection.models.task.query()
        .withGraphJoined('status')
        .withGraphJoined('executor')
        .withGraphJoined('label')
        .withGraphJoined('creator')
        .where((builder) => {
          if (queryStatusId && queryExecutorId && queryLabelId && queryCreatorId) {
            builder.where('status:id', queryStatusId)
              .andWhere('executor:id', queryExecutorId)
              .andWhere('label:id', queryLabelId)
              .andWhere('creator:id', creatorId);
            return;
          }
          if (queryStatusId && queryExecutorId && queryLabelId) {
            builder.where('status:id', queryStatusId)
              .andWhere('executor:id', queryExecutorId)
              .andWhere('label:id', queryLabelId);
            return;
          }
          if (queryStatusId && queryLabelId && queryCreatorId) {
            builder.where('status:id', queryStatusId)
              .andWhere('label:id', queryLabelId)
              .andWhere('creator:id', creatorId);
            return;
          }
          if (queryStatusId && queryLabelId) {
            builder.where('status:id', queryStatusId)
              .andWhere('label:id', queryLabelId);
            return;
          }
          if (queryExecutorId && queryLabelId && queryCreatorId) {
            builder.where('executor:id', queryExecutorId)
              .andWhere('label:id', queryLabelId)
              .andWhere('creator:id', creatorId);
            return;
          }
          if (queryExecutorId && queryLabelId) {
            builder.where('executor:id', queryExecutorId)
              .andWhere('label:id', queryLabelId);
            return;
          }
          if (queryStatusId && queryExecutorId && queryCreatorId) {
            builder.where('status:id', queryStatusId)
              .andWhere('executor:id', queryExecutorId)
              .andWhere('creator:id', creatorId);
            return;
          }
          if (queryStatusId && queryExecutorId) {
            builder.where('status:id', queryStatusId)
              .andWhere('executor:id', queryExecutorId);
            return;
          }
          if (queryStatusId && queryCreatorId) {
            builder.where('status:id', queryStatusId)
              .andWhere('creator:id', creatorId);
            return;
          }
          if (queryStatusId) {
            builder.where('status:id', queryStatusId);
            return;
          }
          if (queryExecutorId && queryCreatorId) {
            builder.where('executor:id', queryExecutorId)
              .andWhere('creator:id', creatorId);
            return;
          }
          if (queryExecutorId) {
            builder.where('executor:id', queryExecutorId);
            return;
          }
          if (queryLabelId && queryCreatorId) {
            builder.where('label:id', queryLabelId)
              .andWhere('creator:id', creatorId);
            return;
          }
          if (queryLabelId) {
            builder.where('label:id', queryLabelId);
            return;
          }
          if (queryCreatorId) {
            builder.where('creator:id', creatorId);
          }
        });
      const tasks = await Promise.all(tasksFiltred.map(async (task) => {
        const status = await app.objection.models.taskStatus.query()
          .findById(parseInt(task.statusId, 10));
        const creatorName = await app.objection.models.user.query()
          .findById(parseInt(task.creatorId, 10));
        const executorName = await app.objection.models.user.query()
          .findById(parseInt(task.executorId, 10));
        const labelId = await app.objection.models.label.query()
          .findById(parseInt(task.labelId, 10));
        if (labelId) {
          /* eslint-disable no-param-reassign */
          task.labelId = labelId.name;
        } else {
          /* eslint-disable no-param-reassign */
          task.labelId = '';
        }
        if (executorName) {
          /* eslint-disable no-param-reassign */
          task.executorName = `${executorName.firstName} ${executorName.lastName}`;
        } else {
          /* eslint-disable no-param-reassign */
          task.executorName = '';
        }
        /* eslint-disable no-param-reassign */
        task.status = status.name;
        task.creatorName = `${creatorName.firstName} ${creatorName.lastName}`;
        return task;
      }));
      reply.render('/tasks/index', {
        taskStatuses, label, user, tasks,
      });
      return reply;
    })
    .get('/tasks/new', { name: 'newTask' }, async (req, reply) => {
      if (!req.isAuthenticated(req, reply)) {
        req.flash('errors', i18next.t('flash.users.authorizationError'));
        return reply;
      }
      const taskStatuses = await app.objection.models.taskStatus.query();
      const user = await app.objection.models.user.query();
      const label = await app.objection.models.label.query();
      const task = new app.objection.models.task();
      reply.render('/tasks/new', {
        task, taskStatuses, user, label,
      });
      return reply;
    })
    .post('/tasks', async (req, reply) => {
      if (!req.isAuthenticated(req, reply)) {
        req.flash('errors', i18next.t('flash.users.authorizationError'));
        return reply;
      }
      const taskWithStringQeries = {
        ...req.body.data, creatorId: req.user.id,
      };
      const statusId = parseInt(taskWithStringQeries.statusId, 10);
      const executorId = parseInt(taskWithStringQeries.executorId, 10);
      const labelId = parseInt(taskWithStringQeries.labelId, 10);
      const task = {
        ...taskWithStringQeries, statusId, executorId, labelId,
      };
      const taskStatuses = await app.objection.models.taskStatus.query();
      const user = await app.objection.models.user.query();
      const label = await app.objection.models.label.query();
      try {
        const validTask = await app.objection.models.task.fromJson(task);
        await app.objection.models.task.query().insert(validTask);
        if (validTask.id && validTask.labelId) {
          await app.objection.models.tasksLabels.query()
            .insert({ taskId: validTask.id, labelId: validTask.labelId });
        }
        req.flash('success', i18next.t('views.tasks.successfullyCreated'));
        reply.redirect(app.reverse('tasks'));
      } catch (error) {
        req.flash('error', i18next.t('views.tasks.createError'));
        reply.redirect('/tasks/new', {
          task, taskStatuses, user, label, errors: error.data,
        });
      }
      return reply;
    })
    .get('/tasks/:id', { name: 'viewTask' }, async (req, reply) => {
      if (!req.isAuthenticated(req, reply)) {
        req.flash('errors', i18next.t('flash.users.authorizationError'));
        return reply;
      }
      const { id } = req.params;
      const task = await app.objection.models.task.query().findById(id);
      const status = await app.objection.models.taskStatus.query()
        .findById(parseInt(task.statusId, 10));
      const creatorName = await app.objection.models.user.query()
        .findById(parseInt(task.creatorId, 10));
      const executorName = await app.objection.models.user.query()
        .findById(parseInt(task.executorId, 10));
      const label = await app.objection.models.label.query()
        .findById(parseInt(task.labelId, 10));
      if (label !== undefined) {
        task.label = label.name;
      } else {
        task.label = '';
      }
      if (executorName !== undefined) {
        task.executorName = `${executorName.firstName} ${executorName.lastName}`;
      } else {
        task.executorName = '';
      }
      task.status = status.name;
      task.creatorName = `${creatorName.firstName} ${creatorName.lastName}`;
      reply.render('/tasks/task', { task });
      return reply;
    })
    .get('/tasks/:id/edit', { name: 'editTask' }, async (req, reply) => {
      if (!req.isAuthenticated(req, reply)) {
        req.flash('error', i18next.t('views.users.authorizationError'));
        return reply;
      }
      const { id } = req.params;
      const taskStatuses = await app.objection.models.taskStatus.query();
      const user = await app.objection.models.user.query();
      const label = await app.objection.models.label.query();
      const taskById = await app.objection.models.task.query().findById(id);
      reply.render('/tasks/edit', {
        taskById, taskStatuses, user, label,
      });
      return reply;
    })
    .patch('/tasks/:id', { name: 'updateTask' }, async (req, reply) => {
      if (!req.isAuthenticated(req, reply)) {
        req.flash('error', i18next.t('views.users.authorizationError'));
        return reply;
      }
      const { id } = req.params;
      const task = new app.objection.models.task();
      const taskStatuses = await app.objection.models.taskStatus.query();
      const user = await app.objection.models.user.query();
      const label = await app.objection.models.label.query();
      task.$set({ id, ...req.body.data });
      try {
        const request = req.body.data;
        request.statusId = parseInt(request.statusId, 10);
        request.executorId = parseInt(request.executorId, 10);
        request.labelId = parseInt(request.labelId, 10);
        await task.$query().findById(id).patch(request);
        req.flash('success', i18next.t('views.statuses.updateSuccess'));
        reply.redirect(app.reverse('tasks'));
      } catch (error) {
        req.flash('error', i18next.t('views.tasks.updateError'));
        reply.redirect('/tasks/edit', {
          user, taskStatuses, label, task: { id, ...req.body.data }, errors: error.data,
        });
      }
      return reply;
    })
    .delete('/tasks/:id', { name: 'deleteTask' }, async (req, reply) => {
      if (!req.isAuthenticated(req, reply)) {
        req.flash('error', i18next.t('views.users.authorizationError'));
        return reply;
      }
      const tasks = await app.objection.models.task.query();
      const { id } = req.params;
      const taskId = await tasks.find((task) => task.id === id);
      if (parseInt(req.user.id, 10) !== parseInt(taskId.creatorId, 10)) {
        req.flash('error', i18next.t('flash.tasks.authorizationError'));
        reply.redirect(app.reverse('tasks'));
        return reply;
      }
      try {
        await app.objection.models.tasksLabels.query().delete().where('taskId', '=', `${id}`);
        await app.objection.models.task.query().deleteById(id);
        req.flash('success', i18next.t('flash.tasks.deleteTask'));
      } catch (data) {
        req.flash('error', i18next.t('flash.tasks.deleteError'));
      }
      reply.redirect(app.reverse('tasks'));
      return reply;
    });
};
