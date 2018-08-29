jQuery(document).ready(function($) {
$("a[href*='http://']:not([href*='"+location.hostname+"']),[href*='https://']:not([href*='"+location.hostname+"'])")
    .addClass("external")
    .attr("target","_blank");


    $("body").delegate(".go-down, .scroll","click",function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
    });
});

var
$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'),
comments_order = 'DESC',
list  = '.comment-list',
replyer  = '.comment-reply',
former   = '#comment-form',
respond        = '.respond',
textarea       = '.textarea',
submiter     = '#postComments',
newId = '', parentId = '';

$(function(){
    /*
    if(is_pc()){
        $(document).scroll(function(){
            heightToTop = document.body.offsetHeight;
            scrollDistance = document.body.scrollTop;
            xhpercent = scrollDistance / heightToTop * 10 / 2;
            if(scrollDistance <= heightToTop){
                $(".banner").css({"-webkit-filter":"blur("+xhpercent+"px)","-moz-filter":"blur("+xhpercent+"px)","filter":"progid:DXImageTransform.Microsoft.Blur(PixelRadius="+xhpercent+",MakeShadow=false)","filter":"blur("+xhpercent+"px)"});
            }
        });
    }
    */
    var navH = $("#divider").offset().top;
    $(window).scroll(function() {
        var scroH = $(this).scrollTop();
        if (scroH >= navH) {
            $("#head-menu").removeClass('banner-notfade');
        } else if (scroH < navH) {
            $("#head-menu").addClass('banner-notfade');
        }
    });
    var menuMargin = $("#header-nav").width()*1.5;
    if(!is_pc()) $("#header-nav").animate({marginRight:-menuMargin},0);

    $("#search-input").click(function(e){
        e.preventDefault();
    });
    var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    $("body").delegate("#load-more","click",function(event) {
        $(this).hide();
        $('#loading').show();
        $.ajax({
            type: 'get',
            url: SITE.default_url + '/page/' + parseInt(page + 1)+'/?loadmore=true',
            success: function(data, textStatus, XMLHttpRequest) {
                page++;
                $('#art-container').append(data);
                $('#loading').hide();
                $('#load-more').show();
            },
            error: function(MLHttpRequest, textStatus, errorThrown) {
                $('#loading').hide();
            //$.jGrowl('Network Error');
          }
        });
    });
    $("#display-links").click(function(){
        if(!is_pc()){
            if($("#header-nav").css('margin') == '0px'){
                if(!is_pc()) {$(".title").animate({marginLeft:"200px"},200,function(){
                    $("#header-nav").animate({marginRight:-menuMargin});
                });}
                    else
                        $("#header-nav").animate({marginRight:-menuMargin});
                }
                else{
                    if(!is_pc())
                        $(".title").animate({"marginLeft":-menuMargin*2},400,function(){
                            $("#header-nav").animate({marginRight:"0px"});
                        });
                    else
                        $("#header-nav").animate({marginRight:"0px"});
                }
            }
        });
    /*
    $("#content .article-title a").hover(function(){
        $(this).parents('.article-title').find('.link-border').animate({width:"100%"});
    },function(){
        $(this).parents('.article-title').find('.link-border').animate({width:"0%"});
    });
    */
    $("body").delegate("#content .article-title a","mouseover",function(){
        $(this).parents('.article-title').find('.link-border').animate({width:"100%"});
    });
    $("body").delegate("#content .article-title a","mouseleave",function(){
        $(this).parents('.article-title').find('.link-border').animate({width:"0%"});
    });
    $(".to-top").click(function(){
        $("html,body").animate({scrollTop: 0},1000);
    });
});
function loadFinish(){
    $("#loading").fadeOut(function(){
        $(".banner-border-top").animate({marginLeft:"0px"},1000);
        $(".banner-border-bottom").animate({marginLeft:"0px"},1000);
    });

}
$(function(){
    $("body").delegate("#edit-my-profile","click",function(){
        $(".info-has-entered").fadeOut(function(){
            $(".comment-info").fadeIn();
        });
    });
});
jQuery.fn.animateAuto = function(prop, speed, callback){
    var elem, height, width;
    return this.each(function(i, el){
        el = jQuery(el), elem = el.clone().css({"height":"auto","width":"auto"}).appendTo("body");
        height = elem.css("height"),
        width = elem.css("width"),
        elem.remove();

        if(prop === "height")
            el.animate({"height":height}, speed, callback);
        else if(prop === "width")
            el.animate({"width":width}, speed, callback);
        else if(prop === "both")
            el.animate({"width":width,"height":height}, speed, callback);
    });
}
function is_pc() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
jQuery(document).ready(function($) {
    $("body").delegate(".go-down, .scroll","click",function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
    });
});
$(function(){
    /*
    if(is_pc()){
        $(document).scroll(function(){
            heightToTop = document.body.offsetHeight;
            scrollDistance = document.body.scrollTop;
            xhpercent = scrollDistance / heightToTop * 10 / 2;
            if(scrollDistance <= heightToTop){
                $(".banner").css({"-webkit-filter":"blur("+xhpercent+"px)"});
            }
        });
    }
    */
    var navH = $("#divider").offset().top;
    $(window).scroll(function() {
        var scroH = $(this).scrollTop();
        if (scroH >= navH) {
            $("#head-menu").removeClass('banner-notfade');
        } else if (scroH < navH) {
            $("#head-menu").addClass('banner-notfade');
        }
    });
    var menuMargin = $("#header-nav").width()*1.5;
    if(!is_pc()) $("#header-nav").animate({marginRight:-menuMargin},0);
    function searchDisplay(){
        $("#search-input").animate({width:"0px"});
        $("body").removeClass("search-open");
    }

    $("#search-input").click(function(e){
        e.preventDefault();
    });
    var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    $("body").delegate("#load-more","click",function(event) {
        $(this).hide();
        $('#loading').show();
        $.ajax({
            type: 'get',
            url: SITE.default_url + '/page/' + parseInt(page + 1)+'/?loadmore=true',
            success: function(data, textStatus, XMLHttpRequest) {
                page++;
                $('#art-container').append(data);
                $('#loading').hide();
                $('#load-more').show();
            },
            error: function(MLHttpRequest, textStatus, errorThrown) {
                $('#loading').hide();
            //$.jGrowl('Network Error');
          }
        });
    });
    $("#display-links").click(function(){
        if(!is_pc()){
            if($("#header-nav").css('margin') == '0px'){
                if(!is_pc()) {$(".title").animate({"marginLeft":"0px"});}
                $("#header-nav").animate({marginRight:-menuMargin});
            }
            else{
                if(!is_pc())
                    $(".title").animate({"marginLeft":-menuMargin*2},400,function(){
                        $("#header-nav").animate({marginRight:"0px"});
                    });
                else
                    $("#header-nav").animate({marginRight:"0px"});
            }
        }
    });
    /*
    $("#content .article-title a").hover(function(){
        $(this).parents('.article-title').find('.link-border').animate({width:"100%"});
    },function(){
        $(this).parents('.article-title').find('.link-border').animate({width:"0%"});
    });
    */
    $("body").delegate("#content .article-title a","mouseover",function(){
        $(this).parents('.article-title').find('.link-border').animate({width:"100%"});
    });
    $("body").delegate("#content .article-title a","mouseleave",function(){
        $(this).parents('.article-title').find('.link-border').animate({width:"0%"});
    });
    $(".to-top").click(function(){
        $("html,body").animate({scrollTop: 0},1000);
    });
});
function loadFinish(){
    $("#loading").fadeOut(function(){
        $(".banner-border-top").animate({marginLeft:"0px"},1000);
        $(".banner-border-bottom").animate({marginLeft:"0px"},1000);
    });

}
$(function(){
    $("body").delegate("#edit-my-profile","click",function(){
        $(".info-has-entered").fadeOut(function(){
            $(".comment-info").fadeIn();
        });
    });
});
jQuery.fn.animateAuto = function(prop, speed, callback){
    var elem, height, width;
    return this.each(function(i, el){
        el = jQuery(el), elem = el.clone().css({"height":"auto","width":"auto"}).appendTo("body");
        height = elem.css("height"),
        width = elem.css("width"),
        elem.remove();

        if(prop === "height")
            el.animate({"height":height}, speed, callback);
        else if(prop === "width")
            el.animate({"width":width}, speed, callback);
        else if(prop === "both")
            el.animate({"width":width,"height":height}, speed, callback);
    });
}
function is_pc() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

$(document).ready(function(){
    $('.banner').height($(window).height());

    $('[id=post-view]').each(function(){
        url = 'https://work.prinzeugen.net/count/index.php?action=get&slug='+$(this).attr('data').slice(1,-1);
        var span = $(this);
        $.getJSON(url, function(data) {
            span.html(data.count);
        });
    });
});
