$(function () {
	$('.download-icon').click(function () {
		var name = $(this).attr('data-file');
		location.href = '/Home/Loadfile/' + name;
	});

	$('.intro-caption').click(function () {
		$(this).parents('.intro-wrapper').find('.intro-text').toggle(10);
	});

	$('#ei-slider').eislideshow({
		easing: 'easeOutExpo',
		titleeasing: 'easeOutExpo',
		titlespeed: 1200
	});

	$('.text a').click(function () {
		var el = $(this).attr('href');
		var elWrapped = $(el);
		scrollToDiv(elWrapped, 40);
		return false;
	});

	function scrollToDiv(element, navheight) {

		var offset = element.offset();
		var offsetTop = offset.top;
		var totalScroll = offsetTop - navheight;

		$('body,html').animate({
			scrollTop: totalScroll
		}, 500);
	};

	if ($('#slider').length > 0) {
		$('#slider')._TMS({
			banners: true,
			waitBannerAnimation: false,
			preset: 'diagonalFade',
			easing: 'easeOutQuad',
			pagination: true,
			duration: 400,
			slideshow: 8000,
			bannerShow: function (banner) {
				banner.css({ marginRight: -500 }).stop().animate({ marginRight: 0 }, 600);
			},
			bannerHide: function (banner) {
				banner.stop().animate({ marginRight: -500 }, 600)
			}
		});
	}

	$('.main-nav.group li a[href="' + location.pathname + '"]').parent().addClass('current');

	$('.modal').click(function () {
		var elem = $(this);
		var id = elem.find('div[id]:first').attr('id');
		$('#' + id).toggle(10);
	});

});

(function ($) {
	$.fn.galery = function (options) {
		var self = this;

		var defaults = {
			images: self.find('img'),
			wrapper: 'photo-wrapper',
			currentPhoto: 0,
			loadImages: []
		};

		function getBodyScrollTop() {
			return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
		};

		function preload() {
			defaults.loadImages = new Array(defaults.images.length);
			for (var j = 0; j < defaults.images.length; j++) {
				defaults.loadImages[j] = new Image;
				defaults.loadImages[j].src = $(defaults.images[j]).attr('data-src');
			}
		}

		var opts = $.extend(defaults, options);

		var init = function () {
			if ($('.' + defaults.wrapper).length == 0) {
				$('body').append('<div class="' + defaults.wrapper + '"></div>');
			};
			preload();
		};

		init();

		defaults.images.each(function (idx, item) {
			$(this).click(function () {
				defaults.currentPhoto = idx;
				var winWidth = $(window).width();
				var winHeight = $(window).height();
				var wr = $('.' + defaults.wrapper);
				wr.addClass('shown');
				var d = $('<div />', {
					'class': 'photo-block'
				}).click(function () {
					nextPhoto();
				}).height(winHeight - 50)
					.css('line-height', (winHeight - 50).toString() + 'px')
					.appendTo(wr);

				var cl = $('<div />', {
					'class': 'close-photo'
				}).width((winWidth - d.outerWidth()) / 2)
					.append('<div class="image"></div>')
					.appendTo(wr)
					.click(function () {
						dispose();
					})
					.mouseover(function () {
						cl.find('.image').css('opacity', 1);
					})
					.mouseout(function () {
						cl.find('.image').css('opacity', 0.5);
					});

				var prev = $('<div />', {
					'class': 'prev-photo'
				}).width((winWidth - d.outerWidth()) / 2)
					.append('<div class="image"></div>')
					.appendTo(wr)
					.click(function () {
						prevPhoto();
					})
					.mouseover(function () {
						prev.find('.image').css('opacity', 1);
					})
					.mouseout(function () {
						prev.find('.image').css('opacity', 0.5);
					});
				showPhoto();
			})
		});

		var showPhoto = function () {
			var currentPhoto = $(defaults.loadImages[defaults.currentPhoto]);
			var container = $('.photo-block');
			//			$('<img />', {
			//				'src': currentPhoto.attr('data-src'),
			//				'class': 'big-photo'
			//			})
			$(currentPhoto)
				.addClass('big-photo')
				.css({
					'max-width': container.width(),
					'max-height': $(window).height() - 70
				}).appendTo(container);
		};

		var nextPhoto = function () {
			defaults.currentPhoto++;
			if (defaults.currentPhoto == defaults.images.length) {
				defaults.currentPhoto = 0;
			}
			$('.photo-block').empty();
			showPhoto();
		};

		var prevPhoto = function () {
			defaults.currentPhoto--;
			if (defaults.currentPhoto == -1) {
				defaults.currentPhoto = defaults.loadImages.length - 1;
			}
			$('.photo-block').empty();
			showPhoto();
		};

		var dispose = function () {
			$('.' + defaults.wrapper).removeClass('shown');
			$('.' + defaults.wrapper).empty();
		};
		//		window.onscroll = function(){
		//			dispose();
		//		};
	};
})(jQuery);