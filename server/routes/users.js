// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = await app.objection.models.user.query();
      reply.render('users/index', { users });
      return reply;
    })
    .get('/users/new', { name: 'newUser' }, (req, reply) => {
      const user = new app.objection.models.user();
      reply.render('users/new', { user });
    })
    .get('/users/:id/edit', { name: 'editUser' }, async (req, reply) => {
      if (!req.isAuthenticated(req, reply)) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect('/');
        return reply;
      }
  
      const { id } = req.params;
      if (String(req.user.id) !== id) {
        req.flash('error', i18next.t('flash.users.authorizationError'));
        reply.redirect(app.reverse('users'));
        return reply;
      }
      const user = await app.objection.models.user.query().findById(id);
      reply.render('users/edit', { user });
      return reply;
    })
    .patch('/users/:id', { name: 'updateUser' }, async (req, reply) => {
      if(!req.isAuthenticated(req, reply)) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect('/');
        return reply;
      }

      const user = new app.objection.models.user();

      try {
        user.$set(req.user);
        await user.$query().patch(req.body.data);
        req.flash('success', i18next.t('flash.users.edit'));
        reply.redirect(app.reverse('users'));
      }
      catch (data) {
        req.flash('error', i18next.t('flash.users.editError'));
        reply.render(`users/edit`, { user, errors: data.data });
      }

      return reply;
    })
    .post('/users', async (req, reply) => {
      const user = new app.objection.models.user();
      user.$set(req.body.data);

      try {
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect('/');
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user, errors: data });
      }

      return reply;
    })
    .delete('/users/:id', { name: 'deleteUser' }, async (req, reply) => {
      if(!req.isAuthenticated(req, reply)) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect('/');
        return reply;
      }

      const { id } = req.params;
      if(String(req.user.id) !== id) {
        req.flash('error', i18next.t('flash.users.authorizationError'));
        reply.redirect(app.reverse('users'));
        return reply;
      }

      try {
        await app.objection.models.user.query().deleteById(id);
        await req.logOut();
        req.flash('success', i18next.t('flash.users.delete'));
      }
      catch(data) {
        req.flash('error', i18next.t('flash.users.deleteError'));
      }

      reply.redirect(app.reverse('users'));
      return reply;
    })
};