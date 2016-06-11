export default class done {
	static $inject = ['$scope', '$rootScope', '$anchorScroll'];
	static n = 'done';
	
	constructor(scope, doc, scroll) {
		doc.maxBar = true;
		scope.$watch(() => this.isbay, newval => angular.isDefined(newval) ? scroll('step2') : null )
		scope.$watch(() => this.isType, newval => angular.isDefined(newval) ? scroll('step3') : null )
	}

}