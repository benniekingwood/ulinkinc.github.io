/* global $,document,console,Parse */
$(document).ready(function () {
     $('a[id^="navlink"]').hover(
        function (el) {
            if (el.target.id == 'navlink-stay-in-touch') $('#navlink-text').html('<a href="#" class="navlink-text"><strong>Stay in Touch</strong></a>');
            else if (el.target.id == 'navlink-work') $('#navlink-text').html('<a href="#" class="navlink-text"><strong>Work</strong></a>');
            else if (el.target.id == 'navlink-submit-project') $('#navlink-text').html('<a href="#" class="navlink-text"><strong>Submit Your Project</strong></a>');
            else if (el.target.id == 'navlink-home') $('#navlink-text').html('<a href="#" class="navlink-text"><strong>Home</strong></a>');

        }, function () {
            $('#navlink-text').html('');
        }
    );
    
    $("button.close").on("click", function(e) {
        e.preventDefault();
        $( this ).parent().hide();
    });
    // form validation
    var validForm = function () {
        var retVal = true;
        var name = $('#name').val();
        var email = $('#email').val();
        var project = $('#project').val();

        // validate the name, email, and product fields
        if (name === undefined || name.trim() === "" || 
           email === undefined || email.trim() === "" ||
           project === undefined || project.trim() === "") {
            retVal = false;
        }
        return retVal;
    };

    try {
        var parseAPPID = "bcGAqn3tKfcGQ0POnXPTHetYjZcwcUhWbb3c5SHZ";
        var parseJSID = "e6saZzL9M96uwxJ0oxr8zdFeHmrRWSoStjQ5WRhg";

        Parse.initialize(parseAPPID, parseJSID);
        var CommentObject = Parse.Object.extend("Comment");

        $("#contactForm").on("submit", function (e) {
            e.preventDefault();
            //add error handling here
            if (!validForm()) {
                $("#alert-error").show();
                return;
            } else {
                $("#alert-error").hide();
            }

            //gather the form data
            var data = {};
            data.name = $.sanitize($("#name").val().trim());
            data.email = $.sanitize($("#email").val().trim());
            data.company = $.sanitize($("#company").val().trim());
            data.project = $.sanitize($("#project").val().trim());
            data.help = $.sanitize($("#help").val().trim());

            var comment = new CommentObject();
            comment.save(data, {
                success: function () {
                    $("#alert-success").show();
                    $('html,body').animate({
                    scrollTop: 0
                }, 500);
                },
                error: function (e) {
                    console.log(JSON.stringify(e));
                }
            });
        });
    } catch(error) {} // digest 
});

/**
 * This function will perform input sanitization function for the application
 */
(function ($) {
    $.sanitize = function (input) {
        var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
        replace(/<[\/\!]*?[^<>]*?>/gi, '').
        replace(/<style[^>]*?>.*?<\/style>/gi, '').
        replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
        return output;
    };
})(jQuery);

 $(function () {
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});