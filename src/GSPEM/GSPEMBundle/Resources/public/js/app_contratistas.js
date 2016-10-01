/**
 * Created by gabo on 26/07/16.
 */


GSPEMApp.controller('abmContratistas', function($scope,$http,$uibModal,toastr,MovPend) {

    $scope.propertyName = 'name';
    $scope.reverse = true;
    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    var getData = function() {
        $http.get(Routing.generate('get_contratistas')
        ).success(function (contratistas) {

                $scope.contratistas=contratistas;

                for (var a = 0; a < $scope.contratistas.length; a++) {
                    $scope.contratistas[a].supervisor1=angular.fromJson($scope.contratistas[a].supervisor1);
                    $scope.contratistas[a].supervisor2=angular.fromJson($scope.contratistas[a].supervisor2);
                    $scope.contratistas[a].supervisor3=angular.fromJson($scope.contratistas[a].supervisor3);

                }
                console.log($scope.contratistas);
        });
    };
    getData();


    $scope.new = function (item,template , controller) {

        var modalInstance = $uibModal.open({
            templateUrl: "contratista_form.html",
            controller: "ModelNewContratistaCtrl",
            resolve: {
                item: function () {
                    return item;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            getData()
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

});
GSPEMApp.controller('ModelNewContratistaCtrl', function($filter,$scope,$http, $uibModalInstance, item,toastr) {
    $scope.item = item;

    $scope.name="";
    $scope.descript="";
    $scope.id=0;
    $scope.sup1={};
    $scope.sup2={};
    $scope.sup3={};


    console.log($scope.item);

    if(item!=null){
        $scope.editing=false;

        $scope.id=item.id;
        $scope.sup1=angular.fromJson($scope.item.supervisor1);
        $scope.sup2=angular.fromJson($scope.item.supervisor2);
        $scope.sup3=angular.fromJson($scope.item.supervisor3);
        $scope.descript=item.descript;
        $scope.name=item.name;
    }

    $scope.placeChanged=function (place) {
        //console.log("cambioaaaaaaa");
        //console.log(place);
    }


    $scope.cerrar=function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveContratista= function () {
        if ($scope.name.length == 0) {
            toastr.warning('Complete todos los campos requeridos (*)', 'Atención');
        } else {
            $http({
                url: Routing.generate('save_contratistas'),
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: {
                    descript: $scope.descript,
                    sup1:$scope.sup1,
                    sup2:$scope.sup2,
                    sup3:$scope.sup3,
                    name:$scope.name,
                    id:$scope.id
                }
            }).then(function (response) {
                    console.log(response);
                    $uibModalInstance.dismiss('cancel');
                },
                function (response) { // optional
                    // failed
                });
        };
    }

});
