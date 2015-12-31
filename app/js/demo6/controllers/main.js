/**
 * Created by dhagan on 3/25/2015.
 */
/**
 * Globals used throughout the app, not just in one master detail view
 * @param $scope
 * @param GENERAL_CONFIG
 * @constructor
 */
myapp.controller('mainCtrl', function ($scope, $rootScope, $window, GENERAL_CONFIG) {

    function goBack() {
        $window.history.back();
    }

    $scope.cancel = goBack;
    $scope.goBack = goBack;
});
