function PaymentJsGenerator($scope) {
    var self = this;
    self.index = null;
    self.Init = {
        Self: function(){
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function(){
            $scope.form.payment = {
                active: true,
                disabled: true,
                containerId: 'paymentWidgetId',
                button: 'Оплатить',
                useCustomTmpl: false,
                pathTmpl: '',
                idTmpl: {
                    content : 'paymentPageTmpl',
                    skin : 'buttonPaymentImpl'
                }
            };
        },
        Error: function(){
            $scope.error.payment = {
                active: { valid: true, message: ''},
                containerId: { valid: true, message: ''},
                button: {valid: true, message: ''},
                useCustomTmpl: { valid: true, message: ''},
                pathTmpl: { valid: true, message: ''},
                idTmpl:{
                    content: { valid: true, message: ''},
                    skin: { valid: true, message: ''}
                }
            };
        },
        Watch: function(){
            $scope.$watch('form.payment.active', function (newValue) {
                if (!newValue){
                    self.Error.Clear($scope.error.payment, ['containerId', 'pathTmpl', 'button']);
                    self.Error.Clear($scope.error.payment.idTmpl, ['content', 'skin']);
                }
            });
            $scope.$watch('form.payment.containerId', function () {
                if(!$scope.error.payment.containerId.valid)
                    self.Validator.ContainerId();
            });
            $scope.$watch('form.payment.button', function () {
                if(!$scope.error.payment.button.valid)
                    self.Validator.Button();
            });
            $scope.$watch('form.payment.useCustomTmpl', function (newValue) {
                if (!newValue) {
                    self.Error.Clear($scope.error.payment, ['pathTmpl']);
                    self.Error.Clear($scope.error.payment.idTmpl, ['content', 'skin']);
                }
            });
            $scope.$watch('form.payment.idTmpl.content', function () {
                if(!$scope.error.payment.idTmpl.content.valid)
                    self.Validator.IdTmpl.Content();
            });
            $scope.$watch('form.payment.idTmpl.skin', function () {
                if(!$scope.error.payment.idTmpl.skin.valid)
                    self.Validator.IdTmpl.Skin();
            });
        }
    };
    self.Validator = {
        Form: function(i){
            self.index = i;
            var test = true;
            if (!self.Validator.ContainerId())
                test = false;
            if (!self.Validator.Button())
                test = false;
            if ($scope.form.payment.useCustomTmpl) {
                if (!self.Validator.PathTmpl())
                    test = false;
                if (!self.Validator.IdTmpl.Content())
                    test = false;
                if (!self.Validator.IdTmpl.Skin())
                    test = false;
            }
            if (!test)
                return false;
            return true;
        },
        ContainerId: function(){
            $scope.error.payment.containerId = {valid: true, message: ''};
            if (!$scope.form.payment.containerId || $.trim($scope.form.payment.containerId) == '') {
                $scope.error.payment.containerId.valid = false;
                $scope.error.payment.containerId.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        Button: function(){
            $scope.error.payment.button = {valid: true, message: ''};
            if (!$scope.form.payment.button || $.trim($scope.form.payment.button) == '') {
                $scope.error.payment.button.valid = false;
                $scope.error.payment.button.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        PathTmpl: function(){
            $scope.error.payment.pathTmpl = {valid: true, message: ''};
            if (!$scope.form.payment.pathTmpl || $.trim($scope.form.payment.pathTmpl) == '') {
                $scope.error.payment.pathTmpl.valid = false;
                $scope.error.payment.pathTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            if($scope.form.payment.pathTmpl){
                $scope.TmplValidate($scope.form.payment, function(data){
                    if(data.result != 'ok') {
                        $scope.error.payment.pathTmpl.valid = false;
                        $scope.error.payment.pathTmpl.message = 'Файл шаблона не найден';
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
            Content: function(){
                $scope.error.payment.idTmpl.content = {valid: true, message: ''};
                if (!$scope.form.payment.idTmpl.content || $.trim($scope.form.payment.idTmpl.content) == '') {
                    $scope.error.payment.idTmpl.content.valid = false;
                    $scope.error.payment.idTmpl.content.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Skin: function(){
                $scope.error.payment.idTmpl.skin = {valid: true, message: ''};
                if (!$scope.form.payment.idTmpl.skin || $.trim($scope.form.payment.idTmpl.skin) == '') {
                    $scope.error.payment.idTmpl.skin.valid = false;
                    $scope.error.payment.idTmpl.skin.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            }
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