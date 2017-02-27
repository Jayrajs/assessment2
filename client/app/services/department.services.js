(function(){
    angular
        .module("DMS")
        .service("DeptService", DeptService);

    DeptService.$inject = ['$http'];

    function DeptService($http){
        var service = this;
        service.insertDept = insertDept;
        service.retrieveDeptDB = retrieveDeptDB;
        service.retrieveDeptManagerDB = retrieveDeptManagerDB;

        function insertDept(department){
            return $http({
                method: 'POST',
                url: "api/departments",
                data: {dept: department}
            });
        }

        function retrieveDeptDB(searchString){
            return $http({
                method: 'GET',
                url: "api/departments",
                params: {'searchString': searchString}
            });
        }

        function retrieveDeptManagerDB(searchString){
            return $http({
                method: 'GET',
                url: "/api/departments/managers",
                params: {'searchString': searchString}
            });
        }

    }
})();