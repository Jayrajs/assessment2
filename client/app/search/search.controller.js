(function () {
    angular.module("GroceryApp")
        .controller("ListCtrl", ListCtrl);


    function ListCtrl(GroceryService, $http) {
        var vm = this;
        vm.products = "";
        vm.typesOfSearch = ['Brand','Name'];
        vm.searchType = [];
        vm.searchType.selectedType = [];

        vm.search = function (searchType, keyword) {
                GroceryService.search(searchType, keyword)
                    .then(function (products) {
                        vm.products = products;
                    })
                    .catch(function (err) {
                        console.info(">>>>>>>>",err);
                    });
            
        };
        
        vm.getProduct = function (id) {
            $state.go("edit", {'productId' : id});
        };
        
        GroceryService.list()
            .then(function (products) {
                vm.products = products;
            }).catch(function (err) {
            console.info(">>>>>>>",err)
        });
    }
})();
    
