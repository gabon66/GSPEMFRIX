/**
 * Created by gabo on 26/07/16.
 */


GSPEMApp.controller('abmStockPend', function($scope,$http,$uibModal,toastr,MovPend) {
    $scope.animationsEnabled = false;
    $scope.descript_reject="";
    var getStockPend = function() {
        $http.get(Routing.generate('get_mov_pend_items')
        ).success(function (movs) {
                $scope.movs=movs;

            for (var i = 0; i < $scope.movs.length; i++) {
                for (var a = 0; a < $scope.movs[i].items.length; a++) {
                    $scope.movs[i].items[a].referencia = angular.fromJson($scope.movs[i].items[a].referencia);
                }
            }
        });
    };
    getStockPend();

    var getStock = function() {
        $http.get(Routing.generate('get_stock_user')
        ).success(function (stock) {
            $scope.stock=stock;
            //console.log($scope.stock);
        });
    };
    getStock();

    $scope.setStockRechazo=function (mov_id,item) {

        for (var i = 0; i < $scope.movs.length; i++) {

            if($scope.movs[i].id==mov_id){
                console.log($scope.movs);
                $scope.movimientoitems = $scope.movs[i].items;
                for (var a = 0; a < $scope.movimientoitems.length; a++) {
                    if($scope.movimientoitems[a].id==item.id){

                        if(item.cantrechazo <= $scope.movs[i].items[a].cant  &&  item.cantrechazo >0){
                            if(!$scope.movs[i].items[a].cant_ori){
                                $scope.movs[i].items[a].cant_ori= $scope.movs[i].items[a].cant;
                            }
                            $scope.movs[i].items[a].cant=parseInt($scope.movimientoitems[a].cant) -parseInt(item.cantrechazo);
                            $scope.movs[i].items[a].cant_new=parseInt($scope.movimientoitems[a].cant) -parseInt(item.cantrechazo);
                            console.log($scope.movs[i]);
                        }
                        //$scope.movs.items[a].stock= parseInt($scope.movs.items[a].stock) -parseInt(item.cantrechazo);
                    }
                }
            }
        }
    }
    
    
    $scope.cancelPend= function (mov_id,item) {
        for (var i = 0; i < $scope.movs.length; i++) {
            if($scope.movs[i].id==mov_id){
                console.log($scope.movs);
                $scope.movimientoitems = $scope.movs[i].items;
                for (var a = 0; a < $scope.movimientoitems.length; a++) {
                    if($scope.movimientoitems[a].id==item.id){

                        $scope.movs[i].items[a].cant=$scope.movs[i].items[a].cant_ori;
                        $scope.movs[i].items[a].cantrechazo=0;
                        $scope.movs[i].items[a].cant_ori="";
                    }
                }
            }
        }
    }


    var showModalReject=function (idmov,items) {
        $scope.descript_reject="";
        var modalInstance = $uibModal.open({
            templateUrl: "rechazo_stock.html",
            controller: "ModalRechazoStock",
            resolve: {
                idmov: function () {
                    return idmov;
                }
            }
        });

        modalInstance.result.then(function (descript) {
            $scope.descript_reject = descript;

            if($scope.descript_reject!=""){
                saveStock(idmov,items);
            }else {
                toastr.warning('Inserte alguna descripcion por el rechazo parcial de stock', 'Error');
            }
        }, function () {
            toastr.warning('Inserte alguna descripcion por el rechazo parcial de stock', 'Error');
            //$log.info('Modal dismissed at: ' + new Date());
        });
    }

    var showModalAllReject=function (idmov) {
        $scope.descript_reject="";
        var modalInstance = $uibModal.open({
            templateUrl: "rechazo_stock.html",
            controller: "ModalRechazoStock",
            resolve: {
                idmov: function () {
                    return idmov;
                }
            }
        });

        modalInstance.result.then(function (descript) {
            $scope.descript_reject = descript;
            if($scope.descript_reject!=""){
                rechazarAllSock(idmov);
            }else {
                toastr.warning('Inserte alguna descripcion por el rechazo de stock', 'Error');
            }
        }, function () {
            toastr.warning('Inserte alguna descripcion por el rechazo de stock', 'Error');
            //$log.info('Modal dismissed at: ' + new Date());
        });
    }


    var saveStock= function (id,items) {
        $scope.itemsrejected_post="";
        $scope.itemsrejected=[];

        for (var a = 0; a < items.length; a++) {
            if(items[a].cantrechazo>0){
                $scope.itemsrejected.push(items[a]);
            }
        }
        if($scope.itemsrejected.length>0){
            $scope.itemsrejected_post=$scope.itemsrejected;
        }

        $http({
            url: Routing.generate('aceptar_mov_pend'),
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            data: {
                nota:$scope.descript_reject,
                id: id,
                items_rejected:$scope.itemsrejected_post
            }
        }).then(function (response) {
                console.log(response);
                toastr.success('Transferencia realizada con exito', 'Stock');
                getStockPend();
            },
            function (response) { // optional
                console.log(response);
                // failed
            });
    }

    $scope.aceptar= function (id,items) {
        var tieneRechazos=false;
        for (var a = 0; a < items.length; a++) {
            if(items[a].cantrechazo>0){
                tieneRechazos=true;
            }
        }
        if(tieneRechazos){
            showModalReject(id,items)
        }else {
            saveStock(id,items)
        }
    };



    var rechazarAllSock= function (id) {
        console.log("delete");
        $http({
            url: Routing.generate('rechazar_mov_pend'),
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                nota:$scope.descript_reject,
                id: id
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
        }).then(function (response) {
                toastr.success('Rechazo de stock realizada con exito', 'Stock');
                getStockPend();
            },
            function (response) { // optional
                // failed
            });
    }
    $scope.rechazar= function (id) {
        showModalAllReject(id);
    }
    

});

GSPEMApp.controller('ModalRechazoStock', function($filter,$scope,$http, $uibModalInstance, idmov,toastr) {
    $scope.id = idmov;
    $scope.descript="";

    $scope.cerrar=function () {
        $uibModalInstance.dismiss('cancel');
    };


    $scope.saveDescript= function () {
        console.log("test");
        $uibModalInstance.close($scope.descript);

    };

});