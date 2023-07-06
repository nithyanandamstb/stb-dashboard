module.exports = [
  {
    method: 'GET',
    path: '/form-entry-count',
    handler: 'stbDashboardCtrl.form_entry_count',
    config: {
      policies: [],
      auth: false
    },
  }, 
  /*
  {
    method: 'GET',
    path: '/find',
    handler: 'stbDashboardCtrl.find',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'POST',
    path: '/create',
    handler: 'stbDashboardCtrl.create',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'PUT',
    path: '/update/:id',
    handler: 'stbDashboardCtrl.update',
    config: {
      policies: []
    },
  },
  {
    method: 'PUT',
    path: '/delete/:id',
    handler: 'stbDashboardCtrl.delete',
    config: {
      policies: []
    },
  },*/
];
