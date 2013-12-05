$(document).ready(function() {
    $('.nav li').each(function(i, value) {
        if($(value).find("a").attr("href") === window.location.pathname) {
            $(value).addClass('active');
        }
    });

    $('.extra-screenshots-controls').each(function(i, value) {
        $(value).click(function() {
            $($(value).attr("href")).show();
            return false;
        });
    });
});
