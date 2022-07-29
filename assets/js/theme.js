$(window).on('load', function () {
    // Page Loader
    setTimeout(function () {
      $(".overlay, body").addClass("loaded");
    }, 1000);

    // Will remove overlay after 1min for users cannot load properly.
    setTimeout(function () {
      $(".overlay").css({ display: "none" });
    }, 2000);
  })
  $(document).ready(function () {
    const url = "http://farmhouse.timetrackpk.com/api/FrontEnd/";
    var res = $.get(
      url + "FrontEndSilderImages?companyid=1",
      function (data, status) {
        let silderadata = "";
        $.map(data, function (val, i) {
          if (val.image !== "") {
            silderadata += '<div class="videos">';
            silderadata +=
              '<img title="Advertisement" src="data:image/png;base64,' +
              val.image + '"/>';
            silderadata += '<div class="container">';
            silderadata += '<div class="video_overlay">';
            silderadata += "<h1>" + val.unit_name + "</h1>";
            if (val.description !== null) {
              silderadata += "<p>" + val.description + "</p>";
            }
            silderadata += "</div>";
            silderadata += "</div>";
            silderadata += "</div>";
          }
        });
        // $("#home").append(silderadata);
        $(".video_slider").slick({
          infinite: true,
          draggable: true,
          speed: 2000,
          prevArrow:
            '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"><img src="./assets/images/left-arrow.svg" alt="left arrow"/></button>',
          nextArrow:
            '<button class="slick-next slick-arrow" aria-label="Next" type="button"><img src="./assets/images/right-arrow.svg" alt="right arrow"/></button>',
        });
      }
    );

    $.get(url + "FarmAmenties?companyid=1", function (data, status) {
      let amenity = "";
      $.map(data, function (val, i) {
        if (val.image !== null) {
          amenity += ' <div class="col-md-6 ">';
          amenity += ' <div class="unit">';
          amenity += ' <div class="gallery-wrap">';
          amenity +=
            '<img src="data:image/png;base64,' +
            val.image +
            '" class="img-fluid " alt="">';
          amenity += "</div>";
          amenity += '<div class="gallery-disc">';
          amenity += '<h3 class="h4">Description</h3>';
          if (val.description !== null) {
            amenity += "<p>" + val.description + "</p>";
          }
          else {
            amenity += "<p>No Description</p>";
          }
          amenity += "";
          amenity += '<h3 class="h4">' + val.unit_name + "</h3>";
          amenity += "<ul>";
          $.map(val.amenities, function (v, ii) {
            amenity += "<li>" + v.amenityName + "</li>";
          });
          amenity += "";
          amenity += "</ul>";
          amenity +=
            ' <div class="btn-gallery"><a href="gallery.html?unit=' + val.unitId + '&company=' + val.company_id + '">View More</a></div>';
          amenity += "</div>";
          amenity += "</div>";
          amenity += "</div>";
        }
      });
      $("#Amenities").append(amenity);
      // Gallery section slide
      $('.gallery-slider').on("init", function (event, slick) {
        $('.loading').fadeOut();
        var str = $('.gallery-disc p');
        str.each(function (value, index) {
          var strLength = str.text();
          if (strLength.length > 120) {
            var item = strLength.substring(0, 120);
          }
        })
      });
      $(".gallery-slider").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 4000,
        prevArrow:
          '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"><img src="./assets/images/left-arrow.svg" alt="left arrow"/></button>',
        nextArrow:
          '<button class="slick-next slick-arrow" aria-label="Next" type="button"><img src="./assets/images/right-arrow.svg" alt="right arrow"/></button>',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            },
          },
        ],
      }).on('setPosition', function (event, slick) {
        slick.$slides.css('height', slick.$slideTrack.height() + 'px');
      });
    });
  });

  $(".hamburger").click(function () {
    $(this).addClass("open");
    $(".navbar-collapse").addClass("show");
  });
  $(".cross").click(function () {
    $(".hamburger").removeClass("open");
    $(".navbar-collapse").removeClass("show");
  });

  // section scroll animated
  $('[href^="#"]').click(function () {
    var sidebarId = $(this).attr("href");
    var nav = $("header").outerHeight();
    var navEle = nav + 40;
    $("html, body").animate(
      { scrollTop: $(sidebarId).offset().top - navEle },
      1000
    );
  });
  $(".nav-item").click(function () {
    $(this).parent().find("li").removeClass("active");
    $(this).addClass("active");
  });
  // Sticky Header
  setTimeout(function () {
    var videoSlider = $(".video_slider").outerHeight();
    var nav = $("header").outerHeight();
    $(window).scroll(function () {
      if ($(this).scrollTop() > videoSlider) {
        $("body").addClass("headerFixed");
        $("main").css("paddingTop", nav);
      } else {
        $("body").removeClass("headerFixed");
        $("main").css("paddingTop", "0");
      }
    });
  }, 1000);
  AOS.init({ once: true });
  // Form Validation
  const form = document.getElementById("contact_form");
  const username = document.getElementById("name");
  const email = document.getElementById("email");
  const Phone = document.getElementById("phone");
  const message = document.getElementById("message");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (checkInputs()) {
      request = $.ajax({
        url: "http://farmhouse.timetrackpk.com/api/FrontEnd/AddContactus",
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        data: JSON.stringify({ name: username.value, email: email.value, phone: phone.value, message: message.value, companyid: 1 }),
      });

      // Callback handler that will be called on success
      request.done(function (response, textStatus, jqXHR) {
        // Log a message to the console
        alert("Your Request has submited")
      });

      // Callback handler that will be called on failure
      request.fail(function (jqXHR, textStatus, errorThrown) {
        // Log the error to the console
        alert("Error while submiting request")
      });
    }
  });

  function checkInputs() {
    // trim to remove the whitespace
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    usernameValue === ""
      ? setErrorFor(username, "Username cannot be blank")
      : setSuccessFor(username);
    emailValue === ""
      ? setErrorFor(email, "Email cannot be blank")
      : !isEmail(emailValue)
        ? setErrorFor(email, "Not a valid email")
        : setSuccessFor(email);
    if (username === "" || emailValue === "") {
      return false;
    }
    return true;
  }
  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-group error";
    small.innerText = message;
  }

  function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-group success";
  }

  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }


 