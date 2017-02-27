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
        service.deleteDept = deleteDept;
        service.updateDept = updateDept;
        service.retrieveDeptByID = retrieveDeptByID;

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

        function deleteDept(dept_no, emp_no){
            return $http({
                method: 'DELETE',
                url: "/api/departments/" + dept_no + "/manager/" + emp_no
            });
        }

        function updateDept(dept_no, dept_name){
            return $http({
                method: 'PUT',
                url: "/api/departments/" + dept_no,
                data: {
                    dept_no: dept_no, 
                    dept_name: dept_name
                }
            });
        }

        function retrieveDeptByID(dept_no){
            console.log(dept_no);
            return $http({
                method: 'GET',
                url: "/api/departments/managers/?searchString=" + dept_no
            });
        }
        

    }
})();