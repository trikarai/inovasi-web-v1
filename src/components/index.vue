<template>

  <div>
    <!-- preloader -->
    <!--
                    <div id="preloader">
                <div class="loder-box">
                    <div class="battery"></div>
                </div>
                    </div>
    -->
    <!-- end preloader -->

    <!--
    Fixed Navigation
    ==================================== -->
    <header id="navigation" class="navbar-inverse navbar-fixed-top animated-header">
      <div class="container">
        <div class="navbar-header">
          <!-- responsive nav button -->
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <!-- /responsive nav button -->

          <!-- logo -->
          <h1 class="navbar-brand new">
            <a href="#body"></a>
          </h1>
          <!-- /logo -->
        </div>

        <!-- main nav -->
        <nav class="collapse navbar-collapse navbar-right" role="navigation">
          <ul id="nav" class="nav navbar-nav">
            <li><a href="#home-slider">Home</a></li>
            <li><a href="#service">Fokus Program</a></li>
            <li><a href="#portfolio">Community Partners</a></li>
            <!--                        <li><a href="#testimonials">Testimonial</a></li>-->
            <!--                        <li><a class="nav-link external" href="/signup">Sign Up</a></li>-->
            <!--                        <li><a class="nav-link external" href="/login">login</a></li>-->
            <li><router-link to="/signup">Sign Up</router-link></li>
            <li><router-link to="/login">Login</router-link></li>
          </ul>
        </nav>
        <!-- /main nav -->

      </div>
    </header>
    <!--
    End Fixed Navigation
    ==================================== -->

    <main class="site-content" role="main">

      <!--
      Home Slider
      ==================================== -->

      <section id="home-slider" style="max-height: 645px !important;">
        <!--
                    <div id="slider" class="sl-slider-wrapper">
        
                                        <div class="sl-slider">
                                        
                                                <div class="sl-slide" data-orientation="horizontal" data-slice1-rotation="-25" data-slice2-rotation="-25" data-slice1-scale="2" data-slice2-scale="2">
        
                                                        <div class="bg-img bg-img-1"></div>
        
                                                        <div class="slide-caption">
                                    <div class="caption-content">
                                        <h2 class="animated fadeInDown">BEKUP <span style="font-weight: 900">2018</span></h2>
                                        <span class="animated fadeInDown">BEKRAF for Pre-Startup</span>
                                        <a href="/signup" class="btn btn-blue btn-effect">Sign Up</a>                        
                                    </div>
                                </div>
                                                        
                                                </div>
                                                
                                                <div class="sl-slide" data-orientation="vertical" data-slice1-rotation="10" data-slice2-rotation="-15" data-slice1-scale="1.5" data-slice2-scale="1.5">
                                                
                                                        <div class="bg-img bg-img-2"></div>
                                                        <div class="slide-caption">
                                    <div class="caption-content">
                                        <h2>BEKUP <span style="font-weight: 900">2018</span></h2>
                                        <span>Build your digital Startup & GET BACK-UP !</span>
                                        <a href="/signup" class="btn btn-blue btn-effect">Sign Up</a>
                                    </div>
                                </div>
                                                        
                                                </div>
        -->

        <!--
                                                <div class="sl-slide" data-orientation="horizontal" data-slice1-rotation="3" data-slice2-rotation="3" data-slice1-scale="2" data-slice2-scale="1">
                                                        
                                                        <div class="bg-img bg-img-3"></div>
                                                        <div class="slide-caption">
                                    <div class="caption-content">
                                        <h2>BLUE Onepage HTML5 Template</h2>
                                        <span>Clean and Professional one page Template</span>
                                        <a href="#" class="btn btn-blue btn-effect">Join US</a>
                                    </div>
                                </div>
        
                                                </div>
        -->

        <!--				</div>-->
        <!-- /sl-slider -->

        <!-- 
        <nav id="nav-arrows" class="nav-arrows">
            <span class="nav-arrow-prev">Previous</span>
            <span class="nav-arrow-next">Next</span>
        </nav>
        -->

        <!--
                        <nav id="nav-arrows" class="nav-arrows hidden-xs hidden-sm visible-md visible-lg">
                            <a href="javascript:;" class="sl-prev">
                                <i class="fa fa-angle-left fa-3x"></i>
                            </a>
                            <a href="javascript:;" class="sl-next">
                                <i class="fa fa-angle-right fa-3x"></i>
                            </a>
                        </nav>
                        
        
                                        <nav id="nav-dots" class="nav-dots visible-xs visible-sm hidden-md hidden-lg">
                                                <span class="nav-dot-current"></span>
                                                <span></span>
                                                <span></span>
                                        </nav>
        -->
        <div id="myCarousels" class="carousel slide" data-ride="carousel" style="margin-top: 40px;">
          <!-- Indicators -->
          <ol class="carousel-indicators">
            <li data-target="#myCarousels" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousels" data-slide-to="1"></li>
          </ol>

          <!-- Wrapper for slides -->
          <div class="carousel-inner">
            <div class="item active"> 
              <img src="/img/slider/affinity.jpeg" class="bg-img hidden-xs" style="height:645px !important;">
              <img src="/img/slider/affinity-m.jpeg" class="bg-img visible-xs" style="height:645px !important;">
              <div class="slide-caption" style="height:310px;top:160px">
                <div class="caption-content">
                  <h2 class="animated fadeInDown">BEKUP <span style="font-weight: 900">2018</span></h2>
                  <span class="animated fadeInDown">BEKRAF for Pre-Startup</span>
                  <router-link class="btn btn-blue btn-effect" to="/signup">Sign Up</router-link>                       
                </div>
              </div>
            </div>

            <div class="item">
              <img src="/img/slider/banner.jpg" class="bg-img hidden-xs" style="height:645px !important;">
              <img src="/img/slider/banner-m.jpg" class="bg-img visible-xs" style="height:645px !important;">
              <div class="slide-caption" style="height:310px;top:160px">
                <div class="caption-content">
                  <h2 class="animated fadeInDown">BEKUP <span style="font-weight: 900">2018</span></h2>
                  <span class="animated fadeInDown">Build Your Digital Startup & get backed up by BEKUP!</span>
                  <router-link class="btn btn-blue btn-effect" to="/signup">Sign Up</router-link>                        
                </div>
              </div>
            </div>
          </div>

          <!-- Left and right controls -->

        </div>

        <!--			</div>-->
        <!-- /slider-wrapper -->
      </section>

      <!--
      End Home SliderEnd
      ==================================== -->

      <!-- about section -->
      <section id="about" >
        <div class="container">
          <div class="row">
            <!--                        <div class="col-md-7 col-md-offset-1 wow animated fadeInRight">-->
            <div class="col-md-7 wow animated fadeInRight">
              <div class="welcome-block">
                <h2 style="color:#fff"><b>Welcome To BEKUP 2018</b></h2>								
                <div class="message-body">
                  <!--									<img src="img/member-1.jpg" class="pull-left" alt="member">-->
                  <p>BEKUP (BEKRAF for Pre Startup) merupakan program pendampingan startup baru yang digagas oleh Badan Ekonomi Kreatif RI (BEKRAF) dan didukung penuh oleh MIKTI (Masyarakat Industri Kreatif TIK/Digital Indonesia). BEKUP bertujuan untuk meningkatkan jumlah startup berkualitas di Indonesia melalui peningkatan kapasitas para pendiri startup dengan keterampilan dan pengetahuan yang dibutuhkan dan pendampingan proses inovasi yang dilakukan oleh startup oleh mentor.</p>
                </div>
                <router-link class="btn btn-border btn-effect pull-right hidden-xs" to="/signup">Sign Up</router-link>
              </div>
            </div>
            <div class="col-md-4 col-md-offset-1 wow animated fadeInLeft">
              <!--
                                                                      <div class="recent-works">
                                                                              <h2 style="color:#fff"><b>Partners</b></h2>
                                                                              <div id="works">
                                                                                      <div class="work-item">
                                                      <h3>BEKRAF</h3>
                                                                                              <p>Badan Ekonomi Kreatif bertugas membantu presiden dalam merumuskan, menetapkan, mengoordinasikan, dan sinkronisasi kebijakan di bidang ekonomi kreatif.</p>
                                                                                      </div>
                                                                                      <div class="work-item">
                                                      <h3>MIKTI</h3>
                                                                                              <p>MIKTI adalah organisasi nirlaba yang berfungsi sebagai tempat berkumpul bagi semua orang yang peduli akan perkembangan Industri Kreatif Digital di Indonesia. MIKTI didirikan pada 16 Desember 2008.</p>
                                                                                      </div>
                                                                                      <div class="work-item">
                                                      <h3>DILo</h3>
                                                                                              <p>DILo (Digital Innovation Lounge) berfungsi sebagai ruang kerja bersama yang dapat di gunakan oleh digitalpreanur, juga menyediakan ruang meeting dan ruang kelas untuk mengadakan seminar/workshop</p>
                                                                                      </div>
                                                                              </div>
                                                                      </div>
              -->
              <div id="myCarousel" class="carousel slide" data-ride="carousel">
                <h2 style="color:#fff"><b>Partners</b></h2>
                <!-- Indicators -->

                <!-- Wrapper for slides -->
                <div class="carousel-inner">
                  <div class="item active">
                    <h3><img src="/img/slider/bekrap.png" style="width:25px"> BEKRAF</h3> 
                    <p>Badan Ekonomi Kreatif bertugas membantu presiden dalam merumuskan, menetapkan, mengoordinasikan, dan sinkronisasi kebijakan di bidang ekonomi kreatif.</p>
                  </div>

                  <div class="item">
                    <h3><img src="/img/slider/mikti.png" style="width:25px;;"> MIKTI</h3>
                    <p>MIKTI (Masyarakat Industri Kreatif Digital / TIK Indonesia) adalah organisasi nirlaba yang memiliki visi sebagai pembangun ekosistem industri digital di Indonesia. MIKTI telah aktif dalam berbagai inisiatif pembangunan ekosistem industri digital sejak 2008 dengan cakupan program nasional. </p>
                  </div>

<!--                  <div class="item">
                    <h3><img src="/img/slider/icondilov2.png" style="width:20px;"> DILo</h3>
                    <p>Jaringan Co-Working Space yang aktif mengembangkan kapasitas talenta industri digital sejak 2014 di 17 kota.</p>
                  </div>-->
                </div>

                <ol class="carousel-indicators" style="position: relative;top: 20px;">
                  <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                  <li data-target="#myCarousel" data-slide-to="1"></li>
                  <!--<li data-target="#myCarousel" data-slide-to="2"></li>-->
                </ol>
                <!-- Left and right controls -->
                <!--
                                            <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                                              <span class="glyphicon glyphicon-chevron-left"></span>
                                              <span class="sr-only">Previous</span>
                                            </a>
                                            <a class="right carousel-control" href="#myCarousel" data-slide="next">
                                              <span class="glyphicon glyphicon-chevron-right"></span>
                                              <span class="sr-only">Next</span>
                                            </a>
                -->
              </div>
            </div>

          </div>
        </div>
      </section>
      <!-- end about section -->


      <!-- Service section -->
      <section id="service" style="background: whitesmoke;">
        <div class="container">
          <div class="row">

            <div class="sec-title text-center">
              <h2 class="wow animated bounceInLeft">Fokus Program</h2>
              <p class="wow animated bounceInRight">Output dari program BEKUP adalah startup baru yang kuat dan andal, yaitu startup yang menawarkan inovasi yang memenuhi 3 kriteria: sesuai keinginan pengguna, layak secara bisnis dan memungkinkan untuk dikembangkan secara teknis.</p>
            </div>

            <div class="col-md-4 col-sm-6 col-xs-12 text-center wow animated zoomIn">
              <div class="service-item">
                <div class="service-icon">
                  <i class="fa fa-wrench fa-3x"></i>
                </div>
                <h3>Teknis</h3>
                <h5 style="font-style: italic;color:#adadad">Rencana Pengembangan Solusi</h5>
                <p style="text-align: justify">Ide bisnis yang telah tervalidasi sesuai dengan pengguna dan pasar harus dapat dikembangkan secara cepat dan sumberdaya yang terbatas. BEKUP akan membimbing startup untuk menentukan strategi dan proses pengembangan solusi yang sesuai dengan proses inovasi yang dijalani.</p>
              </div>
            </div>

            <div class="col-md-4 col-sm-6 col-xs-12 text-center wow animated zoomIn" data-wow-delay="0.3s">
              <div class="service-item">
                <div class="service-icon">
                  <i class="fa fa-line-chart fa-3x"></i>
                </div>
                <h3>Bisnis</h3>
                <h5 style="font-style: italic;color:#adadad">Kelayakan Finansial & Manajemen Resiko</h5>
                <p style="text-align: justify">Startup adalah entitas bisnis, sehingga faktor profitabilitas termasuk potensi pengembangan selalu menjadi perhatian utama. BEKUP akan membimbing startup dalam menganalisa pasar dan memilih strategi yang tepat, termasuk mitigasi resiko yang ada.</p>
              </div>
            </div>

            <div class="col-md-4 col-sm-6 col-xs-12 text-center wow animated zoomIn" data-wow-delay="0.6s">
              <div class="service-item">
                <div class="service-icon">
                  <i class="fa fa-paint-brush fa-3x"></i>
                </div>
                <h3>Desain</h3>
                <h5 style="font-style: italic;color:#adadad">Kesesuaian Pengguna</h5>
                <p style="text-align: justify">Apa yang menarik bagi inovator belum tentu sesuai dengan yang diharapkan oleh pengguna. Di program BEKUP, startup akan dibimbing dalam proses untuk mengenali calon penggunanya dengan baik sehingga dapat memberikan penawaran solusi yang tidak dapat ditolak oleh mereka.</p>
              </div>
            </div>

            <!--
                                                            <div class="col-md-3 col-sm-6 col-xs-12 text-center wow animated zoomIn" data-wow-delay="0.9s">
                                                                    <div class="service-item">
                                                                            <div class="service-icon">
                                                                                    <i class="fa fa-heart fa-3x"></i>
                                                                            </div>
                                                                            
                                                                            <h3>Web Security</h3>
                                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>							
                                                                    </div>
                                                            </div>
            -->

          </div>
        </div>
      </section>
      <!-- end Service section -->

      <!-- portfolio section -->
      <section id="portfolio">
        <div class="container">
          <div class="row">

            <div class="sec-title text-center wow animated fadeInDown">
              <h2>Community Partners</h2>

            </div>


            <ul class="project-wrapper wow animated fadeInUp">
              <li class="portfolio-item">
                <img src="img/portfolio/cgen2.png" class="img-responsive logocom">
              <figcaption class="mask">
                <h3>C GEN Indonesia</h3>
              </figcaption>
              <ul class="external">
                <li><a class="fancybox" title="C GEN Indonesia" data-fancybox-group="works" href="img/portfolio/cgen2.png"><i class="fa fa-search"></i></a></li>
                <li><a href=""><i class="fa fa-link"></i></a></li>
              </ul>
              </li>

              <li class="portfolio-item">
                <img src="img/portfolio/indux.png" class="img-responsive logocom">
              <figcaption class="mask">
                <h3>IND UX</h3>
              </figcaption>
              <ul class="external">
                <li><a class="fancybox" title="IND UX" href="img/portfolio/indux.png" data-fancybox-group="works" ><i class="fa fa-search"></i></a></li>
                <li><a href=""><i class="fa fa-link"></i></a></li>
              </ul>
              </li>

              <li class="portfolio-item">
                <img src="img/portfolio/mcf.png" class="img-responsive logocom">
              <figcaption class="mask">
                <h3>Malang Creative Fusion</h3>
              </figcaption>
              <ul class="external">
                <li><a class="fancybox" title="Malang Creative Fusion" data-fancybox-group="works" href="img/portfolio/mcf.png"><i class="fa fa-search"></i></a></li>
                <li><a href=""><i class="fa fa-link"></i></a></li>
              </ul>
              </li>

              <li class="portfolio-item">
                <img src="img/portfolio/mocap.png" class="img-responsive logocom">
              <figcaption class="mask">
                <h3>MOC - AP</h3>
              </figcaption>
              <ul class="external">
                <li><a class="fancybox" title="MOC - AP" data-fancybox-group="works" href="img/portfolio/mocap.png"><i class="fa fa-search"></i></a></li>
                <li><a href=""><i class="fa fa-link"></i></a></li>
              </ul>
              </li>

              <li class="portfolio-item">
                <img src="img/portfolio/msu-malang.png" class="img-responsive logocom">
              <figcaption class="mask">
                <h3>Komunitas SU Malang</h3>
              </figcaption>
              <ul class="external">
                <li><a class="fancybox" title="Komunitas SU Malang" data-fancybox-group="works" href="img/portfolio/msu-malang.png"><i class="fa fa-search"></i></a></li>
                <li><a href=""><i class="fa fa-link"></i></a></li>
              </ul>
              </li>

              <li class="portfolio-item">
                <img src="img/portfolio/rs-makassar.png" class="img-responsive logocom">
              <figcaption class="mask">
                <h3>RSI Makassar</h3>
              </figcaption>
              <ul class="external">
                <li><a class="fancybox" title="RSI Makassar" data-fancybox-group="works" href="img/portfolio/rs-makassar.png"><i class="fa fa-search"></i></a></li>
                <li><a href=""><i class="fa fa-link"></i></a></li>
              </ul>
              </li>

              <li class="portfolio-item">
                <img src="img/portfolio/startup-medan.png" class="img-responsive logocom">
              <figcaption class="mask">
                <h3>Startup Medan</h3>
              </figcaption>
              <ul class="external">
                <li><a class="fancybox" title="Startup Medan" data-fancybox-group="works" href="img/portfolio/startup-medan.png"><i class="fa fa-search"></i></a></li>
                <li><a href=""><i class="fa fa-link"></i></a></li>
              </ul>
              </li>

              <li class="portfolio-item">
                <img src="img/portfolio/su-makassar.png" class="img-responsive logocom">
              <figcaption class="mask">
                <h3>Startup Makassar</h3>
              </figcaption>
              <ul class="external">
                <li><a class="fancybox" title="Startup Makassar" data-fancybox-group="works" href="img/portfolio/su-makassar.png"><i class="fa fa-search"></i></a></li>
                <li><a href=""><i class="fa fa-link"></i></a></li>
              </ul>
              </li>

              <li class="portfolio-item">
                <img style="margin:0 auto" src="img/portfolio/WMA.jpg" class="img-responsive">
              <figcaption class="mask">
                <h3>World Merit Aceh</h3>
              </figcaption>
              <ul class="external">
                <li><a class="fancybox" title="World Merit Aceh" data-fancybox-group="works" href="img/portfolio/WMA.jpg"><i class="fa fa-search"></i></a></li>
                <li><a href=""><i class="fa fa-link"></i></a></li>
              </ul>
              </li>
            </ul>

          </div>
        </div>
      </section>
      <!-- end portfolio section -->

      <!-- Testimonial section -->

      <!-- end Testimonial section -->

      <!-- Price section -->

      <!-- end Price section -->

      <!-- Social section -->

      <!-- end Social section -->

      <!-- Contact section -->

      <!-- end Contact section -->


    </main>

    <footer id="footer">
      <div class="container">
        <div class="row text-center">
          <div class="footer-content">
            <div class="wow animated fadeInDown">
              <p>&copy; BEKUP 2018</p>
              <p>Build your digital Startup & GET BACK-UP !</p>
            </div>
            <!--
                                                            <form action="#" method="post" class="subscribe-form wow animated fadeInUp">
                                                                    <div class="input-field">
                                                                            <input type="email" class="subscribe form-control" placeholder="Enter Your Email...">
                                                                            <button type="submit" class="submit-icon">
                                                                                    <i class="fa fa-paper-plane fa-lg"></i>
                                                                            </button>
                                                                    </div>
                                                            </form>
            -->
            <!--
                                                            <div class="footer-social">
                                                                    <ul>
                                                                            <li class="wow animated zoomIn"><a href="#"><i class="fa fa-thumbs-up fa-3x"></i></a></li>
                                                                            <li class="wow animated zoomIn" data-wow-delay="0.3s"><a href="#"><i class="fa fa-twitter fa-3x"></i></a></li>
                                                                            <li class="wow animated zoomIn" data-wow-delay="0.6s"><a href="#"><i class="fa fa-skype fa-3x"></i></a></li>
                                                                            <li class="wow animated zoomIn" data-wow-delay="0.9s"><a href="#"><i class="fa fa-dribbble fa-3x"></i></a></li>
                                                                            <li class="wow animated zoomIn" data-wow-delay="1.2s"><a href="#"><i class="fa fa-youtube fa-3x"></i></a></li>
                                                                    </ul>
                                                            </div>
            -->
            <router-link class="btn btn-blue btn-effect" to="/signup">Sign Up</router-link>
          </div>
        </div>
      </div>
    </footer>
  </div>

</template>

<script scoped>   
export default {
  name: 'index',
  data () {
    return {

    }
  },
  created: function () {
//    this.reload()
//      let jque = document.createElement('script')
//      jque.setAttribute('src', '/dashboard/js/plugins/jQuery/jQuery-2.2.0.min.js')
//      document.head.appendChild(jque)
//      let java = document.createElement('script')
//      java.setAttribute('src', '/js/jquery.singlePageNav.min.js')
//      document.head.appendChild(java)
//      let javab = document.createElement('script')
//      javab.setAttribute('src', '/js/jquery.slitslider.js')
//      document.head.appendChild(javab)
    },
  methods: {
//      reload: function () {
//          $(window).bind("pageshow", function(event) {
//                if (event.originalEvent.persisted) {
//                    window.location.reload(); 
//                }
//            });
//          alert('jalan')
      }
  }

</script>

<style lang="scss" scoped>
    .new {
        display: block;
        margin: 0;
        padding: 0;
        border: none;
        font: 0/0 a;
        text-shadow: none;
        color: transparent;
        width: 188px;
        height: 48px;
        background: url(/img/logo.png) no-repeat center;
        -webkit-transition: all 0.5s ease-in-out;
        -ms-transition: all 0.5s ease-in-out;
        transition: all 0.5s ease-in-out;
        background-size: 120px;
    }
    .logocom {
        width: 200px;
        margin: 0 auto;
    }
    .navbar-collapse {
        border-color: #fff !important;
    }
    .navbar-toggle {
        margin-right: 30px;
    }
    
/*    @import '../assets/external-css/bootstrap.css';  */
    
    @import '/css/font-awesome.min.css';
    @import '/css/jquery.fancybox.css';
    @import '/css/bootstrap.min.css';
    @import '/css/owl.carousel.css';
    @import '/css/slit-slider.css';
    @import '/css/animate.css';
    @import '/css/main.css';
    
 
</style>

