function CartGoodsCabinetJsGenerator($scope) {
    var self = this;
    self.test = 'test';
    self.index = null;
    self.Init = {
        Self: function () {
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function () {
            $scope.form.cartGoodsCabinet = {
                active: false,
                disabled: false,
                containerId: 'cartGoodsCabinetWidgetId',
                useCustomTmpl: false,
                pathTmpl: '',
                idTmpl: {
                    content : "cabinetCartGoodsTmpl",
                    empty : "emptyCabinetCartGoodsTmpl"
                }
            };
        },
        Error: function () {
            $scope.error.cartGoodsCabinet = {
                active: {valid: true, message: ''},
                containerId: {valid: true, message: ''},
                useCustomTmpl: {valid: true, message: ''},
                pathTmpl: {valid: true, message: ''},
                idTmpl: {
                    content: { valid: true, message: ''},
                    empty: {valid: true, message: ''}
                }
            };
        },
        Watch: function () {
            $scope.$watch('form.cartGoodsCabinet.active', function (newValue) {
                if (!newValue){
                    self.Error.Clear($scope.error.cartGoodsCabinet, ['containerId', 'pathTmpl']);
                    self.Error.Clear($scope.error.cartGoodsCabinet.idTmpl, ['content', 'empty']);
                }
            });
            $scope.$watch('form.cartGoodsCabinet.containerId', function () {
                if (!$scope.error.cartGoodsCabinet.containerId.valid)
                    self.Validator.ContainerId();
            });
            $scope.$watch('form.cartGoodsCabinet.useCustomTmpl', function (newValue) {
                if (!newValue) {
                    self.Error.Clear($scope.error.cartGoodsCabinet, ['pathTmpl']);
                    self.Error.Clear($scope.error.cartGoodsCabinet.idTmpl, ['content', 'empty']);
                }
            });
            $scope.$watch('form.cartGoodsCabinet.idTmpl.content', function () {
                if (!$scope.error.cartGoodsCabinet.idTmpl.content.valid)
                    self.Validator.IdTmpl.Content();
            });
            $scope.$watch('form.cartGoodsCabinet.idTmpl.empty', function () {
                if (!$scope.error.cartGoodsCabinet.idTmpl.empty.valid)
                    self.Validator.IdTmpl.Empty();
            });
        }
    };
    self.Set = {
        Require: function(j){
            $scope.form.cartGoodsCabinet.active = j;
        }
    };
    self.Validator = {
        Form: function(i) {
            self.index = i;
            var test = true;
            if (!self.Validator.ContainerId())
                test = false;
            if ($scope.form.cartGoodsCabinet.useCustomTmpl) {
                if (!self.Validator.PathTmpl())
                    test = false;
                if (!self.Validator.IdTmpl.Content())
                    test = false;
                if (!self.Validator.IdTmpl.Empty())
                    test = false;
            }
            if (!test)
                return false;
            return true;
        },
        ContainerId: function () {
            $scope.error.cartGoodsCabinet.containerId = {valid: true, message: ''};
            if (!$scope.form.cartGoodsCabinet.containerId || $.trim($scope.form.cartGoodsCabinet.containerId) == '') {
                $scope.error.cartGoodsCabinet.containerId.valid = false;
                $scope.error.cartGoodsCabinet.containerId.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        PathTmpl: function () {
            $scope.error.cartGoodsCabinet.pathTmpl = {valid: true, message: ''};
            if (!$scope.form.cartGoodsCabinet.pathTmpl || $.trim($scope.form.cartGoodsCabinet.pathTmpl) == '') {
                $scope.error.cartGoodsCabinet.pathTmpl.valid = false;
                $scope.error.cartGoodsCabinet.pathTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            if($scope.form.cartGoodsCabinet.pathTmpl){
                $scope.TmplValidate($scope.form.cartGoodsCabinet, function(data){
                    if(data.result != 'ok') {
                        $scope.error.cartGoodsCabinet.pathTmpl.valid = false;
                        $scope.error.cartGoodsCabinet.pathTmpl.message = 'Файл шаблона не найден';
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
            Content: function () {
                $scope.error.cartGoodsCabinet.idTmpl.content = { valid: true, message: ''};
                if (!$scope.form.cartGoodsCabinet.idTmpl.content || $.trim($scope.form.cartGoodsCabinet.idTmpl.content) == '') {
                    $scope.error.cartGoodsCabinet.idTmpl.content.valid = false;
                    $scope.error.cartGoodsCabinet.idTmpl.content.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Empty: function () {
                $scope.error.cartGoodsCabinet.idTmpl.empty = {valid: true, message: ''};
                if (!$scope.form.cartGoodsCabinet.idTmpl.empty || $.trim($scope.form.cartGoodsCabinet.idTmpl.empty) == '') {
                    $scope.error.cartGoodsCabinet.idTmpl.empty.valid = false;
                    $scope.error.cartGoodsCabinet.idTmpl.empty.message = 'Поле обязательно для заполнения';
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
};