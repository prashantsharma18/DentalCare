
angular.module('blog').controller('BlogController', ['$scope', '$stateParams', '$location', 'Blogs',
  function ($scope, $stateParams, $location, Blogs) {
        $scope.contentLoaded = false;

        $scope.findAll = function () {
            $scope.blogs = Blogs.query();
        };
        
        $scope.findOne = function () {
            $scope.blog = Blogs.get({
                slug: $stateParams.slug
            }, function () {
                $scope.url = $location.absUrl();
                $scope.contentLoaded = true;
            });
            
        };
        
        $scope.update = function () {
            var blog = $scope.blog;
            
            blog.$update(function () {
                $location.path('blogs/' + blog.slug);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        
        $scope.createBlog = function (newblog) {
            
            var blog = new Blogs({
                title: newblog.title,
                slug: newblog.slug,
                postedBy: newblog.postedBy,
                postedDt: newblog.postedDt,
                shortDesc: newblog.shortDesc,
                content: newblog.content,
                tags: newblog.tags.split(',')
            });
            blog.$save(function (response) {
            },
            function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            console.log('new blog title is  ' + newblog.title);
        };

        $scope.remove = function (blog) {
            if (blog) {
                blog.$remove();
                
                for (var i in $scope.blogs) {
                    if ($scope.blogs[i] === blog) {
                        $scope.blogs.splice(i, 1);
                    }
                }
            } 
        };

    }

]);