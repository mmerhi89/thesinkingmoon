/*global History, Modernizr, alert*/

window.main = window.main || {};

main.cacheSelectors = function () {

  main.cache = {

    $body                    : $('html,body'),
    $wrapper				 : $('#wrapper'),

    $caseType           	 : $('.case-type'),
    $caseTypeItem            : $('.case-type li a'),
    $caseContainer        	 : $('.case-container'),

    $imageToggle 			 : $('.image-toggle'),
    $answer 				 : $('.answer')

  };

};

main.init = function () {

	History.Adapter.bind(window,'statechange',function(){
	    var State = History.getState();
	});

	main.cacheSelectors();
	main.initCase();
	main.initEvents();
	main.initStones();

	
	setTimeout(function() {
		main.showWebsite();
		main.initTitles();
		main.checkPage();
	},200);

};

main.checkPage = function() {

	var urlitems,
		urltoload;

		urlitems = window.location.href.split("#");
		urltoload = urlitems[1];

		setTimeout(function() {
			if( urltoload === undefined ) {
				// Do nothing
			} else {
				main.toggleAnswer(urltoload);
			}
		},50);

};

main.initEvents = function() {

	var toggled = false;

	$('[data-question]').on('click', function(evt) {
		evt.preventDefault();
		main.toggleAnswer($(this).data('question'));
	});

	$('a.btn-question').on('click', function(evt) {
		evt.preventDefault();
		var href = $(this).attr('href');
		var substr = href.split('#');
		main.toggleAnswer(substr[1]);
	});

	$('a.to-bottom').on('click', function(evt) {
		evt.preventDefault();
		main.scrollTo($('#footer'));
	});

	$('h1 a').on('click', function(evt) {
		evt.preventDefault();
		main.scrollToWithPadding($(this).attr('href'));
	});

	$('.overlay-img-container').on('click', function(evt) {
		toggled = !toggled;
		main.toggleImage($(this).siblings('.movable'),toggled);	
	});

	main.cache.$imageToggle.on('click', function(evt) {
		toggled = !toggled;
		main.toggleImage($(this).siblings('.movable'),toggled);
	});

    $('section .movable').swipe( {

        swipeLeft:function() {
			toggled = true;
			main.toggleImage($(this),toggled);	
        },

        swipeRight:function() {
			if ( toggled ) {
				toggled = !toggled;
				main.toggleImage($(this),toggled);		
			}
        },

    });

};

main.toggleAnswer = function(question) {

	var questionSection = $('#'+question);

	if( questionSection.hasClass('is-opened') ) {
		questionSection.removeClass('is-opened');
		questionSection.addClass('is-closed');

		questionSection.find('.answer .inner').removeClass('show');

		History.pushState('answer', 'The Sinking Moon | Questions' , window.location.origin );

	} else {
		questionSection.removeClass('is-closed');
		questionSection.addClass('is-opened');

		setTimeout( function() {
			questionSection.find('.answer .inner').addClass('show');
		},440);
		
		History.pushState('answer', 'The Sinking Moon | ' + question.charAt(0).toUpperCase() + question.slice(1), window.location.origin + '/#' + question + '' );
		document.title = 'The Sinking Moon | ' + question.charAt(0).toUpperCase() + question.slice(1);
	}

	setTimeout(function() {
		questionSection.find('.answer').removeClass('toggled');
	},880);

	main.scrollTo(questionSection);

};

main.initCase = function() {

	var caseSection;

	function toggleCase(clickedCase) {
		caseSection = clickedCase;

		if( caseSection.hasClass('is-opened') ) {
			caseSection.removeClass('is-opened');
			caseSection.addClass('is-closed');
		} else {
			caseSection.removeClass('is-closed');
			caseSection.addClass('is-opened');
			main.scrollToWithPadding(caseSection);
		}
	}

	main.cache.$caseType.on('click', function(evt) {
		evt.preventDefault();
		toggleCase($(this));
	});

    main.cache.$caseType.hover(function(){

        $(this).siblings().addClass('faded');
        $(this).removeClass('faded');
        

    }, function(){

        main.cache.$caseType.removeClass('faded');
        
    });

};

main.initStones = function() {

	var stones = [
	    'assets/img/stone1.png',
	    'assets/img/stone2.png',
	    'assets/img/stone3.png',
	];

	var loadedImages = [];
	var pickedStones = [];
	var length = 3;
	var count = 0;

	var positions = ['pos1','pos2','pos3'];
	var rotations = ['none','none','rotated'];
	var pickedRotations = [];
	var pickedPositions = [];

	function pickStones () {

		var gif;
		var randomValue = Math.floor(Math.random() * 2);

		for (var i = 0; i < length; i++) {

			if(i === 0) {
				stone = stones[i];
				rotation =  rotations[Math.floor(Math.random() * rotations.length)];
				position =  positions[Math.floor(Math.random() * positions.length)];


		    	pickedStones.push(stone);
		    	pickedPositions.push(position);
		    	pickedRotations.push(rotation);
			}

			if(i === 1) {
				stone = stones[i];
				rotation =  rotations[Math.floor(Math.random() * rotations.length)];
				position =  positions[Math.floor(Math.random() * positions.length)];

		    	pickedStones.push(stone);
		    	pickedPositions.push(position);
		    	pickedRotations.push(rotation);
			}

			if(i === 2) {
				stone = stones[i];
				rotation =  rotations[Math.floor(Math.random() * rotations.length)];
				position =  positions[Math.floor(Math.random() * positions.length)];

		    	pickedStones.push(stone);
		    	pickedPositions.push(position);
		    	pickedRotations.push(rotation);
			}

		}

		setStones();
	}

	function setStones () {
		for (var i = 0; i < length; i++) {
		    $('.stone[data-id="'+(i+1)+'"]').find('img').attr('src',pickedStones[i]);
		    $('.stone[data-id="'+(i+1)+'"]').addClass(pickedRotations[i]);
		    $('.stone[data-id="'+(i+1)+'"]').addClass(pickedPositions[i]);
		}
		showStones();
	}

	function showStones () {
		$('.stone img').load(function(){
 			$(this).velocity('fadeIn', { duration: 220, easing: 'easeInOutQuad'});
		});
	}

	pickStones();

};

main.initTitles = function() {

	setTimeout(function () {
		$('.intro-question').addClass('show');
	},220);

	setTimeout(function () {
		$('.intro-answer').addClass('show');
	},1220);


};

main.toggleImage = function(answer,toggled) {

	if( toggled ) {
		main.cache.$imageToggle.addClass('toggled');
		answer.addClass('toggled');
	} else {
		main.cache.$imageToggle.removeClass('toggled');
		answer.removeClass('toggled');
	}

};

main.scrollTo = function(href) {

	main.cache.$body.velocity('scroll', { duration: 660, offset: $(href).offset().top, easing: 'easeInOutQuart' });

};

main.scrollToWithPadding = function(href) {

	main.cache.$body.velocity('scroll', { duration: 660, offset: ($(href).offset().top - 40), easing: 'easeInOutQuart' });

};

main.showWebsite = function() {

	main.cache.$wrapper.velocity('fadeIn', { duration: 220, easing: 'easeInOutQuad'});

};

$(main.init);