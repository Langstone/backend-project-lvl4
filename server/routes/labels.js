// @ts-check

import i18next from 'i18next';

export default (app) => {
    app
     .get('/labels', { name: 'labels' }, async (req, reply) => {
 
         if(!req.isAuthenticated(req, reply)) {
             req.flash('error', i18next.t('flash.users.authorizationError'));
             return reply;
         };
 
         const labels = await app.objection.models.label.query();
         reply.render('labels/index', { labels });
         return reply;
     })
     .get('/labels/new', { name: 'newLabel' }, (req, reply) => {
 
         const label = new app.objection.models.label();
         reply.render('/labels/new', { label });
     })
     .get('/labels/:id/edit', { name: 'editLabel'}, async (req, reply) => {
 
         if(!req.isAuthenticated(req, reply)) {
             req.flash('error', i18next.t('views.users.authorizationError'));
             return reply;
         };
 
         const { id } = req.params;
         const label = await app.objection.models.label.query().findById(id);
         reply.render('/labels/edit', { label });
         return reply;
     })
     .patch('/labels/:id', { name: 'updateLabel' }, async (req, reply) => {
 
         if(!req.isAuthenticated(req, reply)) {
             req.flash('error', i18next.t('views.users.authorizationError'));
             return reply;
         };
 
         const { id } = req.params;
 
         try {
             const label = new app.objection.models.label();
             label.$set({ id, ...req.body.data });
             await label.$query().findById(id).patch(req.body.data);
             req.flash('success', i18next.t('views.labels.updateSuccess'));
             reply.redirect('/labels');
         }
         catch (error) {
             req.flash('error', i18next.t('views.labels.updateError'));
             reply.render('/labels/edit', { label: { id, ...req.body.data }, errors: error.data });
         }
         return reply;
     })
     .post('/labels', async (req, reply) => {
 
         if(!req.isAuthenticated(req, reply)) {
             req.flash('error', i18next.t('flash.users.authorizationError'));
             return reply;
         };
         
         try {
             const validLabel = await app.objection.models.label.fromJson(req.body.data);
             await app.objection.models.label.query().insert(validLabel);
             req.flash('success', i18next.t('views.labels.successfullyCreated'));
             reply.redirect('/labels');
         } 
         catch(error) {
             req.flash('error', i18next.t('views.labels.createError'));
             reply.render('/labels/new', { errors: error });
         }
         return reply;
     })
     .delete('/labels/:id', { name: 'deleteLabel' }, async (req, reply) => {
 
        if(!req.isAuthenticated(req, reply)) {
            req.flash('error', i18next.t('flash.users.authorizationError'));
            return reply;
         };
 
        const { id } = req.params;
        try {
            await app.objection.models.label.query().deleteById(id);
            req.flash('success', i18next.t('flash.labels.deleteLabel'));
           }
           catch(data) {
            req.flash('error', i18next.t('flash.labels.deleteError'));
           }
     
           reply.redirect(app.reverse('labels'));
           return reply;
     })
 };