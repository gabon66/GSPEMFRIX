/**
 * Created by gabo on 26/07/16.
 */

GSPEMApp.controller('abmStockMaestro', function($scope,$http,$uibModal,toastr,MovPend) {
    $scope.animationsEnabled = false;


    $scope.propertyName = 'id';
    $scope.reverse = true;
    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    var getStock = function() {
        $http.get(Routing.generate('get_stock')
        ).success(function (stock) {
            $scope.stock=stock;
            //console.log($scope.stock);

            for (var a = 0; a < $scope.stock.length; a++) {
                $scope.stock[a].referencia=angular.fromJson($scope.stock[a].referencia);
            }

        });
    };
    getStock();
    $scope.parseInt = parseInt;

    $scope.setStock=function (item) {
      //console.log(item.cant);

        if(item.cant!="" && item.cant!=undefined){
            item.stock=parseInt(item.cant) + parseInt(item.stock);
            item.new_stock=item.stock;

        }
    };


    $scope.confirmar=function () {

        $http({
            url: Routing.generate('set_stock'),
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            data: {
                items:$scope.stock
            }
        }).then(function (response) {
                console.log(response);
                getStock();
                toastr.success('Guardado con éxito', 'Stock');
            },
            function (response) { // optional
                // failed
            });

    }

});