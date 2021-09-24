$(document).ready(function(){

	console.log('mounted');

	$('#myModal').on('hidden.bs.modal', function (e) {
		$("#wrapper").removeClass("filter");

	})

	$('#myModal').on('shown.bs.modal', function (e) {
		$("#wrapper").addClass("filter");

	})

	$('#registerModal').on('hidden.bs.modal', function (e) {
		$("#wrapper").removeClass("filter");

	})

	$('#registerModal').on('shown.bs.modal', function (e) {
		$("#wrapper").addClass("filter");
		console.log("fsd")

	})



	$('.suggestion_carousel_r4').owlCarousel({
	    loop:true,
	    margin:10,
	    nav:true,
	    // autoPlay: true,
	    dots: false,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:1
	        },
	        1000:{
	            items:4
	        }
	    }
	})

	$('.suggestion_carousel_r3').owlCarousel({
	    loop:true,
	    margin:10,
	    nav:true,
	    // autoPlay: true,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:1
	        },
	        1000:{
	            items:3
	        }
	    }
	});

	var product_carousel = $('.product-carousel').owlCarousel({
	    loop:true,
	    margin: 0,
	    nav:false,
	    dots: false,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:1
	        },
	        1000:{
	            items:1
	        }
	    }
	});

	$(".thumb .img_area").on('click', function () {
		// body...
		var index = $(this).attr("data-index");
        product_carousel.trigger('to.owl.carousel', index)

	})

	var vid = $('#my_video').RTOP_VideoPlayer({
        // showFullScreen: true,
        // showTimer: true,
        showSoundControl: true
    });

    $(".rtopVideoHolder ").append('<i class="fas fa-play center_play_icon"></i>');


     $('.cart_counter button').click(function(e){
        var button_classes, value = +$('.counter').val();
        button_classes = $(e.currentTarget).prop('class');        
        if(button_classes.indexOf('up_count') !== -1){
            value = (value) + 1;            
        } else {
            value = (value) - 1;            
        }
        value = value < 0 ? 0 : value;

        $(this).closest(".cart_counter").find('.counter').val(value);
    });


     $(".price_td .icon").on('click', function () {
     	$(this).closest('tr').hide();
     });

     $(".toggle_sidebar").on("click", function (e) {
     	// body...
		$('body').toggleClass("open_sidebar");
	 });
	 $('body').on('click', function(e) {
		var $trigger = $(".menu_sidebar");
        if($trigger !== event.target && !$trigger.has(event.target).length){
			// $(".dropdown-menu").slideUp("fast");
			$('body').removeClass("mobile_sidebar");
			$('body').removeClass('open_sidebar');
        }  
	 })


     $(document).on("click", ".peo_li" , function() {
     	$(".mobile .conversation_area").addClass("show");
     });
     $(document).on("click", ".back" , function() {
     	$(".mobile .conversation_area").removeClass("show");
     });

     $(document).on("click", ".toggle_sidebar_mobile" , function() {
     	$("body").toggleClass("mobile_sidebar");
     	$("body").removeClass("open_sidebar");
     });

});