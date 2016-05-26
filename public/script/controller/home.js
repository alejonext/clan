export const name = 'home';
export default class f {
	static $inject = [ '$scope', 'ngDialog', '$rootScope'];
	
	constructor(scope, dialog, doc) {
		doc.maxBar = false;
		dialog.open({
			template : '/template/landing',
			scope : scope
		});

		this.close = dialog.closeAll;
	}
}