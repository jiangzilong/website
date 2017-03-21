/**
 * Created by jiangzilong on 2017/3/19.
 */

$(function () {
    elemInitialize();
});

//页面元素初始化
function elemInitialize() {

    $('.overview-skill-block').each(function() {
        var percent = $(this).find('span').attr('percent') + '%';
        var el = document.createElement("span");
        $(el).addClass('overview-skill-block-percent').appendTo($(this).find('span')).animate({
            width: percent
        }, 1000);
    });

}