/**
 * Created by dhagan on 3/21/14.
 */
var config_module = angular.module('demo6.config', []);

var config_data = {
    'GENERAL_CONFIG': {
        'APP_NAME': 'Demo6-Projects'
    }
};

angular.forEach(config_data, function (key, value) {
    config_module.constant(value, key);
});

