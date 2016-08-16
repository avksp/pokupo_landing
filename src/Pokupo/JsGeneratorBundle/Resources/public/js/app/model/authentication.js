function AuthenticationJsGenerator($scope){
    var self = this;
    self.index = null;
    self.Init = {
        Self: function(){
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function(){
            $scope.form.authentication = {
                active: true,
                disabled: true,
                containerId: 'authenticationWidgetId',
                https: 'always',
                useCustomTmpl: false,
                pathTmpl: '',
                idTmpl: 'authenticationTmplId'
            };
        },
        Error: function(){
            $scope.error.authentication = {
                active: { valid: true, message: ''},
                containerId: { valid: true, message: ''},
                https: { valid: true, message: ''},
                useCustomTmpl: { valid: true, message: ''},
                pathTmpl: { valid: true, message: ''},
                idTmpl: { valid: true, message: ''}
            };
        },
        Watch: function(){
            $scope.$watch('form.authentication.active', function (newValue) {
                if (!newValue)
                    self.Error.Clear($scope.error.authentication);
            });
            $scope.$watch('form.authentication.containerId', function () {
                if(!$scope.error.authentication.containerId.valid)
                    self.Validator.ContainerId();
            });
            $scope.$watch('form.authentication.useCustomTmpl', function (newValue) {
                if (!newValue) {
                    self.Error.Clear($scope.error.authentication, ['pathTmpl', 'idTmpl']);
                }
            });
            $scope.$watch('form.authentication.idTmpl', function () {
                if(!$scope.error.authentication.idTmpl.valid)
                    self.Validator.IdTmpl();
            });
        }
    };
    self.Validator = {
        Form: function(i){
            self.index = i;
            if ($scope.form.authentication.active) {
                var test = true;
                if (!self.Validator.ContainerId())
                    test = false;
                if ($scope.form.authentication.useCustomTmpl) {
                    if (!self.Validator.PathTmpl())
                        test = false;
                    if (!self.Validator.IdTmpl())
                        test = false;
                }
                if (!test)
                    return false;
            }
            return true;
        },
        ContainerId: function(){
            $scope.error.authentication.containerId = {valid: true, message: ''};
            if (!$scope.form.authentication.containerId || $.trim($scope.form.authentication.containerId) == '') {
                $scope.error.authentication.containerId.valid = false;
                $scope.error.authentication.containerId.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        PathTmpl: function(){
            $scope.error.authentication.pathTmpl = {valid: true, message: ''};
            if (!$scope.form.authentication.pathTmpl || $.trim($scope.form.authentication.pathTmpl) == '') {
                $scope.error.authentication.pathTmpl.valid = false;
                $scope.error.authentication.pathTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            if($scope.form.authentication.pathTmpl){
                $scope.TmplValidate($scope.form.authentication, function(data){
                    if(data.result != 'ok') {
                        $scope.error.authentication.pathTmpl.valid = false;
                        $scope.error.authentication.pathTmpl.message = 'Файл шаблона не найден';
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
            $scope.error.authentication.idTmpl = {valid: true, message: ''};
            if (!$scope.form.authentication.idTmpl || $.trim($scope.form.authentication.idTmpl) == '') {
                $scope.error.authentication.idTmpl.valid = false;
                $scope.error.authentication.idTmpl.message = 'Поле обязательно для заполнения';
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