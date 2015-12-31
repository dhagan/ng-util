/**
 * Created by dhagan on 2/24/15.
 */

var myapp = angular.module('demo6.services', ['ngResource']);


//myapp.factory('AllergiesCouch', function ($resource, GENERAL_CONFIG) {
//    var AllergiesCouch = $resource(':protocol//:server/:db/:q/:r/:s/:t',
//        {protocol: 'http:', server: GENERAL_CONFIG.COUCH_SERVER, db: 'allergies'}, {
//            update: {method: 'PUT'}
//        }
//    );
//
//    AllergiesCouch.prototype.update = function (cb) {
//        return AllergiesCouch.update({q: this._id},
//            this, cb).$promise.then(
//            //success
//            function (value) {
//                /*Do something with value*/
//                console.log(value);
//            },
//            //error
//            function (error) {
//                /*Do something with error*/
//                alert("Conflict, please try again.  " + error);
//                console.log(error);
//            }
//        );
//    };
//
//    AllergiesCouch.prototype.destroy = function (cb) {
//        return AllergiesCouch.remove({q: this._id, rev: this._rev}, cb);
//    };
//
//    return AllergiesCouch;
//});


/**
 * enable the underscore library
 * @type {module|*|module|module}
 */
var underscore = angular.module('underscore', []);
underscore.factory('_', function () {
    return window._; // assumes underscore has already been loaded on the page
});
