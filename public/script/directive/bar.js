export const name = 'bar';

/**
 * <bar color="blue" caption="Is my progress.." progress="number" total="max" />
 */

export default function f () {
	const template =
`<div class="ng-progress-bar">
	<span class="caption" ng-transclude></span>
	<div ng-class="cls"></div>
</div>`;
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			'progress' : '&progress'
		},
		link (scope, ele, attr, ctrl) {
			var total = parseInt( attr.total ) || 100;
			var bar = angular.element( ele.children()[1] );
			scope.cls =  [ "bar", attr.color || 'blue' ];

			scope.$watch(scope.progress, value => {
				bar.css({
					'width' : ( ( Number(value) * 100 ) / total ) +  '%'
				});
			});
		},
		template
	};
}
f.$inject = [];