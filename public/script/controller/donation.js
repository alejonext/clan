export const name = 'done';
export default class f {
	static get $inject(){
		return ['$scope', '$rootScope'];
	}
	
	constructor(scope, doc) {
		doc.maxBar = true;
	}	
}