// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/statuses', { name: 'statuses' }, async (req, reply) => {
      if (!req.isAuthenticated(req, reply)) {
        req.flash('error', i18next.t('flash.users.authorizationError'));
        return reply;
      };
      const taskStatuses = await app.objection.models.taskStatus.query();
      reply.render('statuses/index', { taskStatuses });
      return reply;
    })
    .get('/statuses/new', { name: 'newStatus' }, (req, reply) => {
      const status = new app.objection.models.taskStatus();
      reply.render('/statuses/new', { status });
    })
    .get('/statuses/:id/edit', { name: 'editStatus'}, async (req, reply) => {
      if (!req.isAuthenticated(req, reply)) {
        req.flash('error', i18next.t('views.users.authorizationError'));
        return reply;
      };
      const { id } = req.params;
      const status = await app.objection.models.taskStatus.query().findById(id);
      reply.render('/statuses/edit', { status });
      return reply;
    })
    .patch('/statuses/:id', { name: 'updateStatus' }, async (req, reply) => {
      if (!req.isAuthenticated(req, reply)) {
        req.flash('error', i18next.t('views.users.authorizationError'));
        return reply;
      };
      const { id } = req.params;
      try {
        const status = new app.objection.models.taskStatus();
        status.$set({ id, ...req.body.data });
        await status.$query().findById(id).patch(req.body.data);
        req.flash('success', i18next.t('views.statuses.updateSuccess'));
        reply.redirect('/statuses');
      }
      catch (error) {
        req.flash('error', i18next.t('views.statuses.updateError'));
        reply.render('/statuses/edit', { status: { id, ...req.body.data }, errors: error.data });
      }
      return reply;
    })
    .post('/statuses', async (req, reply) => {
      if (!req.isAuthenticated(req, reply)) {
        req.flash('error', i18next.t('flash.users.authorizationError'));
        return reply;
      };  
      try {
        const validStatus = await app.objection.models.taskStatus.fromJson(req.body.data);
        await app.objection.models.taskStatus.query().insert(validStatus);
        req.flash('success', i18next.t('views.statuses.successfullyCreated'));
        reply.redirect('/statuses');
      } 
      catch(error) {
        req.flash('error', i18next.t('views.statuses.createError'));
        reply.render('/statuses/new', { errors: error });
      }
      return reply;
    })
    .delete('/statuses/:id', { name: 'deleteStatus' }, async (req, reply) => {
      if (!req.isAuthenticated(req, reply)) {
        req.flash('error', i18next.t('flash.users.authorizationError'));
        return reply;
      };
      const { id } = req.params;
      try {
        await app.objection.models.taskStatus.query().deleteById(id);
        req.flash('success', i18next.t('flash.statuses.deleteStatus'));
      }
      catch(data) {
        req.flash('error', i18next.t('flash.statuses.deleteError'));
      }
      reply.redirect(app.reverse('statuses'));
      return reply;
    })
};
