angular.module('blog').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        
       $urlRouterProvider.when('/', '/blogs/list');
       
        $urlRouterProvider.otherwise('/');

        $stateProvider.
            state('blogs', {
            abstract: true,
            url: '/blogs',
            templateUrl: 'modules/blog/views/blogs.client.view.html'
        })
            .state('blogs.list', {
            url: '/list',
            templateUrl: 'modules/blog/views/list-blog.client.view.html'
        })
            .state('blogs.detail', {
            url: '/:slug',
            templateUrl: 'modules/blog/views/view-blog.client.view.html'
        })
         .state('create', {
            url: '/admin/create',
            templateUrl: 'modules/blog/views/create-blog.client.view.html'
        })
        .state('edit', {
            url: '/admin/edit/:slug',
            templateUrl: 'modules/blog/views/edit-blog.client.view.html'
        })
        .state('maintenance', {
            url: '/admin/maintenance',
            templateUrl: 'modules/blog/views/maint-blog.client.view.html'
        });
        

    }
]);