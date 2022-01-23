var app = angular.module('PersonagensApp');
app.service("personagensService", ['$http', personagensService]) 

const publicKey = "5a237863b3cc2061003cbbc4fe20dc06";   
const privateKey = "fbf255068eccea6d0ef951b9f25626b57ab2fe72";
var timeStamp = Date.now().toString();

function personagensService($http){
    var service = {
        getComicsList : getComicsList,
        searchCharacter : searchCharacter,
        getCharacterList : getCharacterList
    };

    return service;

    function getComicsList(codigo){
        var hash = criarHash();
        var urlAPI = "https://gateway.marvel.com:443/v1/public/characters/"+codigo+"/stories?ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash;
        return $http.get(urlAPI).then(tratarResposta, tratarErro);
    }

    function searchCharacter(entrada){
        var hash = criarHash();
        var urlAPI = "http://gateway.marvel.com/v1/public/characters?&"+'&nameStartsWith=' + entrada +"&ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash;
        return $http.get(urlAPI).then(tratarResposta, tratarErro);
    }

    function getCharacterList(){
        var hash = criarHash();
        var urlAPI = "http://gateway.marvel.com/v1/public/characters?limit=9&"+"&ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash;
        return $http.get(urlAPI).then(tratarResposta, tratarErro);
    }


    /** 
     * Métodos auxiliares
    */

        function criarHash() {
    
        const toBeHashed = timeStamp + privateKey + publicKey;
        const hashedMessage = md5(toBeHashed);
        console.log("RODOU O HASH", hashedMessage);
        return hashedMessage;
    }

    function tratarResposta(response){
        return response.data.data.results;
    }

    function tratarErro(error){
        return error.data.data;
    }
}
