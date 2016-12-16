$(function() { 
  // init fullpage
  $('#fullpage').fullpage({        
    scrollOverflow: true,
    afterRender: function() {
      // setTimeout(function() {
      //   app.repositionProfessionScroller();
      //   app.repositionProfessionBGResult();
      // }, 0);
    },
    afterResize: function() {
      // app.repositionProfessionScroller();
      // app.repositionProfessionBGResult();
      // reloadSliderJurusan();
      // resizeResultAvatarContainer();
    },
    onLeave: function(index, nextIndex, direction){
      console.log(nextIndex);
      var topMenu = $('#top-menu');
      if (nextIndex == 2) {
        topMenu.fadeIn();
      } else {
        topMenu.fadeOut();
      }
    }
  }); // end initfullpage

  var mySlider = {
    slides: $('#slider-alumni li'),
    current: 0,
    init: function() {
      this.slides.hide();
      this.slides.first().show();
    },
    next: function() {
      if (this.current+1 >= this.slides.length) {
        this.current = -1;
      }
      this.slides.hide();
      $(this.slides[++this.current]).fadeIn();
    },
    prev: function() {
      if (this.current-1 < 0) {
        this.current = this.slides.length;
      }
      this.slides.hide();
      $(this.slides[--this.current]).fadeIn();
    }
  };
  mySlider.init();
  $('.jurusan-next').on('click', function() {
    mySlider.next();
  });
  $('.jurusan-prev').on('click', function() {
    mySlider.prev();
  });

  $('#form-kuliah-gratis').validate({
    messages: {
      'input-nama': "Mohon isikan nama Kamu",
      'input-email': "Mohon isikan e-mail Kamu",
      'input-telepon': "Mohon isikan nomor telepon Kamu",
      'input-sekolah': "Mohon isikan nama sekolah Kamu"
    },
    submitHandler: function(form) {
      alert('form submit todo, thanks');
      // form.submit();
    }
  });
  $('#form-kuliah-gratis').on('focusin', 'input', function () {
    var input = $(this);
    var divInput = input.parent();
    input.removeClass('focus').addClass('focus');
    divInput.removeClass('focus').addClass('focus'); 
    input.attr('placeholder', '');
  });
  $('#form-kuliah-gratis').on('focusout', 'input', function () {
    var input = $(this);

    if (input.val().trim().length == 0) {
      input.val('');
      var divInput = input.parent();
      input.removeClass('focus');
      divInput.removeClass('focus'); 
      input.attr('placeholder', divInput.attr('data-placeholder'));      
    }
  });

});
