angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'home.ctrl',
  'feed.ctrl',
  'profile.ctrl',
  'chart.ctrl',
  'db.factory',
  'tweet.factory',
  'chart.js',
])

.config(function ($stateProvider, $urlRouterProvider) {
  console.log('in config');
  $stateProvider
    .state('home', {
      url:'/',
       views: {
          '@': {  // unnamed ui-view element thats in the index.html
            templateUrl: 'home/index.html',
            controller: 'homeCtrl',
          },

          //'nav' is the ui-view element named 'nav' thats in 'main' states template (mainDisplay.html)
          'feed@home': { templateUrl: 'feed/feed.html', controller: 'feedCtrl' },
          'profile@home': { templateUrl: '/profile/profile.html', controller: 'profileCtrl' },
          'chart@main': { templateUrl: '/chart/chart.html', controller:'chartCtrl' },
          // 'donate@main': { templateUrl: '/donate/donate.html', controller:'donateCtrl' },
        },
    });
    
  
  $urlRouterProvider.otherwise('/');

});

// .controller('mainCtrl', function($scope) {

//   $scope.welcome = $scope;

// });

