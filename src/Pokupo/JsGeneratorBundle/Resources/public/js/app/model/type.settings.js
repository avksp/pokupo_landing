var TypeSettingsJsGenerator = function($scope){
    var self = this;
    self.Init = {
        Self: function () {
            self.Init.Fields();
            self.Init.Error();
        },
        Fields: function () {
            $scope.form.typeSettings = {
                id: 1,
                active: true
            }
        },
        Error: function () {
            $scope.error.typeSettings = {
                valid: true,
                message: ''
            }
        }
    };
    self.Validator = {
        Form: function () {
            if (!$scope.form.typeSettings) {
                $scope.error.typeSettings.valid = false;
                $scope.error.typeSettings.message = 'Поле обязательно для заполнения'
                return false;
            }
            return true;
        }
    }

    self.Init.Self();
}