function RegistrationJsGenerator($scope) {
    var self = this;
    self.index = null;
    self.Init = {
        Self: function () {
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function () {
            $scope.form.registration = {
                active: true,
                disabled: true,
                containerId: 'registrationWidgetId',
                useCustomTmpl: false,
                pathTmpl: '',
                idTmpl: {
                    step1: "registrationFromStep1Tmpl",
                    step2: "registrationFromStep2Tmpl",
                    step3: "registrationFromStep3Tmpl",
                    step4: "registrationFromStep4Tmpl"
                }
            };
        },
        Error: function () {
            $scope.error.registration = {
                active: {valid: true, message: ''},
                containerId: {valid: true, message: ''},
                useCustomTmpl: {valid: true, message: ''},
                pathTmpl: {valid: true, message: ''},
                idTmpl: {
                    step1: {valid: true, message: ''},
                    step2: {valid: true, message: ''},
                    step3: {valid: true, message: ''},
                    step4: {valid: true, message: ''}
                }
            };
        },
        Watch: function () {
            $scope.$watch('form.registration.active', function (newValue) {
                if (!newValue){
                    self.Error.Clear($scope.error.registration, ['containerId', 'pathTmpl']);
                    self.Error.Clear($scope.error.registration.idTmpl, ['step1', 'step2', 'step3', 'step4']);
                }
            });
            $scope.$watch('form.registration.containerId', function () {
                if (!$scope.error.registration.containerId.valid)
                    self.Validator.ContainerId();
            });
            $scope.$watch('form.registration.useCustomTmpl', function (newValue) {
                if (!newValue) {
                    self.Error.Clear($scope.error.registration, ['pathTmpl']);
                    self.Error.Clear($scope.error.registration.idTmpl, ['step1', 'step2', 'step3', 'step4']);
                }
            });
            $scope.$watch('form.registration.idTmpl.step1', function () {
                if (!$scope.error.registration.idTmpl.step1.valid)
                    self.Validator.IdTmpl.Step1();
            });
            $scope.$watch('form.registration.idTmpl.step2', function () {
                if (!$scope.error.registration.idTmpl.step2.valid)
                    self.Validator.IdTmpl.Step2();
            });
            $scope.$watch('form.registration.idTmpl.step3', function () {
                if (!$scope.error.registration.idTmpl.step3.valid)
                    self.Validator.IdTmpl.Step3();
            });
            $scope.$watch('form.registration.idTmpl.step4', function () {
                if (!$scope.error.registration.idTmpl.step4.valid)
                    self.Validator.IdTmpl.Step4();
            });
        }
    };
    self.Validator = {
        Form: function (i) {
            self.index = i;
            var test = true;
            if (!self.Validator.ContainerId())
                test = false;
            if ($scope.form.registration.useCustomTmpl) {
                if (!self.Validator.PathTmpl())
                    test = false;
                if (!self.Validator.IdTmpl.Step1())
                    test = false;
                if (!self.Validator.IdTmpl.Step2())
                    test = false;
                if (!self.Validator.IdTmpl.Step3())
                    test = false;
                if (!self.Validator.IdTmpl.Step4())
                    test = false;
            }
            if (!test)
                return false;
            return true;
        },
        ContainerId: function () {
            $scope.error.registration.containerId = {valid: true, message: ''};
            if (!$scope.form.registration.containerId || $.trim($scope.form.registration.containerId) == '') {
                $scope.error.registration.containerId.valid = false;
                $scope.error.registration.containerId.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        PathTmpl: function () {
            $scope.error.registration.pathTmpl = {valid: true, message: ''};
            if (!$scope.form.registration.pathTmpl || $.trim($scope.form.registration.pathTmpl) == '') {
                $scope.error.registration.pathTmpl.valid = false;
                $scope.error.registration.pathTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            if($scope.form.registration.pathTmpl){
                $scope.TmplValidate($scope.form.registration, function(data){
                    if(data.result != 'ok') {
                        $scope.error.registration.pathTmpl.valid = false;
                        $scope.error.registration.pathTmpl.message = 'Файл шаблона не найден';
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
                $scope.error.registration.idTmpl.step1 = {valid: true, message: ''};
                if (!$scope.form.registration.idTmpl.step1 || $.trim($scope.form.registration.idTmpl.step1) == '') {
                    $scope.error.registration.idTmpl.step1.valid = false;
                    $scope.error.registration.idTmpl.step1.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Step2: function () {
                $scope.error.registration.idTmpl.step2 = {valid: true, message: ''};
                if (!$scope.form.registration.idTmpl.step2 || $.trim($scope.form.registration.idTmpl.step2) == '') {
                    $scope.error.registration.idTmpl.step2.valid = false;
                    $scope.error.registration.idTmpl.step2.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Step3: function () {
                $scope.error.registration.idTmpl.step3 = {valid: true, message: ''};
                if (!$scope.form.registration.idTmpl.step3 || $.trim($scope.form.registration.idTmpl.step3) == '') {
                    $scope.error.registration.idTmpl.step3.valid = false;
                    $scope.error.registration.idTmpl.step3.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Step4: function () {
                $scope.error.registration.idTmpl.step4 = {valid: true, message: ''};
                if (!$scope.form.registration.idTmpl.step4 || $.trim($scope.form.registration.idTmpl.step4) == '') {
                    $scope.error.registration.idTmpl.step4.valid = false;
                    $scope.error.registration.idTmpl.step4.message = 'Поле обязательно для заполнения';
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