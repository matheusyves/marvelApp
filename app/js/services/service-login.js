var app = angular.module('PersonagensApp');
app.service('loginService', ['$http', loginService]);

function loginService($http) {

  var loginServiceAPI = {
    login: login
  };
  
  var url = 'https://search-marvel-characters.herokuapp.com/login'; 
  // var url = 'http://localhost:8000/login';


  function login(user, senha) {
    return $http.post(url, { user: user, password: senha });
  };

  return loginServiceAPI;
};