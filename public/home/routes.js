angular.module('app.routes', [])
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('notHome', {
        url:'/notHome',
      });
      
    
    $urlRouterProvider.otherwise('/home');

  });
