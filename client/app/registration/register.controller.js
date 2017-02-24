(function(){
    angular
        .module("DMS")
        .controller("RegCtrl", RegCtrl);

    RegCtrl.$inject = [ '$window', 'DeptService'];

    function RegCtrl($window, DeptService){
        var vm = this;

        vm.department = {
            id: ""
            , name: ""
        };

        vm.status = {
            message: "",
            code: ""
        };

        vm.register = register;
        
        function register(){
            console.log("Register...");
            DeptService.insertDept(vm.department)
                .then(function(result){
                    console.log()
                    $window.location.assign('/app/registration/thanks.html');
                }).catch(function(err){
                    console.log("error " + JSON.stringify(err));
                    vm.status.message = err.data.name;
                    vm.status.code = err.data.parent.errno;
                })
        }

    }    

})();