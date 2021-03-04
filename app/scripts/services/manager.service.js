(function () {
    'use strict';
    
    function managerService($rootScope, $state, $http, $q) {
        
        var _getAllUnApprovedLoans = function(){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: "http://localhost:5000/getAllUnApprovedLoans",
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : 'true'}
            })
            .then(function(response) {
                console.log("manager unapp loans",response.data);
                deferred.resolve(response.data);
            }, 
            function(response) { // optional
                deferred.reject(false);
            });
            return deferred.promise;
        }

        var _getAllLoansHistory = function(){
            var deferred = $q.defer();
            var userId = $rootScope.currentUser;
            $http({
                method: 'POST',
                data : {"userId":userId},
                url: "http://localhost:5000/getAllLoansHistory",
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : 'true'}
            })
            .then(function(response) {
                console.log("manager loans history",response.data);
                deferred.resolve(response.data);
            }, 
            function(response) { // optional
                deferred.reject(false);
            });
            return deferred.promise;
        }

        var _approveLoan = function(loanObject){
            var deferred = $q.defer(); // update before prod - kn
            loanObject.approvedBy = $rootScope.currentUser;
            loanObject.dataOfApproval = new Date();
            loanObject.pendingAmount = Math.floor((loanObject.loanInterest/100)*loanObject.loanAmount) + loanObject.loanAmount;
            loanObject.pendingDuration = loanObject.loanDurationMonth;
            console.log("applyloan",loanObject);
            $http({
                method: 'POST',
                data: loanObject,
                url: "http://localhost:5000/approveLoan",
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : 'true'}
            })
            .then(function(response) {
                deferred.resolve(response.data);
            }, 
            function(response) { // optional
                deferred.reject(false);
            });
            return deferred.promise;
        }

        var _rejectLoan = function(loanObject){
            var deferred = $q.defer(); // update before prod - kn
            const userId = $rootScope.currentUser;
            loanObject.approvedBy = userId;
            loanObject.status = "Rejected";
            loanObject.dateOfReject = new Date();
            console.log("rejectLoan",loanObject);
            $http({
                method: 'POST',
                data: loanObject,
                url: "http://localhost:5000/rejectLoan",
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : 'true'}
            })
            .then(function(response) {
                deferred.resolve(response.data);
            }, 
            function(response) { // optional
                deferred.reject(false);
            });
            return deferred.promise;
        }
        
        return {
            getAllUnApprovedLoans : _getAllUnApprovedLoans,
            getAllLoansHistory : _getAllLoansHistory,
            approveLoan : _approveLoan,
            rejectLoan : _rejectLoan
        };
    }

    managerService.$inject = ['$rootScope','$state', '$http', '$q'];
    angular.module('loanappApp').service('managerService', managerService);
})();    