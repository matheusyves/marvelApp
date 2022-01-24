describe('teste', function(){
    describe('testeController', function(){

        it('should init', function(){
            module('PersonagensApp');

            var scope = {};
            var ctrl;

            inject(function($controller){
                ctrl = $controller('homeController', {$scope:scope }); 

            });
        });

    });

});
