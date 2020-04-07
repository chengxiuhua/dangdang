!function ($) {
    const $list = $('.list');
    let array_default = [];
    let array = [];
    let prev = null;
    let next = null;
    //1.封装render函数
    function render(data) {
        let $srchtml = '<ul>';
        $.each(data, function (index, value) {
            $srchtml += `
                    <li>
                        <a href = "detail.html?sid=${value.sid}" target = "_blank">
                            <img src = "${value.url}"/>
                            <p>${value.title}</p>
                            <span>￥${value.price}</span>
                            <i>销量：${value.sail}</i>
                        </a>
                    </li>
            `;
        })
        $srchtml += '</ul>';
        $list.html($srchtml);
        //数组置空
        array_default = [];
        array = [];
        prev = null;
        next = null;
        //排序(在这里可以找到li)
        $('.list li').each(function (index, ele) {
            array[index] = $(this);
            array_default[index] = $(this);
        })
    }
    //2.默认渲染
    $.ajax({
        url: 'http://localhost/dangdang/php/list.php',
        dataType: 'json'
    }).done(function (data) {
        // console.log(data);
        render(data);
    })

    //3.要传页码给后端再渲染
    $('.page').pagination({
        pageCount: 4,
        jump: true,
        callback: function (api) {
            $.ajax({
                type: 'post',
                url: 'http://localhost/dangdang/php/list.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function (d) {
                render(d);
            })
        }
    });

    //4.排序
    $('button').eq(0).on('click', function () {
        $.each(array_default, function (index, value) {
            $('.list ul').append(value);
        });
        $(this).addClass('h_red').siblings('button').removeClass('h_red');
    })

    //封装追加函数
    function append() {
        $('.list ul').empty();
        $.each(array, function (index, value) {
            $('.list ul').append(value);
        })
    }
    //降序
    $('button').eq(1).on('click', function () {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('span:first-of-type').html().substring(1));
                next = parseFloat(array[j + 1].find('span:first-of-type').html().substring(1));
                if (prev < next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        //执行排序li
        append();
        $(this).addClass('h_red').siblings('button').removeClass('h_red');
    })

    //升序
    $('button').eq(2).on('click', function () {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('span:first-of-type').html().substring(1));
                next = parseFloat(array[j + 1].find('span:first-of-type').html().substring(1));
                if (prev > next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        //执行排序li
        append();
        $(this).addClass('h_red').siblings('button').removeClass('h_red');
    })

}(jQuery);