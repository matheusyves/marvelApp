var app = angular.module('PersonagensApp');
app.config(['$routeProvider',router]);
  function router ($routeProvider){
    $routeProvider
    console.log('$routeProvider', $routeProvider);
    $routeProvider
    .when('/login', {
      templateUrl: '/login/login.html',
      controller: 'loginController as vm'
    })
    .when("/home", {
      templateUrl:"/home.html",
      controller:"homeController as vm"
    })
      .when("/search/:nome", {
        templateUrl:"/personagens/modal.html",
        controller:"personagensController as vm",
      })
      .otherwise('/home');
};

app.run(['$cookies','$rootScope', '$location', function($cookies,$rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function(){
        var tokenValidado = $cookies.get('tokenValidado');
        if (!tokenValidado) {
            $location.path('login');
        }
    });
}]);