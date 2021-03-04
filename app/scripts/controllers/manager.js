(function(){
    'use strict';

    function ManagerCtrl($rootScope, $scope, $uibModal, managerService) {

      $scope.destroyManagerLoansDataTable = function(){
        if ( $.fn.dataTable.isDataTable('#approveTable') ) {
          console.log("destroy datatable");
          $(()=>{
            $('#approveTable').DataTable().destroy();
          });
        }
      }

      $scope.addDataTable = function(){
        $(()=>{
          $('#approveTable').dataTable();
        });
      };

      $scope.destroyManagerLoansHistoryDataTable = function(){
        if ( $.fn.dataTable.isDataTable('#historyTable') ) {
          console.log("destroy datatable");
          $(()=>{
            $('#historyTable').DataTable().destroy();
          });
        }
      }

      $scope.addManagerLoansHistoryDataTable = function(){
        $(()=>{
          $('#historyTable').dataTable();
        });
      };

      $scope.getUnApprovedLoans = function(){
        $rootScope.displayMessage("Loading...");
            console.log("getting unapproved loans");
            $scope.destroyManagerLoansDataTable();
            managerService.getAllUnApprovedLoans().then(function(res){
              $scope.myUnApprovedLoansArray = res;
              // $rootScope.displayMessage("Data Loaded");
              $scope.addDataTable();
            }).catch(function(res){
              $rootScope.displayMessage("Data Fetch Error");
              console.log("my loans fetch error");
              $scope.addDataTable();
            });
        }

        $scope.getLoansHistory = function(){
          $rootScope.displayMessage("Loading...");
            console.log("getting review loans history");
            $scope.destroyManagerLoansHistoryDataTable();
            managerService.getAllLoansHistory().then(function(res){
              $scope.loanHistoryArray = res;
              $rootScope.displayMessage("Data Loaded");
              $scope.addManagerLoansHistoryDataTable();
            }).catch(function(res){
              $rootScope.displayMessage("Data Fetch Error");
              console.log("my loans fetch error");
              $scope.addManagerLoansHistoryDataTable();
            });
          }

        $scope.approveLoan = function(loanObject){
          managerService.approveLoan(loanObject).then(function(res){
            $scope.getUnApprovedLoans();
            $rootScope.displayMessage("Loan Application Approved Successfully");
          }).catch(function(res){
            $rootScope.displayMessage("Loan Application error");
            console.log("my loans fetch error");
          });
        }

        $scope.rejectLoan = function(loanObject){
          managerService.rejectLoan(loanObject).then(function(res){
            $scope.getUnApprovedLoans();
            $rootScope.displayMessage("Loan Application Rejected Successfully");
          }).catch(function(res){
            $rootScope.displayMessage("Loan Application error");
            console.log("my loans fetch error");
          });
        }
    }

    // ManagerModalCtrl.$inject = ["$scope", "$uibModalInstance", "items"];
    // angular.module('loanappApp').controller('ManagerModalCtrl',ManagerModalCtrl);
    ManagerCtrl.$inject = [ "$rootScope", "$scope", "$uibModal", "managerService"]; 
    angular.module('loanappApp').controller('ManagerCtrl',ManagerCtrl);

})();