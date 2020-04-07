!function ($) {
    let flag1 = true;
    let flag2 = true;
    let flag3 = true;
    let flag4 = true;
    //1.用户名失去焦点
    $('.user input').on('blur',function(){
        if($('.user input').val() !== ''){
            //不为空
            $.ajax({
                type:'post',
                url:'http://localhost/dangdang/php/registry.php',
                data:{
                    xingming:$('.user input').val()
                }
            }).done(function(d){
                if(!d){
                    //如果d为空，即不存在
                    $('.user span').css({
                        color:'green'
                    }).html('√');
                    flag1 = true;
                    
                }else{
                    //d存在
                    $('.user span').css('color','red').html('用户名重复');
                    flag1 = false;
                }  
            });
        }else{
            $('.user span').css('color','red').html('用户名不能为空');
            flag1 = false;
        }      
    });

    //2.1密码得到焦点
    $('.pass input').on('focus',function(){
        $('.pass strong').html('密码为6-20个字符，可由字母/数字/下划线组成')
    })
    //2.2密码输入改变时
    $('.pass input').on('input',function(){

    })
    //2.密码失去焦点
    $('.pass input').on('blur',function(){
        if($('.pass input').val() !== ''){
            $('.pass span').css({
                color:'green'
            }).html('√');
            flag2 = true; 
        }else{
            $('.pass span').css('color','red').html('密码不能为空');
            flag2 = false;
        }      
    });
    //3.1确认密码得到焦点时
    $('.repass input').on('focus',function(){
        $('.repass strong').html('请再次输入密码')
    })
    //3.确认密码失去焦点
    $('.repass input').on('blur',function(){
        if($('.repass input').val() !== ''){
            if($('.repass input').val() === $('.pass input').val()){
                $('.repass span').css({
                    color:'green'
                }).html('√');
                $('.repass strong').html('');
                flag3 = true; 
            }else{
                $('.repass span').css({
                    color:'red'
                }).html('×');
                $('.repass strong').html('两次输入的密码不一致，请重新输入').css('color','red');

                flag3 = false; 
            }
        }else{
            $('.repass span').css('color','red').html('密码不能为空');
            flag3 = false;
        }      
    });

    //4.1邮箱得到焦点时
    $('.email input').on('focus',function(){
        $('.email strong').html('请输入用户邮箱')
    })
    //4.邮箱失去焦点
    $('.email input').on('blur',function(){
        if($('.email input').val() !== ''){

            $('.email span').css({
                color:'green'
            }).html('√');
            flag4 = true; 
        }else{
            $('.email span').css('color','red').html('邮箱不能为空');
            flag4 = false;
        }      
    });
    //5.提交限制条件
    $('form').on('submit',function(){
        if(!$('input').val()){
            $('.user span').css('color','red').html('用户名不能为空');
            $('.pass span').css('color','red').html('密码不能为空');
            $('.repass span').css('color','red').html('确认密码不能为空');
            $('.email span').css('color','red').html('邮箱不能为空');
            flag1 = false;
        }
        if(flag1 && flag2 && flag3 && flag4){
            
        }else{
            return false;
        }
    });
 }(jQuery);