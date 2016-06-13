export default class done {
	static $inject = ['$scope', '$rootScope', '$anchorScroll', 'api'];
	static n = 'done';
	
	constructor(scope, doc, scroll, api) {
		doc.maxBar = true;
		this.card = false;
		this.api = api;
		scope.$watch(() => this.isbay, newval => angular.isDefined(newval) ? scroll('step2') : null )
		scope.$watch(() => this.isType, newval => angular.isDefined(newval) ? scroll('step3') : null )
	}

	payNow(){
		this.send = true;
		this.error = null;

		this.api.create({
			name : 'donation'
		}, {
			pay : this.pay,
			card : this.card
		}, data => {
			console.log(data);
			if(data.error){
				this.error = data.error;
			} else {

				if(data.data.redirect){
					window.open(data.data.payment.url);
				} else {
					
				}
			}
		});
	}
}