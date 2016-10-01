/**
 * Created by gabo on 26/07/16.
 */

GSPEMApp.controller('abmStockUser', function($scope,$http,$uibModal,toastr,MovPend) {
    $scope.animationsEnabled = false;


    $scope.propertyName = 'idCustom';
    $scope.reverse = true;
    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    var getStock = function() {
        $http.get(Routing.generate('get_stock_user')
        ).success(function (stock) {
            $scope.stock=stock;
            //console.log($scope.stock);
            for (var a = 0; a < $scope.stock.length; a++) {
                $scope.stock[a].referencia=angular.fromJson($scope.stock[a].referencia);
            }
        });
    };
    getStock();

});