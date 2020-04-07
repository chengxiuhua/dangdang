!function ($) { 
    let $sid = location.search.substring(1).split('=')[1]//得到sid=后面的数值

        const $smallpic = $('#smallpic');
        const $bpic = $('#bpic');
        const $title = $('.loadtitle');
        const $price = $('.loadpcp');

        //1.将sid传给后端
        $.ajax({
            url: 'http://localhost/dangdang/php/detail.php',
            data: {
                sid: $sid
            },
            dataType: 'json'
        }).done(function (d) {
            console.log(d);
            $smallpic.attr('src', d.url);
            $smallpic.attr('sid', d.sid);
            $bpic.attr('src', d.url);
            $title.html(d.title);
            $price.html(d.price);

            console.log(d.piclisturl.split(','));//将小图渲染出来
            let $picarr = d.piclisturl.split(',');
            let $srchtml = '';
            $.each($picarr, function (index, value) {
                $srchtml += `
                        <li>
                            <img src="${value}">
                        </li>
                `
            });
            $('#list ul').html($srchtml);
        })

        //2.放大镜
        const $spic = $('#spic')//小图的盒子
        const $sf = $('#sf')//小放盒子
        const $bf = $('#bf')//大放盒子
        //$bpic 大图，上面定义过

        //计算小放的尺寸和比例,小放/大放 = 小图 / 大图
        $sf.width($spic.width() * $bf.width() / $bpic.width());
        $sf.height($spic.height() * $bf.height() / $bpic.height());
        const $bili = $bf.width() / $sf.width();

        $spic.hover(function () {
            $sf.css('visibility', 'visible');
            $bf.css('visibility', 'visible');
            $(this).on('mousemove', function (ev) {

                let $leftvalue = ev.pageX - $('.goodsinfo').offset().left - $sf.width() / 2;
                let $topvalue = ev.pageY - $('.goodsinfo').offset().top - $sf.height() / 2;

                //限定条件:宽
                if ($leftvalue < 0) {
                    $leftvalue = 0;
                } else if ($leftvalue > $spic.width() - $sf.width()) {
                    $leftvalue = $spic.width() - $sf.width();
                }
                //限定条件:高
                if ($topvalue < 0) {
                    $topvalue = 0;
                } else if ($topvalue > $spic.height() - $sf.height()) {
                    $topvalue = $spic.height() - $sf.height();
                }

                //给小放和大图赋值
                $sf.css({
                    left: $leftvalue,
                    top: $topvalue
                });
                $bpic.css({
                    left: -(ev.pageX - $('.goodsinfo').offset().left - $sf.width() / 2) * $bili,
                    top: -(ev.pageY - $('.goodsinfo').offset().top - $sf.height() / 2) * $bili
                });

            })
        }, function () {
            $sf.css('visibility', 'hidden');
            $bf.css('visibility', 'hidden');
        });

        //3.小图切换
        $('#list ul').on('mouseover', 'li', function () {
            //$(this):当前操作的li
            let $imgurl = $(this).find('img').attr('src');
            $smallpic.attr('src', $imgurl);
            $bpic.attr('src', $imgurl);
        });

        //4.左右箭头
        let $num = 6;//可视的小图数
        const $left = $('#left');//左箭头
        const $right = $('#right');//右箭头


        $right.on('click', function () {
            let $lists = $('#list ul li');
            console.log($lists.size());//8
            if ($lists.size() > $num) {
                $num++;
                $left.css('color', '#333');
                if ($lists.size() == $num) {
                    $right.css('color', '#fff');
                }
                $('#list ul').animate({
                    left: -($num - 6) * $lists.eq(0).outerWidth(true)//向左移(num-6)个li的宽度
                });

            }
        })
        $left.on('click', function () {
            let $lists = $('#list ul li');
            
            if ($num >6 ) {
                $num--;
                $right.css('color', '#333');
                if ($num == 6) {
                    $left.css('color', '#fff');
                }
                $('#list ul').animate({
                    left: -($num - 6) * $lists.eq(0).outerWidth(true)//向左移(num-6)个li的宽度
                });

            }
        })

        //5.加购物车
        let $arrnum = [];//需要将商品数量存cookie
        let $arrsid = [];//需要将商品编号存cookie

        
        function getcookie(){
            if(jscookie.get('cookiesid') && jscookie.get('cookienum')){
                $arrsid = jscookie.get('cookiesid').split(',');
                $arrnum = jscookie.get('cookienum').split(',');
            }else{
                $arrsid = [];
                $arrnum = [];
            }
        }
        $('.p-btn a').on('click',function(){
            let $goodsid = $(this).parents('.goodsinfo').find('#smallpic').attr('sid');
           
            //判断是第一次点击还是非第一次点击
            getcookie();
            if($.inArray($goodsid,$arrsid) != -1){//该商品已存在cookie中
                let $newnum = parseInt($arrnum[$.inArray($goodsid,$arrsid)]) + parseInt($('#count').val());
                $arrnum[$.inArray($goodsid,$arrsid)] = $newnum;
                jscookie.add('cookienum',$arrnum,10)
            }else{//商品不存在，第一次添加
                $arrsid.push($goodsid);
                jscookie.add('cookiesid',$arrsid,10);
                $arrnum.push($('#count').val());
                jscookie.add('cookienum',$arrnum,10);
            }

        })
}(jQuery);