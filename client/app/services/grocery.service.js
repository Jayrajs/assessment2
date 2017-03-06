(function(){
    angular
        .module("DMS")
        .service("GroceryApp", GroceryApp);

    DeptService.$inject = ['$http'];

    function GroceryApp($http){
        var service = this;

        service.retrieveDB = retrieveDB;
        service.retrieveByID = retrieveByID;
        service.retrieveByBrand = retrieveByBrand;
        
        /*
        service.deleteDept = deleteDept;
        service.updateDept = updateDept;
        service.retrieveDeptByID = retrieveDeptByID;
        */

        function retrieveDB(searchString){
            return $http({
                method: 'GET',
                url: "api/grocery_list",
                params: {'searchString': searchString}
            });
        }

      /*
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
         */

        function retrieveByID(id){
            console.log(id);
            return $http({
                method: 'GET',
                url: "/api/grocery_list/?searchString=" + id
            });
        }

         function retrieveByBrand(brand){
            console.log(brand);
            return $http({
                method: 'GET',
                url: "/api/grocery_list/?searchString=" + brand
            });
        }
       

    }
})();