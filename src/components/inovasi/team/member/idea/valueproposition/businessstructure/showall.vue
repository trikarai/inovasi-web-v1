<template>
  <div>
    <loading v-show="loading"></loading>

    <section class="content">
      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
      <div class="box">
        <div class="box-body">
          <!--start breadcrumb-->
          <nav class="remahroti" aria-label="breadcrumb" v-if="role == 'Talent'">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link v-bind:to="'/talent/dashboard'">Beranda</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link v-bind:to="'/talent/team/membership'">Tim</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link v-bind:to="'/team/'+teamId+'/idea/'+ideaId+'/cs'">Ide</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link
                  v-bind:to="'/team/'+teamId+'/idea/'+ideaId+'/cs/'+customersegmentId+'/persona'"
                >Tipe Pengguna</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + personaId">Segmen Pelanggan</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link
                  v-bind:to="'/team/'+teamId+'/idea/'+ideaId+'/cs/'+customersegmentId+'/persona/'+personaId+'/vp'"
                >Empathy Map</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Analisa Bisnis</li>
            </ol>
          </nav>
          <nav class="remahroti" aria-label="breadcrumb" v-else>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link v-bind:to="'/personnel/dashboard'">Beranda</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link
                  v-bind:to="'/tutor/'+tutorId+'/participant/'+teamId+'/idea/'+ideaId+'/cs'"
                >Idea</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link
                  v-bind:to="'/tutor/'+tutorId+'/participant/'+teamId+'/idea/'+ideaId+'/cs/'+customersegmentId+'/persona'"
                >Tipe Pengguna</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + personaId">Segment Pelanggan</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link
                  v-bind:to="'/tutor/'+tutorId+'/participant/'+teamId+'/idea/'+ideaId+'/cs/'+customersegmentId+'/persona/'+personaId+'/vp'"
                >Empathy Map</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Business Structure</li>
            </ol>
          </nav>
          <!--end breadcrumb-->

          <ul class="nav nav-tabs" style="font-size: 12px;">
            <li class="active">
              <a data-toggle="tab" href="#vp">Value Proposition</a>
            </li>
            <li>
              <a data-toggle="tab" href="#lean">Lean Canvas</a>
            </li>
            <li>
              <a data-toggle="tab" href="#bmc">Business Model Canvas</a>
            </li>
            <li>
              <a data-toggle="tab" href="#ms">Market Size</a>
            </li>
            <li>
              <a data-toggle="tab" href="#ma">Market Analysis</a>
            </li>
            <li>
              <a data-toggle="tab" href="#competitor" @click="getCompetitorData()">Competitor</a>  
            </li>
            <li>
              <a data-toggle="tab" href="#vc" @click="getValueCurveData()">Value Curve</a>    
            </li>
            <li>
              <a data-toggle="tab" href="#swot">SWOT Analysis</a>    
            </li>
            
          </ul>

          <div class="tab-content">
            <div id="vc" class="tab-pane fade">
                <onsub v-if="onLoadValueCurve"></onsub>
                  <bs-valuecurve
                    v-bind:data="dataVC"
                    v-bind:dataTemplate="dataTemplate"
                    v-bind:role="role"
                    v-show="!onLoadValueCurve"
                    @closeModalRefresh="closeModalRefreshValuecurve()"
                    @getData="getValueCurveData()"
                  ></bs-valuecurve>
            </div>
            <div id="bmc" class="tab-pane fade">
              <!--BMC Canvas-->

              <div style="overflow-x: auto;" v-if="dataBMC">
                <!--info BMC                -->
                <button
                  class="btn btn-info"
                  @click="learningBMC"
                  style="border-radius: 5px; padding: 2px 8px;"
                >
                  <i class="fa fa-info-circle"></i> Klik disini apabila kamu ingin mempelajari tentang  BMC
                </button>
                <template v-if="role === 'Talent'">
                  <a
                    @click="confirm('Delete',dataBMC.id)"
                    style="margin: 10px"
                    class="btn btn-danger btn-sm"
                  >
                    <i class="fa fa-trash"></i>
                  </a>
                  <!--<a @click="editBS(dataBMC)" style="margin: 10px" class="btn btn-default btn-sm"><i class="fa fa-edit"></i> Edit</a>-->
                  <!--<a @click="editBS(dataBMC)" style="margin: 10px" class="btn btn-default btn-sm"><i class="fa fa-edit"></i></a>-->
                </template>

                <!--{{dataBMC}}-->

                <table id="tblbmc" class="table table-bordered table-responsive bisaenter" border="1">
                  <tbody>
                    <tr>
                      <td rowspan="2" style="width: 20%;">
                        <strong>Key Partners<a v-if="role === 'Talent'" @click="editBS(dataBMC)" class="posisiedit"><i class="fa fa-edit"></i></a></strong>
                        <p><span v-html="dataBMC.fields[0].value"></span></p>
                        
                      </td>
                      <td style="width: 20%;">
                        <strong>Key Activities<a v-if="role === 'Talent'" @click="editBS(dataBMC)" class="posisiedit"><i class="fa fa-edit"></i></a></strong>
                        <p><span v-html="dataBMC.fields[1].value"></span></p>
                        
                      </td>
                      <td rowspan="2" style="width: 20%;">
                        <strong>Value Proposition<a v-if="role === 'Talent'" @click="updateVP()" class="posisiedit"><i class="fa fa-pencil-square"></i></a></strong>
                        <!-- value prop 2 -->
                        <p><span v-html="parentVP.description"></span></p>
                        
                      </td>
                      <td style="width: 20%;">
                        <strong>Relationship<a v-if="role === 'Talent'" @click="editBS(dataBMC)" class="posisiedit"><i class="fa fa-edit"></i></a></strong>
                        <p><span v-html="dataBMC.fields[3].value"></span></p>
                        
                      </td>
                      <td rowspan="2" style="width: 20%;">
                        <strong>Segmen Pelanggan<a v-if="role === 'Talent'" @click="updateCS()" class="posisiedit"><i class="fa fa-pencil-square"></i></a></strong>
                        <p><span v-html="parentCS.name"></span></p>
                        
                        <!-- Segmen Pelanggan 2 -->
                        
                      <div style="text-align: left !important;margin-top: 50px">
                        <template
                          v-for="data in personaAspect.aspect.slice(0,4)"
                          v-if="!data.field_template.is_removed"
                        >
                          <b>{{data.field_template.name}}</b> :
                          <template v-if="data.value != null">
                            <i><span v-html="data.value"></span></i>
                            <br>&nbsp;
                          </template>
                          <template v-else>
                            <template v-for="option in data.selected_options">{{option.option.name}}</template>
                          </template>
                        </template>
                      </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Key Resources<a v-if="role === 'Talent'" @click="editBS(dataBMC)" class="posisiedit"><i class="fa fa-edit"></i></a></strong>
                        <p><span v-html="dataBMC.fields[2].value"></span></p>
                        
                      </td>
                      <td>
                        <strong>Channel<a v-if="role === 'Talent'" @click="editBS(dataBMC)" class="posisiedit"><i class="fa fa-edit"></i></a></strong>
                        <p><span v-html="dataBMC.fields[4].value"></span></p>
                        
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <strong>Cost Structure<a v-if="role === 'Talent'" @click="editBS(dataBMC)" class="posisiedit"><i class="fa fa-edit"></i></a></strong>
                        <p><span v-html="dataBMC.fields[5].value"></span></p>
                        
                      </td>
                      <td style="background: #f1f1f1;"></td>
                      <td colspan="2">
                        <strong>Revenue Stream<a v-if="role === 'Talent'" @click="editBS(dataBMC)" class="posisiedit"><i class="fa fa-edit"></i></a></strong>
                        <p><span v-html="dataBMC.fields[6].value"></span></p>
                        
                      </td>
                    </tr>
                  </tbody>
                </table>

                <button @click="openCommentsBMC(dataBMC.id)" class="btn btn-default" type="button">
                  <i class="fa fa-refresh"></i> Munculkan Komentar
                </button>
              </div>
              <div class="box-body" v-else>
                <button
                  class="btn btn-info"
                  @click="learningBMC"
                  style="border-radius: 5px; padding: 2px 8px;"
                >
                  <i class="fa fa-info-circle"></i> Klik disini apabila kamu ingin mempelajari tentang  BMC
                </button>
                <br>
                <h4 style="padding: 20px">No Data Add from template</h4>
                <br>
                <template
                  v-for="data in dataTemplate.list"
                  v-if="data.name === 'Business Model Canvas'"
                >
                  <a
                    v-if="role === 'Talent'"
                    class="btn btn-default"
                    @click="addBS(data.id)"
                  >Add {{data.name}}</a>
                  <hr>
                </template>
              </div>
              <!--BMC Canvas End-->

              <div class v-if="openBMC">
                <div class>
                  <comment v-bind:experimentId="experimentId"></comment>
                </div>
              </div>
            </div>

            <div id="lean" class="tab-pane fade">
              <div style="overflow-x: auto;" v-if="dataLean">
                <!--info lean canvas-->
                <button
                  class="btn btn-info"
                  @click="learningLC"
                  style="border-radius: 5px; padding: 2px 8px;"
                >
                  <i class="fa fa-info-circle"></i> Klik disini apabila kamu ingin mempelajari tentang  Lean Canvas
                </button>
                <template v-if="role === 'Talent'">
                  <a
                    @click="confirm('Delete',dataLean.id)"
                    style="margin: 10px"
                    class="btn btn-danger btn-sm"
                  >
                    <i class="fa fa-trash"></i>
                  </a>
                  <!--<a @click="editBS(dataLean)" style="margin: 10px" class="btn btn-default btn-sm"><i class="fa fa-edit"></i> Edit</a>-->
                  <!--<a @click="editBS(dataLean)" class="btn btn-default btn-sm"><i class="fa fa-edit"></i></a>-->
                </template>

                <!--{{dataLean}}-->

                <table class="table table-bordered" id="tblleancanvas">
                  <tbody>
                    <tr>
                      <td rowspan="2" style="width: 20%;">
                        <strong class="lcproblem">Problem<a v-if="role === 'Talent'" @click="editBS(dataLean)" class="posisiedit"><i class="fa fa-edit"></i></a>
                        </strong>
                        <p><span v-html="dataLean.fields[0].value"></span></p>
                      </td>
                      <td style="width: 20%;">
                        <strong class="lcsolution">Solution</strong>
                        <!--<p>{{dataLean.fields[1].value}}</p>-->
                        <!--<p>{{personaAspect.aspect[9].value}}</p>-->
                        <p v-if="dataSolution"><span v-html="dataSolution.fields[0].value"></span></p>
                        <!--<a @click="editBS(dataLean)" class="btn btn-default btn-sm"><i class="fa fa-edit"></i></a>-->
                      </td>
                      <td rowspan="2" style="width: 20%;">
                        <strong>Value Proposition<a v-if="role === 'Talent'" @click="updateVP()" class="posisiedit"><i class="fa fa-pencil-square"></i></a></strong>
                        <p><span v-html="parentVP.description"></span></p>
                        
                      </td>
                      <td style="width: 20%;">
                        <strong>Unfair Advantage<a v-if="role === 'Talent'" @click="editBS(dataLean)" class="posisiedit"><i class="fa fa-edit"></i></a></strong>
                        <p><span v-html="dataLean.fields[1].value"></span></p>
                        
                      </td>
                      <td rowspan="2" style="width: 20%;">
                        <strong>Segmen Pelanggan<a v-if="role === 'Talent'" @click="updateCS()" class="posisiedit"><i class="fa fa-pencil-square"></i></a></strong>
                        <p><span v-html="parentCS.name"></span></p>
                        
                        <div style="text-align: left !important;margin-top: 50px;">
                          <template
                            v-for="data in personaAspect.aspect.slice(0,4)"
                            v-if="!data.field_template.is_removed"
                          >
                            <b>{{data.field_template.name}}</b> :
                            <template v-if="data.value != null">
                              <i><span v-html="data.value"></span></i>
                              <br>&nbsp;
                            </template>
                            <template v-else>
                              <template v-for="option in data.selected_options">{{option.option.name}}</template>
                            </template>
                          </template>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Key Metrics<a v-if="role === 'Talent'" @click="editBS(dataLean)" class="posisiedit"><i class="fa fa-edit"></i></a></strong>
                        <p><span v-html="dataLean.fields[2].value"></span></p>
                        
                      </td>
                      <td>
                        <strong>Channel<a v-if="role === 'Talent'" @click="editBS(dataLean)" class="posisiedit"><i class="fa fa-edit"></i></a></strong>
                        <p><span v-html="dataLean.fields[3].value"></span></p>
                        
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <strong>Cost Structure<a v-if="role === 'Talent'" @click="editBS(dataLean)" class="posisiedit"><i class="fa fa-edit"></i></a></strong>
                        <p><span v-html="dataLean.fields[4].value"></span></p>
                        
                      </td>
                      <td style="background: #f1f1f1;"></td>
                      <td colspan="2">
                        <strong>Revenue Stream<a v-if="role === 'Talent'" @click="editBS(dataLean)" class="posisiedit"><i class="fa fa-edit"></i></a></strong>
                        <p><span v-html="dataLean.fields[5].value"></span></p>
                        
                      </td>
                    </tr>
                  </tbody>
                </table>

                <button
                  @click="openCommentsLean(dataLean.id)"
                  class="btn btn-default"
                  type="button"
                >
                  <i class="fa fa-refresh"></i> Munculkan Komentar
                </button>
              </div>
              <div class="box-body" v-else>
                <button
                  class="btn btn-info"
                  @click="learningLC"
                  style="border-radius: 5px; padding: 2px 8px;"
                >
                  <i class="fa fa-info-circle"></i> Klik disini apabila kamu ingin mempelajari tentang  Lean Canvas
                </button>
                <br>
                <h4 style="padding: 20px">No Data Add from template</h4>
                <hr>
                <template v-for="data in dataTemplate.list" v-if="data.name === 'Lean Canvas'">
                  <a
                    v-if="role === 'Talent'"
                    class="btn btn-default"
                    @click="addBS(data.id)"
                  >Add {{data.name}}</a>
                </template>
              </div>
              <!--Lean Canvas End-->
              <div class v-if="openLean">
                <div class>
                  <comment v-bind:experimentId="experimentId"></comment>
                </div>
              </div>
            </div>

            <div id="ms" class="tab-pane fade">
              <div v-if="dataMS">
                <!--info ms-->
                <button
                  class="btn btn-info"
                  @click="learningMS"
                  style="border-radius: 5px; padding: 2px 8px;"
                >
                  <i class="fa fa-info-circle"></i> Klik disini apabila kamu ingin mempelajari tentang  Market Size
                </button>
                <template v-if="role === 'Talent'">
                  <a @click="editBS(dataMS)" style="margin: 10px" class="btn btn-default btn-sm">
                    <i class="fa fa-edit"></i>
                  </a>
                  <a
                    @click="confirm('Delete',dataMS.id)"
                    style="margin: 10px"
                    class="btn btn-danger btn-sm"
                  >
                    <i class="fa fa-trash"></i>
                  </a>
                  
                </template>
                <!-- {{dataMS}} -->
                <!-- <table class="table table-hover table-responsive">
                  <tbody style="border-top-style: none !important;">
                    <tr v-for="(data, index) in dataMS.list">
                      <td width="250px">
                        <b>{{data.field_template.name}}</b>
                      </td>
                      <template v-if="data.value != null">
                        <td v-if="data.field_template.type === 'integer'">
                          Rp. {{NumbertoLocale[index]}} M
                        </td>
                        <td v-if="data.field_template.type === 'string'">
                          <span v-html="data.value"></span> 
                        </td>    
                      </template>
                      <template v-if="data.value == null">
                        <td></td>
                      </template>  
                    </tr>
                  </tbody>
                </table> -->

                <table class="table table-hover table-responsive">
                  <tbody style="border-top-style: none !important;">
                    <tr>
                      <td class="mscolor">
                        <b>{{dataMS.list[0].field_template.name}}</b>
                      </td>
                      <td class="msvalue">
                        <span>
                          <template v-if="dataMS.list[0].value != null">
                            <template v-if="dataMS.list[0].field_template.type === 'integer'">Rp. {{NumbertoLocale2(dataMS.list[0].value)}} M
                            </template>
                            <template v-if="dataMS.list[0].field_template.type === 'string'">
                              <span v-html="dataMS.list[0].value"></span> 
                            </template>    
                          </template>
                          <template v-if="dataMS.list[0].value == null">
                          </template>
                        </span>
                      </td>
                      <td class="mscolor">
                        <b>{{dataMS.list[1].field_template.name}}</b>
                      </td>
                      <td class="msvalue">
                        <span>
                          <template v-if="dataMS.list[1].value != null">
                            <template v-if="dataMS.list[1].field_template.type === 'integer'">Rp. {{NumbertoLocale2(dataMS.list[1].value)}} M
                            </template>
                            <template v-if="dataMS.list[1].field_template.type === 'string'">
                              <span v-html="dataMS.list[1].value"></span> 
                            </template>    
                          </template>
                          <template v-if="dataMS.list[1].value == null">
                          </template>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="mscolor">
                        <b>{{dataMS.list[2].field_template.name}}</b>
                      </td>
                      <td class="msvalue">
                        <span>
                          <template v-if="dataMS.list[2].value != null">
                            <template v-if="dataMS.list[2].field_template.type === 'integer'">Rp. {{NumbertoLocale2(dataMS.list[2].value)}} M
                            </template>
                            <template v-if="dataMS.list[2].field_template.type === 'string'">
                              <span v-html="dataMS.list[2].value"></span> 
                            </template>    
                          </template>
                          <template v-if="dataMS.list[2].value == null">
                          </template>
                        </span>
                      </td>
                      <td class="mscolor">
                        <b>{{dataMS.list[3].field_template.name}}</b>
                      </td>
                      <td class="msvalue">
                        <span>
                          <template v-if="dataMS.list[3].value != null">
                            <template v-if="dataMS.list[3].field_template.type === 'integer'">Rp. {{NumbertoLocale2(dataMS.list[3].value)}} M
                            </template>
                            <template v-if="dataMS.list[3].field_template.type === 'string'">
                              <span v-html="dataMS.list[3].value"></span> 
                            </template>    
                          </template>
                          <template v-if="dataMS.list[3].value == null">
                          </template>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="mscolor">
                        <b>{{dataMS.list[4].field_template.name}}</b>
                      </td>
                      <td class="msvalue">
                        <span>
                          <template v-if="dataMS.list[4].value != null">
                            <template v-if="dataMS.list[4].field_template.type === 'integer'">Rp. {{NumbertoLocale2(dataMS.list[4].value)}} M
                            </template>
                            <template v-if="dataMS.list[4].field_template.type === 'string'">
                              <span v-html="dataMS.list[4].value"></span> 
                            </template>    
                          </template>
                          <template v-if="dataMS.list[4].value == null">
                          </template>
                        </span>
                      </td>
                      <td class="mscolor">
                        <b>{{dataMS.list[5].field_template.name}}</b>
                      </td>
                      <td class="msvalue">
                        <span>
                          <template v-if="dataMS.list[5].value != null">
                            <template v-if="dataMS.list[5].field_template.type === 'integer'">Rp. {{NumbertoLocale2(dataMS.list[5].value)}} M
                            </template>
                            <template v-if="dataMS.list[5].field_template.type === 'string'">
                              <span v-html="dataMS.list[5].value"></span> 
                            </template>    
                          </template>
                          <template v-if="dataMS.list[5].value == null">
                          </template>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4" class="mscolor" style="text-align:center">
                        <b>{{dataMS.list[6].field_template.name}}</b>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4" style="text-align:center">
                        <span>
                          <template v-if="dataMS.list[6].value != null">
                            <template v-if="dataMS.list[6].field_template.type === 'integer'">Rp. {{NumbertoLocale2(dataMS.list[6].value)}} M
                            </template>
                            <template v-if="dataMS.list[6].field_template.type === 'string'">
                              <span v-html="dataMS.list[6].value"></span> 
                            </template>    
                          </template>
                          <template v-if="dataMS.list[6].value == null">
                          </template>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <button @click="openCommentsMS(dataMS.id)" class="btn btn-default" type="button">
                  <i class="fa fa-refresh"></i> Munculkan Komentar
                </button>
              </div>
              <div class="box-body" v-else>
                <button
                  class="btn btn-info"
                  @click="learningMS"
                  style="border-radius: 5px; padding: 2px 8px;"
                >
                  <i class="fa fa-info-circle"></i> Klik disini apabila kamu ingin mempelajari tentang  Market Size
                </button>
                <br>
                <h4 style="padding: 20px">No Data Add from template</h4>
                <hr>
                <template v-for="data in dataTemplate.list" v-if="data.name === 'Market Size'">
                  <a
                    v-if="role === 'Talent'"
                    class="btn btn-default"
                    @click="addBS(data.id)"
                  >Add {{data.name}}</a>
                </template>
              </div>
              <!--end ms -->
              <div class v-if="openMS">
                <div class>
                  <comment v-bind:experimentId="experimentId"></comment>
                </div>
              </div>
            </div>

            <div id="vp" class="tab-pane fade in active">
              <!--{{personaAspect}}-->
              <!--{{dataSolution}}-->
              <!--info VP-->
              <div style="padding: 10px">
                <button
                  class="btn btn-info"
                  @click="learningVP"
                  style="border-radius: 5px; padding: 2px 8px;"
                >
                  <i class="fa fa-info-circle"></i> Klik disini apabila kamu ingin mempelajari tentang  Value Propostion
                </button>
              </div>

              <div class="row" style="margin-bottom:20px;">
                <div class="col-md-6">
                  <h4>
                    <b>Value Proposition</b>
                    <a v-if="role === 'Talent'" class="btn btn-sm btn-default" @click="updateVP()">
                      <i class="fa fa-pencil-square"></i>
                    </a>
                  </h4>
                  <!-- <h4>
                    <b>Value Proposition</b>
                    <a v-if="role === 'Talent'" class="btn btn-sm btn-default" @click="updateVP()">
                      <i class="fa fa-pencil-square"></i>
                    </a>
                  </h4>-->

                  <div  class="">
                    <p>{{parentVP.description}}</p>
                  </div>
                </div>

                <div class="col-md-6">
                   <h4 style="">
                    <b>Segmen Pelanggan</b>
                  </h4>
                   <p style="margin-top: 22px;">{{personaAspect.description}} </p>
                  
                  <button v-if="rubah" class="btn btn-default btn-sm" @click="rubah = !rubah">Lihat Pain And Gain</button>
                  <button v-if="!rubah" class="btn btn-default btn-sm" @click="rubah = !rubah">Lihat Segmen Pelanggan</button>
                </div>

              </div>
              <div class="row">
                <!-- <div class="row">
                  <!-- <div style="padding-left: 30px" class="col-md-6">
                    <h5>{{parentVP.description}}</h5>
                  </div>
                  <h4>
                    <b style="padding-left: 30px">Value Proposition</b>
                    <a v-if="role === 'Talent'" class="btn btn-sm btn-default" @click="updateVP()">
                      <i class="fa fa-pencil-square"></i>
                    </a>
                  </h4>
                </div> -->
                <div class="col-md-6">
                  

                  <div v-if="dataSolution">
                    <table class="table tblvp">
                      <tbody>
                        <tr>
                          <td rowspan="2" style="height: 515px;width: 188px;">
                            <b>{{dataSolution.fields[0].field_template.name}}<a v-if="role === 'Talent'" @click="editBS(dataSolution)" class="posisieditvp"><i class="fa fa-edit"></i></a></b> 
                            <!-- <a v-if="role === 'Talent'"
                              @click="editBS(dataSolution)"
                              style="margin: 10px"
                              class="btn btn-default btn-sm">
                              <i class="fa fa-edit"></i>
                            </a> -->
                            <br><br>
                            <span v-html="dataSolution.fields[0].value"></span>
                          </td>
                          <td>
                            <b>{{dataSolution.fields[2].field_template.name}}<a v-if="role === 'Talent'" @click="editBS(dataSolution)" class="posisieditvp"><i class="fa fa-edit"></i></a></b>
                            <!-- <a v-if="role === 'Talent'"
                              @click="editBS(dataSolution)"
                              style="margin: 10px"
                              class="btn btn-default btn-sm">
                              <i class="fa fa-edit"></i>
                            </a> -->
                            <br><br>
                            <span v-html="dataSolution.fields[2].value"></span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>{{dataSolution.fields[1].field_template.name}}<a v-if="role === 'Talent'" @click="editBS(dataSolution)" class="posisieditvp"><i class="fa fa-edit"></i></a></b>
                            <!-- <a v-if="role === 'Talent'"
                              @click="editBS(dataSolution)"
                              style="margin: 10px"
                              class="btn btn-default btn-sm">
                              <i class="fa fa-edit"></i>
                            </a> -->
                            <br>
                            <span v-html="dataSolution.fields[1].value"></span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <!--
                  <table class="table table-hover table-responsive">
                  solution
                  <tbody style="border-top-style: none !important;">
                      <tr v-for="data in dataSolution.fields">
                        <td width="250px"><b>{{data.field_template.name}}</b></td>
                    <template v-if="data.value != null">
                      <td>{{data.value}}</td>
                    </template>
                    <template v-else>
                      <td v-for="option in data.selected_options">
                        {{option.option.name}}
                      </td>
                    </template>
                    </tr>  
                    </tbody>
                </table>
                    -->
                    <button
                      @click="openCommentsVP(dataSolution.id)"
                      class="btn btn-default"
                      type="button"
                    >
                      <i class="fa fa-refresh"></i> Munculkan Komentar
                    </button>

                    <template v-if="role === 'Talent'">
                      <!-- <a
                        @click="editBS(dataSolution)"
                        style="margin: 10px"
                        class="btn btn-default btn-sm"
                      >
                        <i class="fa fa-edit"></i>
                      </a> -->
                      <a
                        @click="confirm('Delete',dataSolution.id)"
                        style=" margin: 10px;
                                float: right;
                                position: relative;
                                bottom: 576px;
                                left: 9px;
                                border-bottom-left-radius: 0px;
                                border-bottom-right-radius: 0px;"
                        class="btn btn-danger btn-sm"
                      >
                        <i class="fa fa-trash"></i>
                      </a>
                    </template>
                    <!--<button @click="openCommentsVP(dataVP.id)" class="btn btn-default" type="button"><i class="fa fa-refresh"></i> Munculkan Komentar</button>-->
                  </div>
                  <div class="box-body" v-else>
                    No Solution Yet
                    <hr>
                    <template v-for="data in dataTemplate.list" v-if="data.name === 'Solution'">
                      <a
                        v-if="role === 'Talent'"
                        class="btn btn-default"
                        @click="addBS(data.id)"
                      >Add {{data.name}}</a>
                    </template>
                  </div>
                </div>
                <!--start pie  -->
                <div class="col-md-6">
                  

                   <div v-for="data in personaAspect.aspect.slice(0,3)" v-if="rubah">
                     <b>{{data.field_template.name}}</b><br><br>
                     <span style="word-break: break-all;" v-html="data.value"></span><br><hr>
                   </div>  


                  <div style="position: relative" v-if="!rubah">

                    <table class="table tblvp">
                      <tbody>
                        <tr>
                          <td>
                            <b><span v-html="personaAspect.aspect[6].field_template.name"></span></b>
                            <br><br>
                            <span style="word-break:break-all" v-html="personaAspect.aspect[6].value"></span>
                          </td>
                           <td rowspan="2" style="height: 515px; width: 188px;">
                            <b><span v-html="personaAspect.aspect[4].field_template.name"></span></b>
                            <br>
                            <span v-html="personaAspect.aspect[4].value"></span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b><span v-html="personaAspect.aspect[5].field_template.name"></span></b>
                            <br><br>
                            <span v-html="personaAspect.aspect[5].value"></span>
                          </td>
                          
                        </tr>
                      </tbody>
                    </table>

                  <!-- start pie   -->
                    <!-- <div style="padding:20px;position: absolute">
                      <div class="pie" style="border:7px solid #c0c0c0">
                        <div class="pie__segment" style="--offset: 3; --value: 52; --bg: #d8d8d8;"></div>
                        <div class="pie__segment" style="--offset: 45; --value: 40; --bg: #c5c5c5;"></div>
                        <div class="pie__segment" style="--offset: 55; --value: 70; --bg: #e2e2e2;"></div>
                      </div>
                    </div>

                    <div class="isianpie posisigain">
                      <label>Gain</label>
                      <div data-simplebar class="areagain">
                        <span v-html="personaAspect.aspect[6].value"></span>
                      </div>
                    </div>
                    <div class="isianpie posisipain">
                      <label>Pain</label>
                      <div data-simplebar class="areapain">
                        <span class="areapain" v-html="personaAspect.aspect[5].value"></span>
                      </div>
                    </div>
                    <div class="isianpie posisigoal">
                      <label>Goal</label>
                      <div data-simplebar class="areapain">
                        <span class="areapain" v-html="personaAspect.aspect[4].value"></span>
                      </div>
                    </div> -->
                  </div>
                </div>
                <!--end pie-->
              </div>

              <!--
                <table class="table table-hover table-responsive">
              <tbody style="border-top-style: none !important;">
                <tr v-for="data in personaAspect.aspect.slice(4,7)" v-if="!data.field_template.is_removed">
                  <td width="250px"><b>{{data.field_template.name}}</b></td>
                  <template v-if="data.value != null">
                    <td>{{data.value}}</td>
                  </template>
                  <template v-else>
                    <td v-for="option in data.selected_options">
                      {{option.option.name}}
                    </td>
                  </template>                   
                </tr>  
                <tr>
                  <td width="250px"> <b>Value Proposition</b></td>
                  <td>
                    <p>{{parentVP.description}}</p>
                    <a v-if="role === 'Talent'" class="btn btn-sm btn-default" @click="updateVP()"><i class="fa fa-pencil-square"></i></a>
                  </td>
                </tr>
              </tbody>
              </table>
              -->
              <div class="row">
                <div class v-if="openVP">
                  <div class>
                    <hr>
                    <comment v-bind:experimentId="experimentId"></comment>
                  </div>
                </div>
              </div>
            </div>

            <div id="ma" class="tab-pane fade">
              <div v-if="dataMA">
                <!--Info MA-->
                <!-- {{dataMA}} -->
                <button
                  class="btn btn-info"
                  @click="learningMA"
                  style="border-radius: 5px; padding: 2px 8px;"
                >
                  <i class="fa fa-info-circle"></i> Klik disini apabila kamu ingin mempelajari tentang  Market Analysis
                </button>
                <template v-if="role === 'Talent'">
                  <a @click="editBS(dataMA)" style="margin: 10px" class="btn btn-default btn-sm">
                    <i class="fa fa-edit"></i>
                  </a>
                  <a
                    @click="confirm('Delete',dataMA.id)"
                    style="mardeleteBS(gin: 10px"
                    class="btn btn-danger btn-sm"
                  >
                    <i class="fa fa-trash"></i>
                  </a>
                  
                </template>
                <table class="table table-hover table-responsive">
                  <tbody style="border-top-style: none !important;">
                    <tr v-for="data in reOrderArray(dataMA.fields)">
                      <td class="mscolor" width="250px">
                        <b>{{data.field_template.name}}</b>
                      </td>
                      <template v-if="data.value != null">
                        <td><span v-html="data.value"></span></td>
                      </template>
                      <template v-else>
                        <td v-for="option in data.selected_options">{{option.option.name}}</td>
                      </template>
                    </tr>
                  </tbody>
                </table>

                <button @click="openCommentsMA(dataMA.id)" class="btn btn-default" type="button">
                  <i class="fa fa-refresh"></i> Munculkan Komentar
                </button>
              </div>
              <div class="box-body" v-else>
                <button
                  class="btn btn-info"
                  @click="learningMA"
                  style="border-radius: 5px; padding: 2px 8px;"
                >
                  <i class="fa fa-info-circle"></i> Klik disini apabila kamu ingin mempelajari tentang  Market Analysis
                </button>
                <br>
                <h4 style="padding: 20px">No Data Add from template</h4>
                <hr>
                <template v-for="data in dataTemplate.list" v-if="data.name === 'Market Analysis'">
                  <a
                    v-if="role === 'Talent'"
                    class="btn btn-default"
                    @click="addBS(data.id)"
                  >Add {{data.name}}</a>
                </template>
              </div>
              <div class v-if="openMA">
                <div class>
                  <comment v-bind:experimentId="experimentId"></comment>
                </div>
              </div>
            </div>

            <div id="swot" class="tab-pane fade">
              <div v-if="dataSWOT">
                <!--info SWOT-->
                <button
                  class="btn btn-info"
                  @click="learningSWOT"
                  style="border-radius: 5px; padding: 2px 8px;"
                >
                  <i class="fa fa-info-circle"></i> Klik disini apabila kamu ingin mempelajari tentang  SWOT
                </button>
                <template v-if="role === 'Talent'">
                   <a @click="editBS(dataSWOT)" style="margin: 10px" class="btn btn-default btn-sm">
                    <i class="fa fa-edit"></i>
                  </a>
                  <a
                    @click="confirm('Delete',dataSWOT.id)"
                    style="margin: 10px"
                    class="btn btn-danger btn-sm"
                  >
                    <i class="fa fa-trash"></i>
                  </a>
                 
                </template>
                <table class="table table-bordered table-hover table-condensed table-responsive">
                  <thead>
                    <tr class="mscolor">
                      <th style="width: 50%;">Strength</th>
                      <th>Weakness</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span v-html="dataSWOT.fields[0].value"></span></td>
                      <td><span v-html="dataSWOT.fields[1].value"></span></td>
                    </tr>
                  </tbody>
                </table>

                <table class="table table-bordered table-hover table-condensed table-responsive">
                  <thead>
                    <tr class="mscolor">
                      <th style="width: 50%;">Opportunity</th>
                      <th>Threat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span v-html="dataSWOT.fields[2].value"></span></td>
                      <td><span v-html="dataSWOT.fields[3].value"></span></td>
                    </tr>
                  </tbody>
                </table>
                <button
                  @click="openCommentsSWOT(dataSWOT.id)"
                  class="btn btn-default"
                  type="button"
                >
                  <i class="fa fa-refresh"></i> Munculkan Komentar
                </button>
              </div>
              <div class="box-body" v-else>
                <button
                  class="btn btn-info"
                  @click="learningSWOT"
                  style="border-radius: 5px; padding: 2px 8px;"
                >
                  <i class="fa fa-info-circle"></i> Klik disini apabila kamu ingin mempelajari tentang  SWOT
                </button>
                <br>
                <h4 style="padding: 20px">No Data Add from template</h4>
                <hr>
                <template v-for="data in dataTemplate.list" v-if="data.name === 'SWOT Analysis'">
                  <a
                    v-if="role === 'Talent'"
                    class="btn btn-default"
                    @click="addBS(data.id)"
                  ><i class="fa fa-plus"></i> Tambah {{data.name}}</a>
                </template>
              </div>
              <div v-if="openSWOT">
                <div>
                  <comment v-bind:experimentId="experimentId"></comment>
                </div>
              </div>
            </div>

            <div id="competitor" class="tab-pane fade">
              <onsub v-if="onLoadCompetitor"></onsub>
              <bs-competitor v-bind:data="dataCompetitor" v-bind:role="role" v-show="!onLoadCompetitor" @closeModalRefresh="closeModalRefreshCompetitor()" @getData="getCompetitorData()"></bs-competitor>
            </div>
          </div>
        </div>

        <!-- end box body-->
      </div>

      <!--<a v-show="!showTemplate" class="btn btn-warning" @click="showTemplateBS()"><span class="glyphicon glyphicon-plus-sign"></span> Create New Business Structure</a>-->

      <div class="box" v-if="showTemplate">
        <a class="btn btn-warning" @click="showTemplate = false">
          <i class="fa fa-times"></i> Close
        </a>
        <div class="box-body">
          <h4 v-show="dataTemplate.total > 0">Choose Business Structure Template</h4>

          <table class="table" v-if="dataTemplate.total > 0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th colspan="1"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in dataTemplate.list">
                <td>{{data.name}}</td>
                <td>{{data.description}}</td>
                <td>
                  <a class="btn btn-default" @click="addBS(data.id)">Add</a>
                </td>
              </tr>
            </tbody>
          </table>

          <div
            style="padding:20px"
            v-if="dataTemplate.total === 0"
          >No Business Structure Template yet, please be patient...</div>
        </div>
      </div>
    </section>

    <form-bs
      v-bind:edit="edit"
      v-bind:teamId="teamId"
      v-bind:ideaId="ideaId"
      v-bind:customersegmentId="customersegmentId"
      v-bind:personaId="personaId"
      v-bind:valuepropositionId="valuepropositionId"
      v-bind:templateId="templateId"
      v-if="showForm"
      @close="showForm = false"
      @closeModalRefresh="closeModalRefresh()"
    ></form-bs>

    <form-ebs
      v-bind:edit="edit"
      v-bind:teamId="teamId"
      v-bind:ideaId="ideaId"
      v-bind:customersegmentId="customersegmentId"
      v-bind:personaId="personaId"
      v-bind:valuepropositionId="valuepropositionId"
      v-bind:template="template"
      v-if="showeForm"
      @close="showeForm = false"
      @closeModalRefresh="closeModalRefresh()"
    ></form-ebs>

    <form-vp
      v-bind:edit="edit"
      v-bind:teamId="teamId"
      v-bind:ideaId="ideaId"
      v-bind:customersegmentId="customersegmentId"
      v-bind:personaId="personaId"
      v-bind:valuepropositionId="valuepropositionId"
      v-if="shownewFormVP"
      @close="shownewFormVP = false"
      @closeModalRefresh="closeModalRefresh()"
    ></form-vp>

    <form-cs
      v-bind:edit="edit"
      v-bind:teamId="teamId"
      v-bind:ideaId="ideaId"
      v-bind:customersegmentId="customersegmentId"
      v-if="showFormCS"
      @close="showFormCS = false"
      @closeModalRefresh="closeModalRefresh()"
    ></form-cs>

    <ondelete v-if="toconfirm" @close="toconfirm = false" v-bind:act="act" @confirmed="confirmed"></ondelete>
  </div>
</template>  


<script>
import auth from "@/httpcontrol";
import Loading from "@/components/loading";
import * as CONFIG from "@/app.config.js";
import alertControl from "@/alertcontrol";
import ErrorFlash from "../../../../../errorflash";
import FormBS from "./newBS";
import EditBS from "./editBS";
import onSubmit from "@/components/onsubmit";
import Comment from "@/components/inovasi/comment/commentBusiness";
import FormVP from "../../valueproposition/newVP";
import FormCS from "../../customersegment/newCS";
import OnDelete from "@/components/ondelete";

import BsCompetitor from "./components/BsCompetitor";
import BsValueCurve from "./components/BsValueCurve";

import simplebar from 'simplebar-vue';
import 'simplebar/dist/simplebar.min.css';

export default {
  data: function() {
    return {
      data: { total: 0, list: [] },
      dataLean: false,
      dataBMC: false,
      dataMS: false,
      dataVP: false,
      dataMA: false,
      dataSWOT: false,
      dataSolution: false,
      dataTemplate: { total: 0, list: [] },
      dataCompetitor: { total: 0, list: [] },
      err_msg: "",
      success: false,
      error: false,
      showForm: false,
      showeForm: false,
      edit: false,
      tutorId: this.$route.params.tutorId,
      teamId: this.$route.params.teamId,
      ideaId: this.$route.params.ideaId,
      customersegmentId: this.$route.params.customersegmentId,
      personaId: this.$route.params.personaId,
      valuepropositionId: this.$route.params.valuepropositionId,
      experimentId: "",
      template: "",
      loading: true,
      showTemplate: false,
      komentar: {
        content: ""
      },
      commentsBMC: {
        total: 0,
        list: []
      },
      openBMC: false,
      openLean: false,
      openMS: false,
      openVP: false,
      openMA: false,
      openSWOT: false,
      onComment: false,
      role: "",
      url: "",
      url2: "/",
      parentCS: "",
      parentVP: "",
      personaAspect: "",
      shownewFormVP: false,
      showFormCS: false,
      toconfirm: false,
      confirmId: "",
      act: "",
      onLoadCompetitor: false,
      rubah: false,
      dataVC: false,
      onLoadValueCurve: false
    };
  },
  components: {
    "error-flash": ErrorFlash,
    loading: Loading,
    "form-bs": FormBS,
    "form-ebs": EditBS,
    comment: Comment,
    onsub: onSubmit,
    "form-vp": FormVP,
    "form-cs": FormCS,
    ondelete: OnDelete,
    "bs-competitor": BsCompetitor,
    "bs-valuecurve": BsValueCurve,
    simplebar
  },
  computed: {
    NumbertoLocale: function() {
      return  this.dataMS.list.map(function(item) {
        if(item.value != null){
          return item.value.toLocaleString();
        }else{
          return "no data"
        }
      });
    }
    
  },
  created: function() {
    this.role = localStorage.getItem("role");
    if (this.role !== "Talent") {
      this.url = "/tutor/" + this.tutorId;
      this.url2 = "?value=";
    }
    this.getData();
  },
  methods: {
    reOrderArray: function(params) {
      return _.orderBy(params, "position", "asc");
    },
    NumbertoLocale2: function(params) {
        if(params != null){
          return params.toLocaleString();
        }else{
          return "no data"
        }
    },
    closeModalRefreshValuecurve: function() {
      this.onLoadValueCurve = false;
      this.getValueCurveData();
    },
    getValueCurveData: function() {
          this.onLoadValueCurve = true;
          this.loading = true
          var bmc = "Value Curve";
          this.dataVC = false;
          auth
            .getData2(
              this,
              this.url +
                "/team/" +
                this.teamId +
                "/idea/" +
                this.ideaId +
                "/customer_segment/" +
                this.customersegmentId +
                "/persona/" +
                this.personaId +
                "/value_proposition/" +
                this.valuepropositionId +
                "/business_structure/template_name" +
                this.url2 +
                encodeURI(bmc)
            )
            .then(
              res => {
                console.log(res);
                return res.json();
              },
              error => {
                console.log(error);
                //alertControl.showError(error.body.meta)
                this.dataVC = false;
                this.onLoadValueCurve = false;
                this.loading = false;
              }
            )
            .then(data => {
              this.dataVC = data.data;
              this.onLoadValueCurve = false;
              this.loading = false;
            });
        },
    getData: function() {
      this.getCustomerSegmentParent();
      this.getValuePropositionParent();
      //        auth.getData(this, '/team/' + this.$route.params.teamId + '/idea/' + this.$route.params.ideaId + '/customer_segment/' + this.$route.params.customersegmentId + '/persona/' + this.$route.params.personaId + '/value_proposition/' + this.$route.params.valuepropositionId + '/business_structure')
      this.showTemplateBS();
      this.getBMC();
      this.getLeanCanvas();
      this.getMarketSize();
      //        this.getVPCanvas()
      this.getSolutionCanvas();
      this.getPersonaAspect();
      this.getMA();
      this.getSWOT();
    },
    getPersonaAspect: function() {
      //      this.loading = true
      auth
        .getData2(
          this,
          this.url +
            "/team/" +
            this.$route.params.teamId +
            "/idea/" +
            this.$route.params.ideaId +
            "/customer_segment/" +
            this.$route.params.customersegmentId +
            "/persona/" +
            this.$route.params.personaId
        )
        .then(
          res => {
            console.log(res);
            return res.json();
          },
          error => {
            console.log(error);
          }
        )
        .then(data => {
          this.personaAspect = data.data;
        });
    },
    getCustomerSegmentParent: function() {
      auth
        .getData2(
          this,
          this.url +
            "/team/" +
            this.teamId +
            "/idea/" +
            this.ideaId +
            "/customer_segment/" +
            this.customersegmentId
        )
        .then(
          res => {
            return res.json();
          },
          error => {
            console.log(error);
            alertControl.showError(error.body.meta);
          }
        )
        .then(data => {
          this.parentCS = data.data;
          this.loading = false;
        });
    },
    getValuePropositionParent: function() {
      auth
        .getData2(
          this,
          this.url +
            "/team/" +
            this.teamId +
            "/idea/" +
            this.ideaId +
            "/customer_segment/" +
            this.customersegmentId +
            "/persona/" +
            this.personaId +
            "/value_proposition/" +
            this.valuepropositionId
        )
        .then(
          res => {
            return res.json();
          },
          error => {
            console.log(error);
            alertControl.showError(error.body.meta);
          }
        )
        .then(data => {
          this.parentVP = data.data;
          this.loading = false;
        });
    },
    getBMC: function() {
      this.loading = true;
      var bmc = "Business Model Canvas";
      this.dataBMC = false;
      auth
        .getData2(
          this,
          this.url +
            "/team/" +
            this.teamId +
            "/idea/" +
            this.ideaId +
            "/customer_segment/" +
            this.customersegmentId +
            "/persona/" +
            this.personaId +
            "/value_proposition/" +
            this.valuepropositionId +
            "/business_structure/template_name" +
            this.url2 +
            encodeURI(bmc)
        )
        .then(
          res => {
            console.log(res);
            return res.json();
          },
          error => {
            console.log(error);
            //                  alertControl.showError(error.body.meta)
            this.dataBMC = false;
          }
        )
        .then(data => {
          this.dataBMC = data.data;
          this.loading = false;
        });
    },
    getLeanCanvas: function() {
      this.loading = true;
      var bmc = "Lean Canvas";
      this.dataLean = false;
      auth
        .getData2(
          this,
          this.url +
            "/team/" +
            this.teamId +
            "/idea/" +
            this.ideaId +
            "/customer_segment/" +
            this.customersegmentId +
            "/persona/" +
            this.personaId +
            "/value_proposition/" +
            this.valuepropositionId +
            "/business_structure/template_name" +
            this.url2 +
            encodeURI(bmc)
        )
        .then(
          res => {
            console.log(res);
            return res.json();
          },
          error => {
            console.log(error);
            //                  alertControl.showError(error.body.meta)
            this.dataLean = false;
          }
        )
        .then(data => {
          this.dataLean = data.data;
          this.loading = false;
        });
    },
    getMarketSize: function() {
      this.loading = true;
      var bmc = "Market Size";
      this.dataMS = false;
      auth
        .getData2(
          this,
          this.url +
            "/team/" +
            this.teamId +
            "/idea/" +
            this.ideaId +
            "/customer_segment/" +
            this.customersegmentId +
            "/persona/" +
            this.personaId +
            "/value_proposition/" +
            this.valuepropositionId +
            "/business_structure/template_name" +
            this.url2 +
            encodeURI(bmc)
        )
        .then(
          res => {
            console.log(res);
            return res.json();
          },
          error => {
            console.log(error);
            //                  alertControl.showError(error.body.meta)
            this.dataMS = false;
          }
        )
        .then(data => {
          this.dataMS = data.data;
          this.anjingAsuMS(data.data)
          this.loading = false;
        });
    },
    anjingAsuMS: function(data){
      for(var i in data.fields){
         this.dataMS.fields[i]['position'] = data.fields[i].field_template.position
      }
      this.dataMS['list'] = this.reOrderArray(this.dataMS.fields)
    },
    getVPCanvas: function() {
      this.loading = true;
      var bmc = "Value Proposition";
      this.dataVP = false;
      auth
        .getData2(
          this,
          this.url +
            "/team/" +
            this.teamId +
            "/idea/" +
            this.ideaId +
            "/customer_segment/" +
            this.customersegmentId +
            "/persona/" +
            this.personaId +
            "/value_proposition/" +
            this.valuepropositionId +
            "/business_structure/template_name" +
            this.url2 +
            encodeURI(bmc)
        )
        .then(
          res => {
            console.log(res);
            return res.json();
          },
          error => {
            console.log(error);
            //                  alertControl.showError(error.body.meta)
            this.dataVP = false;
          }
        )
        .then(data => {
          this.dataVP = data.data;
          this.loading = false;
        });
    },
    getSolutionCanvas: function() {
      this.loading = true;
      var bmc = "Solution";
      this.dataSolution = false;
      auth
        .getData2(
          this,
          this.url +
            "/team/" +
            this.teamId +
            "/idea/" +
            this.ideaId +
            "/customer_segment/" +
            this.customersegmentId +
            "/persona/" +
            this.personaId +
            "/value_proposition/" +
            this.valuepropositionId +
            "/business_structure/template_name" +
            this.url2 +
            encodeURI(bmc)
        )
        .then(
          res => {
            console.log(res);
            return res.json();
          },
          error => {
            console.log(error);
            //                  alertControl.showError(error.body.meta)
            this.dataSolution = false;
          }
        )
        .then(data => {
          this.dataSolution = data.data;
          this.loading = false;
        });
    },
    getMA: function() {
      this.loading = true;
      var bmc = "Market Analysis";
      this.dataMA = false;
      auth
        .getData2(
          this,
          this.url +
            "/team/" +
            this.teamId +
            "/idea/" +
            this.ideaId +
            "/customer_segment/" +
            this.customersegmentId +
            "/persona/" +
            this.personaId +
            "/value_proposition/" +
            this.valuepropositionId +
            "/business_structure/template_name" +
            this.url2 +
            encodeURI(bmc)
        )
        .then(
          res => {
            console.log(res);
            return res.json();
          },
          error => {
            console.log(error);
            //                  alertControl.showError(error.body.meta)
            this.dataMA = false;
          }
        )
        .then(data => {
          this.dataMA = data.data;
          this.anjingAsuMA(data.data);
          this.loading = false;
        });
    },
    anjingAsuMA: function(data){
      for(var i in data.fields){
         this.dataMA.fields[i]['position'] = data.fields[i].field_template.position
      }
    },
    getSWOT: function() {
      this.loading = true;
      var bmc = "SWOT Analysis";
      this.dataSWOT = false;
      auth
        .getData2(
          this,
          this.url +
            "/team/" +
            this.teamId +
            "/idea/" +
            this.ideaId +
            "/customer_segment/" +
            this.customersegmentId +
            "/persona/" +
            this.personaId +
            "/value_proposition/" +
            this.valuepropositionId +
            "/business_structure/template_name" +
            this.url2 +
            encodeURI(bmc)
        )
        .then(
          res => {
            console.log(res);
            return res.json();
          },
          error => {
            console.log(error);
            //                  alertControl.showError(error.body.meta)
            this.dataSWOT = false;
          }
        )
        .then(data => {
          this.dataSWOT = data.data;
          this.loading = false;
        });
    },
    showFormBS: function(template) {
      this.showForm = true;
      this.edit = false;
      this.template = template;
    },
    updateBS: function(template) {
      this.showForm = true;
      this.edit = true;
      this.template = template;
    },
    closeModalRefresh: function() {
      this.showForm = false;
      this.showeForm = false;
      this.shownewFormVP = false;
      this.showFormCS = false;
      this.getData();
    },
    closeModalRefreshCompetitor: function() {
      this.onLoadCompetitor = false;
      this.getCompetitorData();
    },
    showTemplateBS: function() {
      //        this.showTemplate = true
      this.$http
        .get(
          CONFIG.APIENDPOINT +
            this.url +
            "/team/form_template/business_structure",
          { headers: auth.getAuthHeader() }
        )
        .then(
          response => {
            return response.json();
          },
          error => {
            alertControl.showError(this, error.body.meta);
          }
        )
        .then(data => {
          this.dataTemplate = data.data;
        });
    },
    addBS: function(id) {
      //        alert(id)
      this.showForm = true;
      this.edit = false;
      this.templateId = id;
    },
    editBS: function(data) {
      this.showeForm = true;
      this.edit = true;
      this.template = data;
    },
    deleteBS: function(id) {
      this.loading = true;
      auth
        .deleteData2(
          this,
          "/team/" +
            this.$route.params.teamId +
            "/idea/" +
            this.$route.params.ideaId +
            "/customer_segment/" +
            this.$route.params.customersegmentId +
            "/persona/" +
            this.$route.params.personaId +
            "/value_proposition/" +
            this.$route.params.valuepropositionId +
            "/business_structure/" +
            id
        )
        .then(
          res => {
            console.log(res);
            this.loading = false;
            this.closeModalRefresh();
          },
          error => {
            console.log(error);
            alertControl.showError(this, error.body.meta);
            this.loading = false;
          }
        );
    },
    confirm: function(act, id) {
      this.toconfirm = true;
      this.act = act;
      this.confirmId = id;
    },
    confirmed: function() {
      this.toconfirm = false;
      this.deleteBS(this.confirmId);
    },
    openCommentsBMC: function(id) {
      this.experimentId = id;
      this.openBMC = true;
    },
    openCommentsLean: function(id) {
      this.experimentId = id;
      this.openLean = true;
    },
    openCommentsMS: function(id) {
      this.experimentId = id;
      this.openMS = true;
    },
    openCommentsMA: function(id) {
      this.experimentId = id;
      this.openMA = true;
    },
    openCommentsVP: function(id) {
      this.experimentId = id;
      this.openVP = true;
    },
    openCommentsSWOT: function(id) {
      this.experimentId = id;
      this.openSWOT = true;
    },
    updateVP: function() {
      this.shownewFormVP = true;
      this.edit = true;
    },
    updateCS: function() {
      this.edit = true;
      this.showFormCS = true;
      this.customersegmentId = this.parentCS.id;
    },
    learningBMC: function() {
      let routeData = this.$router.resolve({
        path: "/learning",
        query: { type: "businessModelCanvas" }
      });
      window.open(routeData.href, "_blank");
    },
    learningLC: function() {
      let routeData = this.$router.resolve({
        path: "/learning",
        query: { type: "LeanCanvas" }
      });
      window.open(routeData.href, "_blank");
    },
    learningVP: function() {
      let routeData = this.$router.resolve({
        path: "/learning",
        query: { type: "ValueProposition" }
      });
      window.open(routeData.href, "_blank");
    },
    learningMS: function() {
      let routeData = this.$router.resolve({
        path: "/learning",
        query: { type: "MarketSize" }
      });
      window.open(routeData.href, "_blank");
    },
    learningMA: function() {
      let routeData = this.$router.resolve({
        path: "/learning",
        query: { type: "MarketAnalysis" }
      });
      window.open(routeData.href, "_blank");
    },
    learningSWOT: function() {
      let routeData = this.$router.resolve({
        path: "/learning",
        query: { type: "SWOT" }
      });
      window.open(routeData.href, "_blank");
    },
    getCompetitorData: function() {
      this.onLoadCompetitor = true
      auth
        .getData2(
          this,
          this.url +
            "/team/" +
            this.$route.params.teamId +
            "/idea/" +
            this.$route.params.ideaId +
            "/customer_segment/" +
            this.$route.params.customersegmentId +
            "/persona/" +
            this.$route.params.personaId +
            "/value_proposition/" +
            this.$route.params.valuepropositionId +
            "/competitor"
        )
        .then(
          res => {
            if (res.status === 204) {
              this.dataCompetitor = { total: 0, list: [] };
            } else if (res.status === 404) {
              alertControl.showError(this, ["404 not found"]);
            } else {
              return res.json();
            }
          },
          error => {
            console.log(error);
            alertControl.showError(this, error.body.meta);
            this.onLoadCompetitor = false;
          }
        )
        .then(data => {
          this.dataCompetitor = data.data;
          this.onLoadCompetitor = false;
        });
    }
  }
};
</script>  

<style scoped>
.pb-cmnt-container {
  font-family: Lato;
  margin-top: 20px;
}

.pb-cmnt-textarea {
  resize: none;
  padding: 20px;
  height: 130px;
  width: 100%;
  border: 1px solid #f2f2f2;
}
/*    .table > tbody > tr > td {
       border-top: 1px solid #f4f4f4 !important; 
    }*/
table {
  border-collapse: collapse !important;
}

table,
th,
td {
  border: 1px solid #cecece !important;
}
.bisaenter {
  white-space: pre-line;
}
.pie {
  border-radius: 100%;
  height: calc(var(--size, 500) * 1px);
  overflow: hidden;
  position: relative;
  width: calc(var(--size, 500) * 1px);
}
.pie__segment {
  --a: calc(var(--over50, 0) * -100%);
  --b: calc((1 + var(--over50, 0)) * 100%);
  --degrees: calc((var(--offset, 0) / 100) * 360);
  -webkit-clip-path: polygon(
    var(--a) var(--a),
    var(--b) var(--a),
    var(--b) var(--b),
    var(--a) var(--b)
  );
  clip-path: polygon(
    var(--a) var(--a),
    var(--b) var(--a),
    var(--b) var(--b),
    var(--a) var(--b)
  );
  height: 100%;
  position: absolute;
  -webkit-transform: translate(0, -50%) rotate(90deg)
    rotate(calc(var(--degrees) * 1deg));
  transform: translate(0, -50%) rotate(90deg)
    rotate(calc(var(--degrees) * 1deg));
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
  width: 100%;
  z-index: calc(1 + var(--over50));
}
.pie__segment:after,
.pie__segment:before {
  background: var(--bg, #e74c3c);
  content: "";
  height: 100%;
  position: absolute;
  width: 100%;
}
.pie__segment:before {
  --degrees: calc((var(--value, 45) / 100) * 360);
  -webkit-transform: translate(0, 100%) rotate(calc(var(--degrees) * 1deg));
  transform: translate(0, 100%) rotate(calc(var(--degrees) * 1deg));
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
}
.pie__segment:after {
  opacity: var(--over50, 0);
}
.isianpie {
  display: inline-grid;
}
.posisigain {
  position: absolute;
  top: 108px;
  left: 93px;
}
.areagain {
  height: 129px;
  width: 172px;
  background: transparent;
  border: none;
  overflow:auto;
  overflow-x:hidden;
}
.posisipain {
  position: absolute;
  top: 285px;
  left: 94px;
}
.areapain {
  height: 128px;
  width: 161px;
  background: transparent;
  border: none;
  overflow:auto;
  overflow-x:hidden;
}
.posisigoal {
  position: absolute;
  top: 189px;
  left: 320px;
}
.areagoal {
  height: 193px;
  width: 162px;
  background: transparent;
  border: none;
  overflow:auto;
  overflow-x:hidden;
}
#tblleancanvas td {
  text-align: center;
  vertical-align: top !important;
}
#tblleancanvas td p {
  text-align: left !important;
}
#tblleancanvas td a {
  float: right;
}
#tblleancanvas td strong {
    background: #e4e4e4;
    color: #505050;
    display: block;
    padding: 5px;
    margin: -8px -8px 20px;
}
#tblleancanvas td a {
    margin-top: 10px;
}

#tblbmc td {
  text-align: center;
  vertical-align: top !important;
}
#tblbmc td p {
  text-align: left !important;
}
#tblbmc td a {
  float: right;
}
#tblbmc td strong {
    background: #e4e4e4;
    color: #505050;
    display: block;
    padding: 5px;
    margin: -8px -8px 20px;
}
#tblbmc td a {
    margin-top: 10px;
}
.posisiedit {
  position: relative;
  bottom: 9px;
  right: 5px;
  color: #505050;
  cursor: pointer;
}

.posisieditvp {
  color: #505050;
  cursor: pointer;
  float: right;
}

.tblvp td b{
    background: #e4e4e4;
    color: #505050;
    display: block;
    padding: 5px;
    margin: -8px -8px 20px;
}
.tblvp td {
  text-align: center;
  vertical-align: top !important;
}

.tblvp td span {
 text-align: left !important;
}

.msvalue {
  width: 25%;
  text-align: center;
}
.mscolor {
  background: #e4e4e4;
  color: #505050;
}
</style>