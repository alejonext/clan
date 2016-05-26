export default function ngHeight (doc, rot) {
	
	const MAX = 500;
	const VEL = 1;
	const DIV = 47;

	return {
		restrict: 'A',
		scope : {
			ngHeight : '='
		},
		link(scope, ele){
			scope.scroll = 500;
			var ele = angular.element(ele);
			
			doc.bind('scroll', e => {
				var z =  MAX - ( e.pageY * VEL )
				scope.scroll = !rot.maxBar && z > DIV ? z : DIV;
				ele.css('height', scope.scroll + 'px')
			});

			scope.$watch('ngHeight', value => ele.css('background-image', 'url(' + value + ')' ));
			scope.$watch(() => rot.maxBar, value =>{
				ele.css('height', ( value ? DIV : scope.scroll ) + 'px')
			});
		}
	}
}
ngHeight.n = 'ngHeight';
ngHeight.$inject = [ '$document', '$rootScope'];