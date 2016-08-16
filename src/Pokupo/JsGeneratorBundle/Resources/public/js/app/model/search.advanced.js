function AdvancedSearchJsGenerator($scope) {
    var self = this;
    self.index = null;
    self.Init = {
        Self: function () {
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function () {
            $scope.form.advancedSearch = {
                active: false,
                disabled: true,
                form: {
                    showForm: false,
                    disabled: false,
                    showCatalog: false,
                    containerId: 'advancedSearchFormWidgetId',
                    useCustomTmpl: false,
                    pathTmpl: '',
                    idTmpl: 'advancedSearchFormTmpl'
                },
                result: {
                    containerId: 'advancedSearchResultWidgetId',
                    listPerPage: '10, 20, 50',
                    defaultPerPage: '20',
                    showCart: false,
                    useCustomTmpl: false,
                    pathTmpl: '',
                    idTmpl: {
                        table: "searchResultTableTmpl",
                        list: "searchResultListTmpl",
                        tile: "searchResultTileTmpl",
                        empty: "searchResultErrorTmpl"
                    }
                }
            }
        },
        Error: function () {
            $scope.error.advancedSearch = {
                active: { valid: true, message: ''},
                form: {
                    containerId: { valid: true, message: ''},
                    useCustomTmpl: { valid: true, message: ''},
                    pathTmpl: { valid: true, message: ''},
                    idTmpl: { valid: true, message: ''}
                },
                result: {
                    containerId: { valid: true, message: ''},
                    listPerPage: { valid: true, message: ''},
                    defaultPerPage: { valid: true, message: ''},
                    useCustomTmpl: { valid: true, message: ''},
                    pathTmpl: { valid: true, message: ''},
                    idTmpl: {
                        table: { valid: true, message: ''},
                        list: { valid: true, message: ''},
                        tile: { valid: true, message: ''},
                        empty: { valid: true, message: ''}
                    }
                }
            }
        },
        Watch: function () {
            $scope.$watch('form.advancedSearch.active', function (newValue) {
                if (!newValue){
                    self.Error.Clear($scope.error.advancedSearch.form);
                    self.Error.Clear($scope.error.advancedSearch.result, ['containerId', 'listPerPage', 'defaultPerPage', 'pathTmpl']);
                    self.Error.Clear($scope.error.advancedSearch.result, ['table', 'list', 'tile', 'empty']);
                }
            });
            $scope.$watch('form.advancedSearch.form.containerId', function () {
                if(!$scope.error.advancedSearch.form.containerId.valid)
                    self.Validator.Block.Form.ContainerId();
            });
            $scope.$watch('form.advancedSearch.form.idTmpl', function () {
                if(!$scope.error.advancedSearch.form.idTmpl.valid)
                    self.Validator.Block.Form.IdTmpl();
            });
            $scope.$watch('form.advancedSearch.result.containerId', function () {
                if(!$scope.error.advancedSearch.result.containerId.valid)
                    self.Validator.Block.Result.ContainerId();
            });
            $scope.$watch('form.advancedSearch.result.listPerPage', function () {
                if(!$scope.error.advancedSearch.result.listPerPage.valid)
                    self.Validator.Block.Result.ListPerPage();
            });
            $scope.$watch('form.advancedSearch.result.defaultPerPage', function () {
                if(!$scope.error.advancedSearch.result.defaultPerPage.valid)
                    self.Validator.Block.Result.DefaultPerPage();
            });
            $scope.$watch('form.advancedSearch.result.idTmpl.table', function () {
                if(!$scope.error.advancedSearch.result.idTmpl.table.valid)
                    self.Validator.Block.Result.IdTmpl.Table();
            });
            $scope.$watch('form.advancedSearch.result.idTmpl.tile', function () {
                if(!$scope.error.advancedSearch.result.idTmpl.tile.valid)
                    self.Validator.Block.Result.IdTmpl.Tile();
            });
            $scope.$watch('form.advancedSearch.result.idTmpl.list', function () {
                if(!$scope.error.advancedSearch.result.idTmpl.list.valid)
                    self.Validator.Block.Result.IdTmpl.List();
            });
            $scope.$watch('form.advancedSearch.result.idTmpl.empty', function () {
                if(!$scope.error.advancedSearch.result.idTmpl.empty.valid)
                    self.Validator.Block.Result.IdTmpl.Empty();
            });
        }
    };
    self.Set = {
        Require: function(j){
            $scope.form.advancedSearch.active = j;
            $scope.form.advancedSearch.form.active = false;
        }
    };
    self.Validator = {
        Form: {
            Result: function(i){
                self.index = i;

                if ($scope.form.advancedSearch.active) {
                    var test = true;
                    if (!self.Validator.Block.Result.ContainerId())
                        test = false;
                    if (!self.Validator.Block.Result.ListPerPage())
                        test = false;
                    if (!self.Validator.Block.Result.DefaultPerPage())
                        test = false;
                    if ($scope.form.advancedSearch.result.useCustomTmpl) {
                        if (!self.Validator.Block.Result.PathTmpl())
                            test = false;
                        if (!self.Validator.Block.Result.IdTmpl.Table())
                            test = false;
                        if (!self.Validator.Block.Result.IdTmpl.Tile())
                            test = false;
                        if (!self.Validator.Block.Result.IdTmpl.List())
                            test = false;
                        if (!self.Validator.Block.Result.IdTmpl.Empty())
                            test = false;
                    }

                    if (!test)
                        return false;
                }
                return true;
            },
            Form: function(i){
                self.index = i;
                if ($scope.form.advancedSearch.active && $scope.form.advancedSearch.form.showForm) {
                    var test = true;
                    if (!self.Validator.Block.Form.ContainerId())
                        test = false;
                    if ($scope.form.advancedSearch.form.useCustomTmpl) {
                        if (!self.Validator.Block.Form.PathTmpl())
                            test = false;
                        if (!self.Validator.Block.Form.IdTmpl())
                            test = false;
                    }
                    if (!test)
                        return false;
                }
                return true;
            }
        },
        Block: {
            Form: {
                ContainerId: function(){
                    $scope.error.advancedSearch.form.containerId = {valid: true, message: ''};
                    if (!$scope.form.advancedSearch.form.containerId || $.trim($scope.form.advancedSearch.form.containerId) == '') {
                        $scope.error.advancedSearch.form.containerId.valid = false;
                        $scope.error.advancedSearch.form.containerId.message = 'Поле обязательно для заполнения';
                        return false;
                    }
                    return true;
                },
                PathTmpl: function(){
                    $scope.error.advancedSearch.form.pathTmpl = {valid: true, message: ''};
                    if (!$scope.form.advancedSearch.form.pathTmpl || $.trim($scope.form.advancedSearch.form.pathTmpl) == '') {
                        $scope.error.advancedSearch.form.pathTmpl.valid = false;
                        $scope.error.advancedSearch.form.pathTmpl.message = 'Поле обязательно для заполнения';
                        return false;
                    }
                    if($scope.form.advancedSearch.form.pathTmpl){
                        $scope.TmplValidate($scope.form.advancedSearch.form, function(data){
                            if(data.result != 'ok') {
                                $scope.error.advancedSearch.form.pathTmpl.valid = false;
                                $scope.error.advancedSearch.form.pathTmpl.message = 'Файл шаблона не найден';
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
                    $scope.error.advancedSearch.form.idTmpl = {valid: true, message: ''};
                    if (!$scope.form.advancedSearch.form.idTmpl || $.trim($scope.form.advancedSearch.form.idTmpl) == '') {
                        $scope.error.advancedSearch.form.idTmpl.valid = false;
                        $scope.error.advancedSearch.form.idTmpl.message = 'Поле обязательно для заполнения';
                        return false;
                    }
                    return true;
                }
            },
            Result: {
                ContainerId: function(){
                    $scope.error.advancedSearch.result.containerId = {valid: true, message: ''};
                    if (!$scope.form.advancedSearch.result.containerId || $.trim($scope.form.advancedSearch.result.containerId) == '') {
                        $scope.error.advancedSearch.result.containerId.valid = false;
                        $scope.error.advancedSearch.result.containerId.message = 'Поле обязательно для заполнения';
                        return false;
                    }
                    return true;
                },
                ListPerPage: function(){
                    $scope.error.advancedSearch.result.listPerPage = {valid: true, message: ''};
                    var list = self.Get.ListPerPage();
                    if (list.length > 0) {
                        $.each(list, function (i) {
                            var intItem = parseInt(list[i]);
                            if (intItem.toString() != list[i]) {
                                $scope.error.advancedSearch.result.listPerPage.valid = false;
                                $scope.error.advancedSearch.result.listPerPage.message = 'Значения в списке должны быть числами';
                                return false;
                            }
                        })
                    }
                    return true;
                },
                DefaultPerPage: function(){
                    $scope.error.advancedSearch.result.defaultPerPage = {valid: true, message: ''};
                    if ($scope.form.advancedSearch.result.defaultPerPage && $.trim($scope.form.advancedSearch.result.defaultPerPage) != '') {
                        var def = parseInt($scope.form.advancedSearch.result.defaultPerPage);
                        if (def.toString() != $scope.form.advancedSearch.result.defaultPerPage) {
                            $scope.error.advancedSearch.result.defaultPerPage.valid = false;
                            $scope.error.advancedSearch.result.defaultPerPage.message = 'Значение должно быть числом';
                            return false;
                        }
                        var list = self.Get.ListPerPage();
                        if (list.length > 0 && $scope.error.advancedSearch.result.listPerPage.valid && $.inArray(def.toString(), list) < 0) {
                            $scope.error.advancedSearch.result.defaultPerPage.valid = false;
                            $scope.error.advancedSearch.result.defaultPerPage.message = 'Значение должно присутствовать в списке допустимых значений';
                            return false;
                        }
                    }
                    return true;
                },
                PathTmpl: function(){
                    $scope.error.advancedSearch.result.pathTmpl = {valid: true, message: ''};
                    if (!$scope.form.advancedSearch.result.pathTmpl || $.trim($scope.form.advancedSearch.result.pathTmpl) == '') {
                        $scope.error.advancedSearch.result.pathTmpl.valid = false;
                        $scope.error.advancedSearch.result.pathTmpl.message = 'Поле обязательно для заполнения';
                        return false;
                    }
                    if($scope.form.advancedSearch.result.pathTmpl){
                        $scope.TmplValidate($scope.form.advancedSearch.result, function(data){
                            if(data.result != 'ok') {
                                $scope.error.advancedSearch.result.pathTmpl.valid = false;
                                $scope.error.advancedSearch.result.pathTmpl.message = 'Файл шаблона не найден';
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
                    Table: function(){
                        $scope.error.advancedSearch.result.idTmpl.table = {valid: true, message: ''};
                        if (!$scope.form.advancedSearch.result.idTmpl.table || $.trim($scope.form.advancedSearch.result.idTmpl.table) == '') {
                            $scope.error.advancedSearch.result.idTmpl.table.valid = false;
                            $scope.error.advancedSearch.result.idTmpl.table.message = 'Поле обязательно для заполнения';
                            return false;
                        }
                        return true;
                    },
                    Tile: function(){
                        $scope.error.advancedSearch.result.idTmpl.tile = {valid: true, message: ''};
                        if (!$scope.form.advancedSearch.result.idTmpl.tile || $.trim($scope.form.advancedSearch.result.idTmpl.tile) == '') {
                            $scope.error.advancedSearch.result.idTmpl.tile.valid = false;
                            $scope.error.advancedSearch.result.idTmpl.tile.message = 'Поле обязательно для заполнения';
                            return false;
                        }
                        return true;
                    },
                    List: function(){
                        $scope.error.advancedSearch.result.idTmpl.list = {valid: true, message: ''};
                        if (!$scope.form.advancedSearch.result.idTmpl.list || $.trim($scope.form.advancedSearch.result.idTmpl.list) == '') {
                            $scope.error.advancedSearch.result.idTmpl.list.valid = false;
                            $scope.error.advancedSearch.result.idTmpl.list.message = 'Поле обязательно для заполнения';
                            return false;
                        }
                        return true;
                    },
                    Empty: function(){
                        $scope.error.advancedSearch.result.idTmpl.empty = {valid: true, message: ''};
                        if (!$scope.form.advancedSearch.result.idTmpl.empty || $.trim($scope.form.advancedSearch.result.idTmpl.empty) == '') {
                            $scope.error.advancedSearch.result.idTmpl.empty.valid = false;
                            $scope.error.advancedSearch.result.idTmpl.empty.message = 'Поле обязательно для заполнения';
                            return false;
                        }
                        return true;
                    }
                }
            }
        }
    };
    self.Get = {
        ListPerPage: function(){
            var list = [];
            if ($scope.form.advancedSearch.result.listPerPage && $.trim($scope.form.advancedSearch.result.listPerPage) != '') {
                list = $scope.form.advancedSearch.result.listPerPage.split(',');
                $.each(list, function (i) {
                    list[i] = $.trim(list[i]);
                })
            }
            return list;
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
    };


    self.Init.Self();
}