export default function f (router, location) {
	location.html5Mode(true);
	router
		.when('/',{
			controller : 'home',
			controllerAs : 'h',
			templateUrl : '/template/home'
		})
		.when('/donacion',{
			controller : 'done',
			controllerAs : 'd',
			templateUrl : '/template/donate'
		})
		.when('/contacto',{
			controller : 'contact',
			controllerAs : 'c',
			templateUrl : '/template/contact'
		})
		.when('/soy/:name',{
			controller : 'land',
			controllerAs : 'l',
			templateUrl : function (param) {
				return '/template/' + ( /emprendedor|estudiante/.test(param.name) ? param.name : 'error' );
			}
		})
		.otherwise({
			templateUrl : '/template/error'
		});
}


f.$inject = ['$routeProvider', '$locationProvider'];