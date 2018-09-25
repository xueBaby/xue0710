
    //清除浏览器默认样式
    document.addEventListener('touchstar',function(event){
        event.preventDefault();
    });

    //点透
    !(function(){
        var aNodes = document.querySelectorAll('a');
        for(var i = 0; i < aNodes.length; i++){
            aNodes[i].addEventListener('touchstart',function(){
                window.location.href = this.href;
            })
        }
    })();

    //rem适配
    !(function(){
        var width = document.documentElement.clientWidth;
        var styleNode = document.createElement('style');
        styleNode.innerHTML = 'html{font-size:'+width/23+'px !important;}';
        document.head.appendChild(styleNode);
    })();


    window.onload = function(){

        //导航
       navBind();
       function navBind(){
           //获取元素 nav 和ul 给nav绑定事件 改变ul的left的值
           var navUlNode = document.querySelector('.content .contentNav .navList');
           var contentNav = document.querySelector('.content .contentNav ');

           var startX = 0;
           var eleX = 0;
           contentNav.addEventListener('touchstart',function(event){
               var touch = event.changedTouches[0];
               startX = touch.clientX;
               eleX = navUlNode.offsetLeft;

           });
           contentNav.addEventListener('touchmove',function(event){
               var touch = event.changedTouches[0];
               var endX = touch.clientX;
               var disX = endX - startX;
               var positionEnd = eleX+disX;
               if(positionEnd > 0){
                   positionEnd = 0;
               }else if(positionEnd < document.documentElement.clientWidth - navUlNode.offsetWidth){
                   positionEnd = document.documentElement.clientWidth - navUlNode.offsetWidth;
               }
               //left动需要设置定位
               navUlNode.style.left = positionEnd + 'px';

           })

       }
        //轮播图
        bannerBind();
        function  bannerBind(){
            //获取图片元素
           var contentBanner = document.querySelector('.content .contentBanner ');
           var bannerUlNode = document.querySelector('.contentBanner .banList');
                //此时一共有5+5张图片 设置完图片才能获取li
            bannerUlNode.innerHTML += bannerUlNode.innerHTML;
           var bannerLiNodes = document.querySelectorAll('.contentBanner .banList li');

           var styleNode = document.querySelector('style');
            styleNode.innerHTML = '.contentBanner{width:'+bannerLiNodes[0].offsetWidth+'px}';
            styleNode.innerHTML += '.contentBanner .banList{width:'+bannerLiNodes.length+'00%;}';
            styleNode.innerHTML += '.contentBanner .banList li{width:'+100/bannerLiNodes.length+'%;}';
           document.head.appendChild(styleNode);

            //获取小圆点元素
           // var icon = document.querySelector('.contentBanner .icon');
           var spanNodes = document.querySelectorAll('.contentBanner .icon > span');

           //nowIndex
           var nowIndex = 0;
           //定时器
           var timer = null;

           //图片移动
           var startX = 0;
           var eleX = 0;
            contentBanner.addEventListener('touchstart',function(event){
                //清除定时器
                clearInterval(timer);
                //清除过渡
                bannerUlNode.style.transition = 'none';
                //无缝
                if(nowIndex === 0){
                    nowIndex = spanNodes.length;
                }else if(nowIndex === bannerLiNodes.length ){
                    nowIndex = spanNodes.length - 1;
                }
                bannerUlNode.style.left = -nowIndex*document.documentElement.clientWidth;
                    //手指起始位置
                var touch = event.changedTouches[0];
                startX =touch.clientX;
                eleX = bannerUlNode.offsetLeft;

            });
            contentBanner.addEventListener('touchmove',function(event){
                var touch = event.changedTouches[0];
                var endX = touch.clientX;
                var disX = endX - startX ;
                var positionEnd = disX + eleX;
                bannerUlNode.style.left = positionEnd+'px';


            });
            contentBanner.addEventListener('touchend',function() {

                bannerUlNode.style.transition = 'left 1s';
                if (nowIndex < 0) {
                    nowIndex = 0;
                    //跳转时清除过渡
                } else if (nowIndex > bannerLiNodes.length - 1) {
                    nowIndex = bannerLiNodes.length - 1;
                }
                bannerUlNode.style.left = -nowIndex * document.documentElement.clientWidth +'px';
                // 调用无缝轮播
                autoBind();
            });
            //无缝轮播
            autoBind();
            function autoBind(){

                timer = setInterval(function(){

                    if(nowIndex === 9){
                        nowIndex = 4;
                        //跳转时清除过渡
                        bannerUlNode.style.transition = 'none';
                        bannerUlNode.style.left = -nowIndex*document.documentElement.clientWidth+'px';
                    }
                    setTimeout(function(){//设置setTimeout为20ms是为了使上面清除过渡不被下面的0.5s覆盖
                        nowIndex ++;
                        bannerUlNode.style.transition = '0.5s';
                        bannerUlNode.style.left = -nowIndex*document.documentElement.clientWidth + 'px';

                        //小圆点
                        for(var i = 0;i<spanNodes.length;i++){
                            spanNodes[i].className = '';
                        }
                        spanNodes[nowIndex%spanNodes.length].className = 'active';

                    },30)



                },1000)

            }









        }




    }
