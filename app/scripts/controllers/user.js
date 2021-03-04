( function(){
'use strict';
  function UserCtrl($rootScope, $scope, userService) {

    // Apply for Loan
    $scope.loanCategories = ["Personal Loan", "Home Loan", "Vehicle Loan"];
    $scope.selectedLoanCategory = "Select Loan Type";
    $scope.loanDurations = [
      {id:"3m2", months:3, interest:2},
      {id:"6m3", months:6, interest:3},
      {id:"12m4", months:12, interest:4},
      {id:"18m5", months:18, interest:5},
      {id:"24m6", months:24, interest:6}
    ];
    $scope.selectedLoanDuration = "Select Loan Duration";
    $scope.proofName = "";
    $scope.proofId = "";
    $scope.cibilScore = "";
    $scope.errorMessageVisibility = false;
    $scope.errorMessage = "";
    $scope.loanAmount;

    $scope.inputValidationMessageVisibility = false;
    $scope.inputValidationMessage = [];

    $scope.clearApplyLoan = function(){
      $scope.selectedLoanDuration = "Select Loan Duration";
      $scope.selectedLoanCategory = "Select Loan Type";
      $scope.proofName = "";
      $scope.proofId = "";
      $scope.cibilScore = "";
      $scope.errorMessageVisibility = false;
      $scope.errorMessage = "";
      $scope.loanAmount = null;
      $scope.inputValidationMessageVisibility = false;
      $scope.inputValidationMessage = [];
    };

    $scope.destroyLoansDataTable = function(){
      if ( $.fn.dataTable.isDataTable('#myLoansTable') ) {
        console.log("destroy datatable");
        $(()=>{
          $('#myLoansTable').DataTable().destroy();
        });
      }
    };

    $scope.addgetLoansDataTable = function(){
      $(()=>{
        $('#myLoansTable').dataTable();
      });
    };

    $scope.destroyUnApprovedDataTable = function(){
      if ( $.fn.dataTable.isDataTable('#unApprovedLoansTable') ) {
        console.log("destroy datatable");
        $(()=>{
          $('#unApprovedLoansTable').DataTable().destroy();
        });
      }
    }
    $scope.addgetUnApprovedLoansDataTable = function(){
      console.log("init datatable");
      $(()=>{
        $('#unApprovedLoansTable').dataTable();
      });
    };


    $scope.getLoans = function(){
      $rootScope.displayMessage("Loading...");
      console.log("getting loans");
      $scope.destroyLoansDataTable();
      userService.getLoans().then(function(res){
        $scope.myLoansArray = res;
        console.log($scope.myLoansArray);
        $rootScope.displayMessage("Data Loaded");
        $scope.addgetLoansDataTable();
      }).catch(function(res){
        $rootScope.displayMessage("Data Fetch Error!!!");
        console.log("my loans fetch error");
        $scope.addgetLoansDataTable();
      });
    }

    $scope.getUnApprovedLoans = function(){
      $rootScope.displayMessage("Loading...");
      $scope.destroyUnApprovedDataTable();
      console.log("getting unapproved loans");
      userService.getUnApprovedLoans().then(function(res){
        $scope.myUnApprovedLoansArray = res;
        $rootScope.displayMessage("Data Loaded");
        $scope.addgetUnApprovedLoansDataTable();
      }).catch(function(res){
        $rootScope.displayMessage("Data Fetch Error!!!");
        console.log("my loans fetch error");
        $scope.addgetUnApprovedLoansDataTable();
      });
    }

    var validateLoanObject = function(loanObject){
      $scope.inputValidationMessageVisibility = false;
      $scope.inputValidationMessage = [];
      console.log(loanObject);
      if(!$scope.loanCategories.includes(loanObject.loanCategory)){
        $scope.inputValidationMessage.push("Invalid Category");
      }
      if(loanObject.loanDurationMonth===undefined || loanObject.loanDurationMonth===""){
        $scope.inputValidationMessage.push("Invalid Loan Duration");
      }
      if(loanObject.loanInterest===undefined || loanObject.loanInterest===""){
        $scope.inputValidationMessage.push("Invalid Loan Interest");
      }
      if(loanObject.loanAmount===undefined || loanObject.loanAmount<=0 || loanObject.loanAmount>=1000000000){
        $scope.inputValidationMessage.push("Invalid Loan Amount");
      }
      if(loanObject.proofName===undefined || loanObject.proofName.length<=0){
        $scope.inputValidationMessage.push("Invalid Proof Name");
      }
      if($scope.inputValidationMessage.length==0){
        return true;
      }else{
        $scope.inputValidationMessageVisibility = true;
        return false;
      }
    }

    var getApplyLoanObject = function(){
      var tloanDurationMonth = "";
      var tloanInterest = "";
      $scope.loanDurations.forEach(function (loanDuration) {
        if(loanDuration.id===$scope.selectedLoanDuration){
          tloanDurationMonth = loanDuration.months;
          tloanInterest = loanDuration.interest;
        }
      });
      return {
        loanCategory : $scope.selectedLoanCategory,
        loanDurationMonth : tloanDurationMonth,
        loanInterest : tloanInterest,
        loanAmount : $scope.loanAmount,
        proofName : $scope.proofName,
        proofId : $scope.proofId,
        cibilScore : $scope.cibilScore, // change before prod - kn
        userId : "admin@user.com",
        dateOfApply: new Date(),
        status : "Pending"
      };
    }

    $scope.applyLoan = function(){
      var loanObject = getApplyLoanObject();
      if(!validateLoanObject(loanObject)){
        $rootScope.displayMessage("Enter Valid details!!!");
        return;
      }
      userService.applyLoan(loanObject)
      .then(function(res){
        $scope.clearApplyLoan();
        console.log("apply loan success");
        $rootScope.displayMessage("Loan Application submitted");
      })
      .catch(function(res){
        $rootScope.displayMessage("Loan Application Error!!!");
        console.log("apply loan failed");
      });
    }

  };
  
  UserCtrl.$inject = [ "$rootScope", "$scope", "userService"]; 
  angular.module('loanappApp').controller('UserCtrl',UserCtrl);

})();