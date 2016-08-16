function UserInfoJsGenerator($scope){
    var self = this;
    self.index = null;
    self.Init = {
        Self: function () {
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function () {
            $scope.form.userInfo = {
                active: false,
                disabled: false,
                containerId: 'userInformationWidgetId',
                show: {
                    icon: false,
                    rating: false,
                    profile: false
                },
                useCustomTmpl: false,
                pathTmpl: '',
                idTmpl: 'userInformationTmpl'
            }
        },
        Error: function () {
            $scope.error.userInfo = {
                active: { valid: true, message: ''},
                containerId: { valid: true, message: ''},
                show: { valid: true, message: '' },
                useCustomTmpl: { valid: true, message: '' },
                pathTmpl: { valid: true, message: '' },
                idTmpl: { valid: true, message: '' }
            }
        },
        Watch: function () {
            $scope.$watch('form.userInfo.active', function (newValue) {
                if (!newValue)
                    self.Error.Clear($scope.error.userInfo, ['active', 'containerId', 'pathTmpl', 'idTmpl']);
            });
            $scope.$watch('form.userInfo.containerId', function () {
                if(!$scope.error.userInfo.containerId.valid)
                    self.Validator.ContainerId();
            });
            $scope.$watch('form.userInfo.useCustomTmpl', function (newValue) {
                if (!newValue) {
                    self.Error.Clear($scope.error.userInfo, ['pathTmpl', 'idTmpl']);
                }
            });
            $scope.$watch('form.userInfo.idTmpl', function () {
                if(!$scope.error.userInfo.idTmpl.valid)
                    self.Validator.IdTmpl();
            });
        }
    };
    self.Set = {
        Require: function(j){
            $scope.form.userInfo.active = j;
            $scope.form.userInfo.disabled = j;
        }
    };
    self.Validator = {
        Form: function(i){
            self.index = i;
            if ($scope.form.userInfo.active) {
                var test = true;
                if (!self.Validator.ContainerId())
                    test = false;
                if ($scope.form.userInfo.useCustomTmpl) {
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
            $scope.error.userInfo.containerId = {valid: true, message: ''};
            if (!$scope.form.userInfo.containerId || $.trim($scope.form.userInfo.containerId) == '') {
                $scope.error.userInfo.containerId.valid = false;
                $scope.error.userInfo.containerId.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        PathTmpl: function(){
            $scope.error.userInfo.pathTmpl = {valid: true, message: ''};
            if (!$scope.form.userInfo.pathTmpl || $.trim($scope.form.userInfo.pathTmpl) == '') {
                $scope.error.userInfo.pathTmpl.valid = false;
                $scope.error.userInfo.pathTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            if($scope.form.userInfo.pathTmpl){
                $scope.TmplValidate($scope.form.userInfo, function(data){
                    if(data.result != 'ok') {
                        $scope.error.userInfo.pathTmpl.valid = false;
                        $scope.error.userInfo.pathTmpl.message = 'Файл шаблона не найден';
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
            $scope.error.userInfo.idTmpl = {valid: true, message: ''};
            if (!$scope.form.userInfo.idTmpl || $.trim($scope.form.userInfo.idTmpl) == '') {
                $scope.error.userInfo.idTmpl.valid = false;
                $scope.error.userInfo.idTmpl.message = 'Поле обязательно для заполнения';
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