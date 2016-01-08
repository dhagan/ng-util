/**
 * Created by dhagan on 2/18/14.
 */

var myapp = angular.module('myapp',
    ['ui.router',
        'ui.bootstrap',
        'toaster',
        'demo6.services',
        'underscore',
        'demo6.config']
);


myapp.run(['$location',
    function ($location) {
        //$location.path('/patients/list');
        $location.path('/projects/list');
    }]);

myapp.directive('compile', ['$compile', function ($compile) {
    return function (scope, element, attrs) {
        scope.$watch(
            function (scope) {
                return scope.$eval(attrs.compile);
            },
            function (value) {
                element.html(value);
                $compile(element.contents())(scope);
            });
    };
}]);


