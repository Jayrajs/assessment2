(function () {
    angular.module("GroceryApp")
           .controller("EditCtrl", EditCtrl);

function EditCtrl(GroceryService, $http) {

    ListCtrl.$inject = ['GroceryService'];
        var vm = this;
        vm.product = {};

        vm.cancel = function () {
            $state.go("list");
        };
        
        GroceryService.edit($stateParams.productId)
            .then(function (product) {
                vm.product = product;
            }).catch(function (err) {
                console.info(">>>>>>",err)
            });

        vm.save = function () {
            console.log("Saved");
            GroceryService.save(vm.product)
                .then(function (result) {
                    $state.go("list");
                }).catch(function (err) {
                console.info(">>>>>>>>>>",err)
            });
        }

    }

    EditCtrl.$inject = ['GroceryService'];
    
})();