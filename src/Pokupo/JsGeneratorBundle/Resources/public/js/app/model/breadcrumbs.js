function BreadcrumbsJsGenerator($scope) {
    var self = this;
    self.index = null;
    self.Init = {
        Self: function(){
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function(){
            $scope.form.breadcrumbs = {
                active: false,
                disabled: false,
                containerId: 'breadCrumbsWidgetId_1',
                useCustomTmpl: false,
                pathTmpl: '',
                idTmpl: 'breadCrumbTmpl'
            };
        },
        Error: function(){
            $scope.error.breadcrumbs = {
                active: { valid: true, message: ''},
                containerId: { valid: true, message: ''},
                useCustomTmpl: { valid: true, message: ''},
                pathTmpl: { valid: true, message: ''},
                idTmpl: { valid: true, message: ''}
            };
        },
        Watch: function(){
            $scope.$watch('form.breadcrumbs.active', function (newValue) {
                if (!newValue)
                    self.Error.Clear($scope.error.breadcrumbs);
            });
            $scope.$watch('form.breadcrumbs.containerId', function () {
                if(!$scope.error.breadcrumbs.containerId.valid)
                    self.Validator.ContainerId();
            });
            $scope.$watch('form.breadcrumbs.useCustomTmpl', function (newValue) {
                if (!newValue) {
                    self.Error.Clear($scope.error.breadcrumbs, ['pathTmpl', 'idTmpl']);
                }
            });
            $scope.$watch('form.breadcrumbs.idTmpl', function () {
                if(!$scope.error.breadcrumbs.idTmpl.valid)
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
            if ($scope.form.breadcrumbs.useCustomTmpl) {
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
            $scope.error.breadcrumbs.containerId = {valid: true, message: ''};
            if (!$scope.form.breadcrumbs.containerId || $.trim($scope.form.breadcrumbs.containerId) == '') {
                $scope.error.breadcrumbs.containerId.valid = false;
                $scope.error.breadcrumbs.containerId.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        PathTmpl: function(){
            $scope.error.breadcrumbs.pathTmpl = {valid: true, message: ''};
            if (!$scope.form.breadcrumbs.pathTmpl || $.trim($scope.form.breadcrumbs.pathTmpl) == '') {
                $scope.error.breadcrumbs.pathTmpl.valid = false;
                $scope.error.breadcrumbs.pathTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            if($scope.form.breadcrumbs.pathTmpl){
                $scope.TmplValidate($scope.form.breadcrumbs, function(data){
                    if(data.result != 'ok') {
                        $scope.error.breadcrumbs.pathTmpl.valid = false;
                        $scope.error.breadcrumbs.pathTmpl.message = 'Файл шаблона не найден';
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
            $scope.error.breadcrumbs.idTmpl = {valid: true, message: ''};
            if (!$scope.form.breadcrumbs.idTmpl || $.trim($scope.form.breadcrumbs.idTmpl) == '') {
                $scope.error.breadcrumbs.idTmpl.valid = false;
                $scope.error.breadcrumbs.idTmpl.message = 'Поле обязательно для заполнения';
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