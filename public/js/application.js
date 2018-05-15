(function() {
    $(document).ready(function () {

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

      var anchorAnimation = {
        setInitialListeners: function() {
          $('a[href*="#"]:not([href="#"])').click(function() {

            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
              && location.hostname == this.hostname) {
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
              if (target.length) {
                $('html, body').animate({
                  scrollTop: target.offset().top
                }, 1000);
                window.location.hash = this.hash;
                return false;
              }
            }
          });
        }
      };
      mobileNavMenu.setInitialListeners();
      anchorAnimation.setInitialListeners();
      // Hide flash notification if any
      if ($('#flashMessage').length > 0) {
         $('#flashMessage').delay(5000).fadeOut('slow');
      }
    })
})();
