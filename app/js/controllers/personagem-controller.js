var app = angular.module('PersonagensApp');
app.controller("personagensController", ['$routeParams', 'personagensService', '$location', '$cookies',
    function($routeParams, personagensService, $location, $cookies){

        var vm = this;

        vm.nameCharacter = "";
        vm.searchCharacter = searchCharacter;
        vm.getComicsList = getComicsList;
        vm.linkToBuyComic = linkToBuyComic;
        vm.deslogar = deslogar;
        vm.voltarPraPesquisa = voltarPraPesquisa;
        

        init();
        
        function init(){
            console.log('$routeParams', $routeParams);
            vm.nameCharacter = $routeParams.nome;
            console.log("init");
            searchCharacter();
        }   

        function getComicsList(codigo){
            console.log("codigo", codigo);
            vm.responseComics = [];
            personagensService.getComicsList(codigo).then(function(resposta) {
                console.log('resposta', resposta);
                if(resposta){
                    vm.responseComics = resposta;
                    vm.responseComics.forEach(function(item){
                        if(!item.description){
                            item.description = "Descrição não encontrada."
                        }
                    })
                }
               
            });
        }

        function searchCharacter() {
            

            personagensService.searchCharacter(vm.nameCharacter).then(function(response) {
                vm.responseSearch = response;
                console.log("rodou o search", response);
                console.log(" vm.responseSearch",  vm.responseSearch);

                angular.forEach(vm.responseSearch, function(item){
                    item.foto = item.thumbnail.path + "." + item.thumbnail.extension;
                    if (item.description === ""){
                        item.description = "Não há descrição para o personagem."
                    }
                })
            });
        }

        function linkToBuyComic(id){
            console.log("id", id);
            personagensService.getLinkToBuyComic(id).then(function(response){
                vm.responseGetLink = response;
                console.log("response", response);
            })

        }

        function voltarPraPesquisa(){
            $location.path('home');
        }

        function deslogar() {
            $cookies.remove('tokenValidado');
            $location.path('login');
        }


      
        
    }
])
