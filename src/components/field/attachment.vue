<template>
  <div>
    <!-- {{field.id}} -->
    <div class="row" v-show="!fieldPath">
      <div class="col-md-4">
        <label style="padding: 6px" >{{field.name}}</label>
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
    <div class="row" v-if="preview">
      <div class="col-md-4">
        <label style="padding: 6px" v-if="fieldPath">{{field.name}}</label>
      </div>
      <div class="col-md-6">
        <img id="uploadPreview" style="width: 100px; height: 100px;"><br>
        <template v-if="progressShow">
        <progress :value="progressCount" max="100"></progress> {{progressCount}} % </template>
      </div>
    </div>
    <!-- response : {{data}} -->
    <div class="row" v-if="fieldPath">
      <div class="col-md-4">
        <label style="padding: 6px"></label>
      </div>
      <div class="col-md-6">
        <!-- <input class="kotak" type="text" :name="field.id"> -->
        <select style="width: 100%;height: 75px; display:none" :name="field.id" multiple class="kotak">
          <option :value="data.id" selected>{{ data.file_path }}</option>
        </select>
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

export default {
  props: ["field"],
  components: {},
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
      headers: {}
    };
  },
  created: function() {},
  methods: {
    fileChange(fileList) {
      this.files.set("file", fileList[0]);
      this.selectedFile = fileList[0];
      this.headers["name"] = fileList[0].name;
      // console.log(this.files);
      var oFReader = new FileReader();
      oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

      oFReader.onload = function(oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
      };
      this.preview = true;
    },
    uploadFile: function() {
      // alert('upload file')
      const tokenData = window.localStorage.getItem("access_token");
      this.headers["Authorization"] = "Bearer " + tokenData;
      this.headers["Content-Type"] = "multipart/form-data";
      // console.log(this.headers)

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
          this.fieldPath = true;
          this.progressShow = false;
        });
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
