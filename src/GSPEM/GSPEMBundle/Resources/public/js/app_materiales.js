/**
 * Created by gabo on 26/07/16.
 */


GSPEMApp.factory('typesService', function($http) {
    return {
        async: function() {
            return $http.get(Routing.generate('get_materiales_type'));
        }
    };
});

GSPEMApp.controller('abmMaterial', function($scope,$http,$uibModal,toastr,typesService, $rootScope,MovPend) {
    $scope.animationsEnabled = false;

    var getTypes=function () {
        typesService.async().then(function(data) {
            $scope.types=data.data;
            $rootScope.typesMaterial= data;
        });
    }


    $scope.propertyName = 'id';
    $scope.reverse = true;
    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };


    var getMateriales = function() {
        $http.get(Routing.generate('get_materiales')
        ).success(function (materiales) {
            $scope.materiales=materiales;
            for (var a = 0; a < $scope.materiales.length; a++) {
                $scope.materiales[a].referencia=angular.fromJson($scope.materiales[a].referencia);
            }
            console.log($scope.materiales);

        });
    };
    getTypes();
    getMateriales();


    $scope.new = function (item,template , controller) {
        console.log(controller);
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
            getTypes();
            getMateriales();
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    


    $scope.deleteMaterial= function (id) {
        console.log("delete");
        $http({
            url: Routing.generate('delete_materiales'),
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
                getMateriales();


            },
            function (response) { // optional
                // failed
            });
    };

    $scope.deleteTipoMaterial= function (id) {

        // validar que no se este usando este tipo:
        var existe= false;

        angular.forEach($scope.materiales, function(value, key) {

            if(value.type_id==id){
                existe=true;
            }
        });

        if(existe){
            toastr.error('Tipo de Material ya asignado', 'Error');
            return false;
        }else{
            $http({
                url: Routing.generate('delete_materiales_type'),
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
                    getTypes();
                },
                function (response) { // optional
                    // failed
                });
        }
    };
});
GSPEMApp.controller('ModelNewMaterialCtrl', function($filter,$scope,$http, $uibModalInstance, item,toastr,$rootScope) {
    $scope.item = item;


    var getContratistas = function() {
        $http.get(Routing.generate('get_contratistas')
        ).success(function (contratistas) {
            $scope.contratistas=contratistas;
            if(item!=null){
                $scope.contratistaselected=$filter('filter')($scope.contratistas,{"id":item.contratistaid})[0];
            }else {
                $scope.contratistaselected=$scope.contratistas[0];
            }
        });
    };
    getContratistas();



    $scope.referencia={ref1:"",ref2:""};

    $scope.types=$rootScope.typesMaterial.data;
    console.log($scope.types);
    $scope.name="";
    $scope.descript="";
    $scope.ubicacion="";
    $scope.origen="";
    $scope.descript="";
    $scope.umbralmin=0;
    $scope.umbralmax=0;

    $scope.id=0;
    $scope.id_custom="";

    $scope.type_default=$scope.types[0];
   // $scope.typematerial=1;


    if(item!=null){
        console.log(item);
        $scope.id=item.id;
        $scope.id_custom=item.idCustom
        $scope.name=item.name;
        if (parseInt(item.umbralmin)>=0){
            $scope.umbralmin=parseInt(item.umbralmin);
        }

        $scope.ubicacion=item.ubicacion;
        $scope.origen=item.origen;

        if(item.referencia){
            $scope.referencia=angular.fromJson(item.referencia);
        }
        $scope.descript=item.descript;
        $scope.typematerial=$filter('filter')($scope.types,{"id":item.type_id})[0];
        console.log($scope.typematerial);
    }else {
        $scope.typematerial=$scope.type_default;
        console.log($scope.typematerial);
    }


    $scope.setRef=function (group, color) {
        console.log(group);
        if(group==1){
            $scope.referencia.ref1=color;
        }else {
            $scope.referencia.ref2=color;
        }
        console.log($scope.referencia);
    };

    $scope.clearRef=function () {
        $scope.referencia={ref1:"",ref2:""};
    }


    $scope.cerrar=function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveMaterial= function () {
        console.log($scope.typematerial);


        if(!parseInt($scope.umbralmin))
        {
            $scope.umbralmin=0;
        }



        if($scope.typematerial != undefined){
            $scope.typeidmat=$scope.typematerial.id;
        }

        if ($scope.name.length == 0 || $scope.descript.length == 0 || $scope.id_custom.length == 0 ) {
            toastr.warning('Complete todos los campos requeridos (*)', 'Atención');
        } else {
            $http({
                url: Routing.generate('save_materiales'),
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: {
                    name: $scope.name,
                    descript: $scope.descript,
                    id: $scope.id,
                    umbralmin:parseInt($scope.umbralmin),
                    umbralmax:$scope.umbralmax,
                    referencia:angular.toJson($scope.referencia, 2),
                    origen:$scope.contratistaselected.id,
                    ubicacion:$scope.ubicacion,
                    id_custom: $scope.id_custom,
                    type: $scope.typeidmat,
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

GSPEMApp.controller('ModelNewTypeCtrl', function($filter,$scope,$http, $uibModalInstance, item ,toastr) {
    $scope.item = item;
    
    $scope.name="";

    $scope.descript="";
    $scope.id=0;



    if(item!=null){
        $scope.id=item.id;
        $scope.name=item.name;
        $scope.descript=item.descript;

    }


    $scope.cerrar=function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveType= function () {

        if($scope.name.length==0 ||  $scope.descript.length==0 ){
            toastr.warning('Complete todos los campos', 'Atención');
        } else {
            console.log($scope.typematerial);
            $http({
                url: Routing.generate('save_materiales_type'),
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: {
                    name: $scope.name,
                    descript: $scope.descript,
                    id:$scope.id,
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
            }
        };

});