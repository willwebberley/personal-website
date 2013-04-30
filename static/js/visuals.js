$(".banner").mouseenter(function(){
	$(this).animate({top: "-7px"}, 300, "easeOutQuint");
});
$(".banner").mouseleave(function(){
	$(this).animate({top: "-24px"}, 300, "easeOutQuint");
});

$(".fader").mouseenter(function(){
	$(this).animate({backgroundColor: "rgba(200,200,200,0.2)"}, 150);
});
$(".fader").mouseleave(function(){
	$(this).animate({backgroundColor: "rgba(250,250,250,0)"}, 300);
});
