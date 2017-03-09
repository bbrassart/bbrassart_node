(function() {
    $(document).ready(function () {
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
        mobileNavMenu.setInitialListeners();
        anchorAnimation.setInitialListeners();

        // Hide flash notification if any
        if ($('#flashMessage').length > 0) {
            $('#flashMessage').delay(5000).fadeOut('slow');
        }

    })
})();
