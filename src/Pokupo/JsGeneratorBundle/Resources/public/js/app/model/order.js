function OrderJsGenerator($scope) {
    var self = this;
    self.index = null;
    self.Init = {
        Self: function () {
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function () {
            $scope.form.order = {
                active: true,
                disabled: true,
                containerId: 'orderWidgetId',
                useCustomTmpl: false,
                pathTmpl: '',
                idTmpl: {
                    step1 : "orderFormStep1Tmpl",
                    step1Confirm : "orderConfirmFormStep1Tmpl",
                    step1Profile : 'orderProfileFormStep1Tmpl',
                    step2 : "orderFormStep2Tmpl",
                    step2Form : 'orderDeliveryFormStep2Tmpl',
                    step3 : "orderFormStep3Tmpl",
                    step4 : "orderFormStep4Tmpl",
                    step5 : "orderFormStep5Tmpl"
                }
            };
        },
        Error: function () {
            $scope.error.order = {
                active: {valid: true, message: ''},
                containerId: {valid: true, message: ''},
                useCustomTmpl: {valid: true, message: ''},
                pathTmpl: {valid: true, message: ''},
                idTmpl: {
                    step1 : {valid: true, message: ''},
                    step1Confirm : {valid: true, message: ''},
                    step1Profile : {valid: true, message: ''},
                    step2 : {valid: true, message: ''},
                    step2Form : {valid: true, message: ''},
                    step3 : {valid: true, message: ''},
                    step4 : {valid: true, message: ''},
                    step5 : {valid: true, message: ''}
                }
            };
        },
        Watch: function () {
            $scope.$watch('form.order.active', function (newValue) {
                if (!newValue){
                    self.Error.Clear($scope.error.order, ['containerId', 'pathTmpl']);
                    self.Error.Clear($scope.error.order.idTmpl, ['step1', 'step1Confirm', 'step1Profile', 'step2', 'step2Form', 'step3', 'step4', 'step5']);
                }
            });
            $scope.$watch('form.order.containerId', function () {
                if (!$scope.error.order.containerId.valid)
                    self.Validator.ContainerId();
            });
            $scope.$watch('form.order.useCustomTmpl', function (newValue) {
                if (!newValue) {
                    self.Error.Clear($scope.error.order, ['pathTmpl']);
                    self.Error.Clear($scope.error.order.idTmpl, ['step1', 'step1Confirm', 'step1Profile', 'step2', 'step2Form', 'step3', 'step4', 'step4']);
                }
            });
            $scope.$watch('form.order.idTmpl.step1', function () {
                if (!$scope.error.order.idTmpl.step1.valid)
                    self.Validator.IdTmpl.Step1();
            });
            $scope.$watch('form.order.idTmpl.step1Confirm', function () {
                if (!$scope.error.order.idTmpl.step1Confirm.valid)
                    self.Validator.IdTmpl.Step1Confirm();
            });
            $scope.$watch('form.order.idTmpl.step1Profile', function () {
                if (!$scope.error.order.idTmpl.step1Profile.valid)
                    self.Validator.IdTmpl.Step1Profile();
            });
            $scope.$watch('form.order.idTmpl.step2', function () {
                if (!$scope.error.order.idTmpl.step2.valid)
                    self.Validator.IdTmpl.Step2();
            });
            $scope.$watch('form.order.idTmpl.step2Form', function () {
                if (!$scope.error.order.idTmpl.step2Form.valid)
                    self.Validator.IdTmpl.Step2Form();
            });
            $scope.$watch('form.order.idTmpl.step3', function () {
                if (!$scope.error.order.idTmpl.step3.valid)
                    self.Validator.IdTmpl.Step3();
            });
            $scope.$watch('form.order.idTmpl.step4', function () {
                if (!$scope.error.order.idTmpl.step4.valid)
                    self.Validator.IdTmpl.Step4();
            });
            $scope.$watch('form.order.idTmpl.step5', function () {
                if (!$scope.error.order.idTmpl.step5.valid)
                    self.Validator.IdTmpl.Step5();
            });
        }
    };
    self.Validator = {
        Form: function (i) {
            self.index = i;
            var test = true;
            if (!self.Validator.ContainerId())
                test = false;
            if ($scope.form.order.useCustomTmpl) {
                if (!self.Validator.PathTmpl())
                    test = false;
                if (!self.Validator.IdTmpl.Step1())
                    test = false;
                if (!self.Validator.IdTmpl.Step1Confirm())
                    test = false;
                if (!self.Validator.IdTmpl.Step1Profile())
                    test = false;
                if (!self.Validator.IdTmpl.Step2())
                    test = false;
                if (!self.Validator.IdTmpl.Step2Form())
                    test = false;
                if (!self.Validator.IdTmpl.Step3())
                    test = false;
                if (!self.Validator.IdTmpl.Step4())
                    test = false;
                if (!self.Validator.IdTmpl.Step5())
                    test = false;
            }
            if (!test)
                return false;
            return true;
        },
        ContainerId: function () {
            $scope.error.order.containerId = {valid: true, message: ''};
            if (!$scope.form.order.containerId || $.trim($scope.form.order.containerId) == '') {
                $scope.error.order.containerId.valid = false;
                $scope.error.order.containerId.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        PathTmpl: function () {
            $scope.error.order.pathTmpl = {valid: true, message: ''};
            if (!$scope.form.order.pathTmpl || $.trim($scope.form.order.pathTmpl) == '') {
                $scope.error.order.pathTmpl.valid = false;
                $scope.error.order.pathTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            if($scope.form.order.pathTmpl){
                $scope.TmplValidate($scope.form.order, function(data){
                    if(data.result != 'ok') {
                        $scope.error.order.pathTmpl.valid = false;
                        $scope.error.order.pathTmpl.message = 'Файл шаблона не найден';
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
            Step1: function () {
                $scope.error.order.idTmpl.step1 = {valid: true, message: ''};
                if (!$scope.form.order.idTmpl.step1 || $.trim($scope.form.order.idTmpl.step1) == '') {
                    $scope.error.order.idTmpl.step1.valid = false;
                    $scope.error.order.idTmpl.step1.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Step1Confirm: function () {
                $scope.error.order.idTmpl.step1Confirm = {valid: true, message: ''};
                if (!$scope.form.order.idTmpl.step1Confirm || $.trim($scope.form.order.idTmpl.step1Confirm) == '') {
                    $scope.error.order.idTmpl.step1Confirm.valid = false;
                    $scope.error.order.idTmpl.step1Confirm.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Step1Profile: function () {
                $scope.error.order.idTmpl.step1Profile = {valid: true, message: ''};
                if (!$scope.form.order.idTmpl.step1Profile || $.trim($scope.form.order.idTmpl.step1Profile) == '') {
                    $scope.error.order.idTmpl.step1Profile.valid = false;
                    $scope.error.order.idTmpl.step1Profile.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Step2: function () {
                $scope.error.order.idTmpl.step2 = {valid: true, message: ''};
                if (!$scope.form.order.idTmpl.step2 || $.trim($scope.form.order.idTmpl.step2) == '') {
                    $scope.error.order.idTmpl.step2.valid = false;
                    $scope.error.order.idTmpl.step2.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Step2Form: function () {
                $scope.error.order.idTmpl.step2Form = {valid: true, message: ''};
                if (!$scope.form.order.idTmpl.step2Form || $.trim($scope.form.order.idTmpl.step2Form) == '') {
                    $scope.error.order.idTmpl.step2Form.valid = false;
                    $scope.error.order.idTmpl.step2Form.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Step3: function () {
                $scope.error.order.idTmpl.step3 = {valid: true, message: ''};
                if (!$scope.form.order.idTmpl.step3 || $.trim($scope.form.order.idTmpl.step3) == '') {
                    $scope.error.order.idTmpl.step3.valid = false;
                    $scope.error.order.idTmpl.step3.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Step4: function () {
                $scope.error.order.idTmpl.step4 = {valid: true, message: ''};
                if (!$scope.form.order.idTmpl.step4 || $.trim($scope.form.order.idTmpl.step4) == '') {
                    $scope.error.order.idTmpl.step4.valid = false;
                    $scope.error.order.idTmpl.step4.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Step5: function () {
                $scope.error.order.idTmpl.step5 = {valid: true, message: ''};
                if (!$scope.form.order.idTmpl.step5 || $.trim($scope.form.order.idTmpl.step5) == '') {
                    $scope.error.order.idTmpl.step5.valid = false;
                    $scope.error.order.idTmpl.step5.message = 'Поле обязательно для заполнения';
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