(function () {
    'use strict';
    
    function loginService($rootScope, $q, $http, $timeout) {
        
        var _login = function(username, password){
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: "http://localhost:5000/authUser",
                data: {"userId":username, "password":password},
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : 'true'}
            })
            .then(function(response) {
                console.log("login response ",response);
                if(response.data.role!=="invalid"){
                    $rootScope.currentUser = username;
                    $rootScope.loggedIn = true;
                    $rootScope.userDetails = response.data;
                    $rootScope.currentUserRole = response.data.role;
                    $timeout((()=>{
                        $rootScope.displayMessage("Login Timout, Re-login");
                        $rootScope.logoutUser();
                    }), 1800000); // 1800000 - 30 mins auto logout
                    deferred.resolve(true);
                }else{
                    $rootScope.loggedIn = false;
                    deferred.reject(false);
                }
            }, 
            function(response) {
                $rootScope.loggedIn = false;
                deferred.reject(false);
            });
            return deferred.promise;
        };

        var _logout = function(){
            $rootScope.currentUser = "";
            $rootScope.currentUserRole = "invalid";
            $rootScope.loggedIn = false;
            $rootScope.$emit("showLogin");
            return true;
        };

        var _isAuthenticated = function(page){
            console.log("kn is auth:", $rootScope.loggedIn);
            var deferred = $q.defer();
            console.log($rootScope.currentUserRole,page);
            if($rootScope.loggedIn && $rootScope.currentUserRole===page){
                deferred.resolve(true);
            }else{
                deferred.reject(false);
            }
            return deferred.promise;
        };

        return {
            login : _login,
            logout : _logout,
            isAuthenticated : _isAuthenticated
        };
    }

    loginService.$inject = ['$rootScope', '$q', '$http', '$timeout'];
    angular.module('loanappApp').factory('loginService', loginService);

})();
