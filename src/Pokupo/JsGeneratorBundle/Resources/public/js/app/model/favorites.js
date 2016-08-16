function FavoritesJsGenerator($scope) {
    var self = this;
    self.index = null;
    self.Init = {
        Self: function(){
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function(){
            $scope.form.favorites = {
                active: false,
                disabled: true,
                containerId: 'favoritesWidgetId',
                show : {
                    infoShop: false,
                    addToCart: false,
                    buy: false
                },
                useCustomTmpl: false,
                pathTmpl: '',
                idTmpl: {
                    content: "favoritesTmpl",
                    empty : "emptyFavoritesTmpl"
                }
            };
        },
        Error: function(){
            $scope.error.favorites = {
                active: { valid: true, message: ''},
                containerId: { valid: true, message: ''},
                useCustomTmpl: { valid: true, message: ''},
                pathTmpl: { valid: true, message: ''},
                idTmpl:{
                    content: { valid: true, message: ''},
                    empty : { valid: true, message: ''}
                }
            };
        },
        Watch: function(){
            $scope.$watch('form.favorites.active', function (newValue) {
                if (!newValue){
                    self.Error.Clear($scope.error.favorites, ['containerId', 'pathTmpl']);
                    self.Error.Clear($scope.error.favorites.idTmpl, ['content', 'empty']);
                }
            });
            $scope.$watch('form.favorites.containerId', function () {
                if(!$scope.error.favorites.containerId.valid)
                    self.Validator.ContainerId();
            });
            $scope.$watch('form.favorites.useCustomTmpl', function (newValue) {
                if (!newValue) {
                    self.Error.Clear($scope.error.favorites, ['pathTmpl']);
                    self.Error.Clear($scope.error.favorites.idTmpl, ['content', 'empty']);
                }
            });
            $scope.$watch('form.favorites.idTmpl.content', function () {
                if(!$scope.error.favorites.idTmpl.content.valid)
                    self.Validator.IdTmpl.Content();
            });
            $scope.$watch('form.favorites.idTmpl.empty', function () {
                if(!$scope.error.favorites.idTmpl.empty.valid)
                    self.Validator.IdTmpl.Empty();
            });
        }
    };
    self.Set = {
        Require: function(j){
            $scope.form.favorites.active = j;
        }
    };
    self.Validator = {
        Form: function(i){
            self.index = i;
            var test = true;
            if (!self.Validator.ContainerId())
                test = false;
            if ($scope.form.favorites.useCustomTmpl) {
                if (!self.Validator.PathTmpl())
                    test = false;
                if (!self.Validator.IdTmpl.Empty())
                    test = false;
                if (!self.Validator.IdTmpl.Content())
                    test = false;
            }
            if (!test)
                return false;
            return true;
        },
        ContainerId: function(){
            $scope.error.favorites.containerId = {valid: true, message: ''};
            if (!$scope.form.favorites.containerId || $.trim($scope.form.favorites.containerId) == '') {
                $scope.error.favorites.containerId.valid = false;
                $scope.error.favorites.containerId.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        PathTmpl: function(){
            $scope.error.favorites.pathTmpl = {valid: true, message: ''};
            if (!$scope.form.favorites.pathTmpl || $.trim($scope.form.favorites.pathTmpl) == '') {
                $scope.error.favorites.pathTmpl.valid = false;
                $scope.error.favorites.pathTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            if($scope.form.favorites.pathTmpl){
                $scope.TmplValidate($scope.form.favorites, function(data){
                    if(data.result != 'ok') {
                        $scope.error.favorites.pathTmpl.valid = false;
                        $scope.error.favorites.pathTmpl.message = 'Файл шаблона не найден';
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
                $scope.error.favorites.idTmpl.content = {valid: true, message: ''};
                if (!$scope.form.favorites.idTmpl.content || $.trim($scope.form.favorites.idTmpl.content) == '') {
                    $scope.error.favorites.idTmpl.content.valid = false;
                    $scope.error.favorites.idTmpl.content.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Empty: function(){
                $scope.error.favorites.idTmpl.empty = {valid: true, message: ''};
                if (!$scope.form.favorites.idTmpl.empty || $.trim($scope.form.favorites.idTmpl.empty) == '') {
                    $scope.error.favorites.idTmpl.empty.valid = false;
                    $scope.error.favorites.idTmpl.empty.message = 'Поле обязательно для заполнения';
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