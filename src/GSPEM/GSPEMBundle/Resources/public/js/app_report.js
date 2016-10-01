/**
 * Created by gabo on 26/07/16.
 */

GSPEMApp.controller('abmReports', function($scope,$http,$uibModal,toastr,MovPend) {
    $scope.animationsEnabled = false;
    $scope.cargando=true;

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
            $scope.cargando=false;
            $scope.stock=stock;
            //console.log($scope.stock);
        });
    };
    getStock();




    var getSitios = function() {
        $http.get(Routing.generate('get_sitios')
        ).success(function (sitios) {
            $scope.sitios=sitios;
            $scope.sitioselected=$scope.sitios[0];
            getStockFromSite();
        });
    };




    $scope.updateReportSitios=function () {
        getStockFromSite();
    };


    getSitios();



    $scope.updateReportUsers=function () {
        getStockFromUser();
    };



    var getStockFromSite=function () {
        console.log($scope.sitioselected.id);
        $http({
            url: Routing.generate('get_stock_sitio_custom'),
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                id:  $scope.sitioselected.id
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
        }).then(function (response) {
                console.log(response);
                $scope.stock_sit=response.data;
            },
            function (response) { // optional
                // failed
            });
    }

    $scope.confirmar=function () {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = mm+'/'+dd+'/'+yyyy;

        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Reporte_Maestro_"+today+".xls");
    };




    $scope.exportarStockSitio=function () {

        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Reporte_"+$scope.sitioselected.name+".xls");
    };
});


GSPEMApp.controller('reportStockAllUsers', function($scope,$http,$uibModal,toastr,MovPend) {
    $scope.cargando=true;
    $scope.usersmultiselect=[];
    $scope.updateReportStockTecnico=function () {
        console.log($scope.usersselected);
        if($scope.usersselected[0]=="0"){
            getStockFromAllUsers();
        }else {
            $scope.newstock=[];
            for (var a = 0; a < $scope.stockfilter.length; a++) {
                for (var i = 0; i < $scope.usersselected.length; i++) {
                    if( parseInt($scope.stockfilter[a].tecid)== parseInt($scope.usersselected[i])){
                        // esta seleccionado
                        $scope.newstock.push($scope.stockfilter[a]);
                    }
                }

            }
        }

        $scope.stock=$scope.newstock;
        //getStockFromSite();
    };

    var getUsers= function () {
        $http.get(Routing.generate('get_users')
        ).success(function (data) {

            $scope.tecnicos=data;
            console.log($scope.tecnicos);
            $scope.usersmultiselect.push({id:0 ,label:"Todos"});
            for (var a = 0; a < $scope.tecnicos.length; a++) {
                $scope.usersmultiselect.push({id:$scope.tecnicos[a].id,label:$scope.tecnicos[a].name + ' '+ $scope.tecnicos[a].lastName});
            }
            $scope.tecnicotarea=$scope.tecnicos[0];
            //getStockFromUser();
        });
    }
    getUsers();


    var getStockFromAllUsers = function() {
        $http.get(Routing.generate('get_stock_users')
        ).success(function (stock) {
            $scope.stock=stock;
            $scope.stockfilter=$scope.stock;
            $scope.cargando=false;
        });
    };
    getStockFromAllUsers();


    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    $scope.exportar=function () {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = mm+'/'+dd+'/'+yyyy;
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Reporte_Stock_Tecnicos"+today+".xls");
    };

});



GSPEMApp.controller('abmReportsContratista', function($scope,$http,$uibModal,toastr,MovPend) {
    $scope.animationsEnabled = false;
    $scope.cargando=true;
    $scope.propertyName = 'id';
    $scope.reverse = true;

    $scope.usersmultiselect=[];
    $scope.updateReportContratista=function () {

        if($scope.contratistaselected[0]=="0"){
            getStockFromAllContratistas();
        }else {
            $scope.newstock=[];
            for (var a = 0; a < $scope.stockfilter.length; a++) {
                for (var i = 0; i < $scope.contratistaselected.length; i++) {
                    if( parseInt($scope.stockfilter[a].contratistaid)== parseInt($scope.contratistaselected[i])){
                        $scope.newstock.push($scope.stockfilter[a]);
                    }
                }

            }
        }

        $scope.stock=$scope.newstock;
        //getStockFromSite();
    };


    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    $scope.exportar=function () {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = mm+'/'+dd+'/'+yyyy;
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Reporte_Stock_Contratistas_"+today+".xls");
    };

    var getData = function() {
        $http.get(Routing.generate('get_contratistas')
        ).success(function (contratistas) {

            $scope.contratistas=contratistas;
            $scope.contratistaselected=$scope.contratistas[0];
            getStockFromAllContratistas();
        });
    };
    getData();

    var getStockFromAllContratistas = function() {
        $http.get(Routing.generate('get_stock_contratistas')
        ).success(function (stock) {
            $scope.stock=stock;
            $scope.stockfilter=$scope.stock;
            $scope.cargando=false;
        });
    };
    getStockFromAllContratistas();


});
GSPEMApp.controller('abmReportsMov', function($filter,$scope,$http,$uibModal,toastr,MovPend) {
    $scope.animationsEnabled = false;
    $scope.contratistaselected;

    
    
    $scope.exportar=function () {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = mm+'/'+dd+'/'+yyyy;
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Reporte_Movimientos_"+today+".xls");
    };
    
    $scope.propertyName = 'id';
    $scope.reverse = true;
    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };
    $scope.cargando=true;

    var getData = function() {
        $http.get(Routing.generate('get_report_movs')
        ).success(function (movs) {
            $scope.movs=movs;
            $scope.cargando=false;
        });
    };
    getData();

    
    $scope.showItems=function (items) {
        var modalInstance = $uibModal.open({
            templateUrl: "items_mov.html",
            controller: "ModalItemsMov",
            resolve: {
                items: function () {
                    return items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    }

    $scope.showNota=function (nota) {
        var modalInstance = $uibModal.open({
            templateUrl: "nota_mov.html",
            controller: "ModalNotaMov",
            resolve: {
                nota: function () {
                    return nota;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    }


});

GSPEMApp.controller('ModalItemsMov', function($filter,$scope,$http, $uibModalInstance, items,toastr) {
    $scope.stock = items;
    $scope.propertyName = 'name';
    $scope.reverse = true;
    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };
    $scope.cerrar=function () {
        $uibModalInstance.dismiss('cancel');
    };

});

GSPEMApp.controller('ModalNotaMov', function($filter,$scope,$http, $uibModalInstance, nota,toastr) {
    $scope.nota = nota;
    $scope.cerrar=function () {
        $uibModalInstance.dismiss('cancel');
    };

});

GSPEMApp.controller('abmReportsAlertas', function($filter,$scope,$http,$uibModal,toastr,MovPend) {


    $scope.propertyName = 'name';
    $scope.reverse = true;
    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    $scope.animationsEnabled = false;
    $scope.contratistaselected;
    $scope.parseInt = parseInt;
    $scope.showperfiledit = false;
    $scope.cargando = true;
    var getStock = function () {
        $http.get(Routing.generate('get_stock')
        ).success(function (stock) {
            $scope.cargando = false;
            $scope.stock = [];
            $scope.stock_temp = stock;
            for (var a = 0; a < $scope.stock_temp.length; a++) {
                if (parseInt($scope.stock_temp[a].stock) < parseInt($scope.stock_temp[a].umbralmin)) {
                    $scope.stock.push($scope.stock_temp[a]);
                }
            }
            //console.log($scope.stock);
        });
    };
    getStock();


    $scope.exportar=function () {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = mm+'/'+dd+'/'+yyyy;
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Reporte_Alertados_"+today+".xls");
    };
});

GSPEMApp.controller('reportsSitios', function($filter,$scope,$http,$uibModal,toastr,MovPend) {


    $scope.propertyName = 'name';
    $scope.reverse = true;
    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };
    

    var getSitios = function() {
        $http.get(Routing.generate('get_sitios')
        ).success(function (sitios) {
            $scope.sitios=sitios;
            $scope.sitioselected=$scope.sitios[0];
            getStockFromSite();
        });
    };



    $scope.updateReportSitios=function () {

        if($scope.sitioselected[0]=="0"){
            getStockFromSite();
        }else {
            $scope.newstock=[];
            for (var a = 0; a < $scope.stockfilter.length; a++) {
                for (var i = 0; i < $scope.sitioselected.length; i++) {
                    if( parseInt($scope.stockfilter[a].sitioid)== parseInt($scope.sitioselected[i])){
                        $scope.newstock.push($scope.stockfilter[a]);
                    }
                }

            }
        }

        $scope.stock=$scope.newstock;
        //getStockFromSite();
    };

    getSitios();



    var getStockFromSite = function() {
        $http.get(Routing.generate('get_stock_sitios')
        ).success(function (stock) {
            $scope.stock=stock;
            $scope.stockfilter=$scope.stock;
            $scope.cargando=false;
        });
    };
    getStockFromSite();

    $scope.exportar=function () {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = mm+'/'+dd+'/'+yyyy;
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Reporte_Sitios_"+today+".xls");
    };

});
