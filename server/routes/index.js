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
  {
    method: 'GET',
    path: '/get-charts',
    handler: 'stbDashboardCtrl.get_charts',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'GET',
    path: '/properties-count',
    handler: 'stbDashboardCtrl.properties_count',
    config: {
      policies: [],
      auth: false
    },
  }, 
  {
    method: 'GET',
    path: '/get-card-values',
    handler: 'stbDashboardCtrl.get_card_values',
    config: {
      policies: [],
      auth: false
    },
  }, 
  
];
