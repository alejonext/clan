export default class done {
	static $inject = ['$scope', '$rootScope'];
	static n = 'done';
	
	constructor(scope, doc) {
		doc.maxBar = true;
	}	
}