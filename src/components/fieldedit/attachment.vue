<template>
  <div>
    <!-- {{field}} -->
    <template v-if="field.attachment.length == 0">
      <div class="row" v-show="!fieldPath">
        <div class="col-md-4">
          <label style="padding: 6px">{{field.field_template.name}}</label>
        </div>
        <div class="col-md-6">
          <input
            id="uploadImage"
            type="file"
            accept="image/*"
            v-on:change="fileChange($event.target.files)"
          >
          <a @click="uploadFile" class="button btn-sm btn-danger">
            <i class="fa fa-upload" style="margin-top:15px"></i>
          </a>
          <small>
            <em>*make sure to upload image first before submit the form</em>
          </small>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="row">
        <div class="col-md-4">
          <label style="padding: 6px">{{field.field_template.name}}</label>
        </div>
        <div  class="col-md-6" v-if="onSubmit">
          <onsub v-show="onSubmit"></onsub>
        </div>  
        <div class="col-md-6" v-if="!onSubmit">
          <!-- {{field.attachment}} -->
          <div v-for="attachment in field.attachment">
            <!-- <img style="width: 200px;"
              :src="'/inovasi/public/uploads' + attachment.file_meta.file_path"
            > -->
            <img style="width: 200px;"
              :src="'http://start.mikti.id/inovasi/public/uploads' + attachment.file_meta.file_path"
            >
            <!-- <button class="btn btn-sm btn-danger" @click.prevent="deleteAttachment(attachment.file_meta.id)"><i class="fa fa-trash"></i> Hapus Attachment</button> -->
            <button class="btn btn-sm btn-danger" @click.prevent="hapusPath()"><i class="fa fa-trash"></i> Ganti Attachment</button>
          </div>
        </div>
      </div>
    </template>

    <div class="row" v-if="preview">
      <div class="col-md-4" v-if="field.attachment.length == 0">
        <label style="padding: 6px" v-if="fieldPath">{{field.field_template.name}}</label>
      </div>
      <div class="col-md-6" v-if="field.attachment.length == 0">
        <!-- {{data}} -->
        <img id="uploadPreview" style="width: 100px; height: 100px;">
        <br>
        <template v-if="progressShow">
          <progress :value="progressCount" max="100"></progress>
          {{progressCount}} %
        </template>
      </div>
    </div>
    <!-- response : {{data}} -->
    <div class="row" v-if="fieldPath">
      <div class="col-md-4">
        <label style="padding: 6px"></label>
      </div>
      <div class="col-md-6">
        <!-- <input class="kotak" type="text" :name="field.id"> -->
        <!-- {{field}} -->
        <select v-if="field.attachment.length != 0"
          style="width: 100%;height: 75px; display:none"
          :name="field.field_template.id"
          multiple
          class="kotak"
        >
          <option :value="field.attachment[0].file_meta.id" selected>{{ field.attachment[0].file_meta.file_path }}</option>
        </select>
        <input v-else type="hidden" value="" :name="field.field_template.id"></input>
        <br>
        <i class="fa fa-check-circle" style="color:green"></i> Image Uploaded
      </div>
    </div>
    <!--error-->
    <div class="row" v-if="error">
      <div class="col-md-12">
        <i class="fa fa-times" style="color:red"></i>
        <span style="color:red">{{this.err_msg.error_details}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import auth from "@/httpcontrol";
import * as CONFIG from "@/app.config.js";
import onSubmit from "@/components/onsubmit";

export default {
  props: ["field"],
  components: {
    onsub: onSubmit
  },
  data: function() {
    return {
      teamId: this.$route.params.teamId,
      content: "",
      preview: false,
      fieldPath: false,
      error: false,
      err_msg: { error_details: "" },
      progressCount: 0,
      progressShow: false,
      files: new FormData(),
      selectedFile: null,
      data: "",
      headers: {},
      onSubmit: false
    };
  },
  created: function() {},
  methods: {
    fileChange(fileList) {
      this.files.set("file", fileList[0]);
      this.selectedFile = fileList[0];
      var name = fileList[0].name;
      var str = name.replace(/\s/g, "");
      this.headers["name"] = str;
      // console.log(this.files);
      var oFReader = new FileReader();
      oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

      oFReader.onload = function(oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
      };
      this.preview = true;
    },
    uploadFile: function() {
      const tokenData = window.localStorage.getItem("access_token");
      this.headers["Authorization"] = "Bearer " + tokenData;
      this.headers["Content-Type"] = "multipart/form-data";

      this.progressShow = true;
      var _this = this;

      this.$http
        .post(
          CONFIG.APIENDPOINT + "/team/" + this.teamId + "/file",
          this.selectedFile,
          {
            headers: this.headers,
            progress(e) {
              if (e.lengthComputable) {
                console.log((e.loaded / e.total) * 100);
                _this.progressCount = Math.round((e.loaded / e.total) * 100);
              }
            }
          }
        )
        .then(
          res => {
            console.log(res);
            return res.json();
          },
          error => {
            console.log(error);
            this.err_msg = error.body.meta;
            this.error = true;
            this.progressShow = false;
          }
        )
        .then(data => {
          this.data = data.data;
          var file_meta = {'file_meta': {'id': this.data.id, 'file_path': this.data.file_path}}
          this.field.attachment.push(file_meta)
          this.fieldPath = true;
          this.progressShow = false;
        });
    },
    hapusPath: function(){
      this.field.attachment.splice(0,1)
    },
    deleteAttachment: function(id){
      console.log('deleting')
      this.error = false
      this.onSubmit = true
      this.$http.delete(CONFIG.APIENDPOINT + "/team/" + this.teamId + "/file/"+ id, {headers: auth.getAuthHeader()})
      .then(res =>{
        console.log('deleting successful')
        console.log(res)
        this.field.attachment.splice(0,1)
        this.onSubmit = false
      }, error =>{
        console.log('deleting failed')
        console.log(error)
        this.err_msg = error.body.meta;
        this.onSubmit = false
        this.error = true;
      })
    }
  }
};
</script>

<style>
.kotak {
  padding: 6px;
  margin-bottom: 10px;
  border-color: #eaeaea;
  border-style: solid;
}
/* @import "~vue-wysiwyg/dist/vueWysiwyg.css"; */
</style>
