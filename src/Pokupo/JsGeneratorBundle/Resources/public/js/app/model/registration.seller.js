function RegistrationSellerJsGenerator($scope) {
    var self = this;
    self.index = null;
    self.Init = {
        Self: function () {
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function () {
            $scope.form.registrationSeller = {
                active: false,
                disabled: false,
                containerId: 'registrationSellerWidgetId',
                useCustomTmpl: false,
                pathTmpl: '',
                idTmpl: {
                    step1: "registrationSellerFromStep1Tmpl",
                    step2: "registrationSellerFromStep2Tmpl",
                    step3: "registrationSellerFromStep3Tmpl",
                    step4: "registrationSellerFromStep4Tmpl"
                }
            };
            $scope.Event.registrationSeller ={
                ChangeActive: self.ChangeActive
            }
        },
        Error: function () {
            $scope.error.registrationSeller = {
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
        ChangeActive: function(){
            if(!$scope.form.registrationSeller.disabled) {
                if ($scope.form.registrationSeller.active)
                    $scope.form.menuCabinet.showRegSeller = true;
                else
                    $scope.form.menuCabinet.showRegSeller = false;
            }
        },
        Watch: function () {
            $scope.$watch('form.registrationSeller.active', function (newValue) {
                if (!newValue){
                    self.Error.Clear($scope.error.registrationSeller, ['containerId', 'pathTmpl']);
                    self.Error.Clear($scope.error.registrationSeller.idTmpl, ['step1', 'step2', 'step3', 'step4']);
                }
            });
            $scope.$watch('form.registrationSeller.containerId', function () {
                if (!$scope.error.registrationSeller.containerId.valid)
                    self.Validator.ContainerId();
            });
            $scope.$watch('form.registrationSeller.useCustomTmpl', function (newValue) {
                if (!newValue) {
                    self.Error.Clear($scope.error.registrationSeller, ['pathTmpl']);
                    self.Error.Clear($scope.error.registrationSeller.idTmpl, ['step1', 'step2', 'step3', 'step4']);
                }
            });
            $scope.$watch('form.registrationSeller.idTmpl.step1', function () {
                if (!$scope.error.registrationSeller.idTmpl.step1.valid)
                    self.Validator.IdTmpl.Step1();
            });
            $scope.$watch('form.registrationSeller.idTmpl.step2', function () {
                if (!$scope.error.registrationSeller.idTmpl.step2.valid)
                    self.Validator.IdTmpl.Step2();
            });
            $scope.$watch('form.registrationSeller.idTmpl.step3', function () {
                if (!$scope.error.registrationSeller.idTmpl.step3.valid)
                    self.Validator.IdTmpl.Step3();
            });
            $scope.$watch('form.registrationSeller.idTmpl.step4', function () {
                if (!$scope.error.registrationSeller.idTmpl.step4.valid)
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
            if ($scope.form.registrationSeller.useCustomTmpl) {
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
            $scope.error.registrationSeller.containerId = {valid: true, message: ''};
            if (!$scope.form.registrationSeller.containerId || $.trim($scope.form.registrationSeller.containerId) == '') {
                $scope.error.registrationSeller.containerId.valid = false;
                $scope.error.registrationSeller.containerId.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        PathTmpl: function () {
            $scope.error.registrationSeller.pathTmpl = {valid: true, message: ''};
            if (!$scope.form.registrationSeller.pathTmpl || $.trim($scope.form.registrationSeller.pathTmpl) == '') {
                $scope.error.registrationSeller.pathTmpl.valid = false;
                $scope.error.registrationSeller.pathTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            if($scope.form.registrationSeller.pathTmpl){
                $scope.TmplValidate($scope.form.registrationSeller, function(data){
                    if(data.result != 'ok') {
                        $scope.error.registrationSeller.pathTmpl.valid = false;
                        $scope.error.registrationSeller.pathTmpl.message = 'Файл шаблона не найден';
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
                $scope.error.registrationSeller.idTmpl.step1 = {valid: true, message: ''};
                if (!$scope.form.registrationSeller.idTmpl.step1 || $.trim($scope.form.registrationSeller.idTmpl.step1) == '') {
                    $scope.error.registrationSeller.idTmpl.step1.valid = false;
                    $scope.error.registrationSeller.idTmpl.step1.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Step2: function () {
                $scope.error.registrationSeller.idTmpl.step2 = {valid: true, message: ''};
                if (!$scope.form.registrationSeller.idTmpl.step2 || $.trim($scope.form.registrationSeller.idTmpl.step2) == '') {
                    $scope.error.registrationSeller.idTmpl.step2.valid = false;
                    $scope.error.registrationSeller.idTmpl.step2.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Step3: function () {
                $scope.error.registrationSeller.idTmpl.step3 = {valid: true, message: ''};
                if (!$scope.form.registrationSeller.idTmpl.step3 || $.trim($scope.form.registrationSeller.idTmpl.step3) == '') {
                    $scope.error.registrationSeller.idTmpl.step3.valid = false;
                    $scope.error.registrationSeller.idTmpl.step3.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Step4: function () {
                $scope.error.registrationSeller.idTmpl.step4 = {valid: true, message: ''};
                if (!$scope.form.registrationSeller.idTmpl.step4 || $.trim($scope.form.registrationSeller.idTmpl.step4) == '') {
                    $scope.error.registrationSeller.idTmpl.step4.valid = false;
                    $scope.error.registrationSeller.idTmpl.step4.message = 'Поле обязательно для заполнения';
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