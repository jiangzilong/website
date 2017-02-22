/**
 * Created by Administrator on 2017/2/16.
 */

var colors = ["#ED5565", "#FC6E51", "#FFCE54", "#2ECC71", "#4FC1E9", "#8067B7", "#A0D468", "#48CFAD", "#5D9CEC", "#AC92EC", "#EC87C0"];
var previous = 0;

$(function () {
    elemInitialize();
    functionBind();
});

//页面元素初始化
function elemInitialize() {
    //resume数据
    $.getJSON("data/resume.json",function(data){
        $.each(data,function (name,val) {
            addResume(val);
        });
    });

    //timeline数据
    $.getJSON("data/timeline.json",function(data){
        $.each(data,function (name,val) {
            addTimline(val);
        });
    });
}
//功能绑定
function functionBind() {
    //鼠标移动事件触发眼球转动
    $(document).mousemove(function (e) {
        var x = e.pageX - 50,
            y = e.pageY - 50,
            winW = $(window).width(),
            winH = $(window).height(),
            a = Math.PI - Math.atan2(x,y),
            d = Math.sqrt(Math.pow(x,2) + Math.pow(y,2)),
            mD = Math.sqrt(Math.pow(winW - 50,2) + Math.pow(winH - 50,2)),
            pupilTransX = 18 * x/winW,
            pupilTransY = 18 * y/winH,
            pupilSize = 12 - d * 3/mD;
        if(pupilSize < 6) pupilSize = 6;
        if(pupilTransX > 18) pupilTransX = 18;
        if(pupilTransY > 18) pupilTransY = 18;

        $(".header-eye-ball-pupil").css("height", pupilSize + 'px').css("width", pupilSize + 'px');
        $(".header-eye-ball-pupil").css("transform", 'translate(' + pupilTransX + 'px,' + pupilTransY + 'px)');

    }).mouseleave(function() {
        $(".header-eye-ball-pupil").css("height", '12px').css("width", '12px');
        $(".header-eye-ball-pupil").css("transform", 'translate(0px,0px)');
    });
    //眼球点击事件触发变色
    $(".header-eye-ball").click(
        function(){
            var index = random(0, colors.length-1);
            while(index == previous){
                index = random(0, colors.length-1);
            }
            previous = index;
            $(".header-eye").append('<div class="header-eye-skin" style="background-color:'+colors[index]+';"></div>');
        }
    );
}
//生成随机数
function  random(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}



//简历添加函数
function addResume(json) {
    var id = json.resumeId;
    var data = json.resumeData;
    $(data).each(function (i, val) {
        addResumeItem(id, val);
    });
}
//时间轴添加函数
function addTimline(json) {
    var id = json.timelineId;
    var data = json.timelineData;
    $(data).each(function (i, val) {
        addTimlineItem(id, val);
    });
}
//resume模板
function addResumeItem(id, itemData){
    var templet = '<li>\
                     <i class="fa fa-'+ itemData.icon +'""></i>\
                     <label>'+ itemData.title +'</label>\
                     <span>'+ itemData.value +'</span>\
                   </li>';
    $("#" + id + " .resume-content-des").append(templet);
}
//block模板
function addTimlineItem(id, itemData){
    var templet = '<div class="timeline-block">\
                     <div class="timeline-block-mark"><i class="fa fa-'+ itemData.mark +'"></i></div>\
                     <div class="timeline-block-content">\
                         <div class="timeline-block-content-title">\
                         '+ itemData.title +'\
                         </div>\
                         <div class="timeline-block-content-text">\
                             '+ itemData.text +'\
                         </div>\
                         <a class="timeline-block-content-more" href="'+ itemData.link +'" target="_blank">查看详情</a>\
                         <span class="timeline-block-content-time">'+ itemData.time +'</span>\
                     </div>\
                   </div>';
    $("#" + id).append(templet);
}