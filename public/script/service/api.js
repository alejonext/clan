export default function api (http) {
	return http(process.env.host + process.env.api + '/:name', null, {
		create : {
			method : 'POST'	
		}
	});
}
api.n = 'api';
api.$inject = ['$resource'];