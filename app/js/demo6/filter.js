myapp.filter('iif', function () {
    return function (input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
    };
});


myapp.filter('showResultDate', function () {
    return function (input, resultStatus) {
        //console.log(input, resultStatus);
        if (resultStatus == 'Results Received')
            return input;
        else
            return '';
    };
});


myapp.filter('showAppointmentDate', function () {
    return function (input, resultStatus) {
        //console.log(input, resultStatus);
        if (resultStatus == 'Not approved')
            return '';
        else
            return input;
    };
});

myapp.filter('encode', function () {
    return window.encodeURIComponent;
});

myapp.filter('decode', function () {
    return window.decodeURIComponent;
});

myapp.filter('moment', function () {
    moment.tz.add([
        'America/Los_Angeles|PST PDT|80 70|0101|1Lzm0 1zb0 Op0',
        'America/New_York|EST EDT|50 40|0101|1Lz50 1zb0 Op0'
    ]);
    return function (dateString, format, timezone) {
        if (dateString && format && timezone) {
            var momentDate = moment.tz(dateString, timezone).format(format)
            return momentDate;
        } else if (dateString) {
            return moment(dateString).format('LLL').toLocaleString();
        }
        else {
            return '';
        }
    };
});