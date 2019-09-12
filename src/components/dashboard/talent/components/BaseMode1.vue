<template>
  <div class="overlay carddb" style="padding: 30px; margin-top: 15px;overflow: hidden !important">
    <div style="padding: 30px">
      <div class="row">
        <div class="col-md-3" style="padding: 20px;">
          Lengkapi Profil-mu &
          <br>Bergabung dalam Tim
        </div>
        <div class="col-md-9">
          <div style="display: -webkit-inline-box;">
            <div>
              <a 
                class="bunder"
                href="javascript:void(0);"
                
                data-trigger="focus"
                data-toggle="popover1"
                data-placement="bottom"
                data-title="Lengkapi Profilmu"
                data-html="true">
                Langkah <b>1</b>
              </a>
              <div class="judulbunder" style="margin-left: 22px">
                <button
                  id="popover1"
                  class="btn btn-sm btn-default"
                  data-trigger="focus"
                  data-toggle="popover1"
                  data-placement="right"
                  data-title="Lengkapi Profilmu"
                  data-html="true"
                >Profil</button>

                <div id="popper-content1" class="hide popper-content">
                  <p>Investor, Mentor, dan Inkubator sangat menganggap penting profil pendiri Startup, oleh karena itu isi secara lengkap dan akurat.</p>
                  <router-link
                    :to="'/talent/profile'"
                    class="btn btn-sm btn-primary"
                    style="width: 100%"
                  >Isi Profil</router-link>
                </div>
              </div>
            </div>
            <div style="padding: 15px;">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 46 70"
                width="46"
                height="70"
              >
                <defs>
                  <path d="M0 32.55L30.64 32.55L30.64 37.45L0 37.45L0 32.55Z" id="d1DgVRWa0s"></path>
                  <path
                    d="M37.63 38.49L30.64 41.98L30.64 35L30.64 28.02L37.63 31.51L44.61 35L37.63 38.49Z"
                    id="a9FQNsfLSr"
                  ></path>
                </defs>
                <g>
                  <g>
                    <g>
                      <use xlink:href="#d1DgVRWa0s" opacity="1" fill="#b9b9b9" fill-opacity="1"></use>
                      <g>
                        <use
                          xlink:href="#d1DgVRWa0s"
                          opacity="1"
                          fill-opacity="0"
                          stroke="#b9b9b9"
                          stroke-width="1"
                          stroke-opacity="1"
                        ></use>
                      </g>
                    </g>
                    <g>
                      <use xlink:href="#a9FQNsfLSr" opacity="1" fill="#b9b9b9" fill-opacity="1"></use>
                      <g>
                        <use
                          xlink:href="#a9FQNsfLSr"
                          opacity="1"
                          fill-opacity="0"
                          stroke="#b9b9b9"
                          stroke-width="1"
                          stroke-opacity="1"
                        ></use>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <!--start team-->
            <div>
              <a v-if="teamId != ''"
                  class="bunder"
                  href="javascript:void(0);"
                  
                  data-placement="bottom"
                  data-trigger="focus"
                  data-original-title="Bergabung dalam Tim">
               Langkah <b>2</b>
              </a>
              <div class="abunder" v-else>
                Langkah <b>2</b>
              </div>

              <div class="judulbunder" style="margin-left: 30px;">
                <button
                  class="btn btn-sm btn-default"
                  id="popover2"
                  data-placement="right"
                  data-trigger="focus"
                  data-original-title="Bergabung dalam Tim"
                >Tim</button>

                <div id="popper-content2" class="hide popper-content">
                  <p> Anda dapat membuat tim sendiri dan mengundang teman untuk bergabung ataupun diundang oleh tim leader anda.</p>
                  <div style="display: ;">
                    <router-link
                      v-bind:to="'/talent/team/create'"
                      class="btn btn-sm btn-success"
                      style="width: 100%"
                    >Buat Tim Baru</router-link>
                    <router-link
                      v-bind:to="'/talent/team/membership'"
                      class="btn btn-sm btn-primary"
                      style="width: 100%;margin-top:5px;"
                    >
                      <b class="buledund">{{invitationCount}}</b> Undangan
                    </router-link>
                    <br>
                    <router-link
                      v-if="teamId != ''"
                      style="width:100%;margin-top:5px;"
                      class="btn btn-sm btn-default"
                      v-bind:to="'/team/'+ teamId + '/browse'"
                    >
                      <i class="fa fa-plus"></i> Tambah Anggota
                    </router-link>
                  </div>
                </div>
              </div>
            </div>

            <div style="padding: 15px;">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 46 70"
                width="46"
                height="70"
              >
                <defs>
                  <path d="M0 32.55L30.64 32.55L30.64 37.45L0 37.45L0 32.55Z" id="d1DgVRWa0s"></path>
                  <path
                    d="M37.63 38.49L30.64 41.98L30.64 35L30.64 28.02L37.63 31.51L44.61 35L37.63 38.49Z"
                    id="a9FQNsfLSr"
                  ></path>
                </defs>
                <g>
                  <g>
                    <g>
                      <use xlink:href="#d1DgVRWa0s" opacity="1" fill="#b9b9b9" fill-opacity="1"></use>
                      <g>
                        <use
                          xlink:href="#d1DgVRWa0s"
                          opacity="1"
                          fill-opacity="0"
                          stroke="#b9b9b9"
                          stroke-width="1"
                          stroke-opacity="1"
                        ></use>
                      </g>
                    </g>
                    <g>
                      <use xlink:href="#a9FQNsfLSr" opacity="1" fill="#b9b9b9" fill-opacity="1"></use>
                      <g>
                        <use
                          xlink:href="#a9FQNsfLSr"
                          opacity="1"
                          fill-opacity="0"
                          stroke="#b9b9b9"
                          stroke-width="1"
                          stroke-opacity="1"
                        ></use>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div>
              <template v-if="loadingProgram">
                <img src="/img/Ellipsis-1s-100px.svg">
              </template>
              <div v-bind:class="{displaying : loadingProgram}">
                <template v-if="dataProgram.total != 0">
                  <a v-if="teamId != ''" 
                    class="bunder"
                    href="#"
                    id="popover3"
                    data-placement="bottom"
                    data-trigger="focus"
                    data-original-title="Bergabung dalam Program">
                    Langkah <b>3</b>
                  </a>
                  <div v-else class="abunder">
                    <div>
                      Langkah <b>3</b>
                    </div>
                  </div>
                </template>
                <div v-else class="abunder">
                  <template v-if="dataProgram.total == 0">
                    <div class="warnstep">
                      <i class="fa fa-warning"></i> Langkah ini terlewat
                    </div>
                    <span style="position: relative;bottom: 18px;">
                     Langkah 3
                    </span>
                  </template>
                  <template v-else>
                    <div>
                      Langkah 3
                    </div>
                  </template>
                </div>
              </div>

              <div class="judulbunder" style="margin-left: 15px;">
                <button
                  v-if="teamId != ''"
                  id="popover3"
                  class="btn btn-sm btn-default"
                  rel="popover3"
                  data-placement="right"
                  data-trigger="focus"
                  data-original-title="Bergabung dalam Program"
                >Program</button>
                <button v-else disabled class="btn btn-sm btn-default">Program</button>

                <div id="popper-content3" class="hide popper-content">
                  <p>Jika anda adalah tim leader, daftarkan tim anda ke dalam program yang tersedia. Program berfungsi sebagai wadah untuk mengembangkan startup kalian. Setiap program mungkin memiliki kurikulum dan mentor yang berbeda. Pilihlah program yang sesuai dengan Startup anda.</p>
                  <router-link
                    v-bind:to="{name: 'Daftar Program', params: {teamId: teamId}}"
                    class="btn btn-sm btn-primary"
                    style="width: 100%"
                  >Daftar Program</router-link>
                  <router-link
                    v-bind:to="{name: 'Partisipasi Program', params: {teamId: teamId}}"
                    class="btn btn-sm btn-info"
                    style="width: 100%; margin-top: 5px"
                  >Partisipasi Program</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-left: 30px;margin-top: 20px;">
        <div class="col-md-3"></div>
        <div class="col-md-9">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 375 77"
            width="375"
            height="77"
          >
            <defs>
              <path d="M15.2 21.14L375 21.14L375 25.85L15.2 25.85L15.2 21.14Z" id="czN929Yzk"></path>
              <path d="M15.2 25.85L15.2 47.84L19.18 47.84L19.18 25.85L15.2 25.85Z" id="c4nu677DMY"></path>
              <path
                d="M12.82 56.57L8.46 47.84L17.19 47.84L25.91 47.84L21.55 56.57L17.19 65.29L12.82 56.57Z"
                id="eTBdAi2TV"
              ></path>
              <path d="M371.02 0L371.02 22L375 22L375 0L371.02 0Z" id="h1VLl7Vt2X"></path>
            </defs>
            <g>
              <g>
                <g>
                  <use xlink:href="#czN929Yzk" opacity="1" fill="#b9b9b9" fill-opacity="1"></use>
                  <g>
                    <use
                      xlink:href="#czN929Yzk"
                      opacity="1"
                      fill-opacity="0"
                      stroke="#b9b9b9"
                      stroke-width="1"
                      stroke-opacity="1"
                    ></use>
                  </g>
                </g>
                <g>
                  <use xlink:href="#c4nu677DMY" opacity="1" fill="#b9b9b9" fill-opacity="1"></use>
                  <g>
                    <use
                      xlink:href="#c4nu677DMY"
                      opacity="1"
                      fill-opacity="0"
                      stroke="#b9b9b9"
                      stroke-width="1"
                      stroke-opacity="1"
                    ></use>
                  </g>
                </g>
                <g>
                  <use xlink:href="#eTBdAi2TV" opacity="1" fill="#b9b9b9" fill-opacity="1"></use>
                  <g>
                    <use
                      xlink:href="#eTBdAi2TV"
                      opacity="1"
                      fill-opacity="0"
                      stroke="#b9b9b9"
                      stroke-width="1"
                      stroke-opacity="1"
                    ></use>
                  </g>
                </g>
                <g>
                  <use xlink:href="#h1VLl7Vt2X" opacity="1" fill="#b9b9b9" fill-opacity="1"></use>
                  <g>
                    <use
                      xlink:href="#h1VLl7Vt2X"
                      opacity="1"
                      fill-opacity="0"
                      stroke="#b9b9b9"
                      stroke-width="1"
                      stroke-opacity="1"
                    ></use>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div class="row" style="margin-top: 10px;">
        <div class="col-md-3" style="padding: 20px;padding-top: 38px;">Tuliskan IDE kalian</div>
        <div class="col-md-9">
          <div style="display: -webkit-inline-box;">
            <template v-if="loadingIdea">
              <img src="/img/Ellipsis-1s-100px.svg">
            </template>
            <div :class="{displaying : loadingIdea}">
              <div class="abunder" v-if="dataIdea.total === 0">
                Langkah
                <b>4</b>
              </div>
              <a class="bunder" v-else>
                Langkah
                <b>4</b>
              </a>

              <div class="judulbunder" style="margin-left: 30px;">
                <!-- <template v-if="teamId != ''">
                <button   
                  :class="{isHidden: dataIdea.total > 0}"
                  id="popover4"
                  class="btn btn-sm btn-default"
                  data-placement="right"
                  data-trigger="focus"
                  data-original-title="Tuliskan Ide Kalian"
                >Ide
                </button>    
                </template> -->
                <button
                  v-if="teamId != ''"
                  id="popover4"
                  class="btn btn-sm btn-default"
                  data-placement="right"
                  data-trigger="focus"
                  data-original-title="Tuliskan Ide Kalian"
                >Ide
                </button>
                <button v-else disabled class="btn btn-sm btn-default">Ide</button>
                <template v-if="dataIdea.total > 0">
                  <br>
                  <select class="pilihCS" v-model="ideaId">
                    <!-- <option value disabled>Select Idea</option> -->
                    <option
                      v-for="(idea, index) in dataIdea.list"
                      :value="idea.id"
                      v-bind:selected="idea.is_main_idea"
                    >{{idea.name}}</option>
                  </select>
                  <br>
                  <template v-if="dataIdea.total > 1">
                    <router-link
                      class="btn btn-sm btn-default"
                      style="margin-top: 3px;font-size: 10px;"
                      v-bind:to="'/team/'+teamId+'/idea/'+ideaId+ '/cs'"
                    >
                      <i class="fa fa-eye"></i>
                    </router-link>
                    <router-link
                      v-bind:to="'/team/'+teamId+'/idea'"
                      class="btn btn-sm btn-primary"
                      style="margin-top: 3px;font-size: 10px;"
                    >
                      <i class="fa fa-plus"></i>
                    </router-link>
                  </template>
                </template>
                <template v-else>
                  <br>
                  <div
                    class="pilihCS"
                    style="text-align: center;background: #ffb72f;color: #fff;"
                  >No Idea Found</div>
                </template>

                <div id="popper-content4" class="hide popper-content">
                  <p>
                     Ide merupakan landasan untuk Startup anda. Tuliskan ide anda dan lengkapi dengan elevator pitch yang baik. 
                    <br>
                    <b>Hint:</b> Elevator pitch adalah sebuah ringkasan mengenai ide anda sehingga terlihat menarik dan mudah dimengerti.
                  </p>
                  <router-link
                    v-bind:to="'/team/'+teamId+'/idea'"
                    class="btn btn-sm btn-primary"
                    style="width: 100%"
                  >Tulis Ide</router-link>
                </div>
              </div>
            </div>
            <div style="padding: 15px;">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 46 70"
                width="46"
                height="70"
              >
                <defs>
                  <path d="M0 32.55L30.64 32.55L30.64 37.45L0 37.45L0 32.55Z" id="d1DgVRWa0s"></path>
                  <path
                    d="M37.63 38.49L30.64 41.98L30.64 35L30.64 28.02L37.63 31.51L44.61 35L37.63 38.49Z"
                    id="a9FQNsfLSr"
                  ></path>
                </defs>
                <g>
                  <g>
                    <g>
                      <use xlink:href="#d1DgVRWa0s" opacity="1" fill="#b9b9b9" fill-opacity="1"></use>
                      <g>
                        <use
                          xlink:href="#d1DgVRWa0s"
                          opacity="1"
                          fill-opacity="0"
                          stroke="#b9b9b9"
                          stroke-width="1"
                          stroke-opacity="1"
                        ></use>
                      </g>
                    </g>
                    <g>
                      <use xlink:href="#a9FQNsfLSr" opacity="1" fill="#b9b9b9" fill-opacity="1"></use>
                      <g>
                        <use
                          xlink:href="#a9FQNsfLSr"
                          opacity="1"
                          fill-opacity="0"
                          stroke="#b9b9b9"
                          stroke-width="1"
                          stroke-opacity="1"
                        ></use>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <template v-if="loadingCS">
              <img src="/img/Ellipsis-1s-100px.svg">
            </template>
            <div v-bind:class="{displaying : loadingCS}">
              <div class="abunder" v-if="dataCustomerSegments.total === 0">
                Langkah
                <b>5</b>
              </div>
              <div class="bunder" v-else>
                Langkah
                <b>5</b>
              </div>

              <div class="judulbunder">
                <button
                  v-bind:disabled="dataIdea.total === 0"
                  class="btn btn-sm btn-default"
                  id="popover5"
                  data-placement="right"
                  data-trigger="focus"
                  data-original-title="Tentukan Tipe Pengguna"
                >Tipe Pengguna</button>

                <template v-if="dataCustomerSegments.total > 0">
                  <br>
                  <select class="pilihCS" v-model="csId">
                    <!-- <option value disabled>Select CS</option> -->
                    <option v-for="cs in dataCustomerSegments.list" :value="cs.id">{{cs.name}}</option>
                  </select>
                  <br>
                  <router-link
                    class="btn btn-sm btn-default"
                    style="margin-top: 3px;font-size: 10px;"
                    v-bind:to="'/team/'+teamId+'/idea/'+ideaId+ '/cs/' + csId + '/persona'"
                  >
                    <i class="fa fa-eye"></i>
                  </router-link>
                  <router-link
                    v-bind:to="'/team/'+teamId+'/idea/' + ideaId + '/cs'"
                    class="btn btn-sm btn-primary"
                    style="margin-top: 3px;font-size: 10px;"
                  >
                    <i class="fa fa-plus"></i>
                  </router-link>
                  <br>
                </template>
                <template v-else>
                  <br>
                  <div
                    class="pilihCS"
                    style="text-align: center;background: #ffb72f;color: #fff;"
                  >No CS Found</div>
                </template>

                <div id="popper-content5" class="hide popper-content">
                  <p>
                    Tipe pengguna adalah jenis-jenis pengguna produk/jasa anda yang nantinya akan dikelompokan menjadi segmen pelanggan yang lebih spesifik
                    <br>
                    <b>Hint:</b> Untuk membantu kalian dalam memahami Tipe Pengguna, kami menyediakan materi untuk kalian baca.
                  </p>
                  <router-link
                    v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/'"
                    class="btn btn-sm btn-primary"
                    style="width: 100%"
                  >Isi Tipe Pengguna</router-link>
                </div>
              </div>
            </div>

            <div style="padding: 15px;">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 46 70"
                width="46"
                height="70"
              >
                <defs>
                  <path d="M0 32.55L30.64 32.55L30.64 37.45L0 37.45L0 32.55Z" id="d1DgVRWa0s"></path>
                  <path
                    d="M37.63 38.49L30.64 41.98L30.64 35L30.64 28.02L37.63 31.51L44.61 35L37.63 38.49Z"
                    id="a9FQNsfLSr"
                  ></path>
                </defs>
                <g>
                  <g>
                    <g>
                      <use xlink:href="#d1DgVRWa0s" opacity="1" fill="#b9b9b9" fill-opacity="1"></use>
                      <g>
                        <use
                          xlink:href="#d1DgVRWa0s"
                          opacity="1"
                          fill-opacity="0"
                          stroke="#b9b9b9"
                          stroke-width="1"
                          stroke-opacity="1"
                        ></use>
                      </g>
                    </g>
                    <g>
                      <use xlink:href="#a9FQNsfLSr" opacity="1" fill="#b9b9b9" fill-opacity="1"></use>
                      <g>
                        <use
                          xlink:href="#a9FQNsfLSr"
                          opacity="1"
                          fill-opacity="0"
                          stroke="#b9b9b9"
                          stroke-width="1"
                          stroke-opacity="1"
                        ></use>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <template v-if="loadingPersona">
              <img src="/img/Ellipsis-1s-100px.svg">
            </template>
            <div v-bind:class="{displaying : loadingPersona}"> 
              <div class="abunder" style="position: relative;left: 28px;" v-if="dataPersona.total === 0">
                Langkah
                <b>6</b>
              </div>
              <div style="position: relative;left: 28px;" class="bunder" v-else>
                Langkah
                <b>6</b>
              </div>

              <div class="judulbunder" style="margin-left: 17px;">
                <button
                  :disabled="dataCustomerSegments.total === 0"
                  id="popover6"
                  class="btn btn-sm btn-default"
                  rel="popover6"
                  data-placement="right"
                  data-trigger="focus"
                  data-original-title="Isi Segmen Pelanggan"
                >Segmen Pelanggan</button>
                <template v-if="dataPersona.total > 0">
                  <br>
                  <select class="pilihCS" v-model="personaId">
                    <option
                      v-for="(persona, index) in dataPersona.list"
                      :value="persona.id"
                      v-bind:selected="persona.is_main_persona"
                    >{{persona.name}}</option>
                  </select>
                  <br>
                  <router-link
                    class="btn btn-sm btn-default"
                    style="margin-top: 3px;font-size: 10px;"
                    v-bind:to="'/team/'+teamId+'/idea/'+ideaId+ '/cs/' + csId + '/persona/' + personaId + '/vp'"
                  >
                    <i class="fa fa-eye"></i>
                  </router-link>
                  <router-link
                    v-bind:to="'/team/'+teamId+'/idea/' + ideaId + '/cs/' + csId + '/persona'"
                    class="btn btn-sm btn-primary"
                    style="margin-top: 3px;font-size: 10px;"
                  >
                    <i class="fa fa-plus"></i>
                  </router-link>
                </template>
                <template v-else>
                  <br>
                  <div
                    class="pilihCS"
                    style="text-align: center;background: #ffb72f;color: #fff;"
                  >Segmen Pelanggan Not Found</div>
                </template>

                <div id="popper-content6" class="hide popper-content">
                  <p>
                     Segmen Pelanggan adalah jenis pelanggan yang nantinya akan anda layani.
                    <br>
                    <b>Hint:</b> Untuk mempermudah dalam mengisi form yang disediakan, kami menyediakan materi terkait Segmen Pelanggan
                  </p>
                  <router-link
                    v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' +csId + '/persona/'"
                    class="btn btn-sm btn-primary"
                    style="width: 100%"
                  >Isi Segment Pelanggan</router-link>
                </div>
              </div>
            </div>
            <div style="padding: 15px;">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 46 70"
                width="46"
                height="70"
              >
                <defs>
                  <path d="M0 32.55L30.64 32.55L30.64 37.45L0 37.45L0 32.55Z" id="d1DgVRWa0s"></path>
                  <path
                    d="M37.63 38.49L30.64 41.98L30.64 35L30.64 28.02L37.63 31.51L44.61 35L37.63 38.49Z"
                    id="a9FQNsfLSr"
                  ></path>
                </defs>
                <g>
                  <g>
                    <g>
                      <use xlink:href="#d1DgVRWa0s" opacity="1" fill="#b9b9b9" fill-opacity="1"></use>
                      <g>
                        <use
                          xlink:href="#d1DgVRWa0s"
                          opacity="1"
                          fill-opacity="0"
                          stroke="#b9b9b9"
                          stroke-width="1"
                          stroke-opacity="1"
                        ></use>
                      </g>
                    </g>
                    <g>
                      <use xlink:href="#a9FQNsfLSr" opacity="1" fill="#b9b9b9" fill-opacity="1"></use>
                      <g>
                        <use
                          xlink:href="#a9FQNsfLSr"
                          opacity="1"
                          fill-opacity="0"
                          stroke="#b9b9b9"
                          stroke-width="1"
                          stroke-opacity="1"
                        ></use>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <template v-if="loadingVP">
              <img src="/img/Ellipsis-1s-100px.svg">
            </template>
            <div :class="{displaying : loadingVP}">
              <div class="abunder" v-if="dataVP.total === 0">
                Langkah
                <b>7</b>
              </div>
              <div class="bunder" v-else>
                Langkah
                <b>7</b>
              </div>

              <div class="judulbunder">
                <button
                  :disabled="dataPersona.total === 0"
                  id="popover7"
                  class="btn btn-sm btn-default"
                  data-placement="left"
                  data-trigger="focus"
                  data-original-title="Isi Value Proposition"
                >Value Proposition</button>
                <template v-if="dataVP.total > 0">
                  <br>
                  <select class="pilihCS" v-model="vpId">
                    <option
                      v-for="(vp, index) in dataVP.list"
                      :value="vp.id"
                      v-bind:selected="vp.is_active"
                    >{{vp.description}}</option>
                  </select>
                </template>
                <template v-else>
                  <br>
                  <div
                    class="pilihCS"
                    style="text-align: center;background: #ffb72f;color: #fff;"
                  >No VP Found</div>
                </template>

                <div id="popper-content7" class="hide popper-content">
                  <p>
                    Tuliskan Value Proposition yang ingin kalian sampaikan kepada Customer melalui ide kalian.
                    <br>
                    <b>Hint:</b>  Value Proposition adalah sebuah pernyataan terkait value yang akan diperoleh oleh pelanggan dengan menggunakan produk/jasa anda. Isinya dapat berupa manfaat-manfaat yang akan diperoleh pelanggan. Selain menjelaskan manfaat, Value Proposition yang baik juga menjelaskan mengapa produk/jasa anda lebih baik dibandingkan dengan kompetitor.
                  </p>
                  <router-link
                    v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + csId + '/persona/' + personaId + '/vp/'"
                    class="btn btn-sm btn-primary"
                    style="width: 100%"
                  >Isi Value Proposition</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row" style="margin-left: 30px;margin-top: 20px;">
        <div class="col-md-3"></div>
        <div class="col-md-9">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 578 77"
            width="578"
            height="77"
          >
            <defs>
              <path d="M15.2 21.14L559.82 21.14L559.82 25.85L15.2 25.85L15.2 21.14Z" id="fuPFuD07"></path>
              <path d="M15.2 25.85L15.2 47.84L19.18 47.84L19.18 25.85L15.2 25.85Z" id="c4nu677DMY"></path>
              <path
                d="M12.82 56.57L8.46 47.84L17.19 47.84L25.91 47.84L21.55 56.57L17.19 65.29L12.82 56.57Z"
                id="eTBdAi2TV"
              ></path>
              <path
                d="M555.84 -0.86L555.84 21.14L559.82 21.14L559.82 -0.86L555.84 -0.86Z"
                id="cjwRtss3f"
              ></path>
            </defs>
            <g>
              <g>
                <g>
                  <use xlink:href="#fuPFuD07" opacity="1" fill="#b9b9b9" fill-opacity="1"></use>
                  <g>
                    <use
                      xlink:href="#fuPFuD07"
                      opacity="1"
                      fill-opacity="0"
                      stroke="#b9b9b9"
                      stroke-width="1"
                      stroke-opacity="1"
                    ></use>
                  </g>
                </g>
                <g>
                  <use xlink:href="#c4nu677DMY" opacity="1" fill="#b9b9b9" fill-opacity="1"></use>
                  <g>
                    <use
                      xlink:href="#c4nu677DMY"
                      opacity="1"
                      fill-opacity="0"
                      stroke="#b9b9b9"
                      stroke-width="1"
                      stroke-opacity="1"
                    ></use>
                  </g>
                </g>
                <g>
                  <use xlink:href="#eTBdAi2TV" opacity="1" fill="#b9b9b9" fill-opacity="1"></use>
                  <g>
                    <use
                      xlink:href="#eTBdAi2TV"
                      opacity="1"
                      fill-opacity="0"
                      stroke="#b9b9b9"
                      stroke-width="1"
                      stroke-opacity="1"
                    ></use>
                  </g>
                </g>
                <g>
                  <use xlink:href="#cjwRtss3f" opacity="1" fill="#b9b9b9" fill-opacity="1"></use>
                  <g>
                    <use
                      xlink:href="#cjwRtss3f"
                      opacity="1"
                      fill-opacity="0"
                      stroke="#b9b9b9"
                      stroke-width="1"
                      stroke-opacity="1"
                    ></use>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>

      <!-- start ketiga-->
      <div class="row ketiga">
        <div class="col-md-3" style="padding: 20px;">
          Lengkapi Analisa Bisnis &
          <br>Analisis Pasar
        </div>
        <!--start colum-->
        <div class="col-md-9">
          <div style="display: -webkit-inline-box;">
            <div>
              <div class="abunder" v-if="dataVP.total === 0">
                Langkah
                <b>8</b>
              </div>
              <div class="bbunder" v-else>
                Langkah
                <b>8</b>
              </div>

              <div class="judulbunder">
                <!-- start button-->

                <button
                  :disabled="dataVP.total === 0"
                  id="popover8"
                  class="btn btn-sm btn-default"
                  data-content
                  data-placement="right"
                  data-trigger="focus"
                  data-original-title="Lengkapi Analisa Bisnis"
                >Analisa Bisnis</button>

                <!-- start button-->

                <div id="popper-content8" class="hide popper-content">
                  <p>
                    Untuk mendukung ide yang kalian buat, perlu adanya Analisa bisnis yang baik. Terdapat beberapa Analisa bisnis yang dapat kalian isi.
                    <br>
                    <b>Hint:</b> Untuk memudahkan kalian dalam memahami setiap tools Analisa bisnis yang kami sediakan, kami menyediakan materi pada setiap Analisa bisnis.
                  </p>
                  <router-link
                    v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + csId + '/persona/' + personaId + '/vp/' + vpId + '/businessstructure' "
                    class="btn btn-sm btn-primary"
                    style="width: 100%"
                  >Isi Analisa Bisnis</router-link>
                </div>
              </div>
            </div>

            <div style="padding: 15px;">
              
            </div>
            <div style="display: none">
              <div class="abunder" v-if="dataVP.total === 0">
                Langkah
                <b>9</b>
              </div>
              <div class="bbunder" v-else>
                Langkah
                <b>9</b>
              </div>

              <div class="judulbunder" style="margin-left: 10px; display:none">
                <!-- start button-->
                <button
                  :disabled="dataVP.total === 0"
                  id="popover9"
                  class="btn btn-sm btn-default"
                  rel="popover"
                  data-placement="right"
                  data-trigger="focus"
                  data-original-title="Validasi Ide Kalian"
                >Competitor</button>

                <!-- end button-->

                <div id="popper-content9" class="hide popper-content">
                  <p>
                    Untuk mengetahui viability dari ide kalian diperlukan analisis terhadap competitor dengan solusi terdekat dan membandingkan sebaik apa performa mereka dan bagaimana mereka mempengaruhi idemu.
                    <br>
                    <b>Hint</b>: Untuk memudahkan kalian dalam memahami setiap tools Analisa pasar yang kami sediakan, kami menyediakan materi pada setiap Analisa pasar.
                  </p>
                  <router-link
                    v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + csId + '/persona/' + personaId + '/vp/' + vpId + '/competitor' "
                    class="btn btn-sm btn-primary"
                    style="width: 100%"
                  >Isi Data Kompetitor</router-link>
                </div>
              </div>
            </div>
            <!--start mentoring-->
            <div style="position: relative;left: 353px;width: 270px;">
              <template v-if="dataProgram.total !== 0">
                <div class="mbunder">
                  <i
                    class="fa fa-comments"
                    style="font-size: 40px;position: relative;bottom: 10px;"
                  ></i>
                </div>
              </template>
              <div class="abunder" v-else>
                <i class="fa fa-comments" style="font-size: 40px;position: relative;bottom: 10px;"></i>
              </div>

              <div class="judulbunder" style="margin-left: 16px;">
                <button
                  :disabled="dataProgram.total === 0"
                  id="popover11"
                  class="btn btn-sm btn-default"
                  data-placement="left"
                  data-trigger="focus"
                  data-original-title="Mentoring"
                >Mentoring</button>

                <div id="popper-content11" class="hide popper-content">
                  <p>
                    <b>MIKTI Start</b> menyediakan Mentoring bagi Startup yang telah mengisi hingga Value Proposition, sehingga Mentor dapat lebih mudah mengerti apa yang akan kalian buat dan dapat membantu kalian dalam menyempurnakan ide.
                    <br>
                    <b>Hint:</b> Mentoring dapat dilakukan Online atau Offline sesuai kesepakatan dengan mentor.
                  </p>
                  <a
                    href="#"
                    @click="$emit('propose')"
                    class="btn btn-sm btn-primary"
                    style="width: 100%"
                  >Ajukan Mentoring</a>
                  <!-- <router-link
                    v-bind:to="'/team/'+ this.teamId + '/programmeparticipation/'+ programmeparticipationId + '/mentoringsession/programme/'+programmeId+'/phase/'+ phaseId"
                    class="btn btn-sm btn-warning"
                    style="width: 100%;margin-top:10px;"
                  >Jadwal Sesi Mentoring</router-link> -->
                  <!-- <router-link
                    v-bind:to="{name: 'Mentoring Session', params: {teamId: teamId, programmeId: programmeId, programmeparticipationId: programmeparticipationId, phaseId: phaseId}}"
                    class="btn btn-sm btn-success"
                    style="width: 100%;margin-top:5px;">
                      Mentoring Session
                  </router-link>-->
                </div>
              </div>
            </div>
            <!--end mentoring-->
          </div>
          <!--end colum-->
        </div>
      </div>
      <!-- end ketiga-->

      <!-- start Exp-->
      <div class="row" style="margin-left: 30px;position: relative;bottom: 45px;}">
        <div class="col-md-3"></div>
        <div class="col-md-9">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 35 64" width="35" height="64"><defs><path d="M14.53 41.31L14.53 5.73L20.47 5.73L20.47 41.31L14.53 41.31Z" id="d7Bs6vwl0U"></path><path d="M14.53 41.31L14.53 5.73L20.47 5.73L20.47 41.31L14.53 41.31Z" id="d2PkcKyRwh"></path><path d="M14.53 41.31L14.53 5.73L20.47 5.73L20.47 41.31L14.53 41.31Z" id="b3x6Cjz9If"></path><path d="M14.53 41.31L14.53 5.73L20.47 5.73L20.47 41.31L14.53 41.31Z" id="b667RYxnc"></path><path d="M17.5 41.31L26.8 41.31L22.15 50.61L17.5 59.91L12.85 50.61L8.2 41.31L17.5 41.31Z" id="d1MwWWlOeN"></path><path d="M17.5 41.31L26.8 41.31L22.15 50.61L17.5 59.91L12.85 50.61L8.2 41.31L17.5 41.31Z" id="a1tN9se7Hv"></path><path d="M17.5 41.31L26.8 41.31L22.15 50.61L17.5 59.91L12.85 50.61L8.2 41.31L17.5 41.31Z" id="eg0UCF8BS"></path><path d="M17.5 41.31L26.8 41.31L22.15 50.61L17.5 59.91L12.85 50.61L8.2 41.31L17.5 41.31Z" id="d1e0pMpHvl"></path></defs><g><g><g><use xlink:href="#d7Bs6vwl0U" opacity="1" fill="#b9b9b9" fill-opacity="1"></use><g><use xlink:href="#d7Bs6vwl0U" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#d2PkcKyRwh" opacity="1" fill="#000000" fill-opacity="0"></use><g><use xlink:href="#d2PkcKyRwh" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#b3x6Cjz9If" opacity="1" fill="#000000" fill-opacity="0"></use><g><use xlink:href="#b3x6Cjz9If" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#b667RYxnc" opacity="1" fill="#000000" fill-opacity="0"></use><g><use xlink:href="#b667RYxnc" opacity="1" fill-opacity="0" stroke="#b9b9b9" stroke-width="1" stroke-opacity="1"></use></g></g><g><use xlink:href="#d1MwWWlOeN" opacity="1" fill="#b9b9b9" fill-opacity="1"></use><g><use xlink:href="#d1MwWWlOeN" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#a1tN9se7Hv" opacity="1" fill="#000000" fill-opacity="0"></use><g><use xlink:href="#a1tN9se7Hv" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#eg0UCF8BS" opacity="1" fill="#000000" fill-opacity="0"></use><g><use xlink:href="#eg0UCF8BS" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#d1e0pMpHvl" opacity="1" fill="#000000" fill-opacity="0"></use><g><use xlink:href="#d1e0pMpHvl" opacity="1" fill-opacity="0" stroke="#b9b9b9" stroke-width="1" stroke-opacity="1"></use></g></g></g></g></svg>
        </div>
      </div>
      <div class="row" style="position: relative;bottom: 45px;">
        <div class="col-md-3" style="padding: 20px;">
          Lakukan beberapa metoda &
          <br>Validasi IDE-mu
        </div>
        <div class="col-md-9">
          <div style="display: -webkit-inline-box;">
            <div>
              <div class="abunder" v-if="dataVP.total === 0">
                Langkah <b>9</b>
              </div>
              <div class="bbunder" v-else>
                Langkah <b>9</b>
              </div>

              <div class="judulbunder" style="margin-left: 10px">
                <!-- start button -->

                <button
                  style="right: 12px;position: relative;"
                  :disabled="dataVP.total === 0"
                  id="popover10"
                  class="btn btn-sm btn-default"
                  rel="popover"
                  data-placement="top"
                  data-trigger="focus"
                  data-original-title="Validasi Ide Kalian"
                >Percobaan Bisnis</button>

                <!-- end button-->
                <div id="popper-content10" class="hide popper-content">
                  <p>
                    Untuk memastikan seluruh asumsi yang ada pada ide kalian valid, perlu dilakukan percobaan sehingga memiliki bukti yang kuat. Terjadinya Pivot sangat mungkin terjadi.
                    <br>
                    <!-- <b>Hint</b>: Untuk memudahkan kalian dalam memahami setiap tools dalam percobaan yang kami sediakan, kami menyediakan materi pada setiap jenis percobaan. -->
                  </p>
                  <router-link
                    v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + csId + '/persona/' + personaId + '/vp/' + vpId + '/experiment'"
                    class="btn btn-sm btn-primary"
                    style="width: 100%"
                  >Lakukan Percobaan</router-link>
                  <router-link
                    v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + csId + '/persona/' + personaId + '/vp/' + vpId + '/metric'"
                    class="btn btn-sm btn-primary"
                    style="width: 100%;margin-top:5px;"
                  >Metric</router-link>
                  <router-link
                    v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + csId + '/persona/' + personaId + '/vp/' + vpId + '/dev'"
                    class="btn btn-sm btn-primary"
                    style="width: 100%;margin-top:5px;"
                  >Rencana Pengembangan</router-link>
                  <router-link
                    v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + csId + '/persona/' + personaId + '/vp/' + vpId + '/business'"
                    class="btn btn-sm btn-primary"
                    style="width: 100%;margin-top:5px;"
                  >Data Bisnis</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end exp-->
    </div>
  </div>
  <!--end new dashboard-->
</template>

<script>
import auth from "@/httpcontrol";
import onSubmit from "@/components/onsubmit";

export default {
  props: ["teamId", "invitationCount"],
  data: function() {
    return {
      dataIdea: { total: 0, list: [] },
      ideaId: "",
      loadingIdea: false,
      loadingProgram: false,
      dataProgram: { total: 0, list: [] },
      dataCustomerSegments: { total: 0, list: [] },
      csId: "",
      loadingCS: false,
      dataPersona: { total: 0, list: [] },
      personaId: "",
      loadingPersona: false,
      dataVP: { total: 0, list: [] },
      vpId: "",
      loadingVP: false,
      dataReset: { total: 0, list: [] }
    };
  },
  components: {
    onsub: onSubmit
  },
  watch: {
    teamId: function() {
      this.checkRegisteredProgram();
      this.getIdea();
    },
    ideaId: function() {
      sessionStorage.ideaId = this.ideaId;
      sessionStorage.removeItem("csId");
      sessionStorage.removeItem("personaId");
      sessionStorage.removeItem("vpId");
      this.getCustomerSegments();
    },
    csId: function() {
      sessionStorage.csId = this.csId;
      sessionStorage.removeItem("personaId");
      sessionStorage.removeItem("vpId");
      this.getPersona();
    },
    personaId: function() {
      sessionStorage.personaId = this.personaId;
      sessionStorage.removeItem("vpId");
      this.getVP();
    },
    vpId: function() {
      sessionStorage.vpId = this.vpId;
    }
  },
  created: function() {
    // sessionStorage.clear();
  },
  methods: {
    checkRegisteredProgram: function() {
      this.loadingProgram = true;
      auth
        .getData2(this, "/team/" + this.teamId + "/programme_participation")
        .then(
          res => {
            console.log(res);
            return res.json();
          },
          error => {
            console.log(error);
            // alertControl.showError(error.body.meta);
            this.loadingProgram = false;
          }
        )
        .then(data => {
          this.dataProgram = data.data;
          this.loadingProgram = false;
        });
    },
    getIdea: function() {
      this.loadingIdea = true;
      this.loadingCS = true;
      this.loadingPersona = true;
      this.loadingVP = true;
      auth
        .getData2(this, "/team/" + this.teamId + "/idea")
        .then(
          res => {
            return res.json();
          },
          error => {
            console.log(error);
            alertControl.showError(this, error.body.meta);
          }
        )
        .then(
          data => {
            this.dataIdea = data.data;
            if (data.data.total !== 0) {
              // this.ideaId = data.data.list[0].id;
              this.getSelectedMainIdea(data.data.list);
            } else {
              sessionStorage.removeItem("ideaId");
              sessionStorage.removeItem("csId");
              sessionStorage.removeItem("personaId");
              sessionStorage.removeItem("vpId");
            }
            if (sessionStorage.ideaId) {
              this.ideaId = sessionStorage.ideaId;
            }
            this.loadingIdea = false;
            this.loadingCS = false;
            this.loadingPersona = false;
            this.loadingVP = false;
          },
          error => {
            console.log(error);
            alertControl.showError(this, error.body.meta);
          }
        );
    },
    getSelectedMainIdea: function(list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].is_main_idea) {
          this.ideaId = list[i].id;
          break;
        }
      }
    },
    getCustomerSegments: function() {
      this.loadingCS = true;
      this.loadingPersona = true;
      this.loadingVP = true;

      this.dataPersona = this.dataReset;

      auth
        .getData2(
          this,
          "/team/" + this.teamId + "/idea/" + this.ideaId + "/customer_segment"
        )
        .then(
          res => {
            return res.json();
          },
          error => {
            console.log(error);
            alertControl.showError(this, error.body.meta);
          }
        )
        .then(
          data => {
            this.dataCustomerSegments = data.data;
            if (data.data.total !== 0) {
              this.csId = data.data.list[0].id;
            } else {
              sessionStorage.removeItem("csId");
              sessionStorage.removeItem("personaId");
              sessionStorage.removeItem("vpId");
            }
            if (sessionStorage.csId) {
              this.csId = sessionStorage.csId;
            }
            this.loadingCS = false;
            this.loadingPersona = false;
            this.loadingVP = false;
          },
          error => {
            console.log(error);
            alertControl.showError(this, error.body.meta);
          }
        );
    },
    getPersona: function() {
      this.loadingPersona = true;
      this.loadingVP = true;

      this.dataVP = this.dataReset;

      auth
        .getData2(
          this,
          "/team/" +
            this.teamId +
            "/idea/" +
            this.ideaId +
            "/customer_segment/" +
            this.csId +
            "/persona"
        )
        .then(
          res => {
            return res.json();
          },
          error => {
            console.log(error);
            alertControl.showError(this, error.body.meta);
          }
        )
        .then(
          data => {
            this.dataPersona = data.data;
            if (data.data.total !== 0) {
              // this.personaId = data.data.list[0].id;
              this.getSelectedMainPersona(data.data.list);
            } else {
              sessionStorage.removeItem("personaId");
              sessionStorage.removeItem("vpId");
            }
            if (sessionStorage.personaId) {
              this.personaId = sessionStorage.personaId;
            }
            this.loadingPersona = false;
            this.loadingVP = false;
          },
          error => {
            console.log(error);
            alertControl.showError(this, error.body.meta);
          }
        );
    },
    getSelectedMainPersona: function(list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].is_main_persona) {
          this.personaId = list[i].id;
          break;
        }
      }
    },
    getVP: function() {
      this.loadingVP = true;
      auth
        .getData2(
          this,
          "/team/" +
            this.teamId +
            "/idea/" +
            this.ideaId +
            "/customer_segment/" +
            this.csId +
            "/persona/" +
            this.personaId +
            "/value_proposition"
        )
        .then(
          res => {
            return res.json();
          },
          error => {
            console.log(error);
            alertControl.showError(this, error.body.meta);
          }
        )
        .then(data => {
          this.dataVP = data.data;
          if (data.data.total !== 0) {
            // this.vpId = data.data.list[0].id;
            this.getSelectedMainVP(data.data.list);
          } else {
            sessionStorage.removeItem("vpId");
          }
          if (sessionStorage.vpId) {
            this.vpId = sessionStorage.vpId;
          }
          this.loadingVP = false;
        });
    },
    getSelectedMainVP: function(list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].is_active) {
          this.vpId = list[i].id;
          break;
        }
      }
    },
    getDashboard: function() {
      auth
        .getData2(
          this,
          "/team/" + this.teamId + "/dashboard?template_name=Solution"
        )
        .then(
          res => {
            return res.json();
          },
          error => {
            console.log(error);
          }
        )
        .then(data => {
          this.mainDashboard = data.data;
        });
    }
  }
};
</script>
<style scoped>
.row.row-eq-height {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
.cteamd {
  background: #e4e4e4;
  /*        color: #fff;*/
  display: inline-block;
  padding: 13px;
  text-align: center;
  border-left-width: thick;
  border-left-color: #8bc751;
  border-left-style: solid;
}
.pgreen {
  color: #fff;
  /*        background-color: #8bc751;*/
  background-color: #efefef;
  /*        border-color: #8bc751;*/
  border-color: #efefef;
  padding: 6px;
}
.putama {
  border-color: #efefef;
}
.garis {
  display: block;
  width: 45px;
  height: 5px;
  background: #8bc751;
  margin-bottom: 10px;
}
.garist {
  width: 45px;
  height: 5px;
  background: #8bc751;
  margin-bottom: 20px !important;
  margin: 0 auto;
}
.text-concat {
  position: relative;
  display: inline-block;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 3.5em;
  line-height: 1.2em;
  /*      text-align:justify;*/
}
.tex {
  position: relative;
}
.tex.ellipsis::after {
  content: "...";
  position: absolute;
  right: 168px;
  bottom: 5px;
}
.pbuttonk {
  float: right;
  position: absolute;
  bottom: 15px;
  right: 15px;
}
.pscale {
  padding: 20px;
  padding-right: 0px;
  padding-left: 31px;
}
.ideutm {
  background: #2891ab;
  margin-left: 14px;
  color: #fff;
  display: inline-block;
  border-radius: 3px;
}
.carddb {
  min-width: 213px;
}
.bisaenter {
  white-space: pre-line;
}
.panel-group {
  margin-bottom: 40px;
}
.btn-vp {
  background-color: #888888;
  border-color: #656565;
  color: #fff;
}
.btn-vp:hover {
  background: #484848;
}
.bunder {
  background: #8bc751;
  display: inline-block;
  /* padding: 24px; */
  border-radius: 100%;
  height: 100px;
  width: 100px;
  padding-top: 36px;
  color: #fff;
  border: 4px solid #70b131;
  text-align: center;
}
.judulbunder {
  margin-top: 10px;
}
.ketiga {
  margin-top: 11px;
  border-top: 2px dashed black;
  padding-top: 46px;
  position: relative;
  bottom: 56px;
}
.abunder {
  background: #dedede;
  display: inline-block;
  /* padding: 24px; */
  border-radius: 100%;
  height: 100px;
  width: 100px;
  padding-top: 36px;
  color: #fff;
  border: 4px solid #d0d0d0;
  text-align: center;
}
.mbunder {
  background: #67acf9;
  display: inline-block;
  /* padding: 24px; */
  border-radius: 100%;
  height: 100px;
  width: 100px;
  padding-top: 36px;
  color: #fff;
  border: 4px solid #67acf9;
  text-align: center;
}
.bbunder {
  background: #ffb300;
  display: inline-block;
  /* padding: 24px; */
  border-radius: 100%;
  height: 100px;
  width: 100px;
  padding-top: 36px;
  color: #fff;
  border: 4px solid #ffe105;
  text-align: center;
}
.pilihCS {
  width: 125px;
  font-size: 12px;
  margin-top: 5px;
  margin-right: -55px;
  color: #585858;
}
.buledund {
  background: #0c496b;
  padding: 3px 6px 3px 6px;
  border-radius: 50%;
  font-size: 10px;
}
.displaying {
  display: none;
}
.warnstep {
  position: relative;
  bottom: 79px;
  color: white;
  background: #fd9e4a;
  width: 128px;
  right: 43px;
  border-radius: 3px;
  font-size: 11px;
  padding: 2px;
  margin-left: 23px;
}
.isHidden {
  visibility: hidden;
}
</style>  
