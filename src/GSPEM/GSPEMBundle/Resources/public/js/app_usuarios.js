/**
 * Created by gabo on 26/07/16.
 */
GSPEMApp.controller('abmUsuarios', function($scope,$http,$uibModal,toastr,MovPend) {



    $scope.propertyName = 'name';
    $scope.reverse = true;
    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };


    var getContratistas = function() {
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
    getContratistas();


    var gerPerfiles = function() {
        $http.get(Routing.generate('get_perfiles')
        ).success(function (perfiles) {
            $scope.perfiles=perfiles;
            console.log($scope.perfiles);
            $scope.profileselected=$scope.perfiles[0];
        });
    };
    gerPerfiles();

    var getUsuarios = function() {
        $http.get(Routing.generate('get_users')
        ).success(function (users) {
            $scope.users=users;
            //console.log($scope.users);
        });
    };
    getUsuarios();

    $scope.deleteUser = function (id) {
        $http({
            url: Routing.generate('delete_usuario'),
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                id:id,
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
        }).then(function (response) {
                getUsuarios();
            },
            function (response) { // optional
                // failed
            });
    };

    $scope.chaneStateUser=function (id,state) {
        var stateUser=1;
        if(state=="1"){
             stateUser=0;
        }
        $http({
            url: Routing.generate('save_users_state'),
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                id:id,
                state: stateUser
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
        }).then(function (response) {
            console.log(response);
                getUsuarios();
            },
            function (response) { // optional
                // failed
            });
    };


    $scope.new = function (item,template , controller) {
        if (item==null){
            item={};
        }
        item.perfiles=$scope.perfiles;
        item.contratistas=$scope.contratistas;
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
            getUsuarios();
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };
});



GSPEMApp.controller('ModalNewUserCtrl', function($filter,$scope,$http, $uibModalInstance, item,toastr) {
    $scope.item = item;
    $scope.perfiles=item.perfiles;
    $scope.contratistas=item.contratistas;
    $scope.contratistaenabled=false;

    $scope.contratistaselected=$scope.contratistas[0];

    $scope.profileselected=$scope.perfiles[0];

    $scope.type=1;
    $scope.pass="";
    $scope.passedite=true;



    $scope.editPass=function () {
        if($scope.passedite){
            $scope.passedite=false;
        }else {
            $scope.passedite=true;
        }
    }

    if(item.id!=null){
        console.log("edit");
        $scope.profileselected=$filter('filter')($scope.perfiles,{"id":item.profileid})[0];
        console.log(item.contratistaid);
        if(item.contratistaid==0){
            $scope.contratistaenabled=false
        }else {
            if(item.contratistaid>0){
                $scope.contratistaenabled=true;
                $scope.contratistaselected= $filter('filter')($scope.contratistas,{"id":item.contratistaid})[0];
            }else {
                $scope.contratistaenabled=false
            }
        }

        $scope.id=item.id;
        $scope.nombre=item.name;
        $scope.apellido=item.lastName;
        $scope.perfil=item.view;
        $scope.user=item.username;
        $scope.phone=item.phone;
        $scope.mail=item.mail;
    }else {
        console.log("new");
        $scope.nombre="";
        $scope.descript="";
        $scope.id=0;
        $scope.precio=0;
        $scope.precio1=0;
        $scope.perfil=1;
    }

    $scope.updateCon=function () {
        console.log($scope.contratistaselected);
    }


    $scope.cerrar=function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveUser= function () {

        if ($scope.nombre.length == 0 || $scope.user.length == 0  || $scope.mail.length == 0 ) {
            toastr.warning('Complete todos los campos requeridos (*)', 'Atención');
            return false;
        }

        if(!$scope.passedite){
            if($scope.pass.length <6){
                toastr.warning('La clave no puede ser menor a 6 digitos', 'Atención');
                return false;
            }
        }else{
            $scope.pass="";
        }


        if($scope.mail.search("@")< 0 || $scope.mail.indexOf(".com")< 0){
            toastr.warning('Mail invalido', 'Atención');
            return false;
        }

        console.log($scope.contratistaselected);

        if($scope.contratistaenabled){

            $scope.contrat= $scope.contratistaselected.id;
        }else {
            $scope.contrat=0;
        }

        $http({
            url: Routing.generate('save_users'),
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                nombre: $scope.nombre,
                apellido: $scope.apellido,
                id:$scope.id,
                username:$scope.user,
                password:$scope.pass,
                phone:$scope.phone,
                contratista: $scope.contrat,
                mail:$scope.mail,
                view:$scope.profileselected.id
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
        }).then(function (response) {
                //console.log(response);
                $uibModalInstance.dismiss('cancel');
            },
            function (response) { // optional
                // failed
            });
    };
});
