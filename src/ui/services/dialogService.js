'use strict';

angular.module('app').service('dialogService', [
  '$q',
  function($q) {
    var { remote: { dialog } } = require('electron');
    
    function DialogService() {}

    DialogService.prototype.showOpenDialog = function() {
      var deferred = $q.defer();

      dialog.showOpenDialog(function(fileNames) {
        return deferred.resolve(fileNames);
      });

      return deferred.promise;
    };

    DialogService.prototype.showSaveDialog = function() {
      var deferred = $q.defer();

      dialog.showSaveDialog(function(fileNames) {
        return deferred.resolve(fileNames);
      });

      return deferred.promise;
    };

    return new DialogService();
  }
]);
