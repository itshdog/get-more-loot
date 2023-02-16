$('.tooltip').hide();

$('.item-image').hover(function() {
    var elems = this;
    var curClass = elems.className;
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    var left = elems.offsetLeft;
    var top = elems.offsetTop;
    var linkHeight = $('.' + curClass).height();
    var linkWidth = $('.' + curClass).width();
    var bottom = windowHeight - top - linkHeight;
    var right = windowWidth - left - linkWidth;
    var topbottom = (top < bottom) ? bottom : top;
    var leftright = (left < right) ? right : left;

    var tooltiph = $('#' + curClass).height();
    var tooltipw = $('#' + curClass).width();

    if (topbottom == bottom && leftright == right) {
        var yPos = top;
        var xPos = left + linkWidth + 10;
        $("#" + curClass).css("top", yPos + "px");
        $("#" + curClass).css("left", xPos + "px");
    }
    else if (topbottom == bottom && leftright == left) //done
    {
        var yPos = top;
        var xPos = right + linkWidth + 10;
        $("#" + curClass).css("top", yPos + "px");
        $("#" + curClass).css("right", xPos + "px");
    } else if (topbottom == top && leftright == right) //done
    {
        var xPos = left + linkWidth + 10;
        var yPos = top - tooltiph - (linkHeight / 2);
        $("#" + curClass).css("top", yPos + "px");
        $("#" + curClass).css("left", xPos + "px");
    } else if (topbottom == top && leftright == left) {
        var yPos = top - tooltiph - (linkHeight / 2);
        var xPos = left - tooltipw - linkWidth;
        $("#" + curClass).css("top", yPos + "px");
        $("#" + curClass).css("left", xPos + "px");
    } else {}

    $(".tooltip").fadeIn('fast');
},

function () {
    $(".tooltip").fadeOut('fast');
});