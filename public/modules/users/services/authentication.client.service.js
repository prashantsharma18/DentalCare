// Authentication service for user variables
angular.module('users').factory('Authentication', [
    function () {
        var _this = this;
        _this.data = {
            user: window.user
        };

        return _this.data;
    }
]);