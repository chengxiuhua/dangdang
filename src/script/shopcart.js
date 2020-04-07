!function ($) {
    //1.取到数据库里的所有数据
    //2.取到cookie中的数据，和数据库数据根据sid进行匹配渲染
    // alert(1);
    function showlist(sid, num) {
        $.ajax({
            url: 'http://localhost/dangdang/php/shopcart.php',
            dataType: 'json'
        }).done(function (d) {
            //遍历数据库中的数据，取到sid和cookie(传来的sid)中一致的
            console.log(d);
            $.each(d, function (index, value) {
                if (sid === value.sid) {
                    let $clone_shopping_list = $('.shopping_list:hidden').clone(true, true);

                    $clone_shopping_list.find('.row_img img').attr('src', value.url);
                    $clone_shopping_list.find('.row_img img').attr('sid', value.sid);
                    $clone_shopping_list.find('.row_name p').html(value.title);
                    $clone_shopping_list.find('.row3 span').html('¥' + value.price);
                    $clone_shopping_list.find('.amount input').val(num);
                    $clone_shopping_list.find('.row4 span').html((value.price * num).toFixed(2));
                    $clone_shopping_list.css('display', 'block');
                    $('#item_list').append($clone_shopping_list);
                    calcprice();
                }
            })
        })
    }
    //showlist(1,5);//没出来结果


    //2.取到cookie中的数据，和数据库数据根据sid进行匹配渲染
    if (jscookie.get('cookiesid') && jscookie.get('cookienum')) {
        let s = jscookie.get('cookiesid').split(',');
        let n = jscookie.get('cookienum').split(',');

        //遍历cookie中的sid
        $.each(s, function (index, value) {
            showlist(s[index], n[index]);
            //得到所有cookie中的数据渲染
        })
    }

    //3.计算总价，多次利用，函数封装
    function calcprice() {
        //包括件数和总价
        let $snum = 0;
        let $sprice = 0;
        //对渲染出来的盒子进行遍历，找到被选中的，再进行取值赋值
        $('.shopping_list:visible').each(function (index, ele) {
            if ($(ele).find(':checkbox').prop('checked')) {
                //如果元素中的复选框被选中，则执行
                $snum += parseInt($(ele).find('.amount input').val());
                $sprice += parseFloat($(ele).find('.row4 span').html());
            }
        })
        $('.shopping_total_left i').html($snum);
        $('#payAmount').html('¥' + $sprice.toFixed(2));

    }

    //4.全选
    $('.allsel').on('change', function () {
        $('.shopping_list').find(':checkbox').prop('checked', $(this).prop('checked'));
        $('.allsel').prop('checked', $(this).prop('checked'));
        calcprice();
    })
    //操作列表中的复选框
    let $checkboxs = $('.shopping_list').find(':checkbox');
    $('#item_list').on('click', $checkboxs, function () {
        //$(this),委托的元素，复选框
        if ($('.shopping_list:visible').find(':checkbox').size() === $('.shopping_list').find('input:checked').size()) {
            $('.allsel').prop('checked', true);
        }
        else {
            $('.allsel').prop('checked', false);
        }
        calcprice();
    })

    //5.数量改变

    //5.1封装一个计算价格的函数
    function calcsingleprice(obj) {//obj元素对象
        let $num = parseInt(obj.parents('.shopping_list').find('.amount input').val());
        let $singleprice = parseFloat(obj.parents('.shopping_list').find('.row3 span').html());
        return ($num * $singleprice).toFixed(2);
        console.log(1);
    }
    //减
    $('.fn-count-tip .reduce').on('click', function () {
        let $newnum = parseInt($(this).parents('.shopping_list').find('.amount input').val());
        $newnum--;

        if ($newnum < 1) {
            $newnum = 1;
        }
        $(this).parents('.shopping_list').find('.amount input').val($newnum);

        calcprice();
        setcookie($(this));

    })
    //加
    $('.fn-count-tip .add').on('click', function () {
        let $newnum = parseInt($(this).parents('.shopping_list').find('.amount input').val());
        $newnum++;

        $(this).parents('.shopping_list').find('.amount input').val($newnum);
        $(this).parents('.shopping_list').find('.row4 span').html(calcsingleprice($(this)));
        calcprice();
        setcookie($(this));

    })
    //文本框输入
    $('.amount input').on('input', function () {
        let $value = $(this).val();
        let $reg = /^\d+$/g;//只能输入数字
        if (!$reg.test($value)) {
            $value = 1;
        }
        calcprice();//计算总价
        setcookie($(this));

    })

    //将改变后的val()存入到cookie中
    let arrnum = [];//需要将商品数量存cookie
    let arrsid = [];//需要将商品编号存cookie


    function getcookie() {
        if (jscookie.get('cookiesid') && jscookie.get('cookienum')) {
            arrsid = jscookie.get('cookiesid').split(',');
            arrnum = jscookie.get('cookienum').split(',');
        } else {
            arrsid = [];
            arrnum = [];
        }
    }
    function setcookie(obj) {
        getcookie();
        let $sid = obj.parents('.shopping_list').find('.row_img img').attr('sid');
        arrnum[$.inArray($sid, arrsid)] = obj.parents('.shopping_list').find('.amount input').val();
        jscookie.add('cookienum', arrnum, 10);
    }

    //6.删除
    //6.1封装一个删除cookie的函数
    function delcookie(sid, arrsid) {
        let $index = -1;
        $.each(arrsid, function (index, value) {
            if (sid === value) {
                $index = index;//将符合条件的索引给要删除的索引变量
            }
        })
        arrsid.splice($index, 1)//删除sid
        arrnum.splice($index, 1)//删除对应的数量

        jscookie.add('cookiesid', arrsid, 10);
        jscookie.add('cookienum', arrnum, 10);
    }

    //单个删除
    $('.row5 a').on('click', function () {

        getcookie();
        if (window.confirm('确定删除吗？')) {
            $(this).parents('.shopping_list').remove();
            delcookie($(this).parents('.shopping_list').find('.img').attr('sid'), arrsid)
            calcprice();//计算总价
        }
    })

    //批量删除
    $('.shopping_total_left a').on('click', function () {
        getcookie();
        alert(1);
        if (window.confirm('确定批量删除吗？')) {
            $('.shopping_list:visible').each(function () {
                if ($(this).find(':checkbox').is(':checked')) {
                    $(this).remove();
                    delcookie($(this).find('.img').attr('sid'), arrsid)
                }
            })
            calcprice();//计算总价
        }
    })

}(jQuery);