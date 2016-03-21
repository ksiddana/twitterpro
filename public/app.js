angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'home.ctrl',
  'feed.ctrl',
  'auth.ctrl',
  'profile.ctrl',
  'chart.ctrl',
  'db.factory',
  'tweet.factory',
  'chart.js',
])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url:'/',
       views: {
          '@': {
            templateUrl: 'home/index.html',
            controller: 'homeCtrl'
          },
          'auth@home': { templateUrl: 'auth/auth.html', controller: 'authCtrl' },
          'feed@home': { templateUrl: 'feed/feed.html', controller: 'feedCtrl' },
          'profile@home': { templateUrl: '/profile/profile.html', controller: 'profileCtrl' },
          'chart@home': { templateUrl: '/chart/chart.html', controller:'chartCtrl' }
        }
    });
  $urlRouterProvider.otherwise('/');
})

.run(function($rootScope) {
  console.log('$rootScope.hashTagData in config is: ', $rootScope.hashTagData);
  $rootScope.hashTagKeys, $rootScope.hashTagValues;
});

