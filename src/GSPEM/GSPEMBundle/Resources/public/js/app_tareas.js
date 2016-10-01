/**
 * Created by gabo on 26/07/16.
 */


GSPEMApp.controller('abmTareas', function($scope,$http,$uibModal,toastr,MovPend) {
    $scope.animationsEnabled = false;

    var getTareas = function() {
        $http.get(Routing.generate('get_tareas')
        ).success(function (tareas) {
                $scope.tareas=tareas;
                console.log($scope.tareas);
        });
    };
    getTareas();

    var getSitios= function () {
        $http.get(Routing.generate('get_sitios')
        ).success(function (data) {
            $scope.sitios=data;

        });
    }
    getSitios();

    $scope.sitios=[];
    var getUsers= function () {
        $http.get(Routing.generate('get_users')
        ).success(function (data) {
            $scope.tecnicos=data;

        });
    }
    getUsers();



    $scope.new = function (item,template , controller) {
        $scope.data={};
        $scope.data={item:item,tecnicos:$scope.tecnicos,sitios:$scope.sitios};

        var data=$scope.data;
        var modalInstance = $uibModal.open({
            templateUrl: template,
            controller: controller,
            resolve: {
                data: function () {
                    return data;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            getTareas()
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };


    $scope.deleteTarea= function (id) {
        console.log("delete");
        $http({
            url: Routing.generate('delete_tarea'),
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
                getTareas()
            },
            function (response) { // optional
                // failed
            });
    };


});

GSPEMApp.controller('abmTareasTecnico', function($scope,$http,$uibModal,toastr,MovPend) {
    $scope.animationsEnabled = false;

    var getTareas = function() {
        $http.get(Routing.generate('get_tareas_tecnico')
        ).success(function (tareas) {
            $scope.tareas=tareas;
            console.log($scope.tareas);
        });
    };
    getTareas();

    var getSitios= function () {
        $http.get(Routing.generate('get_sitios')
        ).success(function (data) {
            $scope.sitios=data;

        });
    }
    getSitios();

    $scope.sitios=[];
    var getUsers= function () {
        $http.get(Routing.generate('get_users')
        ).success(function (data) {
            $scope.tecnicos=data;

        });
    }
    getUsers();



    $scope.new = function (item,template , controller) {
        $scope.data={};
        $scope.data={item:item,tecnicos:$scope.tecnicos,sitios:$scope.sitios};

        var data=$scope.data;
        var modalInstance = $uibModal.open({
            templateUrl: template,
            controller: controller,
            resolve: {
                data: function () {
                    return data;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            getTareas()
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };


    $scope.setEstado= function (id,estado) {
        console.log("delete");
        $http({
            url: Routing.generate('set_tarea_estado'),
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                id: id,
                estado: estado
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
        }).then(function (response) {
                getTareas()
            },
            function (response) { // optional
                // failed
            });
    };
    


    $scope.deleteTarea= function (id) {
        console.log("delete");
        $http({
            url: Routing.generate('delete_tarea'),
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
                getTareas()
            },
            function (response) { // optional
                // failed
            });
    };


});

GSPEMApp.controller('ModelTareaCtrl', function($filter,$scope,$http, $uibModalInstance, data,toastr) {

    $scope.item = data.item;
    $scope.sitios=data.sitios;
    $scope.tecnicos=data.tecnicos;

    $scope.name="";
    $scope.descript="";
    $scope.editing=true;
    $scope.id=0;
    console.log("itme");
    console.log($scope.item);

    if($scope.item!=null){
        $scope.editing=false;

        $scope.id=$scope.item.id;

        $scope.descript=$scope.item.descript;
        $scope.name=$scope.item.name;


        console.log($scope.item.tecnico_id);
        $scope.tecnicotarea=$filter('filter')($scope.tecnicos,{"id":$scope.item.tecnico_id})[0];
        $scope.sitiotarea=$filter('filter')($scope.sitios,{"id":$scope.item.sitio_id})[0];
    }else{
        $scope.tecnicotarea=$scope.tecnicos[0];
        $scope.sitiotarea=$scope.sitios[0];
    }

    $scope.cerrar=function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save= function () {
        console.log($scope.direccion)

        if ($scope.name.length == 0 || $scope.name.descript == 0 ) {
            toastr.warning('Complete todos los campos requeridos (*)', 'Atención');
        } else {

        $http({
            url: Routing.generate('save_tarea'),
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                descript: $scope.descript,
                name:$scope.name,
                sitio:$scope.sitiotarea.id,
                tecnico:$scope.tecnicotarea.id,
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
GSPEMApp.controller('ModelTareaCtrlTest', function($filter,$scope,$http, $uibModalInstance, data,toastr) {
    console.log("data");
    console.log(data);


});