function ThemeJsGenerator($scope) {
    var self = this;
    self.Init = {
        Self: function () {
            self.Init.Fields();
            self.Init.Error();
        },
        Fields: function () {
            $scope.form.theme = {
                id: 1,
                active: true,
                Change: self.Change
            }
        },
        Error: function () {
            $scope.error.theme = {
                valid: true,
                message: ''
            }
        }
    };
    self.Change = function(){
        var settings = ThemeList[$scope.form.theme.id].customSettings;
        $.each(settings, function(i){
            if(typeof(settings[i]) == 'object'){
                $.each(settings[i], function(j){
                    if(typeof(settings[i][j]) == 'object'){
                        $.each(settings[i][j], function(t){
                            if(typeof(settings[i][j][t]) == 'object'){
                                $.each(settings[i][j][t], function(f){
                                    $scope.form[i][j][t][f] = settings[i][j][t][f];
                                })
                            }
                            else
                                $scope.form[i][j][t] = settings[i][j][t];
                        })
                    }
                    else
                        $scope.form[i][j] = settings[i][j];
                })
            }
            else
                $scope.form[i] = settings[i];
        });
    };
    self.Validator = {
        Form: function () {
            if (!$scope.form.theme) {
                $scope.error.theme.valid = false;
                $scope.error.theme.message = 'Поле обязательно для заполнения'
                return false;
            }
            return true;
        }
    }

    self.Init.Self();
}