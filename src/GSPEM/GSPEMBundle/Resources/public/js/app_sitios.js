/**
 * Created by gabo on 26/07/16.
 */
GSPEMApp.controller('abmSitios', function($scope,$http,$uibModal,toastr,MovPend) {
    $scope.animationsEnabled = false;



    var getSitios = function() {
        $http.get(Routing.generate('get_sitios')
        ).success(function (sitios) {
            $scope.sitios=sitios;
        });
    };
    getSitios();


    $scope.new = function (item,template , controller) {

        var modalInstance = $uibModal.open({
            templateUrl: template,
            controller: controller,
            resolve: {
                item: function () {
                    return item;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            getSitios()
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };


    $scope.deleteSitios= function (id) {
        console.log("delete");
        $http({
            url: Routing.generate('delete_sitios'),
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                id: id
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
        }).then(function (response) {
                getSitios()


            },
            function (response) { // optional
                // failed
            });
    };


});
GSPEMApp.controller('ModelNewSiteCtrl', function($filter,$scope,$http, $uibModalInstance, item,toastr) {
    $scope.item = item;

    $scope.name="";
    $scope.descript="";
    $scope.direccion="";
    $scope.latitud=0;
    $scope.longitud=0;
    $scope.editing=true;
    $scope.id=0;

    console.log($scope.item);

    if(item!=null){
        $scope.editing=false;
        console.log(item.type_id);
        $scope.id=item.id;

        $scope.direccion_str=item.direccion;
        $scope.descript=item.descript;
        $scope.name=item.name;
        $scope.latitud=item.latitud;
        $scope.longitud=item.longitud;

        $scope.typematerial=item.type_id;
        console.log($scope.typematerial);
    }

    $scope.placeChanged=function (place) {
        //console.log("cambioaaaaaaa");
        //console.log(place);
    }


    $scope.cerrar=function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveSitio= function () {
        console.log($scope.direccion)

        if ($scope.name.length == 0) {
            toastr.warning('Complete todos los campos requeridos (*)', 'Atención');
        } else {

        if ($scope.direccion){
            $scope.latitud  = $scope.direccion.geometry.location.lat()
            $scope.longitud = $scope.direccion.geometry.location.lng()
            $scope.direccion_ster=$scope.direccion.formatted_address;
        }else{
            if(scope.id){
                toastr.warning('Complete todos los campos requeridos (*)', 'Atención');
                return false
            }

        }

        $http({
            url: Routing.generate('save_sitios'),
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                descript: $scope.descript,
                direccion: $scope.direccion_ster,
                name:$scope.name,
                lat:$scope.latitud,
                long:$scope.longitud,
                id:$scope.id
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
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
