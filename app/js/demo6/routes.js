myapp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('eads', {
            url: "/eads",
            templateUrl: "templates/demo6/ui-view.html",
            controller: 'eadsCtrl'
        })
        .state('eads.list', {
            url: "/list",
            templateUrl: "templates/demo6/eads.list.html",
            controller: 'eadsListCtrl'
        })
        .state('eads.edit', {
            url: "/edit/:edipi",
            templateUrl: "templates/demo6/eads.detail.html",
            controller: 'eadsEditCtrl'
        })
        .state('patients', {
            url: "/patients",
            templateUrl: "templates/demo6/ui-view.html",
            controller: 'patientsCtrl'
        })
        .state('patients.list', {
            url: "/list",
            templateUrl: "templates/demo6/patients.list.html",
            controller: 'patientsListCtrl'
        })
        .state('patients.detail', {
            url: "/detail",
            templateUrl: "templates/demo6/patients.detail.html",
            controller: 'patientsDetailCtrl'
        })
        .state('patients.edit', {
            url: "/edit/:patientId",
            templateUrl: "templates/demo6/patients.detail.html",
            controller: 'patientsEditCtrl'
        })

});
