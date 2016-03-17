$(document).ready(function (){
	$(".form-signin input").keypress(function(e){
		if(e.which == 13)
			$(".from-signin").submit();
	})
});