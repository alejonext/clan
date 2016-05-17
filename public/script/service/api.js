export const name = 'api';
export default function f (http) {
	return http(process.env.host + process.env.api + '/:name', null, {
		create : {
			method : 'POST'	
		}
	});
}

f.$inject = ['$resource'];