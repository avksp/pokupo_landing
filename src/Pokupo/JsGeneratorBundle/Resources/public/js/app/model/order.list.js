function OrderListJsGenerator($scope) {
    var self = this;
    self.index = null;
    self.Init = {
        Self: function () {
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function () {
            $scope.form.orderList = {
                active: true,
                disabled: true,
                containerId: 'orderListWidgetId',
                useCustomTmpl: false,
                pathTmpl: '',
                idTmpl: {
                    list : "orderListTmpl",
                    empty : 'orderEmptyListTmpl',
                    detail : "orderDetailTmpl"
                }
            };
        },
        Error: function () {
            $scope.error.orderList = {
                active: {valid: true, message: ''},
                containerId: {valid: true, message: ''},
                useCustomTmpl: {valid: true, message: ''},
                pathTmpl: {valid: true, message: ''},
                idTmpl: {
                    list : {valid: true, message: ''},
                    empty : {valid: true, message: ''},
                    detail : {valid: true, message: ''}
                }
            };
        },
        Watch: function () {
            $scope.$watch('form.orderList.active', function (newValue) {
                if (!newValue){
                    self.Error.Clear($scope.error.orderList, ['containerId', 'pathTmpl']);
                    self.Error.Clear($scope.error.orderList.idTmpl, ['list', 'empty', 'detail']);
                }
            });
            $scope.$watch('form.orderList.containerId', function () {
                if (!$scope.error.orderList.containerId.valid)
                    self.Validator.ContainerId();
            });
            $scope.$watch('form.orderList.useCustomTmpl', function (newValue) {
                if (!newValue) {
                    self.Error.Clear($scope.error.orderList, ['pathTmpl']);
                    self.Error.Clear($scope.error.orderList.idTmpl, ['list', 'detail', 'empty']);
                }
            });
            $scope.$watch('form.orderList.idTmpl.list', function () {
                if (!$scope.error.orderList.idTmpl.list.valid)
                    self.Validator.IdTmpl.List();
            });
            $scope.$watch('form.orderList.idTmpl.detail', function () {
                if (!$scope.error.orderList.idTmpl.detail.valid)
                    self.Validator.IdTmpl.Detail();
            });
            $scope.$watch('form.orderList.idTmpl.empty', function () {
                if (!$scope.error.orderList.idTmpl.empty.valid)
                    self.Validator.IdTmpl.Empty();
            });
        }
    };
    self.Set = {
        Require: function(j){
            $scope.form.orderList.active = j;
        }
    };
    self.Validator = {
        Form: function (i) {
            self.index = i;
            var test = true;
            if (!self.Validator.ContainerId())
                test = false;
            if ($scope.form.orderList.useCustomTmpl) {
                if (!self.Validator.PathTmpl())
                    test = false;
                if (!self.Validator.IdTmpl.List())
                    test = false;
                if (!self.Validator.IdTmpl.Detail())
                    test = false;
                if (!self.Validator.IdTmpl.Empty())
                    test = false;
            }
            if (!test)
                return false;
            return true;
        },
        ContainerId: function () {
            $scope.error.orderList.containerId = {valid: true, message: ''};
            if (!$scope.form.orderList.containerId || $.trim($scope.form.orderList.containerId) == '') {
                $scope.error.orderList.containerId.valid = false;
                $scope.error.orderList.containerId.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        PathTmpl: function () {
            $scope.error.orderList.pathTmpl = {valid: true, message: ''};
            if (!$scope.form.orderList.pathTmpl || $.trim($scope.form.orderList.pathTmpl) == '') {
                $scope.error.orderList.pathTmpl.valid = false;
                $scope.error.orderList.pathTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            if($scope.form.orderList.pathTmpl){
                $scope.TmplValidate($scope.form.orderList, function(data){
                    if(data.result != 'ok') {
                        $scope.error.orderList.pathTmpl.valid = false;
                        $scope.error.orderList.pathTmpl.message = 'Файл шаблона не найден';
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
        IdTmpl: {
            List: function () {
                $scope.error.orderList.idTmpl.list = {valid: true, message: ''};
                if (!$scope.form.orderList.idTmpl.list || $.trim($scope.form.orderList.idTmpl.list) == '') {
                    $scope.error.orderList.idTmpl.list.valid = false;
                    $scope.error.orderList.idTmpl.list.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Detail: function () {
                $scope.error.orderList.idTmpl.detail = {valid: true, message: ''};
                if (!$scope.form.orderList.idTmpl.detail || $.trim($scope.form.orderList.idTmpl.detail) == '') {
                    $scope.error.orderList.idTmpl.detail.valid = false;
                    $scope.error.orderList.idTmpl.detail.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Empty: function () {
                $scope.error.orderList.idTmpl.empty = {valid: true, message: ''};
                if (!$scope.form.orderList.idTmpl.empty || $.trim($scope.form.orderList.idTmpl.empty) == '') {
                    $scope.error.orderList.idTmpl.empty.valid = false;
                    $scope.error.orderList.idTmpl.empty.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            }
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