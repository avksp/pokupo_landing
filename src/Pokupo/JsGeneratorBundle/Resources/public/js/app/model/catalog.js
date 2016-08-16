function CatalogJsGenerator($scope){
    var self = this;
    self.index = null;
    self.Init = {
        Self: function () {
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function () {
            $scope.form.catalog = {
                active: false,
                disabled: false,
                containerId: 'catalogWidgetId',
                useCustomTmpl: false,
                pathTmpl: '',
                idTmpl: 'catalogTmpl'
            }
            $scope.Event.catalog = {
                ChangeActive: self.ChangeActive
            }
        },
        Error: function () {
            $scope.error.catalog = {
                active: { valid: true, message: ''},
                containerId: { valid: true, message: ''},
                useCustomTmpl: { valid: true, message: '' },
                pathTmpl: { valid: true, message: '' },
                idTmpl: { valid: true, message: '' }
            }
        },
        Watch: function () {
            $scope.$watch('form.catalog.active', function (newValue) {
                if (!newValue)
                    self.Error.Clear($scope.error.catalog, ['active', 'containerId', 'pathTmpl', 'idTmpl']);
            });
            $scope.$watch('form.catalog.containerId', function () {
                if(!$scope.error.catalog.containerId.valid)
                    self.Validator.ContainerId();
            });
            $scope.$watch('form.catalog.useCustomTmpl', function (newValue) {
                if (!newValue) {
                    self.Error.Clear($scope.error.catalog, ['pathTmpl', 'idTmpl']);
                }
            });
            $scope.$watch('form.catalog.idTmpl', function () {
                if(!$scope.error.catalog.idTmpl.valid)
                    self.Validator.IdTmpl();
            });
        }
    };
    self.ChangeActive = function(){
        if(!$scope.form.catalog.disabled) {
            if ($scope.form.catalog.active) {
                $scope.form.breadcrumbs.active = false;
                $scope.form.breadcrumbs.disabled = false;
                $scope.form.search.showCatalog = true;
                $scope.form.advancedSearch.form.showCatalog = true;
                $scope.form.content.block.showBlocks = false;
                $scope.form.content.block.disabled = false;
            }
            else {
                $scope.form.breadcrumbs.active = false;
                $scope.form.breadcrumbs.disabled = false;
                $scope.form.search.showCatalog = false;
                $scope.form.advancedSearch.form.showCatalog = false;
                $scope.form.content.block.showBlocks = false;
                $scope.form.content.block.disabled = true;
            }
        }
    };
    self.Validator = {
        Form: function(i){
            self.index = i;
            if ($scope.form.catalog.active) {
                var test = true;
                if (!self.Validator.ContainerId())
                    test = false;
                if ($scope.form.catalog.useCustomTmpl) {
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
            $scope.error.catalog.containerId = {valid: true, message: ''};
            if (!$scope.form.catalog.containerId || $.trim($scope.form.catalog.containerId) == '') {
                $scope.error.catalog.containerId.valid = false;
                $scope.error.catalog.containerId.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        PathTmpl: function(){
            $scope.error.catalog.pathTmpl = {valid: true, message: ''};
            if (!$scope.form.catalog.pathTmpl || $.trim($scope.form.catalog.pathTmpl) == '') {
                $scope.error.catalog.pathTmpl.valid = false;
                $scope.error.catalog.pathTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            if($scope.form.catalog.pathTmpl){
                $scope.TmplValidate($scope.form.catalog, function(data){
                    if(data.result != 'ok') {
                        $scope.error.catalog.pathTmpl.valid = false;
                        $scope.error.catalog.pathTmpl.message = 'Файл шаблона не найден';
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
            $scope.error.catalog.idTmpl = {valid: true, message: ''};
            if (!$scope.form.catalog.idTmpl || $.trim($scope.form.catalog.idTmpl) == '') {
                $scope.error.catalog.idTmpl.valid = false;
                $scope.error.catalog.idTmpl.message = 'Поле обязательно для заполнения';
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