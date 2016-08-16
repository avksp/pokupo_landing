function CartGoodsJsGenerator($scope) {
    var self = this;
    self.index = null;
    self.Init = {
        Self: function () {
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function () {
            $scope.form.cartGoods = {
                active: false,
                disabled: false,
                containerId: 'cartGoodsWidgetId',
                useCustomTmpl: false,
                pathTmpl: '',
                idTmpl: {
                    content: 'cartGoodsTmpl',
                    empty: 'emptyCartGoodsTmpl'
                }
            };
            $scope.Event.cartGoods = {
                ChangeActive: self.ChangeActive
            }
        },
        Error: function () {
            $scope.error.cartGoods = {
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
            $scope.$watch('form.cartGoods.active', function (newValue) {
                if (!newValue){
                    self.Error.Clear($scope.error.cartGoods, ['containerId', 'pathTmpl']);
                    self.Error.Clear($scope.error.cartGoods.idTmpl, ['content', 'empty']);
                }
            });
            $scope.$watch('form.cartGoods.containerId', function () {
                if (!$scope.error.cartGoods.containerId.valid)
                    self.Validator.ContainerId();
            });
            $scope.$watch('form.cartGoods.useCustomTmpl', function (newValue) {
                if (!newValue) {
                    self.Error.Clear($scope.error.cartGoods, ['pathTmpl']);
                    self.Error.Clear($scope.error.cartGoods.idTmpl, ['content', 'empty']);
                }
            });
            $scope.$watch('form.cartGoods.idTmpl.content', function () {
                if (!$scope.error.cartGoods.idTmpl.content.valid)
                    self.Validator.IdTmpl.Content();
            });
            $scope.$watch('form.cartGoods.idTmpl.empty', function () {
                if (!$scope.error.cartGoods.idTmpl.empty.valid)
                    self.Validator.IdTmpl.Empty();
            });
        }
    };
    self.ChangeActive = function(){
        if(!$scope.form.cartGoods.disabled) {
            if ($scope.form.cartGoods.active) {
                if($scope.form.profileCabinetWidget.active) {
                    $scope.form.cartGoodsCabinet.active = false;
                    $scope.form.cartGoodsCabinet.disabled = false;
                }
                $scope.form.menuCabinet.showCart = true;
                $scope.form.content.showCart = true;
                $scope.form.cartInfo.active = true;
                $scope.form.advancedSearch.result.showCart = true;
                $scope.form.goods.showBuy.disabled = false;
            }
            else{
                $scope.form.cartGoodsCabinet.active = false;
                $scope.form.cartGoodsCabinet.disabled = true;
                $scope.form.cartInfo.active = false;
                $scope.form.goods.show.addToCart = false;
                $scope.form.goods.show.buy = true;
                $scope.form.goods.showBuy.disabled = true;
                $scope.form.menuCabinet.showCart = false;
                $scope.form.content.showCart = false
                $scope.form.advancedSearch.result.showCart = false;
            }
        }
    };
    self.Validator = {
        Form: function (i) {
            self.index = i;
            var test = true;
            if (!self.Validator.ContainerId())
                test = false;
            if ($scope.form.cartGoods.useCustomTmpl) {
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
            $scope.error.cartGoods.containerId = {valid: true, message: ''};
            if (!$scope.form.cartGoods.containerId || $.trim($scope.form.cartGoods.containerId) == '') {
                $scope.error.cartGoods.containerId.valid = false;
                $scope.error.cartGoods.containerId.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        PathTmpl: function () {
            $scope.error.cartGoods.pathTmpl = {valid: true, message: ''};
            if (!$scope.form.cartGoods.pathTmpl || $.trim($scope.form.cartGoods.pathTmpl) == '') {
                $scope.error.cartGoods.pathTmpl.valid = false;
                $scope.error.cartGoods.pathTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            if($scope.form.cartGoods.pathTmpl){
                $scope.TmplValidate($scope.form.cartGoods, function(data){
                    if(data.result != 'ok') {
                        $scope.error.cartGoods.pathTmpl.valid = false;
                        $scope.error.cartGoods.pathTmpl.message = 'Файл шаблона не найден';
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
                $scope.error.cartGoods.idTmpl.content = { valid: true, message: ''};
                if (!$scope.form.cartGoods.idTmpl.content || $.trim($scope.form.cartGoods.idTmpl.content) == '') {
                    $scope.error.cartGoods.idTmpl.content.valid = false;
                    $scope.error.cartGoods.idTmpl.content.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Empty: function () {
                $scope.error.cartGoods.idTmpl.empty = {valid: true, message: ''};
                if (!$scope.form.cartGoods.idTmpl.empty || $.trim($scope.form.cartGoods.idTmpl.empty) == '') {
                    $scope.error.cartGoods.idTmpl.empty.valid = false;
                    $scope.error.cartGoods.idTmpl.empty.message = 'Поле обязательно для заполнения';
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