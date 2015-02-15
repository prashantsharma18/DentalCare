angular.module('blog').factory('Blogs', ['$resource', 
    function ($resource) {
        return $resource('blogs/:slug', { slug: '@slug' }, {
            update: { method: 'PUT' }, 
            save: { method: 'POST', params: {}, url: 'blogs/create' },
            remove: {method: 'DELETE'}
        });
    }
]);