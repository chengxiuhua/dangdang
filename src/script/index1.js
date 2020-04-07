!function ($) {
    //1.顶部悬浮
    $(window).on('scroll', function () {
        //滚动条距离>700px的时候将盒子的top值改为0
        // console.log($(window).scrollTop());
        if ($(window).scrollTop() >= 700) {
            $('#wrap-content').find('.top_float').stop(true).animate({
                top: 0
            });
        } else {
            $('#wrap-content').find('.top_float').stop(true).animate({
                top: -52
            });
        }
    })

    //2.大轮播图

    //2.1小圆圈移入事件
    let $index = 0;
    $('.lunbo_roll li').each(function (index, ele) {
        $('.lunbo_roll li').eq(index).on('mouseover', function () {
            $index = index;
            show();
        })
    })

    //2.2点击箭头事件
    $('.btn_right').on('click', function () {
        $index++;
        if ($index > $('.lunbo_roll li').size() - 1) {
            $index = 0;
        }
        show();
    })

    $('.btn_left').on('click', function () {
        $index--;
        if ($index < 0) {
            $index = ($('.lunbo_roll li').size() - 1);
        }
        show();
    })

    //2.3自动轮播
    let timer = setInterval(function () {
        $('.btn_right').click();
    }, 3000);
    //2.4箭头显示消失
    $('.lunbo').hover(function () {
        $('.btn_left').stop(true).animate({
            left: 0
        });
        $('.btn_right').stop(true).animate({
            right: 0
        });
        clearInterval(timer);
    }, function () {
        $('.btn_left').stop(true).animate({
            left: -35
        });
        $('.btn_right').stop(true).animate({
            right: -35
        });
        timer = setInterval(function () {
            $('.btn_right').click();
        }, 3000);
    })

    //2.5封装一个动画的函数
    function show() {
        $('.lunbo_roll li').eq($index).addClass('on').siblings('li').removeClass('on');//显示背景色
        $('.lunbo_img li').eq($index).stop(true).animate({
            opacity: 1
        }).siblings('li').stop(true).animate({
            opacity: 0
        });//显示对应的画面
    }

    //3.右侧注意tab切换
    $('.tab_list li').on('mouseover', function () {
        $(this).addClass('on').siblings('li').removeClass('on');
        $('.neirong .nr').eq($(this).index()).show().siblings('ol').hide();

    })

    //4.小幻灯片


    //4.1小圆圈点击事件
    let $index1 = 0;
    let $num = 0;
    $('.notice_roll_qq li').each(function (index, ele) {
        $('.notice_roll_qq li').eq(index).on('click', function () {
            $index1 = index - 1;
            $num = //左移的尺寸
                show1();
        });
    })

    //4.2箭头点击事件
    $('.arrow_r').on('click', function () {
        show1();
    })
    $('.arrow_l').on('click', function () {
        $index1 -= 2;
        show1();
    })

    //4.3自动轮播
    let timer1 = setInterval(function () {
        $('.arrow_r').click();
    }, 3000);

    //4.4箭头显示消失
    $('.notice_roll').hover(function () {
        $('.arrow_l').stop(true).animate({
            left: 0
        });
        $('.arrow_r').stop(true).animate({
            right: 0
        });
        clearInterval(timer1);
    }, function () {
        $('.arrow_l').stop(true).animate({
            left: -35
        });
        $('.arrow_r').stop(true).animate({
            right: -35
        });
        timer1 = setInterval(function () {
            $('.arrow_r').click();
        }, 3000);
    })
    //4.5封装动画函数
    function show1() {
        $index1++;//右箭头作用
        if ($index1 === $('.notice_roll_qq li').size() + 1) {
            $index1 = 1;
            $('.notice_roll_lunbo').css('left', '0');
            //如果该显示第二张，则索引为1，起始位置是0，经过下面的动画再左移一个宽度到第二张图
        }

        if ($index1 < 0) {
            $index1 = $('.notice_roll_qq li').size() - 1;
            let $allwidth = $('.notice_roll_qq li').size() * $('.notice_roll_lunbo li').width();
            $('.notice_roll_lunbo').css('left', -$allwidth);
            //如果该显示最后一张，则索引为最后一张的索引，起始位置是后补图的位置，再经过动画到最后一张图
        }

        //经过上述的index赋值，再来判断是否是后补图，若是第一个小圆圈red，若不是则正常red
        if ($index1 === $('.notice_roll_qq li').size()) {
            $('.notice_roll_qq li').eq(0).addClass('red').siblings('li').removeClass('red');

        } else {
            $('.notice_roll_qq li').eq($index1).addClass('red').siblings('li').removeClass('red');
        }

        //经过所有上述的判断，确定了index值，然后再执行动画
        $('.notice_roll_lunbo').stop(true).animate({
            left: -$('.notice_roll_lunbo li').width() * $index1
        });

        //5.二级菜单鼠标移入显示对应的块（tab切换）
        //5.1移入菜单
        $('.left_nav_box li').hover(function () {
            $(this).addClass('li_border').siblings('li').removeClass('li_border');
            $('.nav_content').css('display', 'block');
            $('.nav_content_li').eq($(this).index()).show().siblings('.nav_content_li').hide();

        }, function () {
            $('.left_nav_box li').removeClass('li_border');
            $('.nav_content').css('display', 'none');
        })
        //5.2移入对应的内容块
        $('.nav_content').hover(function () {
            $('.left_nav_box li').eq($(this).index()).addClass('li_border').siblings('li').removeClass('li_border');
            $(this).show();
        }, function () {
            $(this).hide();
            $('.left_nav_box li').removeClass('li_border');
        })

        //6.楼梯



        //7.登录成功获取cookie
        if(jscookie.get('username')){
            $('.header_tools_welcome').find('a:first-of-type').html(jscookie.get('username'));
            $('.header_tools_welcome').find('i').text('欢迎光临当当，欢迎')
        }

        

    }




}(jQuery);