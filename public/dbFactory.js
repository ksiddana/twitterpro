
  angular.module('db.factory', [])

.factory('dbFactory', ['$http', function ($http) {
  var factory = {};

// crud functionality for all models

// use '/all/true' to get all models
factory.getModel = function (type, searchTerms, callback){
  console.log('getting models');
  console.log('type: ', type);
  $http.get('//localhost:3000/api/models/' + type + searchTerms).then(function(results){
    console.log('successs in getting models', results.data);
    callback(results.data);
  });
};

factory.deleteModel = function (type, searchTerms, callback) {
  console.log('deleting models');
  console.log('type: ', type);
  $http.delete('//localhost:3000/api/models/' + type + searchTerms).then(function(results){
    console.log('success in deleting model');
    callback(results.data);
  });
};

factory.updateModel = function(type, payload, callback ) {
  console.log('updating model');
  console.log('type: ', type);
  $http.put('//localhost:3000/api/models/' + type, payload).then(function (results){
    console.log('success in updating model');
    callback(results.data);
  });
};

factory.createModel = function(type, payload, callback){
  console.log('creating model');
  console.log('type', type);
  $http.post('//localhost:3000/api/models/' + type, payload).then(function (results) {
    console.log('success in creating model');
    callback(results.data);
  });
};


  return factory;
},
]);
