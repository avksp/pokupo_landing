angular.module('js-generator', [])
    .controller('JsGeneratorCtrl', ['$scope', JsGeneratorCtrl])
    .filter('trim', function () {
        return function (value) {
            return (!value) ? '' : $.trim(value);
        };
    });
