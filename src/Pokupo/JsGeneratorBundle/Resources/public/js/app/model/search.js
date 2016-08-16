function SearchJsGenerator($scope) {
    var self = this;
    self.index = null;
    self.Init = {
        Self: function(){
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function(){
            $scope.form.search = {
                active: false,
                disabled: true,
                containerId: 'searchWidgetId',
                showCatalog: false,
                useCustomTmpl: false,
                pathTmpl: '',
                idTmpl: 'searchTmpl'
            };
        },
        Error: function(){
            $scope.error.search = {
                active: { valid: true, message: ''},
                containerId: { valid: true, message: ''},
                useCustomTmpl: { valid: true, message: ''},
                pathTmpl: { valid: true, message: ''},
                idTmpl: { valid: true, message: ''}
            };
        },
        Watch: function(){
            $scope.$watch('form.search.active', function (newValue) {
                if (!newValue)
                    self.Error.Clear($scope.error.search);
             });
            $scope.$watch('form.search.containerId', function () {
                if(!$scope.error.search.containerId.valid)
                    self.Validator.ContainerId();
            });
            $scope.$watch('form.search.useCustomTmpl', function (newValue) {
                if (!newValue) {
                    self.Error.Clear($scope.error.search, ['pathTmpl', 'idTmpl']);
                }
            });
            $scope.$watch('form.search.idTmpl', function () {
                if(!$scope.error.search.idTmpl.valid)
                    self.Validator.IdTmpl();
            });
        }
    };
    self.Set = {
        Require: function(j){
            $scope.form.search.active = j;
        }
    };
    self.Validator = {
        Form: function(i){
            self.index = i;
            if ($scope.form.search.active) {
                var test = true;
                if (!self.Validator.ContainerId())
                    test = false;
                if ($scope.form.search.useCustomTmpl) {
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
            $scope.error.search.containerId = {valid: true, message: ''};
            if (!$scope.form.search.containerId || $.trim($scope.form.search.containerId) == '') {
                $scope.error.search.containerId.valid = false;
                $scope.error.search.containerId.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        PathTmpl: function(){
            $scope.error.search.pathTmpl = {valid: true, message: ''};
            if (!$scope.form.search.pathTmpl || $.trim($scope.form.search.pathTmpl) == '') {
                $scope.error.search.pathTmpl.valid = false;
                $scope.error.search.pathTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            if($scope.form.search.pathTmpl){
                $scope.TmplValidate($scope.form.search, function(data){
                    if(data.result != 'ok') {
                        $scope.error.search.pathTmpl.valid = false;
                        $scope.error.search.pathTmpl.message = 'Файл шаблона не найден';
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
             $scope.error.search.idTmpl = {valid: true, message: ''};
            if (!$scope.form.search.idTmpl || $.trim($scope.form.search.idTmpl) == '') {
                $scope.error.search.idTmpl.valid = false;
                $scope.error.search.idTmpl.message = 'Поле обязательно для заполнения';
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