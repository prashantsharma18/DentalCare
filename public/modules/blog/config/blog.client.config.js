angular.module('blog').run(['Menus',
	function (Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Admin', 'admin', 'dropdown');
        Menus.addSubMenuItem('topbar', 'admin', 'Maintain Blogs', 'admin/maintenance');
        Menus.addSubMenuItem('topbar', 'admin', 'New Blog', 'admin/create');
    }
]);