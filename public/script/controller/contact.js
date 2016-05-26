export default class contact {
	static $inject = ['$scope', '$rootScope'];
	static n = 'contact';
	
	constructor(scope, doc) {
		doc.maxBar = true;
	}	
}