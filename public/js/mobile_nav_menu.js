var mobileNavMenu = {
    setInitialListeners: function() {
        $("select").change(function() {
            var uri = $(this).find("option:selected").val();
            if (navigator.userAgent.match(/Android/i))
                document.location = uri;
            else
                window.location = uri;
        });
    }
};