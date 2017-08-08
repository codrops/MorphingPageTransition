/**
 * demo1.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
{
	const DOM = {};
	DOM.intro = document.querySelector('.content--intro');
	DOM.shape = DOM.intro.querySelector('svg.shape');
	DOM.path = DOM.shape.querySelector('path');
	DOM.enter = document.querySelector('.enter');
	charming(DOM.enter);
	DOM.enterLetters = Array.from(DOM.enter.querySelectorAll('span'));
	// Set the SVG transform origin.
	DOM.shape.style.transformOrigin = '50% 0%';

	const init = () => {
		imagesLoaded(document.body, {background: true} , () => document.body.classList.remove('loading'));
		DOM.enter.addEventListener('click', navigate);
		DOM.enter.addEventListener('touchenter', navigate);
		DOM.enter.addEventListener('mouseenter', enterHoverInFn);
		DOM.enter.addEventListener('mouseleave', enterHoverOutFn);
	};

	let loaded;
	const navigate = () => {
		if ( loaded ) return;
		loaded = true;

		anime({
			targets: DOM.intro,
			duration: 1100,
			easing: 'easeInOutSine',
			translateY: '-200vh'
		});
		
		anime({
			targets: DOM.shape,
			scaleY: [
				{value:[0.8,1.8],duration: 550,easing: 'easeInQuad'},
				{value:1,duration: 550,easing: 'easeOutQuad'}
			]
		});

		anime({
			targets: DOM.path,
			duration: 1100,
			easing: 'easeOutQuad',
			d: DOM.path.getAttribute('pathdata:id')
		});
	};

	let isActive;
	let enterTimeout;

	const enterHoverInFn = () => enterTimeout = setTimeout(() => {
		isActive = true;
		anime.remove(DOM.enterLetters);
		anime({
			targets: DOM.enterLetters,
			delay: (t,i) => i*15,
			translateY: [
				{value: 10, duration: 150, easing: 'easeInQuad'},
				{value: [-10,0], duration: 150, easing: 'easeOutQuad'}
			],
			opacity: [
				{value: 0, duration: 150, easing: 'linear'},
				{value: 1, duration: 150, easing: 'linear'}
			],
			color: {
				value: '#ff963b',
				duration: 1,
				delay: (t,i,l) => i*15+150
			}
		});
	}, 50);

	const enterHoverOutFn = () => {
		clearTimeout(enterTimeout);
		if( !isActive ) return;
		isActive = false;

		anime.remove(DOM.enterLetters);
		anime({
			targets: DOM.enterLetters,
			delay: (t,i,l) => (l-i-1)*15,
			translateY: [
				{value: 10, duration: 150, easing: 'easeInQuad'},
				{value: [-10,0], duration: 150, easing: 'easeOutQuad'}
			],
			opacity: [
				{value: 0, duration: 150, easing: 'linear'},
				{value: 1, duration: 150, easing: 'linear'}
			],
			color: {
				value: '#ffffff',
				duration: 1,
				delay: (t,i,l) => (l-i-1)*15+150
			}
		});
	};

	init();
};