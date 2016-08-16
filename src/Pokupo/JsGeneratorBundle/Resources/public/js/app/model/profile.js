function ProfileJsGenerator($scope) {
    var self = this;
    self.index = null;
    self.Init = {
        Self: function(){
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function(){
            $scope.form.profile = {
                active: false,
                disabled: true,
                containerId: 'profileWidgetId',
                useCustomTmpl: false,
                pathTmpl: '',
                idTmpl: {
                    personal : "personalInformationTmpl",
                    delivery : "deliveryAddressTmpl",
                    deliveryForm : "deliveryAddressFormTmpl",
                    security : "securityTmpl"
                }
            };
        },
        Error: function(){
            $scope.error.profile = {
                active: { valid: true, message: ''},
                containerId: { valid: true, message: ''},
                useCustomTmpl: { valid: true, message: ''},
                pathTmpl: { valid: true, message: ''},
                idTmpl: {
                    personal : { valid: true, message: ''},
                    delivery : { valid: true, message: ''},
                    deliveryForm : { valid: true, message: ''},
                    security : { valid: true, message: ''}
                }
            };
        },
        Watch: function(){
            $scope.$watch('form.profile.active', function (newValue) {
                if (!newValue){
                    self.Error.Clear($scope.error.profile, ['containerId', 'pathTmpl']);
                    self.Error.Clear($scope.error.profile.idTmpl, ['personal', 'delivery', 'deliveryForm', 'security']);
                }
            });
            $scope.$watch('form.profile.containerId', function () {
                if(!$scope.error.profile.containerId.valid)
                    self.Validator.ContainerId();
            });
            $scope.$watch('form.profile.useCustomTmpl', function (newValue) {
                if (!newValue) {
                    self.Error.Clear($scope.error.profile, ['pathTmpl']);
                    self.Error.Clear($scope.error.profile.idTmpl, ['personal', 'delivery', 'deliveryForm', 'security']);
                }
            });
            $scope.$watch('form.profile.idTmpl.personal', function () {
                if(!$scope.error.profile.idTmpl.personal.valid)
                    self.Validator.IdTmpl.Personal();
            });
            $scope.$watch('form.profile.idTmpl.delivery', function () {
                if(!$scope.error.profile.idTmpl.delivery.valid)
                    self.Validator.IdTmpl.Delivery();
            });
            $scope.$watch('form.profile.idTmpl.deliveryForm', function () {
                if(!$scope.error.profile.idTmpl.deliveryForm.valid)
                    self.Validator.IdTmpl.DeliveryForm();
            });
            $scope.$watch('form.profile.idTmpl.security', function () {
                if(!$scope.error.profile.idTmpl.security.valid)
                    self.Validator.IdTmpl.Security();
            });
        }
    };
    self.Set = {
        Require: function(j){
            $scope.form.profile.active = j;
        }
    }
    self.Validator = {
        Form: function(i){
            self.index = i;
            var test = true;
            if (!self.Validator.ContainerId())
                test = false;
            if ($scope.form.profile.useCustomTmpl) {
                if (!self.Validator.PathTmpl())
                    test = false;
                if (!self.Validator.IdTmpl.Personal())
                    test = false;
                if (!self.Validator.IdTmpl.Delivery())
                    test = false;
                if (!self.Validator.IdTmpl.DeliveryForm())
                    test = false;
                if (!self.Validator.IdTmpl.Security())
                    test = false;
            }
            if (!test)
                return false;
            return true;
        },
        ContainerId: function(){
            $scope.error.profile.containerId = {valid: true, message: ''};
            if (!$scope.form.profile.containerId || $.trim($scope.form.profile.containerId) == '') {
                $scope.error.profile.containerId.valid = false;
                $scope.error.profile.containerId.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        PathTmpl: function(){
            $scope.error.profile.pathTmpl = {valid: true, message: ''};
            if (!$scope.form.profile.pathTmpl || $.trim($scope.form.profile.pathTmpl) == '') {
                $scope.error.profile.pathTmpl.valid = false;
                $scope.error.profile.pathTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            if($scope.form.profile.pathTmpl){
                $scope.TmplValidate($scope.form.profile, function(data){
                    if(data.result != 'ok') {
                        $scope.error.profile.pathTmpl.valid = false;
                        $scope.error.profile.pathTmpl.message = 'Файл шаблона не найден';
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
            Personal: function(){
                $scope.error.profile.idTmpl.personal = {valid: true, message: ''};
                if (!$scope.form.profile.idTmpl.personal || $.trim($scope.form.profile.idTmpl.personal) == '') {
                    $scope.error.profile.idTmpl.personal.valid = false;
                    $scope.error.profile.idTmpl.personal.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Delivery: function(){
                $scope.error.profile.idTmpl.delivery = {valid: true, message: ''};
                if (!$scope.form.profile.idTmpl.delivery || $.trim($scope.form.profile.idTmpl.delivery) == '') {
                    $scope.error.profile.idTmpl.delivery.valid = false;
                    $scope.error.profile.idTmpl.delivery.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            DeliveryForm: function(){
                $scope.error.profile.idTmpl.deliveryForm = {valid: true, message: ''};
                if (!$scope.form.profile.idTmpl.deliveryForm || $.trim($scope.form.profile.idTmpl.deliveryForm) == '') {
                    $scope.error.profile.idTmpl.deliveryForm.valid = false;
                    $scope.error.profile.idTmpl.deliveryForm.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Security: function(){
                $scope.error.profile.idTmpl.security = {valid: true, message: ''};
                if (!$scope.form.profile.idTmpl.security || $.trim($scope.form.profile.idTmpl.security) == '') {
                    $scope.error.profile.idTmpl.security.valid = false;
                    $scope.error.profile.idTmpl.security.message = 'Поле обязательно для заполнения';
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