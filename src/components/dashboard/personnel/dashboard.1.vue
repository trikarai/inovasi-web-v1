<template>

  <div>
    <section class="content">
      <div class="container-fluid">

        <div class="row">
          <!--           <div v-if="data.invitation_count != '0'" class="alert alert-info" @click="$router.replace('/talent/team/membership')">
                       <strong>Info!</strong> You got '<b>{{data.invitation_count}}</b>' team invitation.
                     </div>-->

          <div class="col-lg-3 col-sm-6">
            <div class="col-md-12">

              <div class="carddb">

                <div class="content-carddb">
                  <div class="row">

                    <div class="col-xs-5">
                      <div class="icon-big icon-bekup text-center">
                        <!-- <i class="fa fa-address-card" aria-hidden="true"></i> -->
                        <div><i class="fa fa-user"></i></div>
                      </div>
                    </div>
                    <div class="col-xs-7">
                      <div class="numbers">
                        <p>Profil</p>
                        Profile
                      </div>
                    </div>
                  </div>
                  <div class="footer">
                    <hr />
                    <div class="stats">
                      <i class="fa fa-search"></i>
                      <router-link to="/personnel/profile" class="info-a link link--kumya">
                        <span style="font-size:9px" data-letters="View Profile">
                          View Profile 
                        </span>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="col-lg-3 col-sm-6">
            <div class="col-md-12">
              <div class="carddb">
                <div class="content-carddb">
                  <div class="row">
                    <div class="col-xs-5">
                      <div class="icon-big icon-bekup text-center">
                         <i class="fa fa-user-secret" aria-hidden="true"></i> 
<!--                        <div><i class="fa fa-users"></i></div>-->
                      </div>
                    </div>
                    <div class="col-xs-7">
                      <div class="numbers">
                        <p>Koordinator</p>
                        <span style="position: relative;right: 19px;">Coordinator</span>
                      </div>
                    </div>
                  </div>
                  <div class="footer">
                    <hr />
                    <div class="stats">
                      <i class="fa fa-search"></i>
                      <router-link to="/coordinator/programme" class="info-a link link--kumya">
                        <span style="font-size:9px" data-letters="View Assigned Program">
                          View Assigned Program
                        </span>
                      </router-link>                       
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
            
        <div class="col-lg-3 col-sm-6">
            <div class="col-md-12">
              <div class="carddb">
                <div class="content-carddb">
                  <div class="row">
                    <div class="col-xs-5">
                      <div class="icon-big icon-bekup text-center">
                         <i class="fa fa-user-circle" aria-hidden="true"></i> 
<!--                        <div><i class="fa fa-users"></i></div>-->
                      </div>
                    </div>
                    <div class="col-xs-7">
                      <div class="numbers">
                        <p>Mentor</p>
                        <span>Mentor</span>
                      </div>
                    </div>
                  </div>
                  <div class="footer">
                    <hr />
                    <div class="stats">
                      <i class="fa fa-search"></i>
                      <router-link to="/tutor/programme" class="info-a link link--kumya">
                        <span style="font-size:9px" data-letters="View Assigned Program">
                          View Assigned Program
                        </span>
                      </router-link>                       
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>


        </div>


      </div> 
    </section>
  </div>

</template>

<script>
import auth from '@/httpcontrol'

export default {
    name:'dashboard',
    data: function () {
      return {
        data: ''
      }
    },
    created: function () {
    }
}
</script>