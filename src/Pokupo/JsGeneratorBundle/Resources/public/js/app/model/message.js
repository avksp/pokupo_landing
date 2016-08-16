function MessageJsGenerator($scope) {
    var self = this;
    self.index = null;
    self.Init = {
        Self: function () {
            self.Init.Fields();
            self.Init.Error();
            self.Init.Watch();
        },
        Fields: function () {
            $scope.form.message = {
                active: false,
                disabled: true,
                containerId: 'messageWidgetId',
                useCustomTmpl: false,
                pathTmpl: '',
                idTmpl: {
                    topic : "messageTopicTmpl",
                    list : "messageListTmpl",
                    empty : 'messageEmptyListTmpl'
                }
            };
        },
        Error: function () {
            $scope.error.message = {
                active:  {valid: true, message: ''},
                containerId: {valid: true, message: ''},
                useCustomTmpl: {valid: true, message: ''},
                pathTmpl: {valid: true, message: ''},
                idTmpl: {
                    list : {valid: true, message: ''},
                    empty : {valid: true, message: ''},
                    topic : {valid: true, message: ''}
                }
            };
        },
        Watch: function () {
            $scope.$watch('form.message.active', function (newValue) {
                if (!newValue){
                    self.Error.Clear($scope.error.message, ['containerId', 'pathTmpl']);
                    self.Error.Clear($scope.error.message.idTmpl, ['list', 'empty', 'topic']);
                }
            });
            $scope.$watch('form.message.containerId', function () {
                if (!$scope.error.message.containerId.valid)
                    self.Validator.ContainerId();
            });
            $scope.$watch('form.message.useCustomTmpl', function (newValue) {
                if (!newValue) {
                    self.Error.Clear($scope.error.message, ['pathTmpl']);
                    self.Error.Clear($scope.error.message.idTmpl, ['list', 'topic', 'empty']);
                }
            });
            $scope.$watch('form.message.idTmpl.list', function () {
                if (!$scope.error.message.idTmpl.list.valid)
                    self.Validator.IdTmpl.List();
            });
            $scope.$watch('form.message.idTmpl.topic', function () {
                if (!$scope.error.message.idTmpl.topic.valid)
                    self.Validator.IdTmpl.Topic();
            });
            $scope.$watch('form.message.idTmpl.empty', function () {
                if (!$scope.error.message.idTmpl.empty.valid)
                    self.Validator.IdTmpl.Empty();
            });
        }
    };
    self.Set = {
        Require: function(j){
            $scope.form.message.active = j;
        }
    };
    self.Validator = {
        Form: function (i) {
            self.index = i;
            var test = true;
            if (!self.Validator.ContainerId())
                test = false;
            if ($scope.form.message.useCustomTmpl) {
                if (!self.Validator.PathTmpl())
                    test = false;
                if (!self.Validator.IdTmpl.List())
                    test = false;
                if (!self.Validator.IdTmpl.Topic())
                    test = false;
                if (!self.Validator.IdTmpl.Empty())
                    test = false;
            }
            if (!test)
                return false;
            return true;
        },
        ContainerId: function () {
            $scope.error.message.containerId = {valid: true, message: ''};
            if (!$scope.form.message.containerId || $.trim($scope.form.message.containerId) == '') {
                $scope.error.message.containerId.valid = false;
                $scope.error.message.containerId.message = 'Поле обязательно для заполнения';
                return false;
            }
            return true;
        },
        PathTmpl: function () {
            $scope.error.message.pathTmpl = {valid: true, message: ''};
            if (!$scope.form.message.pathTmpl || $.trim($scope.form.message.pathTmpl) == '') {
                $scope.error.message.pathTmpl.valid = false;
                $scope.error.message.pathTmpl.message = 'Поле обязательно для заполнения';
                return false;
            }
            if($scope.form.message.pathTmpl){
                $scope.TmplValidate($scope.form.message, function(data){
                    if(data.result != 'ok') {
                        $scope.error.message.pathTmpl.valid = false;
                        $scope.error.message.pathTmpl.message = 'Файл шаблона не найден';
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
            List: function () {
                $scope.error.message.idTmpl.list = {valid: true, message: ''};
                if (!$scope.form.message.idTmpl.list || $.trim($scope.form.message.idTmpl.list) == '') {
                    $scope.error.message.idTmpl.list.valid = false;
                    $scope.error.message.idTmpl.list.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Topic: function () {
                $scope.error.message.idTmpl.topic = {valid: true, message: ''};
                if (!$scope.form.message.idTmpl.topic || $.trim($scope.form.message.idTmpl.topic) == '') {
                    $scope.error.message.idTmpl.topic.valid = false;
                    $scope.error.message.idTmpl.topic.message = 'Поле обязательно для заполнения';
                    return false;
                }
                return true;
            },
            Empty: function () {
                $scope.error.message.idTmpl.empty = {valid: true, message: ''};
                if (!$scope.form.message.idTmpl.empty || $.trim($scope.form.message.idTmpl.empty) == '') {
                    $scope.error.message.idTmpl.empty.valid = false;
                    $scope.error.message.idTmpl.empty.message = 'Поле обязательно для заполнения';
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