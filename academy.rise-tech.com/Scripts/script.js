$(function () {

	$('.carousel').carousel({
		interval: 2500
	})

	var name = location.href.split('/');
	if (name.length == 5) {
		$('li[data-href=' + name[4] + ']').addClass('active');
	}

	$('.download-icon, .intro-caption').click(function () {
		var name = $(this).attr('data-file');
		window.open('/Home/Loadfile/' + name)
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

	var pathname = location.pathname.split('/')[1] ? location.pathname.split('/')[1] : 'main-page'
	$('.main-nav.group li a[data-href="' + pathname + '"], .main-nav.group li a[data-main=' + pathname + ']').parent().addClass('current');

	$('.modal').click(function () {
		var elem = $(this);
		var id = elem.find('div[id]:first').attr('id');
		$('#' + id).toggle(10);
	});

	$('#slider')._TMS({
		banners: true,
		waitBannerAnimation: false,
		preset: 'zabor',
		easing: 'easeOutQuad',
		pagination: true,
		duration: 400,
		slideshow: 8000,
		bannerShow: function (banner) {
			banner.css({ marginRight: -500 }).stop().animate({ marginRight: 0 }, 600)
		},
		bannerHide: function (banner) {
			banner.stop().animate({ marginRight: -500 }, 600)
		}
	});
});

(function ($) {
	$.fn.gallery = function (options) {
		var self = this;

		var defaults = {
			images: self.find('img'),
			wrapper: 'photo-wrapper',
			currentPhoto: 0,
			loadImages: [],
			cachedImages: []
		};

		function getBodyScrollTop() {
			return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
		};

		function preload(idx) {
			if (!defaults.cachedImages.length) {
				defaults.cachedImages = new Array(defaults.images.length);
			}
			var loadToCache = function (i) {
				if (i < 0) {
					i = defaults.cachedImages.length - 1;
				}
				if (i === defaults.cachedImages.length) {
					i = 0;
				}
				if (!defaults.cachedImages[i]) {
					defaults.cachedImages[i] = new Image();
					defaults.cachedImages[i].src = $(defaults.images[i]).attr('data-src');
				}
			}
			loadToCache(idx - 1);
			loadToCache(idx);
			loadToCache(idx + 1);
			//defaults.loadImages = new Array(defaults.images.length);
			//for (var j = 0; j < defaults.images.length; j++) {
			//	defaults.loadImages[j] = new Image;
			//	defaults.loadImages[j].src = $(defaults.images[j]).attr('data-src');
			//}

		}

		var opts = $.extend(defaults, options);

		var init = function () {
			if ($('.' + defaults.wrapper).length == 0) {
				$('body').append('<div class="' + defaults.wrapper + '"></div>');
			};
			//preload();
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
				showPhoto(idx);
			})
		});

		var showPhoto = function (idx) {
			preload(idx);
			var currentPhoto = $(defaults.cachedImages[defaults.currentPhoto]);
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
			if (defaults.images.length === 1) {
				dispose();
				return;
			}
			defaults.currentPhoto++;
			if (defaults.currentPhoto == defaults.images.length) {
				defaults.currentPhoto = 0;
			}
			$('.photo-block').empty();
			showPhoto(defaults.currentPhoto);
		};

		var prevPhoto = function () {
			if (defaults.images.length === 1) {
				dispose();
				return;
			}
			defaults.currentPhoto--;
			if (defaults.currentPhoto == -1) {
				defaults.currentPhoto = defaults.cachedImages.length - 1;
			}
			$('.photo-block').empty();
			showPhoto(defaults.currentPhoto);
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