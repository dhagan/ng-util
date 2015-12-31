/**
 * Created by dhagan on 3/18/2015.
 */


myapp.controller('eadsCtrl', function ($scope) {
    console.log('eadsCtrl');
});

myapp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, options) {

    $scope.options = options;

    $scope.save = function () {
        $modalInstance.close($scope.options);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});


myapp.controller('eadsListCtrl', function ($scope, $http, $modal, $location, GENERAL_CONFIG, toaster) {
    $scope.$parent.$root.pageHeader = "eADS - Patient Demographics";
    $scope.isCreateNew = true;
    $http.get('json/eads.json')
        .then(function (res) {
            $scope.data = res.data;
            $scope.rows = res.data.length;
        });
    //var addButton = '<a href="#/eads/detail"><i class="glyphicon glyphicon-plus-sign"></i></a>';
    var editToken = '<a href="#/eads/edit/{{row.edipi}}"><i class="glyphicon glyphicon-pencil"></i></a>';

    $scope.headerColumns = [' ', 'EDIPI', 'Name', 'Receive Date', ''];

    $scope.patient = {};

    $scope.alert = function (msg) {
        alert(msg);
    };

    $scope.buttonText = "Select All";

    $scope.selectAll = function () {
        var rowcount =  $scope.data.length;
        //console.log('selectAll :: rowcount == ' + rowcount);
        //console.log('printMe :: $scope.data = ' + JSON.stringify($scope.data));

        if ($scope.buttonText == "Select All") {
                $scope.data.forEach(function(model){
                    model.isChecked = true;
                    //console.log ('isChecked = ' + JSON.stringify(model.isChecked))
                });
            $scope.isCreateNew = false;
            $scope.buttonText = "Deselect All";
        }
        else if ($scope.buttonText == "Deselect All") {
            $scope.data.forEach(function(model){
                model.isChecked = false;
            });
            $scope.buttonText = "Select All";
            $scope.isCreateNew = true;
        }
     } ;

    $scope.createNewEnable = function(model) {
        var checked = new Array();

        for(cnt = 0; cnt < $scope.data.length; cnt++){
            var isChecked = $scope.data[cnt].isChecked;
            if ($scope.data[cnt].isChecked) {
                checked [cnt]++;
            }
        }

        if (checked.length > 0) {
            $scope.isCreateNew = false;
        }
        else {
            $scope.isCreateNew = true;
        }
    };

    $scope.printMe = function(model){
      console.log('printMe :: model = ' + JSON.stringify(model));
    };

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'templates/demo6/patients.modal.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                options: function () {
                    return {
                        patient: $scope.patient,
                        reasons: $scope.reasons,
                        priorities: $scope.priorities
                    }
                }
            }
        });

        modalInstance.result.then(function (options) {
            $scope.save(options.patient);

        }, function () {
            console.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.save = function (patient) {

        var transactionId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });

        var alert = {
            firstName: patient.firstName,
            lastName: patient.lastName,
            edipi: patient.edipi,
            dmissid: '122323',
            pcsLocation: 'usnsmercy',
            priority: patient.priority,
            reason: patient.reason,
            status: 'Sent',
            timestamp: Date.now(),
            type: "ADS Request",
            history: "None",
            transactionId: transactionId
        };

        var pcsNotifyObj = {
            firstName: patient.firstName,
            lastName: patient.lastName,
            edipi: patient.edipi,
            pcsLocation: 'usnsmercy'
        };

        var transactionIdURI = '?transactionId=' + transactionId;

        $http.post(encodeURI(GENERAL_CONFIG.SERVICE_URL_PCS + transactionIdURI), pcsNotifyObj)
            .then(successCallbackPCS, errorCallbackPCS, notifyCallbackPCS);

        function successCallbackPCS(res) {
            console.log(GENERAL_CONFIG.SERVICE_URL_PCS + ' POST success', res.data);
            toaster.pop('success', "PCS", 'PCS Notify Success');

            // call the TUG
            $http.get(encodeURI(GENERAL_CONFIG.SERVICE_URL_TUG + transactionIdURI))
                .then(successCallbackTUG, errorCallbackTUG, notifyCallbackTUG);
        }

        function errorCallbackPCS(res) {
            console.log(GENERAL_CONFIG.SERVICE_URL_PCS + ' POST failed', res);
            toaster.pop('error', "PCS", res.status + GENERAL_CONFIG.SERVICE_URL_PCS + ' POST failed');
        }

        function notifyCallbackPCS(res) {
            console.log(GENERAL_CONFIG.SERVICE_URL_PCS + ' POST exception', res);
            toaster.pop('error', "PCS", res.status + GENERAL_CONFIG.SERVICE_URL_PCS + ' POST exception');
        }

        function successCallbackTUG(res) {
            console.log(GENERAL_CONFIG.SERVICE_URL_TUG + ' GET success', res.data);
            toaster.pop('success', "TUG", 'v1/tug/ads/getShip/usnsmercy Success');

            // call express Alerts
            $http.post('http://' + GENERAL_CONFIG.EXPRESS_SERVER + GENERAL_CONFIG.EXPRESS_PATH_ALERTS, alert)
                .then(successCallbackAlert, errorCallbackAlert, notifyCallbackAlert);
        }

        function errorCallbackTUG(res) {
            console.log(GENERAL_CONFIG.SERVICE_URL_TUG + ' GET failed', res);
            toaster.pop('error', "TUG", res.status + GENERAL_CONFIG.SERVICE_URL_TUG + ' GET failed');
        }

        function notifyCallbackTUG(res) {
            console.log(GENERAL_CONFIG.SERVICE_URL_TUG + ' GET exception', res);
            toaster.pop('error', "TUG", res.status + GENERAL_CONFIG.SERVICE_URL_TUG + ' GET exception');
        }

        // DEBUG bypass TUG
        //$http.post('http://' + GENERAL_CONFIG.EXPRESS_SERVER + GENERAL_CONFIG.EXPRESS_PATH_ALERTS , alert)
        //    .then( successCallbackAlert, errorCallbackAlert, notifyCallbackAlert);

        function successCallbackAlert(res) {
            console.log(GENERAL_CONFIG.EXPRESS_PATH_ALERTS + ' POST success', res.data);
            toaster.pop('success', "TLC", 'Request POST');
            $scope.data = res.data;
            $location.path('/alerts/list');
        }

        function errorCallbackAlert(res) {
            console.log(GENERAL_CONFIG.EXPRESS_PATH_ALERTS + ' POST failed', res);
            toaster.pop('error', "TLC", 'Request POST');
        }

        function notifyCallbackAlert(res) {
            console.log(GENERAL_CONFIG.EXPRESS_PATH_ALERTS + ' POST exception', res);
            toaster.pop('error', "TLC", 'Request POST');

        }
    };
});


var patient_gender = [
    "M", "F"
];

myapp.controller('eadsEditCtrl', function ($scope, $http, $location, $stateParams, _) {
    $scope.$parent.$root.pageHeader = "Update Patients";
    var self = this;

    $scope.reasons = [
        "TAD",
        "TDY",
        "Change in Demographics"
    ];
    $scope.priorities = [
        "Normal",
        "High",
        "Low"
    ];


    $scope.genders = patient_gender;
    $scope.races = appointment_races;
    $scope.ranks = appointment_ranks;

    $http.get('json/eads_pd.json')
        .then(function (res) {
            var patients = res.data;

            $scope.patient = _.findWhere(patients, {edipi: $stateParams.edipi});
            //console.log("Patient: " + JSON.stringify($scope.patient));
            $scope.edipi = $stateParams.edipi;
            $scope.firstName = $scope.patient.firstName;
            $scope.lastName = $scope.patient.lastName;
            $scope.middleName = $scope.patient.middleName;
            $scope.dob = $scope.patient.dob;
            $scope.gender = $scope.patient.gender;
            $scope.maritalStatus = $scope.patient.maritalStatus;
            $scope.religion = $scope.patient.religion;
            $scope.uic = $scope.patient.uic;
            $scope.parentUic = $scope.patient.parentUic;
            $scope.lastUpdated = $scope.patient.lastUpdated;
            $scope.uicLocation = $scope.patient.uicLocation;
            $scope.originalName = $scope.patient.originalName;
            $scope.basicActiveDuty = $scope.patient.basicActiveDuty;
            $scope.sponsorSsn = $scope.patient.sponsorSsn;
            $scope.fmp = $scope.patient.fmp;
            $scope.dutyStatus = $scope.patient.dutyStatus;
            $scope.payGrade = $scope.patient.payGrade;
            $scope.personnelCode = $scope.patient.personnelCode;
            $scope.originalService = $scope.patient.originalName;
            $scope.serviceId = $scope.patient.serviceId;
            $scope.organizationCode = $scope.patient.originalCode;
            $scope.originalRankCode = $scope.patient.originalRankCode;
            $scope.rankCode = $scope.patient.rankCode;
            $scope.rankId = $scope.patient.rankId;
            $scope.sysCreateDate = $scope.patient.sysCreateDate;
            $scope.sysUpdateDate = $scope.patient.sysUpdateDate;
        });

    $scope.isClean = function () {
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
