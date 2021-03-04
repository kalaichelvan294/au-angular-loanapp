(function () {
    'use strict';
    
    function userService($rootScope, $state, $http, $q) {
    
        var _applyLoan = function(loanObject){
            var deferred = $q.defer();
            loanObject.loanId = Math.floor(Math.random() * Math.floor(99999999));
            $http({
                method: 'POST',
                url: "http://localhost:5000/applyLoan",
                data: loanObject,
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : 'true'}
            })
            .then(function(response) {
                deferred.resolve(true);
            }, 
            function(response) { // optional
                deferred.reject(false);
            });
            return deferred.promise;
        }

        var _getLoans = function(){
            var deferred = $q.defer();
            const userId = $rootScope.currentUser;
            $http({
                method: 'POST',
                url: "http://localhost:5000/getLoans",
                data: {"userId":userId},
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : 'true'}
            })
            .then(function(response) {
                console.log(response);
                deferred.resolve(response.data);
            }, 
            function(response) { // optional
                deferred.reject(false);
            });
            return deferred.promise;
        }

        var _getUnApprovedLoans = function(){
            var deferred = $q.defer();
            // const userId = "admin@user.com";
            const userId = $rootScope.currentUser;
            $http({
                method: 'POST',
                url: "http://localhost:5000/getUnApprovedLoans",
                data: {"userId":userId},
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : 'true'}
            })
            .then(function(response) {
                console.log(response);
                deferred.resolve(response.data);
            }, 
            function(response) { // optional
                deferred.reject(false);
            });
            return deferred.promise;
        }

        return {
            applyLoan : _applyLoan,
            getLoans : _getLoans,
            getUnApprovedLoans : _getUnApprovedLoans
        };
    }

    userService.$inject = ['$rootScope','$state', '$http', '$q'];
    angular.module('loanappApp').service('userService', userService);

})();