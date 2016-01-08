myapp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('projects', {
            url: "/projects",
            templateUrl: "templates/demo6/ui-view.html",
            controller: 'projectsCtrl'
        })
        .state('projects.list', {
            url: "/list",
            templateUrl: "templates/demo6/projects.list.html",
            controller: 'projectsListCtrl'
        })
        .state('projects.edit', {
            url: "/edit/:edipi",
            templateUrl: "templates/demo6/projects.detail.html",
            controller: 'projectsEditCtrl'
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

