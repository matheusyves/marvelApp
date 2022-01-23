var app = angular.module('PersonagensApp');
app.filter('formatarTimeStamp', function(){
       	
    return function(timeStamp){

        var dia = timeStamp.substring(8,10);
        var mes = timeStamp.substring(5,7);
        var ano = timeStamp.substring(0,4);

        var hora = timeStamp.substring(11,13);
        var minuto = timeStamp.substring(14,16);
        var segundo = timeStamp.substring(17,19);

        return dia + '/' + mes + '/' + ano + ' - ' + hora + ':' + minuto + ':' + segundo;
    };
})
