var cleanForm = function () {
    $('#id_email').parent().removeClass('error');
    $('#id_username').parent().removeClass('error');
    $('#id_location').parent().removeClass('error');
}

var post_wish_handler = function(event){
        var form = $(this);
        cleanForm();
        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize(),
            success: function (data) {
            	if(data.success == 'true')
                {
                   $('.b-close').click();
                   $('#postWish').parent().append(data.html);

                   form[0].reset();
                   $('#wishtext:input').val('');
                  var dest_left = '240px';//$('#postWish').offsetLeft - 180;
                  var dest_top = '5px';
                  $(".newwish").animate({ "left": dest_left, "top": dest_top }, 2200 );
                  setTimeout(function(){
                      $('.newwish').each(function() {
                            $(this).jqFloat({
                                width:Math.floor(Math.random()*10)*10,
                                height:10,
                                speed:Math.floor(Math.random()*10)*100 + 800
                            });
                      });
                     $('#radioImageDefault').show();
                     $('#radioImageColoured').hide();
                  }, 2500);
                }
                else{
                        var jsondata = JSON.parse(data);
                        var errors = jsondata.errors;
                        if(typeof errors.email != 'undefined')
                        {
                          $('#id_email').parent().addClass('error');
                        }
                        if(typeof errors.username != 'undefined')
                        {
                          $('#id_username').parent().addClass('error');
                        }
                        if(typeof errors.location != 'undefined')
                        {
                          $('#id_location').parent().addClass('error');
                        }
                        
                }
            },
            error: function(data) {
               var errors = data.errors;
                alert(errors);
            }
        });

    event.stopPropagation();
    event.preventDefault();
    return false;
};

var install_post_wish_handler = function() {
    $('.postwish').off('submit').on('submit', post_wish_handler);
};

var display_popup_handler = function(event) {
    if($('.gobutton').hasClass('disabled')) 
      return false;
       
    event.preventDefault();
    var popupLeft = event.pageX - 200;
    var popupTop = event.pageY - 350;
    $('#pop_up').bPopup(
        {
            modalColor:'blackWhite',
            positionStyle: 'absolute',
            position: [popupLeft, popupTop],
            follow: [false, false]
        },
        function() {
                $('#id_wishtext').val($('#wishtext').val());
                install_post_wish_handler();
        }
    );
    $('#id_username').focus();
};

var wishChanged = function(event) {
    var $this= $(this);

    if ($this.val().length > 0) {
        $('#radioImageDefault').hide();
        $('#radioImageColoured').show();
        $('.gobutton').removeClass('disabled');
    } else {
        $('#radioImageDefault').show();
        $('#radioImageColoured').hide();
        $('.gobutton').addClass('disabled');
    }
};

$( document ).ready(function() {
	  install_post_wish_handler();
    $('.make-wish').on("click", display_popup_handler);
    $('input[name=wishtext]').on('change input', wishChanged);
    $('input[name=wishtext]').focus();
    $('.gobutton').addClass('disabled');
});

 