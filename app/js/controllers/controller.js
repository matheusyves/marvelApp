var app = angular.module('PersonagensApp');
app.controller("homeController", ['$scope','$http','$window', 'personagensService', '$location', '$cookies',
    function($scope, $http, $window, personagensService, $location, $cookies){

        var vm = this;

        
        vm.searchCharacter = searchCharacter;
        vm.getComicsList = getComicsList;
        vm.deslogar = deslogar;
        
        init();

        function init(){
            console.log("init");
        }

        function getComicsList(codigo){
            console.log("codigo", codigo);
            vm.responseComics = [];
            personagensService.getComicsList().then(function(resposta) {
                if(resposta){
                    vm.responseComic = resposta;
                    vm.responseComics.forEach(function(item){
                        if(!item.description){
                            item.description = "Descrição não encontrada."
                        }
                    })
                }
               
            });
        }


        function searchCharacter(){
            console.log('chamou aqui', vm.name);
            console.log('chamou aqui', $location);
            $location.path('/search/' + vm.name);
        }

        function deslogar() {
            $cookies.remove('tokenValidado');
            $location.path('login');
        }

        
    }
])
