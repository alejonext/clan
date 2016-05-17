const VEL = 5;
export const name = 'app';
export default class f {
	static get $inject(){
		return ['$document', '$timeout'];
	}
	
	constructor(doc, interval) {
		this.num = 1;
		this.back = [];
		this.image = '';
		this.out = interval;

		var elem = doc.find('meta');

		for (var i = elem.length - 1; i >= 0; i--) {
			if(elem[i].attributes.daturl){
				this.back.push(elem[i].attributes.daturl.value);
			}
		}

		this.isClick(1);
	}

	isClick(num) {
		if(this.ins){
			this.out.cancel(this.ins);
			this.ins = null;
		}
		this.num += num;
		var select = this.num % this.back.length;
		var item = this.back[ select * Math.sign(select) ];
		this.image =  item;
		this.ins = this.out( () => this.isClick(1), VEL * 1000);
	}
}