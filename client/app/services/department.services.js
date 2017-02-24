(function(){
    angular
        .module("DMS")
        .service("DeptService", DeptService);

    DeptService.$inject = ['$http'];

    function DeptService($http){
        var service = this;
        service.insertDept = insertDept;

        function insertDept(department){
            return $http({
                method: 'POST',
                url: "api/departments",
                data: {dept: department}
            })
        }
    }
})();