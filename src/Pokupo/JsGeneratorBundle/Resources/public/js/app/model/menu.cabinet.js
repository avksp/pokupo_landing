function MenuCabinetJsGenerator($scope) {
    var self = this;
    self.index = null;
    self.Init = {
        Self: function(){
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function(){
            $scope.form.menuCabinet = {
                active: false,
                disabled: true,
                containerId: 'menuPersonalCabinetWidgetId',
                showCart: false,
                showRegSeller: false,
                useCustomTmpl: false,
                pathTmpl: '',
                idTmpl: 'menuPersonalCabinetTmpl'
            };
        },
        Error: function(){
            $scope.error.menuCabinet = {
                active: { valid: true, message: ''},
                containerId: { valid: true, message: ''},
                showCart: {valid: true, message: ''},
                useCustomTmpl: { valid: true, message: ''},
                pathTmpl: { valid: true, message: ''},
                idTmpl: { valid: true, message: ''}
            };
        },
        Watch: function(){
            $scope.$watch('form.menuCabinet.active', function (newValue) {
                if (!newValue)
                    self.Error.Clear($scope.error.menuCabinet);
            });
            $scope.$watch('form.menuCabinet.containerId', function () {
                if(!$scope.error.menuCabinet.containerId.valid)
                    self.Validator.ContainerId();
            });
            $scope.$watch('form.menuCabinet.useCustomTmpl', function (newValue) {
                if (!newValue) {
                    self.Error.Clear($scope.error.menuCabinet, ['pathTmpl', 'idTmpl']);
                }
            });
            $scope.$watch('form.menuCabinet.idTmpl', function () {
                if(!$scope.error.menuCabinet.idTmpl.valid)
                    self.Validator.IdTmpl();
            });
        }
    };
    self.Set = {
        Require: function(j){
            $scope.form.menuCabinet.active = j;
        }
    };
    self.Validator = {
        Form: function(i){
            self.index = i;
            var test = true;
            if (!self.Validator.ContainerId())
                test = false;
            if ($scope.form.menuCabinet.useCustomTmpl) {
                if (!self.Validator.PathTmpl())
                    test = false;
                if (!self.Validator.IdTmpl())
                    test = false;
            }
            if (!test)
                return false;
            return true;
        },
        ContainerId: function(){
            $scope.error.menuCabinet.containerId = {valid: true, message: ''};
            if (!$scope.form.menuCabinet.containerId || $.trim($scope.form.menuCabinet.containerId) == '') {
                $scope.error.menuCabinet.containerId.valid = false;
                $scope.error.menuCabinet.containerId.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        PathTmpl: function(){
            $scope.error.menuCabinet.pathTmpl = {valid: true, message: ''};
            if (!$scope.form.menuCabinet.pathTmpl || $.trim($scope.form.menuCabinet.pathTmpl) == '') {
                $scope.error.menuCabinet.pathTmpl.valid = false;
                $scope.error.menuCabinet.pathTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            if($scope.form.menuCabinet.pathTmpl){
                $scope.TmplValidate($scope.form.menuCabinet, function(data){
                    if(data.result != 'ok') {
                        $scope.error.menuCabinet.pathTmpl.valid = false;
                        $scope.error.menuCabinet.pathTmpl.message = 'Файл шаблона не найден';
                        $scope.$apply();
                        return false;
                    }
                    else
                        $scope.Next(self.index);
                    return true;
                });
            }
            else
                return true;
        },
        IdTmpl: function(){
            $scope.error.menuCabinet.idTmpl = {valid: true, message: ''};
            if (!$scope.form.menuCabinet.idTmpl || $.trim($scope.form.menuCabinet.idTmpl) == '') {
                $scope.error.menuCabinet.idTmpl.valid = false;
                $scope.error.menuCabinet.idTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        }
    };
    self.Error = {
        Clear: function(fields, keys) {
            if (keys) {
                $.each(keys, function (i, key) {
                    fields[key] = {
                        valid: true,
                        message: ''
                    }
                })
            }
            else {
                $.each(fields, function (i) {
                    fields[i] = {
                        valid: true,
                        message: ''
                    }
                })
            }
        }
    }

    self.Init.Self();
}