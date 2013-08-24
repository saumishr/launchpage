
$('document').ready(function(e) {
	var index = 1;
	var allelems;
	var lastposition = "";
	var lastindex = -1;

	function swap_htmls_with_fade($elem1, $elem2){
		var html = $elem1.html();
		$elem1.html($elem2.html());
		$elem2.html(html).fadeIn(1000);
	}

    $('blockquote p').each(function(index) {
		var $this = $(this);
		var wish = $this.children(".wish").text();
		var userDetails = $this.children(".userDetails").text();
		//alert(text.length);
		var width = $this.width();
		var height = $this.height();
		//alert(width + " " + height);
    });
	
	$('.oval-quotes1').each(function() {
		$(this).jqFloat({
			width:Math.floor(Math.random()*10)*10,
			height:10,
			speed:Math.floor(Math.random()*10)*100 + 800
		});
	});

	$('.position1').add('.position2').add('.position3').add('.position4').add('.position5').on('mouseenter', function(event){
		var jsthis = $(this)[0];
		var savedIndex = 0;
		var wishelement = $(jsthis).find(".post");
			
		var position_class = "";

		if($(this).hasClass('position1'))
			position_class = 'position1';
		else if($(this).hasClass('position2'))
			position_class = 'position2';
		else if($(this).hasClass('position3'))
			position_class = 'position3';
		else if($(this).hasClass('position4'))
			position_class = 'position4';
		else if($(this).hasCllastindexass('position5'))
			position_class = 'position5';

		if(lastposition == position_class)
		{
			return false;
		}
		else if(lastposition != position_class)
		{
			clearInterval(window.timer);
			window.timer = null;
			lastposition = position_class;
			lastindex = -1;
		}

		allelems = document.getElementsByClassName(position_class);
		
		if(allelems.length <= 1)
		{
			lastindex = -1;
			return false;
		}

		if(lastindex == -1)
		{
			for(i=0;i<allelems.length;i++)
			{
				if(allelems[i] == jsthis)
					savedIndex = i;
			}
			index = (savedIndex + 1)%(allelems.length);
		}
		else
			index = lastindex;
		

		function timer_handler(){
				console.log("cur index: "+index);
				var curwishelem = $(allelems[index]).find(".post"); 

				wishelement.fadeOut(function(){
					//console.log("introducing: " + curwishelem.html() + " removing: " + wishelement.html() );
					swap_htmls_with_fade(curwishelem, wishelement);
					index = (index+1)%(allelems.length);
					if (index == 0)
					 	index++;
				});			
		};
		timer_handler();
		window.timer = setInterval(timer_handler, 2000);
	});
	$('.position1').add('.position2').add('.position3').add('.position4').add('.position5').on('mouseleave', function(event){
		clearInterval(window.timer);
		window.timer = null;
		lastposition = "";
		lastindex = index;
	});
});