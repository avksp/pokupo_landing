function CartInfoJsGenerator($scope) {
    var self = this;
    self.index = null;
    self.Init = {
        Self: function () {
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function () {
            $scope.form.cartInfo = {
                active: false,
                disabled: true,
                containerId: 'cartInfoWidgetId',
                showTitle: 'never',
                show:{
                    count: true,
                    baseCost: false,
                    finalCost: false,
                    fullInfo: false
                },
                useCustomTmpl: false,
                pathTmpl: '',
                idTmpl: 'cartTmpl'
            }
        },
        Error: function () {
            $scope.error.cartInfo = {
                active: {valid: true, message: ''},
                containerId: {valid: true, message: ''},
                showTitle: {valid: true, message: ''},
                show: {valid: true, message: ''},
                useCustomTmpl: {valid: true, message: ''},
                pathTmpl: {valid: true, message: ''},
                idTmpl: {valid: true, message: ''}
            }
        },
        Watch: function () {
            $scope.$watch('form.cartInfo.active', function (newValue) {
                if (!newValue)
                    self.Error.Clear($scope.error.cartInfo);
            });
            $scope.$watch('form.cartInfo.containerId', function () {
                if (!$scope.error.cartInfo.containerId.valid)
                    self.Validator.ContainerId();
            });
            $scope.$watch('form.cartInfo.useCustomTmpl', function (newValue) {
                if (!newValue) {
                    self.Error.Clear($scope.error.cartInfo, ['pathTmpl', 'idTmpl']);
                }
            });
            $scope.$watch('form.cartInfo.idTmpl', function () {
                if (!$scope.error.cartInfo.idTmpl.valid)
                    self.Validator.IdTmpl();
            });
            $scope.$watch('form.cartInfo.showTitle', function () {
                if (!$scope.error.cartInfo.showTitle.valid)
                    self.Validator.ShowTitle();
            });
        }
    };
    self.Set = {
        Require: function(j){
            $scope.form.cartInfo.active = j;
        }
    };
    self.Validator = {
        Form: function (i) {
            self.index = i;
            if ($scope.form.cartInfo.active) {
                var test = true;
                if (!self.Validator.ContainerId())
                    test = false;
                if (!self.Validator.ShowTitle())
                    test = false;
                if ($scope.form.cartInfo.useCustomTmpl) {
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
        ContainerId: function () {
            $scope.error.cartInfo.containerId = {valid: true, message: ''};
            if (!$scope.form.cartInfo.containerId || $.trim($scope.form.cartInfo.containerId) == '') {
                $scope.error.cartInfo.containerId.valid = false;
                $scope.error.cartInfo.containerId.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        ShowTitle: function () {
            $scope.error.cartInfo.showTitle = {valid: true, message: ''};
            if (!$scope.form.cartInfo.showTitle) {
                $scope.error.cartInfo.showTitle.valid = false;
                $scope.error.cartInfo.showTitle.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        PathTmpl: function () {
            $scope.error.cartInfo.pathTmpl = {valid: true, message: ''};
            if (!$scope.form.cartInfo.pathTmpl || $.trim($scope.form.cartInfo.pathTmpl) == '') {
                $scope.error.cartInfo.pathTmpl.valid = false;
                $scope.error.cartInfo.pathTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            if($scope.form.cartInfo.pathTmpl){
                $scope.TmplValidate($scope.form.cartInfo, function(data){
                    if(data.result != 'ok') {
                        $scope.error.cartInfo.pathTmpl.valid = false;
                        $scope.error.cartInfo.pathTmpl.message = 'Файл шаблона не найден';
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
        IdTmpl: function () {
            $scope.error.cartInfo.idTmpl = {valid: true, message: ''};
            if (!$scope.form.cartInfo.idTmpl || $.trim($scope.form.cartInfo.idTmpl) == '') {
                $scope.error.cartInfo.idTmpl.valid = false;
                $scope.error.cartInfo.idTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        }
    };
    self.Error = {
        Clear: function (fields, keys) {
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