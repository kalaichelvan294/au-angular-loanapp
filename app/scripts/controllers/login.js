(function () {
    'use strict';
  
    function LoginCtrl( $rootScope, $state ,$scope, loginService) {
        console.log("login controller", $rootScope.loggedIn);
        
        $scope.isLoginDisabled = false;
        $scope.username = "";
        $scope.password = "";

        if($scope.loggedIn){
            $rootScope.displayMessage("Already Logged in as "+$rootScope.currentUser);
            $state.go($rootScope.currentUserRole);
        }

        $scope.loginUser = function _loginUser(){
            $scope.isLoginDisabled = true;
            console.log($scope.username, $scope.password);
            // console.log(loginService.login());
            var username = $scope.username;
            var password = $scope.password;
            console.log(username, password);
            // return;
            loginService.login(username, password)
                .then( function(response){
                    $scope.isLoginDisabled = false;
                    if (response){
                        console.log("current user role",$rootScope.currentUserRole);
                        if($rootScope.currentUserRole==="user"){
                            $rootScope.displayMessage("Welcome "+$rootScope.currentUser);
                            $rootScope.$emit('showUser');
                        }
                        else if($rootScope.currentUserRole==="manager"){
                            $state.go('manager');
                            $rootScope.displayMessage("Welcome "+$rootScope.currentUser);
                            $rootScope.$emit('showManager');
                        }
                        else{
                            $state.go('login');
                            $rootScope.displayMessage("UnAuthorized Access - Login failed");
                        }
                    }else{
                        $rootScope.displayMessage("UnAuthorized Access (Invalid Username or Password)- Login failed");
                        $state.go('login');
                    }
                })
                .catch(function(response){
                    $scope.isLoginDisabled = false;
                    $rootScope.displayMessage("UnAuthorized Access (Invalid Username or Password)- Login failed");
                    $state.go('login');
                });
            return;
        };

        $rootScope.logoutUser = loginService.logout;
    }

    LoginCtrl.$inject = [ "$rootScope", "$state", "$scope", "loginService"];
    angular.module('loanappApp').controller('LoginCtrl',LoginCtrl);
    
})();