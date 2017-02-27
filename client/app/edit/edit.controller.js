(function(){
    angular
        .module("DMS")
        .controller("EditCtrl", EditCtrl);

    EditCtrl.$inject = ["$filter", "DeptService"];

    function EditCtrl($filter, DeptService){
        var vm = this;
        
        // search criteria
        vm.dept_no = "";
        // result from the ajax endpoint
        vm.result = {};

        // expose all the functions to the view
        vm.deleteManager = deleteManager;
        vm.initDetails = initDetails;
        vm.updateDeptName = updateManager;
        vm.search = search;
        vm.toggleEditor = toggleEditor;

        function search(){
            console.log("search ...");
            initDetails();
            vm.showDetails = true;
            console.log("details are on ...");
            DeptService
                .retrieveDeptByID(vm.dept_no)
                .then(function(result){
                    vm.showDetails = true;

                    if(!result.data)
                        return;
                    
                    console.log("result.data >>>> " + result.data[0].dept_no);
                    
                    vm.result.dept_no = result.data[0].dept_no;
                    vm.result.dept_name = result.data[0].dept_name;
                    console.log("result.data >>>> " + JSON.stringify(result.data));
                    console.log("Kenneth !");
                    console.log("xxx result.data[0].dept_manager[0] >>>> " 
                        + JSON.stringify(result.data[0].dept_managers[0]));
                    
                    if(result.data[0].dept_managers[0]){
                        vm.result.manager_id = result.data[0].dept_managers[0].emp_no;
                        vm.result.manager_name = result.data[0].dept_managers[0].employee.first_name
                        + " " + 
                        result.data[0].dept_managers[0].employee.last_name;
                        vm.result.manager_from = $filter('date')
                        (result.data[0].dept_managers[0].from_date, "MMM dd, yyyy");
                        vm.result.manager_to = $filter('date')
                        (result.data[0].dept_managers[0].to_date, "MMM dd, yyyy");
                    }    
                }).catch(function(error){
                    console.log(JSON.stringify(error));
                })
        }

        function deleteManager(){
            console.log("delete manager ..");
            DeptService
                .deleteDept(vm.dept_no, vm.result.manager_id)
                .then(function (response){
                    search();
                })
                .catch(function (err){
                    console.log(JSON.stringify(err));
                });
        }

        function initDetails(){
            vm.result.dept_no = "";
            vm.result.dept_name = "";
            vm.result.manager_id = "";
            vm.result.manager_name = "";
            vm.result.manager_from = "";
            vm.result.manager_to = "";
            vm.showDetails = false;
            vm.isEditorOn = false;
        }

        function updateManager(){
            console.log("Update manager.....");
            DeptService
                .updateDept(vm.dept_no, vm.result.dept_name)
                .then(function(response){
                    console.log(JSON.stringify(response.data));
                }).catch(function(err){
                    console.log(err);
                });
        }

        

        function toggleEditor(){
            console.log("toggle editor");
            vm.isEditorOn = !(vm.isEditorOn);
        }
    }

    

})();