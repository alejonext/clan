export default class done {
	static $inject = ['$scope', '$rootScope', '$anchorScroll', 'api', 'ngDialog', '$location'];
	static n = 'done';
	
	constructor(scope, doc, scroll, api, dialog, location) {
		doc.maxBar = true;
		this.dialog = dialog.open;
		this.card = false;
		this.api = api;
		this.urls = location.url;
		scope.$watch(() => this.isbay, newval => angular.isDefined(newval) ? scroll('step2') : null )
		scope.$watch(() => this.isType, newval => angular.isDefined(newval) ? scroll('step3') : null )
		this.$scope = scope;
	}

	payNow(){
		this.send = true;
		this.error = null;

		this.api.create({
			name : 'donation'
		}, {
			pay : this.pay,
			card : this.card
		}, this.runBefore);
	}

	close (){
		this.urls('/');
	}

	runBefore (data){
		if(data.error){
			this.error = data.error;
		} else {
			if(data.data.redirect){
				window.open(data.data.payment.url);
			} else {
				this.dialog({
					scope: this.$scope,
					template : '/template/thanks'
				});
			}
		}
	}
}