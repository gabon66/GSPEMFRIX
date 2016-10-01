/**
 * Created by gabo on 26/07/16.
 */

GSPEMApp.controller('abmStockMov', function($scope,$http,$uibModal,toastr ,MovPend) {
    $scope.animationsEnabled = false;
    $scope.stockPendiente=[];

    var getUsers= function () {
        $http.get(Routing.generate('get_users')
        ).success(function (data) {
            $scope.tecnicos=data;

            for (var a = 0; a < $scope.tecnicos.length; a++) {
                if ($scope.tecnicos[a].contratista!=null){
                    $scope.tecnicos[a].name=$scope.tecnicos[a].name+" "+$scope.tecnicos[a].lastName +" - "+$scope.tecnicos[a].contratista;
                }else {
                    $scope.tecnicos[a].name=$scope.tecnicos[a].name+" "+$scope.tecnicos[a].lastName;
                }
            }

            $scope.tecnicotarea=$scope.tecnicos[0];
        });
    }
    getUsers();


    $scope.propertyName = 'id';
    $scope.reverse = true;
    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    $scope.parseInt = parseInt;

    var getStock = function() {
        $http.get(Routing.generate('get_stock')
        ).success(function (stock) {
            $scope.stock=stock;
            for (var a = 0; a < $scope.stock.length; a++) {
                $scope.stock[a].referencia=angular.fromJson($scope.stock[a].referencia);
            }
            //console.log($scope.stock);
        });
    };
    getStock();


    $scope.cancelStock=function (item) {
        item.stock=item.stock_ori;
        $scope.stockPendienteTemp=[];
        item.new_stock=0;
        item.showcancel=false;
        for (var a = 0; a < $scope.stockPendiente.length; a++) {
            if($scope.stockPendiente[a].id==item.id){
                existe=true;
                $scope.stockPendiente[a].stock= parseInt($scope.stockPendiente[a].stock) +parseInt(item.cant);
            }else {
                $scope.stockPendienteTemp.push($scope.stockPendiente[a]);
            }
        }
        $scope.stockPendiente=$scope.stockPendienteTemp;
    }


    $scope.setStock=function (item) {
      //console.log(item.cant);

        if(item.cant=="" || item.cant==undefined){
            item.cant=1;
        }

        if(item.cant>0){

            if(parseInt(item.cant)>parseInt(item.stock)){
                toastr.warning('Indique numero menor o igual al stock maestro', 'Atención');
            }else {
                item.showcancel=true;
                if(!item.stock_ori){
                    item.stock_ori=item.stock;
                }
                item.stock=parseInt(item.stock) - parseInt(item.cant) ;
                item.new_stock=item.stock;

                if ($scope.stockPendiente.length>0){
                    var existe=false;
                    for (var a = 0; a < $scope.stockPendiente.length; a++) {
                        if($scope.stockPendiente[a].id==item.id){
                            existe=true;
                            $scope.stockPendiente[a].stock= parseInt($scope.stockPendiente[a].stock) +parseInt(item.cant);
                        }
                    }
                    if(!existe){
                        $scope.stockPendiente.push({id:item.id,idCustom:item.idCustom ,name:item.name , stock:item.cant})
                    }
                }else {
                    $scope.stockPendiente.push({id:item.id,idCustom:item.idCustom ,name:item.name , stock:item.cant})
                }

            }

        }

    };


    $scope.confirmar=function () {
        confirmar_stock_maestro();
        confirmar_mov_stoc_tec();
    }


    var confirmar_stock_maestro=function () {
        $http({
            url: Routing.generate('set_stock'),
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            data: {
                items:$scope.stock
            }
        }).then(function (response) {
                console.log(response);
                //getStock();
                //toastr.success('Guardado con éxito', 'Stock');
            },
            function (response) { // optional
                // failed
            });
    }


    var confirmar_mov_stoc_tec=function () {
        $http({
            url: Routing.generate('set_stock_mov_tec'),
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            data: {
                tecnico:$scope.tecnicotarea.id,
                nota:"prueba",
                items:$scope.stockPendiente
            }
        }).then(function (response) {
                console.log(response);
                $scope.stockPendiente=[];
                getStock();
                toastr.success('Guardado con éxito', 'Stock');
            },
            function (response) { // optional
                // failed
            });
    }



});

GSPEMApp.controller('abmStockMovTecnicoToTecnico', function($scope,$http,$uibModal,toastr ,MovPend) {
    $scope.animationsEnabled = false;
    $scope.stockPendiente=[];

    var getUsers= function () {
        $http.get(Routing.generate('get_users')
        ).success(function (data) {
            $scope.tecnicos=data;
            for (var a = 0; a < $scope.tecnicos.length; a++) {
                if ($scope.tecnicos[a].contratista!=null){
                    $scope.tecnicos[a].name=$scope.tecnicos[a].name+" "+$scope.tecnicos[a].lastName +" - "+$scope.tecnicos[a].contratista;
                }else {
                    $scope.tecnicos[a].name=$scope.tecnicos[a].name+" "+$scope.tecnicos[a].lastName;
                }
            }

            $scope.tecnicoorigen=$scope.tecnicos[0];
            $scope.tecnicodestino=$scope.tecnicos[0];
            getStockFromUser();
        });
    }
    getUsers();

    $scope.propertyName = 'id';
    $scope.reverse = true;
    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };


    $scope.getStockOrigen= function () {
        $scope.stockPendiente=[];
        getStockFromUser();
    }

    var getStockFromUser=function () {

        $http({
            url: Routing.generate('get_stock_user_custom'),
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                id:  $scope.tecnicoorigen.id
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
        }).then(function (response) {
                console.log(response);


                $scope.stock=response.data;
                for (var a = 0; a < $scope.stock.length; a++) {
                    $scope.stock[a].referencia=angular.fromJson($scope.stock[a].referencia);
                }

            },
            function (response) { // optional
                // failed
            });
    }



    $scope.cancelStock=function (item) {
        item.stock=item.stock_ori;
        $scope.stockPendienteTemp=[];
        item.new_stock=0;
        item.showcancel=false;
        for (var a = 0; a < $scope.stockPendiente.length; a++) {
            if($scope.stockPendiente[a].id==item.id){
                existe=true;
                $scope.stockPendiente[a].stock= parseInt($scope.stockPendiente[a].stock) +parseInt(item.cant);
            }else {
                $scope.stockPendienteTemp.push($scope.stockPendiente[a]);
            }
        }
        $scope.stockPendiente=$scope.stockPendienteTemp;
    }


    $scope.setStock=function (item) {
        //console.log(item.cant);

        if(item.cant=="" || item.cant==undefined){
            item.cant=1;
        }

        if(item.cant>0){

            if(parseInt(item.cant)>parseInt(item.stock)){
                toastr.warning('Indique numero menor o igual al stock maestro', 'Atención');
            }else {
                item.showcancel=true;
                if(!item.stock_ori){
                    item.stock_ori=item.stock;
                }
                item.stock=parseInt(item.stock) - parseInt(item.cant) ;
                item.new_stock=item.stock;

                if ($scope.stockPendiente.length>0){
                    var existe=false;
                    for (var a = 0; a < $scope.stockPendiente.length; a++) {
                        if($scope.stockPendiente[a].id==item.id){
                            existe=true;
                            $scope.stockPendiente[a].stock= parseInt($scope.stockPendiente[a].stock) +parseInt(item.cant);
                        }
                    }
                    if(!existe){
                        $scope.stockPendiente.push({id:item.id,idCustom:item.idCustom ,name:item.name , stock:item.cant})
                    }
                }else {
                    $scope.stockPendiente.push({id:item.id,idCustom:item.idCustom ,name:item.name , stock:item.cant})
                }

            }

        }

    };


    $scope.confirmar=function () {
        if($scope.tecnicodestino.id == $scope.tecnicoorigen.id ){
            toastr.warning('Seleccione un tecnico distinto para el envio de stock', 'Error');
        } else {
            confirmar_stock_tecnico();
            confirmar_mov_stoc_tec();
        }
    }


    var confirmar_stock_tecnico=function () {
        $http({
            url: Routing.generate('set_stock_user'),
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            data: {
                user: $scope.tecnicoorigen.id,
                items:$scope.stock
            }
        }).then(function (response) {
                console.log(response);
                //getStock();
                //toastr.success('Guardado con éxito', 'Stock');
            },
            function (response) { // optional
                // failed
            });
    }


    var confirmar_mov_stoc_tec=function () {
        $http({
            url: Routing.generate('set_stock_mov_tec'),
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            data: {
                
                tecnico:$scope.tecnicodestino.id,
                origen:$scope.tecnicoorigen.id,
                nota:"prueba",
                items:$scope.stockPendiente
            }
        }).then(function (response) {
                console.log(response);
                $scope.stockPendiente=[];
                getStockFromUser();
                toastr.success('Guardado con éxito', 'Stock');
            },
            function (response) { // optional
                // failed
            });
    }

});
GSPEMApp.controller('abmStockMovTecnicoToTecnicoFromTec', function($scope,$http,$uibModal,toastr ,MovPend) {
    $scope.animationsEnabled = false;
    $scope.stockPendiente=[];

    var getUsers= function () {
        $http.get(Routing.generate('get_users')
        ).success(function (data) {
            $scope.tecnicos=data;
            for (var a = 0; a < $scope.tecnicos.length; a++) {
                if ($scope.tecnicos[a].contratista!=null){
                    $scope.tecnicos[a].name=$scope.tecnicos[a].name+" "+$scope.tecnicos[a].lastName +" - "+$scope.tecnicos[a].contratista;
                }else {
                    $scope.tecnicos[a].name=$scope.tecnicos[a].name+" "+$scope.tecnicos[a].lastName;
                }
            }

            $scope.tecnicodestino=$scope.tecnicos[0];
        });
    }
    getUsers();

    var getStock = function() {
        $http.get(Routing.generate('get_stock_user')
        ).success(function (stock) {
            $scope.stock=stock;
            for (var a = 0; a < $scope.stock.length; a++) {
                $scope.stock[a].referencia=angular.fromJson($scope.stock[a].referencia);
            }

            //console.log($scope.stock);
        });
    };
    getStock();


    $scope.cancelStock=function (item) {
        item.stock=item.stock_ori;
        $scope.stockPendienteTemp=[];
        item.new_stock=0;
        item.showcancel=false;
        for (var a = 0; a < $scope.stockPendiente.length; a++) {
            if($scope.stockPendiente[a].id==item.id){
                existe=true;
                $scope.stockPendiente[a].stock= parseInt($scope.stockPendiente[a].stock) +parseInt(item.cant);
            }else {
                $scope.stockPendienteTemp.push($scope.stockPendiente[a]);
            }
        }
        $scope.stockPendiente=$scope.stockPendienteTemp;
    }


    $scope.setStock=function (item) {
        //console.log(item.cant);

        if(item.cant=="" || item.cant==undefined){
            item.cant=1;
        }

        if(item.cant>0){

            if(parseInt(item.cant)>parseInt(item.stock)){
                toastr.warning('Indique numero menor o igual al stock maestro', 'Atención');
            }else {
                item.showcancel=true;
                if(!item.stock_ori){
                    item.stock_ori=item.stock;
                }
                item.stock=parseInt(item.stock) - parseInt(item.cant) ;
                item.new_stock=item.stock;

                if ($scope.stockPendiente.length>0){
                    var existe=false;
                    for (var a = 0; a < $scope.stockPendiente.length; a++) {
                        if($scope.stockPendiente[a].id==item.id){
                            existe=true;
                            $scope.stockPendiente[a].stock= parseInt($scope.stockPendiente[a].stock) +parseInt(item.cant);
                        }
                    }
                    if(!existe){
                        $scope.stockPendiente.push({id:item.id,idCustom:item.idCustom ,name:item.name , stock:item.cant})
                    }
                }else {
                    $scope.stockPendiente.push({id:item.id,idCustom:item.idCustom ,name:item.name , stock:item.cant})
                }

            }

        }

    };


    $scope.confirmar=function () {
        confirmar_stock_tecnico();
        confirmar_mov_stoc_tec();
    }


    var confirmar_stock_tecnico=function () {
        $http({
            url: Routing.generate('set_stock_user'),
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            data: {
                user: "login",
                items:$scope.stock
            }
        }).then(function (response) {
                console.log(response);
                //getStock();
                //toastr.success('Guardado con éxito', 'Stock');
            },
            function (response) { // optional
                // failed
            });
    }


    var confirmar_mov_stoc_tec=function () {
        $http({
            url: Routing.generate('set_stock_mov_tec'),
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            data: {

                tecnico:$scope.tecnicodestino.id,
                origen:"login",
                nota:"prueba",
                items:$scope.stockPendiente
            }
        }).then(function (response) {
                console.log(response);
                $scope.stockPendiente=[];
                getStock();
                toastr.success('Guardado con éxito', 'Stock');
            },
            function (response) { // optional
                // failed
            });
    }

});