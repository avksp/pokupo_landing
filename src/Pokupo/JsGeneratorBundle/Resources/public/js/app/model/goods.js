function GoodsJsGenerator($scope){
    var self = this;
    self.index = null;
    self.Init = {
        Self: function(){
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function(){
            $scope.form.goods = {
                active: true,
                disabled: true,
                containerId: 'goodsWidgetId',
                show: {
                    selectionCount: false,
                    addToCart: false,
                    buy: true,
                    gallery: false,
                    shipping: false,
                    opinion: false
                },
                showBuy: {
                    disabled: true
                },
                useCustomTmpl: false,
                pathTmpl: '',
                idTmpl: 'goodsTmpl',
                related: {
                    active: false,
                    disabled: false
                }
            };
        },
        Error: function(){
            $scope.error.goods = {
                active: { valid: true, message: ''},
                containerId: { valid: true, message: ''},
                show: { valid: true, message: ''},
                useCustomTmpl: { valid: true, message: ''},
                pathTmpl: { valid: true, message: ''},
                idTmpl: { valid: true, message: ''}
            };
        },
        Watch: function(){
            $scope.$watch('form.goods.active', function (newValue) {
                if (!newValue)
                    self.Error.Clear($scope.error.goods);
            });
            $scope.$watch('form.goods.containerId', function () {
                if(!$scope.error.goods.containerId.valid)
                    self.Validator.ContainerId();
            });
            $scope.$watch('form.goods.useCustomTmpl', function (newValue) {
                if (!newValue) {
                    self.Error.Clear($scope.error.goods, ['pathTmpl', 'idTmpl']);
                }
            });
            $scope.$watch('form.goods.idTmpl', function () {
                if(!$scope.error.goods.idTmpl.valid)
                    self.Validator.IdTmpl();
            });
        }
    };
    self.Validator = {
        Form: function(i){
            self.index = i;
            var test = true;
            if (!self.Validator.ContainerId())
                test = false;
            if ($scope.form.goods.useCustomTmpl) {
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
            $scope.error.goods.containerId = {valid: true, message: ''};
            if (!$scope.form.goods.containerId || $.trim($scope.form.goods.containerId) == '') {
                $scope.error.goods.containerId.valid = false;
                $scope.error.goods.containerId.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        PathTmpl: function(){
            $scope.error.goods.pathTmpl = {valid: true, message: ''};
            if (!$scope.form.goods.pathTmpl || $.trim($scope.form.goods.pathTmpl) == '') {
                $scope.error.goods.pathTmpl.valid = false;
                $scope.error.goods.pathTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            if($scope.form.goods.pathTmpl){
                $scope.TmplValidate($scope.form.goods, function(data){
                    if(data.result != 'ok') {
                        $scope.error.goods.pathTmpl.valid = false;
                        $scope.error.goods.pathTmpl.message = 'Файл шаблона не найден';
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
            $scope.error.goods.idTmpl = {valid: true, message: ''};
            if (!$scope.form.goods.idTmpl || $.trim($scope.form.goods.idTmpl) == '') {
                $scope.error.goods.idTmpl.valid = false;
                $scope.error.goods.idTmpl.message = 'Поле обязательно для заполнения';
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