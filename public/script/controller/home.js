export default class home {
	static $inject = [ '$scope', 'ngDialog', '$rootScope'];
	static n = 'home';
	
	constructor(scope, dialog, doc) {
		doc.maxBar = false;
		dialog.open({
			template : '/template/landing',
			scope : scope
		});

		this.close = dialog.closeAll;
	}
}