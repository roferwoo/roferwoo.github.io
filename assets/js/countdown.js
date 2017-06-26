/*
Author: Robert Hashemian
http://www.hashemian.com/

You can use this code in any manner so long as the author's
name, Web address and this disclaimer is kept intact.
********************************************************
Usage Sample:

<script language="JavaScript">
TargetDate = "12/31/2020 5:00 AM";
BackColor = "palegreen";
ForeColor = "navy";
CountActive = true;
CountStepper = -1;
LeadingZero = true;
DisplayFormat = "%%D%% Days, %%H%% Hours, %%M%% Minutes, %%S%% Seconds.";
FinishMessage = "It is finally here!";
</script>
<script language="JavaScript" src="http://scripts.hashemian.com/js/countdown.js"></script>
*/

function calcAge(secs, num1, num2) {
    s = ((Math.floor(secs / num1)) % num2).toString();
    if (LeadingZero && s.length < 2)
        s = "0" + s;
    return "<b>" + s + "</b>";
}

function CountBack(secs) {
    if (secs < 0) {
        document.getElementById("cntdwn").innerHTML = FinishMessage;
        return;
    }
    // 天 24*60*60 = 86400秒
    DisplayStr = DisplayFormat.replace(/%%D%%/g, calcAge(secs, 86400, 100000));
    // 小时
    DisplayStr = DisplayStr.replace(/%%H%%/g, calcAge(secs, 3600, 24));
    // 分
    DisplayStr = DisplayStr.replace(/%%M%%/g, calcAge(secs, 60, 60));
    // 秒
    DisplayStr = DisplayStr.replace(/%%S%%/g, calcAge(secs, 1, 60));
    // 计算年龄
    var dStart = new Date(StartDate),
        dNow = new Date();
    var t = new Date(dNow - dStart);
    document.getElementById("cntdwn").title = CountAge(t);
    document.getElementById("cntdwn").innerHTML = DisplayStr;
    if (CountActive)
        setTimeout("CountBack(" + (secs + CountStepper) + ")", SetTimeOutPeriod);
}

function putspan(backcolor, forecolor) {
    document.write("<span id='cntdwn' title='' style='background-color:" + backcolor + "; color:" + forecolor + "'></span>");
}

function CountAge(secs) {
    var c = new Date(secs);
    var age = '已活：' + (c.getFullYear() - 1970) + '年'
        + (c.getMonth()) + '个月'
        + (c.getDate() - 1) + '天'
        + c.getHours() + '小时'
        + c.getMinutes() + '分'
        + c.getSeconds() + '秒';
    return age;
}

// 背景颜色定义
if (typeof(BackColor) == "undefined")
    BackColor = "white";
// 字体颜色定义
if (typeof(ForeColor) == "undefined")
    ForeColor = "black";
// 目标日期定义
if (typeof(TargetDate) == "undefined")
    TargetDate = "12/31/2020 5:00 AM";
// 显示格式定义
if (typeof(DisplayFormat) == "undefined")
    DisplayFormat = "%%D%% Days, %%H%% Hours, %%M%% Minutes, %%S%% Seconds.";
// 统计开关设置
if (typeof(CountActive) == "undefined")
    CountActive = true;
// 结束信息定义
if (typeof(FinishMessage) == "undefined")
    FinishMessage = "";
// 统计间隔定义
if (typeof(CountStepper) != "number")
    CountStepper = -1;
// 前导0设置
if (typeof(LeadingZero) == "undefined")
    LeadingZero = true;

CountStepper = Math.ceil(CountStepper);
if (CountStepper == 0)
    CountActive = false;
var SetTimeOutPeriod = (Math.abs(CountStepper) - 1) * 1000 + 990;
putspan(BackColor, ForeColor);
var dThen = new Date(TargetDate);
var dNow = new Date();
var dDiff = 0;
if (CountStepper > 0)
    dDiff = new Date(dNow - dThen);
else
    dDiff = new Date(dThen - dNow);
gsecs = Math.floor(dDiff.valueOf() / 1000);
CountBack(gsecs);
// var dStart = new Date(StartDate);
// secs = new Date(dNow - dStart);
// CountAge(secs);
