var tes;

$(function() {  
  var app = {
    userProfile: {
      name: "",
      gender: "",
      phone: "",
      email: "",
      school: ""
    },

    leftCard: $('#left-card'),
    rightCard: $('#right-card'),
    characterContainer: $('#characters .container-fluid'),
    btnChooseLeft: $('#btn-choose-profession-left'),
    btnChooseRight: $('#btn-choose-profession-right'),
    windowHeight: 0,
    currentProfessionIndex: -2,
    professions: [],

    bgColors: ['blue', 'blue2', 'grey', 'green', 'purple'],
    lineColors: ['red', 'orange', 'blue', 'purple', 'green', 'blue2'],

    sliderJurusan: $('#slider-jurusan'),
    professionTitle: $('.profession-title'),
    facultyTitle: $('#faculty-title'),
    facultyDescription: $('#faculty-description')
  };

  tes = app;

  // $('#characters, #fullpage').hide();
  app.preload = new createjs.LoadQueue(false);
  app.handlePreloadComplete = function () {    
    $('#preloader').fadeOut();
    $('#characters, #fullpage').removeClass('hide');    
  };
  app.preload.on('complete', app.handlePreloadComplete);

  app.getProfessions = function (cb) {

    // todo ajax call
    this.faculties = [
      {id:'socs', name:'School of Computer Science', 
        description: '<p>67% profesi di bidang perangkat lunak justru tersedia di luar industri teknologi, misalnya perbankan, ritel, pemerintahan, hiburan, dan sebagainya.</p><p> Pelajar yang diperkenalkan Computer Science sejak dini memiliki keunggulan lebih di bidang Matematika</p>', 
        departements:[
          {url:'http://socs.binus.ac.id/program/computer-science/', title:'Teknik Informatika'},
          {url:'http://socs.binus.ac.id/program/game-application-and-technology/', title:'Game Application & Technology'},
          {url:'http://socs.binus.ac.id/program/cyber-security/', title:'Cyber Security'},
          {url:'http://socs.binus.ac.id/program/mobile-application-and-technology/', title:'Mobile Application & Technology'},
          {url:'http://socs.binus.ac.id/program/computer-science-statistics/', title:'Applied Statistics'},
          {url:'http://socs.binus.ac.id/program/computer-science-mathematics/', title:'Applied Mathematics'}
        ]},
      {id:'sois', name:'School of Information Systems', 
        description: '<p>Saat ini di Indonesia terdapat lebih dari 1.5 Startup lokal Source: dailysocial.net Pada tahun 2015, HANYA 4 juta Tenaga Kerja IT yang dapat dipenuhi, dari kebutuhan 6 juta Tenaga Kerja IT Source: Direktur Telkom Professional Center (PCC) Pada tahun 2016 - 2020 Kebutuhan tenaga bidang Information Technology (IT) dan Sistem Informatika diperkirakan berjumlah 7.2 juta Tenaga Kerja</p>' , 
        departements:[
          {url:'http://sis.binus.ac.id/information-systems/', title:'Sistem Informasi'},
          {url:'http://sis.binus.ac.id/business-information-technology/', title:'Business Information Technology'},
          {url:'http://sis.binus.ac.id/curriculum/', title:'Accounting Information Systems'},
          {url:'http://sis.binus.ac.id/information-systems-audit/', title:'Information System Audit (IT Auditor)'}
        ]},
      {id:'sobm', name:'School of Business Management', 
        description: '<p>Virgin Group adalah salah satu contoh konglomerasi dengan salah satu anak perusahaan Virgin Records yang menaungi banyak selebritis papan atas seperti David Bowie, Katy Perry, Daft Punk, 30 Seconds to Mars, dan lainnya. Selain itu ada juga Virgin Atlantic, Virgin Galactic, Virgin Active, dll.</p><p>Tahukah kamu? Nestle yang berpusat di Vevey, Swiss merupakan perusahaan produk makanan terbesar di dunia, diukur dari pendapatan.</p><p>Virgin dan Nestle merupakan contoh yang tepat akan kebutuhan manajemen bisnis yang baik untuk mewujudkan perusahaan berskala global.</p>', 
        departements:[
          {url:'http://sbm.binus.ac.id/international-business-management/', title:'International Business Management'},
          {url:'http://sbm.binus.ac.id/management-information-systems/', title:'Management & Information Systems'},
          {url:'http://sbm.binus.ac.id/international-marketing-program/', title:'International Marketing'},
          {url:'http://sbm.binus.ac.id/management-progra/', title:'Manajemen'}, 
          {url:'http://sbm.binus.ac.id/business-creation/', title:'Business Creation'}
        ]},
      {id:'sod', name:'School of Design', 
        description: '<p>Perkembangan era digital telah mempengaruhi segala aspek kehidupan kita. Ciri khas era ini adalah paperless dan serba aplikasi. Kedepannya akan banyak dibutu Marchella Febritrisia Putri, BINUSIAN 2013 adalah Penulis Buku Generasi 90an</p> <p>Industri Animasi memiliki prospek yang sangat baik, dilihat dari pendapatan yang terus meningkat</p> <p>Jepang dan Amerika Serikat Film-film animasi mendunia banyak diproduksi oleh dengan studio produksi andalan seperti Studio Ghibli atau Pixar</p><p>BINUS UNIVERSITY akan mempersiapkanmu untuk mampu bersaing di dunia internasional</p>', 
        departements:[
          {url:'http://interior.binus.ac.id/', title:'Desain Interior'},
          {url:'http://dkv.binus.ac.id/', title:'DKV - New Media'},
          {url:'http://ca.binus.ac.id/', title:'DKV - Creative Advertising'},
          {url:'http://animation.binus.ac.id/', title:'DKV - Animasi'},
        ]},
      {id:'fec', name:'Faculty of Economics & Communication', 
        description: '<p>Jumlah wisatawan dunia pada 2015 yang bepergian ada sekitar 1.2 Miliar<br> Source: UNWTO (The World Tourism Organization)</p><p>Hingga tahun 2015, anggota Ikatan Akuntan Indonesia baru berjumlah 17000 Jumlah ini diharapkan mampu menembus angka 100.000 hingga tahun 2017<br> Source: Laporan Kementerian Keuangan, 2014</p> <p>Bidang Keuangan dan Investasi akan menjadi salah satu sektor yang akan bertumbuh pesat sampai tahun 2030<br> Source: McKinsey research</p><p>Permintaan jumlah tenaga kerja di bidang komunikasi, baik Public Relations, Broadcasting, dan Digital Journalism Permintaan jumlah tenaga kerja di bidang komunikasi, baik diperkirakan akan meningkat dalam 5-10 tahun ke depan sebanyak 21%<br> Source: The Bureau of Labor Statistics Projects</p>', 
        departements:[
          {url:'http://hotel-management.binus.ac.id/', title:'Hotel Management'},
          {url:'http://accounting.binus.ac.id/', title:'Finance'},
          {url:'http://curriculum.binus.ac.id/program/tourism/', title:'Pariwisata'},
          {url:'http://accounting.binus.ac.id/', title:'Akuntansi'},
          {url:'http://marcomm.binus.ac.id/', title:'Marketing Communication'},
          {url:'http://marcomm.binus.ac.id/', title:'Mass Communication'}
        ]},
      {id:'fh', name:'Faculty of Humanities', 
        description: '<p>Terdapat 783 perusahaan Jepang yang tersebar di seluruh Indonesia dan ratusan perusahaan Cina yang berencana berinvestasi di tanah air.</p> <p>Diperkirakan dalam 10 tahun ke depan, Cina mampu mengalahkan Amerika Serikat dengan ekonomi terkuatnya.</p> <p>Berdasarkan data, 95% daerah di Indonesia kekurangan guru SD. Saat ini jumlah guru SD sebanyak 1,400,000 dan Indonesia masih kekurangan 500,000 guru SD.</p> <p>Pada tahun 2013 nilai pasar e-commerce Indonesia mencapai US$8miliar Dan pada tahun 2016 diprediksi naik tiga kali lipat menjadi US$25miliar (Rp 295.5 triliun) Sources: Riset oleh Asosiasi E-commerce Indonesia (idEA), Google Indonesia, dan TNS (Taylor Nelson Sofres)</p>', 
        departements:[
          {url:'http://ir.binus.ac.id/', title:'Hubungan internasional'},
          {url:'http://psychology.binus.ac.id/', title:'Psikologi'},
          {url:'http://business-law.binus.ac.id/', title:'Business Law/Hukum'},
          {url:'http://curriculum.binus.ac.id/program/primary-teacher-education/', title:'Pendidikan Guru Sekolah Dasar'},
          {url:'http://japanese.binus.ac.id/', title:'Sastra Jepang'},
          {url:'http://chinese.binus.ac.id/', title:'Sastra Cina'},
          {url:'http://english.binus.ac.id/', title:'Sastra Inggris'}
        ]},  
      {id:'feg', name:'Faculty of Engineering', 
        description: '<p>Kampus BINUS Alam Sutera yang memiliki arsitektur unik yang membuat kampus ini terlihat menarik. Hal ini menunjukkan betapa pentingnya kebutuhan profesi arsitek berstandar internasional dalam perkembangan pembangunan tanah air.</p> <p>Berdasarkan data Yayasan Lembaga Konsumen Indonesia (YLKI) Pusat, sekitar 30% (sepertiga) makanan kemasan yang beredar di Indonesia terindikasi mengandung sejumlah zat berbahaya. Untuk itu peran industri teknologi makanan beserta pengetahuan di dalamnya terus dibutuhkan sebagai solusi.</p> <p>Dari sisi pendapatan program studi Computer Engineering adalah program studi dengan pendapatan mencapai US$65.000 per tahun menduduki peringkat keempat di antara program studi teknik lainnya Sources: Survey National Association of College and Employers (NACE), 2016</p> ', 
        departements:[
          {url:'http://foodtech.binus.ac.id/', title:'Food Technology'},
          {url:'http://ie.binus.ac.id/', title:'Teknik Industri'},
          {url:'http://architecture.binus.ac.id/', title:'Arsitektur'},
          {url:'http://comp-eng.binus.ac.id/', title:'Sistem Komputer'},
          {url:'http://civil-eng.binus.ac.id/', title:'Teknik Sipil'}
        ]},
    ];

    this.professions = [
                        {title: 'Advokat', imgName: 'vector-job-list-advokat', faculty: 'fh'},
                        {title: 'Arsitek', imgName: 'vector-job-list-arsitek', faculty: 'feg'},
                        {title: 'Creativepreneur', imgName: 'vector-job-list-creativeprenuer', faculty: 'sod'},
                        {title: 'Diplomat', imgName: 'vector-job-list-diplomat', faculty: 'fh'},
                        {title: 'Engineering Manager', imgName: 'vector-job-list-engineer-manager', faculty: 'feg' },
                        {title: 'Entrepreneur', imgName: 'vector-job-list-entreprenuer', faculty: 'sobm'},
                        {title: 'IT Consultant', imgName: 'vector-job-list-it-consultant', faculty: 'sois'},                     
                        {title: 'Manager Operasional', imgName: 'vector-job-list-manajemen-operasional', faculty: 'feg'},
                        {title: 'Public Relation', imgName: 'vector-job-list-public-relation', faculty: 'fec'},                     
                        {title: 'Teknopreneur', imgName: 'vector-job-list-teknopreneur', faculty: 'socs'},
                        {title: 'Trader', imgName: 'vector-job-list-trader2', faculty: 'fec'}
                      ];
    // end ajax call

    if (this.professions.length % 2 == 1) {
      this.professions.push(this.professions[parseInt(this.professions.length/2)]);
    }

    // callback on success load data
    cb();

  };

  app.getProfessions(function() {
    // load assets
    var manifests = [
      {src:'images/gender-laki-laki.svg', type: createjs.LoadQueue.IMAGE},
      {src:'images/gender-perempuan.svg', type: createjs.LoadQueue.IMAGE},
      {src:'images/mahasiswa.svg', type: createjs.LoadQueue.IMAGE},
      {src:'images/mahasiswi.svg', type: createjs.LoadQueue.IMAGE},
      {src:'images/sma-laki-laki.svg', type: createjs.LoadQueue.IMAGE},
      {src:'images/sma-perempuan.svg', type: createjs.LoadQueue.IMAGE}
    ];
    for (var i=0; i<app.professions.length; i++) {
      manifests.push({src:'images/'+app.professions[i].imgName+'-co.svg', type: createjs.LoadQueue.IMAGE});      
      manifests.push({src:'images/'+app.professions[i].imgName+'-ce.svg', type: createjs.LoadQueue.IMAGE});      
    }

    app.preload.loadManifest(manifests);        
  });

  app.getFaculty = function () {

    this.faculty = [
      {
        id: 'socs', 
        title: 'School of Computer Science', 
        content: '', 
        departements: [
          {title: 'Computer Science', content:''},
          {title: 'Game Application Technology', content: ''}
        ]
      },
      {
        id: 'sois', 
        title: 'School of Information Systems', 
        content: '', 
        departements: [
          {title: 'Information System', content:''},
          {title: 'Accounting Information System', content: ''}
        ]
      }
    ]

  };

  app.switchToStudent = function () {
    var colorClass = this.getBGColorClass();
    this.leftCard.removeClass(colorClass).addClass('lightgrey');
    this.rightCard.removeClass(colorClass).addClass('grey');
    this.scrollImg('sma-laki-laki', 'sma-perempuan')
  };

  app.repositionImg = function () {
    var w = $(window);
    // console.log('repositionImg');
    var marginTop = '15%';
    this.windowHeight = $('.fp-section').height();    
    if (w.width() < w.height()) {
      // landscape..            
      marginTop = (this.windowHeight - this.leftCard.find('img').height())/2;        
    } 
    this.leftCard.find('img').css('margin-top', marginTop);
    this.rightCard.find('img').css('margin-top', marginTop);
    this.leftCard.children('div').css('height', this.windowHeight);
    this.rightCard.children('div').css('height', this.windowHeight);
  };

  app.scrollImg = function(leftImg, rightImg) {
    var self = this;
    
    return tweenDiv(self.leftCard, 'up', leftImg) 
            && tweenDiv(self.rightCard, 'down', rightImg);

    function tweenDiv(el, dir, imgSrc) {

      var animDuration = 1;

      if (el.tween != undefined && el.tween.isActive()) {
        el.tween.seek(animDuration,false);
        // el.tween.timeScale(2);
      // return false;
      } 

      var div = el.children('div');
      var imgDiv = div.children('.img');


      var clonedImg = imgDiv.clone();
      clonedImg.addClass('clone');      

      var img = imgDiv.children('img');
      img.attr('src', 'images/'+imgSrc+'.svg');      

      var animProps = {
        y: -self.windowHeight, 
        ease: Elastic.easeOut.config(1, 0.5),
        // ease: Expo.easeOut,
        clearProps: 'y',
        onComplete: function() {
          clonedImg.remove();          
        }        
      };

      if (dir == 'up') {
        div.prepend(clonedImg);
        TweenLite.set(div, {y:-self.windowHeight});
        animProps.y = 0;
      } else { // down
        
        div.append(clonedImg);
      }
      
      el.tween = TweenLite.from(div, animDuration, animProps);
      TweenLite.to(clonedImg, animDuration/2, {opacity:0});

      return true;
      
      // return;
      // var tl = new TimelineLite({
      //   onComplete: function() {
      //     clonedImg.remove();
      //   }
      // });
      // tl.set(clonedImg, {y:-self.windowHeight});
      // tl.from(imgDiv, 1.5, {opacity:0.7, y:-self.windowHeight, ease: Power4.easeOut}, 'in');
      // tl.to(clonedImg, 1, {opacity:0, scale:0.7}, 'in');
    }
  };

  // return a string separated by space 
  app.getBGColorClass = function () {
    var bgColors = [];
    for (var i=0; i<this.bgColors.length; i++) {
      bgColors.push(this.bgColors[i]);
      bgColors.push('light'+this.bgColors[i]);
    }
    return bgColors.toString().replace(/,/g, ' ');
  };

  app.randBgColor = function () {
    var randBgColor = this.bgColors[Math.floor(Math.random()*this.bgColors.length)];
    var colorClass = this.getBGColorClass();
    // console.log(colorClass);
    this.leftCard.removeClass(colorClass).addClass('light'+randBgColor);
    this.rightCard.removeClass(colorClass).addClass(randBgColor);
  };

  app.nextProfession = function () {            
    try {
      // todo +gender
      var canScroll = this.scrollImg( 
                        this.professions[this.currentProfessionIndex+2].imgName + (app.userProfile.gender == 'laki-laki' ? '-co' : '-ce'), 
                        this.professions[this.currentProfessionIndex+3].imgName + (app.userProfile.gender == 'laki-laki' ?'-co' : '-ce')  
                      );

      if (canScroll) {      
        this.btnChooseLeft.text(this.professions[this.currentProfessionIndex+2].title);
        this.btnChooseRight.text(this.professions[this.currentProfessionIndex+3].title);

        this.btnChooseLeft.data('profesi', this.currentProfessionIndex+2);
        this.btnChooseRight.data('profesi', this.currentProfessionIndex+3);

        this.randBgColor();

        this.currentProfessionIndex+=2;
      }
    } catch (ex) {
      // console.log(ex);
      this.currentProfessionIndex = -2;
      app.nextProfession();
    }
  };

  app.prevProfession = function () {  
    try {
      var canScroll = this.scrollImg( 
                        this.professions[this.currentProfessionIndex-2].imgName + (app.userProfile.gender == 'laki-laki' ? '-co' : '-ce'), 
                        this.professions[this.currentProfessionIndex-1].imgName + (app.userProfile.gender == 'laki-laki' ?'-co' : '-ce')  
                      );

      if (canScroll) {      
        this.btnChooseLeft.text(this.professions[this.currentProfessionIndex-2].title);
        this.btnChooseRight.text(this.professions[this.currentProfessionIndex-1].title);

        this.btnChooseLeft.data('profesi', this.currentProfessionIndex-2);
        this.btnChooseRight.data('profesi', this.currentProfessionIndex-1);

        this.randBgColor();

        this.currentProfessionIndex-=2;
      }
    } catch (ex) {
      // console.log(ex);
      this.currentProfessionIndex = this.professions.length % 2 == 1 ? this.professions.length-1 : this.professions.length  ;
      app.prevProfession();
    }
  };

  app.selectProfession = function (selectedIndex) {
    this.selectedProfession = this.professions[selectedIndex];

    var faculty;
    for (var i=0; i<this.faculties.length; i++) {
      if (this.selectedProfession.faculty == this.faculties[i].id) {
        faculty = this.faculties[i];
        break;
      }
    }

    this.facultyTitle.text(faculty.name);
    this.professionTitle.text(this.selectedProfession.title);
    this.facultyDescription.html(faculty.description);

    this.sliderJurusan.find('li').remove();
    var ul = this.sliderJurusan.children('ul');
    for (var i=0; i<faculty.departements.length; i++) {
      var li = $('<li/>');
      var h5 = $('<h5>');
      var a = $('<a/>', {
        text: faculty.departements[i].title, 
        href: faculty.departements[i].url, 
        target:'blank'});
      h5.append(a);
      li.append(h5);
      ul.append(li);
    }

    // init slider
    reloadSliderJurusan();

    var self = this;
    setTimeout(function() {      
      var top = $(window).height() - $('.footer').outerHeight();
      if (top < 0) top = 0;
      app.characterContainer.css('top', top);
    }, 1000);
    
  };

  $('form#nama').validate({
    messages: {
      'input-nama': "Mohon isikan nama Kamu"
    },
    submitHandler: function(form) {
      $.fn.fullpage.moveSlideRight();
    }
  });
  $('form#gender').validate({
    ignore: '',
    messages: {
      'input-gender': "Mohon pilih jenis kelamin Kamu"
    },
    submitHandler: function(form) {
      $.fn.fullpage.moveSlideRight();
    }
  });
  $('form#email').validate({
    messages: {
      'input-email': "Mohon isikan e-mail Kamu"
    },
    submitHandler: function(form) {
      $.fn.fullpage.moveSlideRight();
    }
  });
  $('form#telepon').validate({
    messages: {
      'input-telepon': "Mohon isikan nomor telepon Kamu"
    },
    submitHandler: function(form) {
      app.nextProfession();    
      $.fn.fullpage.moveSectionDown();
    }
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

  // manual binding
  $('.input-nama').change(function() {
    var val = $(this).val().trim();
    $('.input-nama').val(val);
    app.userProfile.name = val;
  });
  $('.input-telepon').change(function() {
    var val = $(this).val().trim();
    $('.input-telepon').val(val);
    app.userProfile.phone = val;
  });
  $('.input-email').change(function() {
    var val = $(this).val().trim();
    $('.input-email').val(val);
    app.userProfile.email = val;
  });
  $('.input-sekolah').change(function() {
    var val = $(this).val().trim();
    app.userProfile.school = val;
  });
  
  // init fullpage
  $('#fullpage').fullpage({    
    controlArrows: false,
    keyboardScrolling: false,
    scrollOverflow: true,
    afterRender: function() {
      setTimeout(function() {
        app.repositionImg();
      }, 0);
    },
    afterResize: function() {
      app.repositionImg();
      reloadSliderJurusan();
    }
  }); // end initfullpage
  $.fn.fullpage.setAllowScrolling(false); // disable scroll
  // $.fn.fullpage.moveSectionDown ();

  $('#btn-start').on('click', function() {
    app.switchToStudent();
    $.fn.fullpage.moveSlideRight();
  });
 
  $('#btn-back-step1, #btn-back-step2, #btn-back-step3').on('click', function() {    
    $.fn.fullpage.moveSlideLeft();
  }); 

  $('.gender').on('click', function() {
    var $this = $(this);
    app.userProfile.gender = $this.text().trim().toLowerCase();

    $('.gender').removeClass('selected');
    
    var genderInput = $('#input-gender');
    genderInput.val(app.userProfile.gender);

    $this.addClass('selected');
  });

  $('#profession .previous').on('click', function () {
    app.prevProfession();
  });
  $('#profession .next').on('click', function () {
    app.nextProfession();
  });

  $('#btn-choose-profession-left, #btn-choose-profession-right').on('click', function() {
    app.selectProfession($(this).data('profesi'));

    var colorIndex = 0;
    $('.slideee li').each(function(i, el) {
      var lineColor = app.lineColors[colorIndex++];
      if (colorIndex == app.lineColors.length) {
        colorIndex = 0;
      }
      $(el).removeClass().addClass(lineColor);
    });

    $.fn.fullpage.moveSectionDown();
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

  app.sliderJurusan.sly({
    horizontal:true,
    itemNav: 'forceCentered',
    prevPage: $('.jurusan-prev'),
    nextPage: $('.jurusan-next'),
    speed: 300,
    mouseDragging: true
  });

  function reloadSliderJurusan() {
    app.sliderJurusan.sly('reload');
  }

  $('#btn-choose-another-profession').on('click', function () {
    var scrollable = $('.fp-section').find('.fp-scrollable'); 
    var iScrollInstance = scrollable .data('iscrollInstance');
    iScrollInstance.scrollTo(0,0);
    $.fn.fullpage.moveTo(2); // choose profession    
    app.characterContainer.css('top',0);
  })

});
