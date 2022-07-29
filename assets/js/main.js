$(document).ready(function () {
  const url = "http://192.168.0.116:2020/api/FrontEnd/";
  var res = $.get(
    url + "FrontEndSilderImages?companyid=1",
    function (data, status) {
      let silderadata = "";
     // console.log(data);
      $.map(data, function (val, i) {
        if (val.image !== "") {
          silderadata += '<div class="videos">';
          silderadata +=
            '<img title="Advertisement" src="data:image/png;base64,' +
            val.image +
            '"/>';
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
      $("#home").append(silderadata);
      $(".video_slider").slick({
        infinite: true,
        draggable: false,
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
    // console.log(data);
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
        else
        {
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
          ' <button class="btn-gallery"><a href="gallery.html?unit='+val.unitId+'&company='+val.company_id+'">View More</a></button>';
        amenity += "</div>";
        amenity += "</div>";
        amenity += "</div>";
      }
    });
    $("#Amenities").append(amenity);
    // Gallery section slide
    $(".gallery-slider").slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
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
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });
  });

  // $('#gallery_lightbox').lightGallery();

  // Tilt effect
  // $(".gallery_img").tilt({
  //   maxTilt: 15,
  //   perspective: 800,
  //   easing: "cubic-bezier(.03,.98,.52,.99)",
  //   speed: 1200,
  //   glare: true,
  //   maxGlare: 0.2,
  //   scale: 1
  // });

  $(".hamburger").click(function () {
    $(this).addClass("open");
    $(".navbar-collapse").addClass("show");
  });
  $(".cross").click(function () {
    $(".hamburger").removeClass("open");
    $(".navbar-collapse").removeClass("show");
  });

  // Page Loader
  setTimeout(function () {
    $(".overlay, body").addClass("loaded");
  }, 2000);

  // Will remove overlay after 1min for users cannot load properly.
  setTimeout(function () {
    $(".overlay").css({ display: "none" });
  }, 4000);

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
  $("ul.tabs li").click(function () {
    $("ul.tabs li").removeClass("current");
    $(this).addClass("current");
  });
  AOS.init({ once: true });
});
