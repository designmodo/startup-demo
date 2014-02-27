(function ($) {
    $(function () {

        $('pre code.language-markup').each(function () {
            $(this).text($(this).html());
        });

        $('html').click(function (e) {
            if (!$(e.target).hasClass('menu-btn') && !$(e.target).hasClass('colapsed-menu') && !$(e.target).parents().hasClass('colapsed-menu') && !$(e.target).parents().hasClass('menu-btn')) {
                $('body').removeClass('colapsed-menu-active');
            }
        });

        $('.manual > div').hide('fast');

        var helpButton = $('.read-man');
        helpButton.each(function () {
            $(this).hover(function () {
                $('body').toggleClass('hovered');
                var id = $(this).attr('id');
                var heightMask = 0;
                if(id.indexOf('header') != -1) {
                    if(id.indexOf('header-13') != -1) {
                        heightMask += $('.' + id + '-sub').outerHeight();
                    } else if(id.indexOf('header-7') != -1) {
                        heightMask += $('.' + id + '-sub').outerHeight();
                    } else {
                        heightMask += $('header.' + id + ':not(.hidden)').outerHeight();
                        heightMask += $('.' + id + '-sub').outerHeight();
                    }
                } else if(id.indexOf('footer') != -1) {
                    $('footer.' + id).each(function() {
                        heightMask += $(this).outerHeight();
                    })
                    if(id.indexOf('footer-9') != -1) {
                        heightMask += $('section.' + id + '-map').outerHeight();
                    }
                } else {
                    $('section.' + id).each(function() {
                        heightMask += $(this).outerHeight();
                    })
                }

                if (heightMask > $(window).height()) {
                    $('.' + id + '.mask').addClass('big');
                } else if (heightMask <= 80) {
                    $('.' + id + '.mask').addClass('small');
                    heightMask += 30;
                }
                $('.' + id + '.mask').height(heightMask);
                $('.' + id + '.mask').toggleClass('active');
            });

            $(this).click(function () {
                var id = $(this).attr('id');
                $('.manual .' + id).show();

                $('html').addClass('read-manual');

                $('html').click(function (e) {
                    var clickedElem = $(e.target);
                    var parentCE = $(e.target).parents();
                    if (!clickedElem.hasClass('read-man') && !clickedElem.hasClass('manual') && !parentCE.hasClass('manual')) {
                        console.log(clickedElem, parentCE);
                        $('.back-button:visible').click();
                    }
                });

            });

        });

        var backButton = $('.back-button');
        backButton.click(function () {
            $('html').removeClass('read-manual');
            $('.manual > div').fadeOut(1000);
        });

        $('.question').click(function () {
            $(this).toggleClass('opened');
        });

    });
})(jQuery);
