console.log("start page");

$('.menu__btn').on('click', function(e) {
	e.preventDefault;
	$(this).toggleClass('menu__btn--active');
	$('.menu__nav').addClass('visib');
	$('.menu__nav').toggleClass('menu__nav--active');
	$('.menu__nav').toggleClass('menu__nav--unactive');
})

$('.menu__nav-link').on('click', function(a) {
	a.preventDefault;
	console.log(this.id);
	changeStyle(this.id);	
})

function changeStyle(type) {
	var state = document.querySelector('link[rel="stylesheet"]');
	console.log(state);
	state.href = 'css/' + type + '.min.css';
	console.log(state);	
}