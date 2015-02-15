angular.module('blog')
.directive('tagList', function () {
    return {
        link: function (scope, element, attrs) {
            scope[attrs['tagList']].$promise.then(function (data) {
                scope.data = data.tags;
            });
        },
        restrict: 'A',
        template: '<ul class="list-inline"><li ng-repeat="item in data">' 
                    + '<a class="btn btn-primary" ng-click="item.isDelete = !item.isDelete" ng-class="{\'btn-danger\': item.isDelete}"> {{item.title}} </a></li></ul>'
    };

});