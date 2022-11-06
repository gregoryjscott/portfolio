/**
*	Glitche - CV/Resume/Portfolio Template (HTML)
*	Version: 1.3
*	Author: beshleyua
*	Author URL: http://themeforest.net/user/beshleyua
*	Copyright © Cvio by beshleyua. All Rights Reserved.
**/

$(function () {
	'use strict';
	
	window.onpageshow = function(event) {if (event.persisted) {window.location.reload() }};

	/* Set full height in blocks */
	var height = $('header').outerHeight()
	var adjustment = height + 30 // due to CSS applied to header
	$('.section.spacer').css({'height': adjustment});

	$(window).on('load', function() {
		$('body').addClass('loaded');

		if (document.querySelector('.typed-subtitle')) {
			new Typed('.typed-subtitle', {
				strings: [
					'clouds',
					'servers',
					'mainframes',
					'PCs',
					'Macs',
					'smartphones',
					'TVs',
					'range finders',
					'GPS devices',
					'lasers',
					'calculators',
					'B-1 Bombers'
				],
				typeSpeed: 50,
				backSpeed: 50,
				loop: true
			});
		}

		if (document.querySelector('.typed-bread')) {
			new Typed('.typed-bread', {
				stringsElement: '.typed-bread-template',
				typeSpeed: 50,
				loop: false,
				showCursor: false
			});
		}

		if (document.querySelector('.typed-post')) {
			new Typed('.typed-post', {
				stringsElement: '.typed-post-template',
				typeSpeed: 50,
				loop: false,
				showCursor: false
			});
		}
	});
	
	/*Menu mobile*/
	$('header').on('click', '.menu-btn', function(){
		if($('header').hasClass('active')){
			$('header').removeClass('active');
			$('body').addClass('loaded');
		} else {
			$('header').addClass('active');
			$('body').removeClass('loaded');
		}
		
		return false;
	});
	
	/* Hide mouse button on scroll */
	$(window).scroll(function(){
		if ($(this).scrollTop() >= 1 /*$('#blue_bor').offset().top*/) {
			$('.mouse_btn').fadeOut();
		}
		else {
			$('.mouse_btn').fadeIn();
		}
	});
	
	/* On click mouse button, page scroll down */
	$('.section').on('click', '.mouse_btn', function(){
		$('body,html').animate({
			scrollTop: height - 150
		}, 800);
	});
		
	/* Validate contact form */
	$("#cform").validate({
		rules: {
			name: {
				required: true
			},
			message: {
				required: true
			},
			email: {
				required: true,
				email: true
			}
		},
		success: "valid",
		submitHandler: function() {
			return true;
			$("#cform").find('input[type="text"], input[type="email"], input[type="tel"], textarea').val('');
		}
	});
	
	/* Initialize masonry items */
	var $container_clients = $('.section.clients .box-items');
	$container_clients.imagesLoaded(function() {
		$container_clients.isotope({
			itemSelector: '.box-item'
		});
	});

	/* Initialize masonry items */
	var $container_blog = $('.section.blog .box-items');
	$container_blog.imagesLoaded(function() {
		$container_blog.isotope({
			itemSelector: '.box-item'
		});
	});
	
	/*
		Initialize portfolio items
	*/
	var $container = $('.section.works .box-items');
	$container.imagesLoaded(function() {
		$container.isotope({
			itemSelector: '.box-item'
		});
	});

	/*
		Filter items on button click
	*/
	$('.filters').on( 'click', '.btn-group', function() {
		var filterValue = $(this).find('input').val();
		$container.isotope({ filter: filterValue });
	});
	
	/*
		Gallery popup
	*/
	if(/\.(?:jpg|jpeg|gif|png)$/i.test($('.gallery-item:first a').attr('href'))){
		$('.gallery-item a').magnificPopup({
			gallery: {
				enabled: true
			},
			type: 'image',
			closeBtnInside: false,
			mainClass: 'mfp-fade'
		});
	}

	/*
		Media popup
	*/
	$('.has-popup-media').magnificPopup({
		type: 'inline',
		overflowY: 'auto',
		closeBtnInside: true,
		mainClass: 'mfp-fade'
	});

	/*
		Image popup
	*/
	$('.has-popup-image').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-fade',
		image: {
			verticalFit: true
		}
	});
	
	/*
		Video popup
	*/
	$('.has-popup-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		iframe: {
            patterns: {
                youtube_short: {
                  index: 'youtu.be/',
                  id: 'youtu.be/',
                  src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                }
            }
        },
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		mainClass: 'mfp-fade',
		callbacks: {
			markupParse: function(template, values, item) {
				template.find('iframe').attr('allow', 'autoplay');
			}
		}
	});
	
	/*
		Music popup
	*/
	$('.has-popup-music').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		mainClass: 'mfp-fade'
	});

	/*
		Gallery popup
	*/
	$('.has-popup-gallery').on('click', function() {
        var gallery = $(this).attr('href');
    
        $(gallery).magnificPopup({
            delegate: 'a',
            type:'image',
            closeOnContentClick: false,
            mainClass: 'mfp-fade',
            removalDelay: 160,
            fixedContentPos: false,
            gallery: {
                enabled: true
            }
        }).magnificPopup('open');

        return false;
    });
	
	/* Resize function */
	$(window).resize(function() {
		var width = $(window).width();
		// var height = $(window).height();
		// var adjustment = height-60
		var height = $('header').outerHeight()
		var adjustment = height + 30 // due to CSS applied to header
		
		$('.section.spacer').css({'height': adjustment});

		/* Dotted Skills Line On Resize Window */
		var skills_dotted = $('.skills-list.dotted .progress');
		var skills_dotted_w = skills_dotted.width();
		if(skills_dotted.length){
			skills_dotted.find('.percentage .da').css({'width':skills_dotted_w+1});
		}
	});
	
	/*
		Dotted Skills Line
	*/

	function skills(){
		var skills_dotted = $('.skills.dotted .progress');
		var skills_dotted_w = skills_dotted.width();
		if(skills_dotted.length){
			skills_dotted.append('<span class="dg"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>');
			skills_dotted.find('.percentage').append('<span class="da"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>');
			skills_dotted.find('.percentage .da').css({'width':skills_dotted_w});
		}
	}
	setTimeout(skills, 1000);

	/*
		Circle Skills Line
	*/

	var skills_circles = $('.skills.circles .progress');
	if(skills_circles.length){
		skills_circles.append('<div class="slice"><div class="bar"></div><div class="fill"></div></div>');
	}
	
	/*
		Sidebar Show/Hide
	*/
	$('header').on('click', '.sidebar_btn', function(){
		$('.s_overlay').fadeIn();
		$('.content-sidebar').addClass('active');
		$('body').addClass('scroll_hidden');
		
		return false;
	});
	$('.content-sidebar, .container').on('click', '.close, .s_overlay', function(){
		$('.s_overlay').fadeOut();
		$('.content-sidebar').removeClass('active');
		$('body').removeClass('scroll_hidden');
	});

	/*
		Widget Title
	*/
	$('.widget-title').wrapInner('<span class="widget-title-span"></span>');

	/*
		Search
	*/
	// var sjs = SimpleJekyllSearch({
	//   searchInput: document.getElementById('search-input'),
	//   resultsContainer: document.getElementById('results-container'),
	//   json: '/search.json'
	// });
});