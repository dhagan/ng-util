/**
 * Created by dhagan on 3/18/2015.
 */


myapp.controller('patientsCtrl', function ($scope) {
    //console.log('patientsCtrl');
});


myapp.controller('patientsListCtrl', function ($scope, $rootScope, $http, $location, GENERAL_CONFIG, toaster) {
    console.log('patientsListCtrl');

});

/**
 * gratuitous parent controller just to show that I can
 * @param $scope
 * @param ByResourceType
 * @constructor
 */
function PatientsCtrl($scope, GENERAL_CONFIG) {
    //console.log('PatientsController');
    // hack this has been unset in dashboard
    $scope.$parent.appName = GENERAL_CONFIG.APP_NAME;
}


var appointment_races = [
    'Caucasian',
    'Black',
    'American Indian',
    'Asian/Mongolian',
    'Other',
    'Unknown',
    'Pacific Islander',
    'Hispanic',
    'Asian/PI',
    'Middle-Eastern',
    'Not Available',
    'Filipino',
    'SE Asian',
    'Asian'
];

var appointment_ranks = [
    'SR ',
    'FR ',
    'AR',
    'SA',
    'FA',
    'AA',
    'SN',
    'FN',
    'AN',
    'PO3',
    'PO2',
    'PO1',
    'CPO',
    'SCPO',
    'MCPO',
    'WO1',
    'CW2',
    'CW3',
    'CW4',
    'ENS',
    'LTJG',
    'LT',
    'LCDR',
    'CDR',
    'CAPT',
    'RDML',
    'RADM',
    'VADM',
    'ADM',
    'CWO5',
    'UNK'
];


myapp.controller('patientsListCtrl', function ($scope, $http) {
    $scope.$parent.$root.pageHeader = "Patients";
    $http.get('json/patients.json')
        .then(function (res) {
            $scope.data = res.data;
            console.log(res.data);
        });

    var addButton = '<a href="#/patients/detail"><i class="glyphicon glyphicon-plus-sign"></i></a>';
    var editToken = '<a href="#/patients/edit/{{row._id}}"><i class="glyphicon glyphicon-pencil"></i></a>';
    $scope.headerColumns = ['First Name', 'Last Name', 'Date of Birth', 'EDIPI', 'Gender', 'Deployed', 'Rank', 'Duty Station', 'Race', ''];
    $scope.dataColumns = [
        '{{row.name[0].given}}',
        '{{row.name[0].family[0]}}',
        '{{row.birthDate}}',
        '{{row.identifier[0].value}}',
        '{{row.gender.coding[0].code}}',
        "{{row.deployed | iif : 'Y' : 'N'}}",
        '{{row.identifier[1].value}}',
        '{{row.managingOrganization.reference}}',
        '{{row.identifier[2].value}}',
        editToken
    ];
});


var patient_gender = [
    "M", "F"
];

myapp.controller('patientsEditCtrl', function ($scope, $http, $location, $stateParams, _) {
    $scope.$parent.$root.pageHeader = "Update Patients";
    var self = this;

    $scope.genders = patient_gender;
    $scope.races = appointment_races;
    $scope.ranks = appointment_ranks;

    $http.get('json/patients.json')
        .then(function (res) {
            var patients = res.data;
            $scope.patient = _.findWhere(patients, {_id: $stateParams.patientId})

            console.log(res.patient);
        });

    $scope.isClean = function () {
        //return angular.equals(self.original, $scope.patient);
        return false;
    };

    $scope.destroy = function () {
        self.original.destroy(function () {
            $location.path('/');
        });
    };

    $scope.save = function () {
        $scope.patient.update(function () {
            $location.path('/patients/edit/' + $scope.patient._id);
        });
    };
});

myapp.controller('patientsDetailCtrl', function ($scope, $location, $http) {
    $scope.$parent.$root.pageHeader = "Create Patient";

    $scope.genders = patient_gender;
    $scope.races = appointment_races;
    $scope.ranks = appointment_ranks;

    $http.get('json/patient.json')
        .then(function (res) {
            $scope.patient = res.data;
        });

    $scope.save = function () {
        // TODO;
    };

    $scope.isClean = function () {
        //var clean = _.isEqual(self.clean, $scope.patient);
        //console.log('isclean ', clean);
        //return clean;
        return false;
    };
});
