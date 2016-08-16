function ShopInfoJsGenerator($scope) {
    var self = this;
    self.index = null;
    self.Init = {
        Self: function(){
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function(){
            $scope.form.shopInfo = {
                active: true,
                disabled: false,
                containerId: 'shopInfoWidgetId',
                show: {
                    logo: true,
                    title: true
                },
                useCustomTmpl: false,
                pathTmpl: '',
                idTmpl: 'shopInfoTmpl'
            };
        },
        Error: function(){
            $scope.error.shopInfo = {
                active: { valid: true, message: ''},
                containerId: { valid: true, message: ''},
                show: { valid: true, message: ''},
                useCustomTmpl: { valid: true, message: ''},
                pathTmpl: { valid: true, message: ''},
                idTmpl: { valid: true, message: ''}
            };
        },
        Watch: function(){
            $scope.$watch('form.shopInfo.active', function (newValue) {
                if (!newValue)
                    self.Error.Clear($scope.error.shopInfo);
            });
            $scope.$watch('form.shopInfo.containerId', function () {
                if(!$scope.error.shopInfo.containerId.valid)
                    self.Validator.ContainerId();
            });
            $scope.$watch('form.shopInfo.useCustomTmpl', function (newValue) {
                if (!newValue) {
                    self.Error.Clear($scope.error.shopInfo, ['pathTmpl', 'idTmpl']);
                }
            });
            $scope.$watch('form.shopInfo.idTmpl', function () {
                if(!$scope.error.shopInfo.idTmpl.valid)
                    self.Validator.IdTmpl();
            });
        }
    };
    self.Set = {
        Require: function(j){
            $scope.form.shopInfo.active = j;
        }
    };
    self.Validator = {
        Form: function(i){
            self.index = i;
            if ($scope.form.shopInfo.active) {
                var test = true;
                if (!self.Validator.ContainerId())
                    test = false;
                if ($scope.form.shopInfo.useCustomTmpl) {
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
            $scope.error.shopInfo.containerId = {valid: true, message: ''};
            if (!$scope.form.shopInfo.containerId || $.trim($scope.form.shopInfo.containerId) == '') {
                $scope.error.shopInfo.containerId.valid = false;
                $scope.error.shopInfo.containerId.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        PathTmpl: function(){
            $scope.error.shopInfo.pathTmpl = {valid: true, message: ''};
            if (!$scope.form.shopInfo.pathTmpl || $.trim($scope.form.shopInfo.pathTmpl) == '') {
                $scope.error.shopInfo.pathTmpl.valid = false;
                $scope.error.shopInfo.pathTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            if($scope.form.shopInfo.pathTmpl){
                $scope.TmplValidate($scope.form.shopInfo, function(data){
                    if(data.result != 'ok') {
                        $scope.error.shopInfo.pathTmpl.valid = false;
                        $scope.error.shopInfo.pathTmpl.message = 'Файл шаблона не найден';
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
            $scope.error.shopInfo.idTmpl = {valid: true, message: ''};
            if (!$scope.form.shopInfo.idTmpl || $.trim($scope.form.shopInfo.idTmpl) == '') {
                $scope.error.shopInfo.idTmpl.valid = false;
                $scope.error.shopInfo.idTmpl.message = 'Поле обязательно для заполнения';
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