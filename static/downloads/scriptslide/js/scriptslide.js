/****/
/* YOU DO NOT NEED TO EDIT THIS FILE (unless you want to) 
/****/

$("title").html(page_title);
$('body').css({'background':'url('+background_image+')'});
$('header').prepend('<img src="'+header_logo+'" id="logo" />');
$('header').css({'background':header_background});
$('#author').css({'color':author_info_color});
$('#progress').css({'background':progress_bar_color});
$('#progress-value').css({'color':progress_text_color});
$('ul li').css({'background-image': 'url('+bullet_point_image+')'});


if (slide_transition == 'fade'){
    $("section").css({'opacity':'0.0'});
}
else if (slide_transition == 'appear'){
    $("section").css({'opacity':'0.0'});
}
else{
    $("section").css({'top':'-1000px'});
}

// Define some global variables:
var progress = 0; // Current progress for the progress bar
var progressStep = 0; // The progress step to make between slides
var numSlides = 0; // Total number of slides in presentation
var currentSlide = 0; // Current slide number (1, 2, 3, ..., etc.)

// Hide previous slide
function hidePrevious(previous){
    if (slide_transition == 'appear'){
        previous.css({'opacity': '0.0'});
    }
    else if (slide_transition == 'fade'){
        previous.animate({ opacity: '0.0'}, 700, "easeOutQuint", function(){});
    }
    else {
	previous.animate({left: '-1000px', opacity: '0.0'}, 400, "easeOutQuint", function(){});
	}
}

function showNext(next){
    if (slide_transition == 'appear'){
        next.css({'opacity': '1.0'});
    }
    else if (slide_transition == 'fade'){
        next.animate({ opacity: '1.0'}, 700, "easeOutQuint", function(){});
    }
   else {
    next.animate({top: '0px', left:'0px', opacity: '1.0'}, 400, "easeOutQuint", function(){});
    }
}

function updateProgressBar(progress){    
    // We move the value label to the left slightly to stop it going off edge of page:
	var valueLeftNess = progress-3;
	
	// Do animations:
	$("#progress").animate({width: progress+'%'},800, "easeOutBounce", function(){});
	$("#progress-value").animate({left: valueLeftNess+'%'},400, "easeOutQuint", function(){});
	// Set value of label (rounded to integer % value):
	$("#progress-value").html(Math.round(progress) + "%");
}

function changeSlide(next){
    // Calculate the currently selected slide. This is the one we now hide (deselect it)
	var previous = $(".selected");
	previous.removeClass("selected");
	hidePrevious(previous);
	
	// Variable next is the next slide to be shown, so select this one and show it
	next.addClass("selected");
	showNext(next);
	
	// Get the id of the now selected slide and put this into the address bar
	var id = next.attr("id");
	window.location = "#"+id;
	
	// Work out how far through the presentation we are and calculate this progress value
	var counter = 0;
	$("#presentation").children("section").each(function () {
		counter+= 1;
		if($(this).attr("id") == id){
			currentSlide = counter;
			progress = counter * progressStep;
			return false;
		}
	});
	
	// Update the progress bar with our new progress value
	updateProgressBar(progress);
}


function activateListeners(){
    $("footer nav a").mouseenter(function(){$(this).css({'color': menu_rollover_foreground_mouseover});});
	$("footer nav a").mouseleave(function(){$(this).css({'color': menu_rollover_foreground});});
	$("footer nav a").click(function(){
		var id = $(this).attr('href');
		changeSlide($(id));
	});
	$("footer").mouseenter(function(){
		$("footer").animate({'background-color': menu_rollover_background},700);
		$("footer nav a").animate({'color': menu_rollover_foreground}, 700);
		
		$("footer h3").animate({'color': menu_rollover_title_color}, 700);
		$("footer nav").show(300, function(){});
	});
	$("footer").mouseleave(function(){
		$("footer").animate({'background-color': 'rgba(250, 250, 250, 0.3);'},700);
		$("footer h3").animate({'color': '#444444'}, 700);
		$("footer nav").hide(300, function(){});
	});
}

// Start executing when the document is ready
$(document).ready(function(){
    // Get requested slide after # sign (if any):
	var requested = window.location.hash;
	var slideToShow;
	
	// If no requested slide (i.e. nothing after the HTML filename) select first slide:
	if($(requested).length == 0){
		slideToShow = $("#presentation").children(":first");
	}
	// If a slide is requested, select that slide:
	else{
		slideToShow = $(requested);
	}
	
	// Add id of each slide to the Slide Menu in the footer:
	$("#presentation").children("section").each(function () {
		numSlides += 1;
		var id = $(this).attr("id");
		$("footer nav").append('<a href="#'+id+'">'+id+'</a> ');
	});
	
	// Calculate the progress 'step' % based on the number of slides in presentation:
	progress = (1 / numSlides) * 100;
	progressStep = (1 / numSlides) * 100;
	
	// Show the appropriate slide:
	changeSlide(slideToShow);
	// Activate various listeners and bindings:
	activateListeners();
});


// Listen for key-up events on the document
$(document).keyup(function(e){
    // If the left arrow is pressed, locate previous slide (if any) and do slide-change:
	if (e.keyCode == 37) { 
		if(currentSlide > 1){
			var current = $(".selected");
			var next = current.prev();
			changeSlide(next);
			
		}
	}
	// If the right arrow is pressed, locate next slide (if any) and do slide-change:
    if (e.keyCode == 39) { 
    	if(currentSlide < numSlides){
			var current = $(".selected");
			var next = current.next();   
			changeSlide(next);
		}
    }	     
});