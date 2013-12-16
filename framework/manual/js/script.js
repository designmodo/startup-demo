(function ($) {
    $(function () {

        $('pre code.language-markup').each(function () {
            $(this).text($(this).html());
        });

        $('#open-close-menu').click(function () {
            $('body').toggleClass('colapsed-menu-active');
        });



        $('html').click(function (e) {
            // console.warn('element clicked = ',$(e.target).attr('class'), '\n parent element = ', $(e.target).parents().attr('class'));
            if (!$(e.target).hasClass('menu-btn') && !$(e.target).hasClass('colapsed-menu') && !$(e.target).parents().hasClass('colapsed-menu') && !$(e.target).parents().hasClass('menu-btn')) {
                $('body').removeClass('colapsed-menu-active');
            }
        });

        var BlockId = {};
        $('button.read-man').each(function () {
            BlockId[$(this).attr('id')] = {};
            BlockId[$(this).attr('id')].bH = 0;
        });

        for (id in BlockId) {

            if ($('section.' + id).length != 0) {
                BlockId[id].bH += $('section.' + id).outerHeight();
            }
            if ($('header.' + id).length != 0) {
                BlockId[id].bH += $('header.' + id).outerHeight();
            }
            if ($('.' + id + '-sub').length != 0) {
                if ($('.' + id + '-sub').hasClass('header-7-sub')) {
                    BlockId[id].bH += $('.h-7-section-1').outerHeight();
                } else {
                    BlockId[id].bH += $('.' + id + '-sub').outerHeight();
                }
            }
            if ($('.' + id + '-map').length != 0) {
                BlockId[id].bH += $('.' + id + '-map').outerHeight();
            }
            if ($('footer.' + id).length != 0) {
                BlockId[id].bH += $('footer.' + id).outerHeight();
            }
            if (BlockId[id].bH <= 80) {
                $('#' + id).css('margin-top', (BlockId[id].bH - 49) / 2 + 'px');
            }
        }

        $('.manual > div').hide('fast');

        var helpButton = $('.read-man');
        helpButton.each(function () {

            $(this).hover(function () {
                $('body').toggleClass('hovered');
                var id = $(this).attr('id');
                var heightMask = BlockId[id].bH;
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

//                var elem = $('.mcontent > .' + id + ':not(.mask)');
//                if (elem.length == 0) {
//                    elem = $('.mcontent > .' + id + '-sub');
//                }
//                var elemPos = 0;
//                if ($('.' + id + '-map').length != 0) {
//                    elemPos = $(this).position().top + 110;
//                } else {
//                    elemPos = elem.position().top;
//                }
//                $(window).scrollTop(elemPos - 110);
//
//                $('.manual').scrollTop(0);

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
