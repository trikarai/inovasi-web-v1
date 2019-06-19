<template>
  <div>
    <!-- {{data}} -->

    <button class="btn btn-info" @click="learningVC" style="border-radius: 5px; padding: 2px 8px;">
      <i class="fa fa-info-circle"></i> Klik disini apabila kamu ingin mempelajari tentang Value Curve
    </button>

    <template v-if="data">
      <a @click="editBS(data)" style="margin: 10px" class="btn btn-default btn-sm">
        <i class="fa fa-edit"></i>
      </a>
      <a
        @click="confirm('Delete', data.id)"
        style="mardeleteBS(gin: 10px"
        class="btn btn-danger btn-sm"
      >
        <i class="fa fa-trash"></i>
      </a>  
    </template>

    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody style="border-top-style: hidden;">
        <tr v-for="data in data.fields">
          <td width="25%" style="vertical-align: top !important;">
            <b>{{data.field_template.name}}</b>
          </td>
          <template v-if="data.attachment">
            <td>
            <div v-for="attachment in data.attachment">
              <!-- <img :src="'/inovasi/public/uploads' + attachment.file_meta.file_path"> -->
              <img class="img-responsive img-rounded" width="550px"
                :src="'http://start.mikti.id/inovasi/public/uploads' + attachment.file_meta.file_path"
              >
            </div>
            </td>
          </template>
          <template v-if="data.attachment.length == 0">
            <td><span> No Image found</span></td>
          </template>  
          <template v-if="data.value != null">
            <td>
              <span v-html="data.value">null</span>
            </td>
          </template>
          <template v-else>
            <td v-for="option in data.selected_options">{{option.option.name}}</td>
          </template>
        </tr>
      </tbody>
    </table>

    <template v-if="!data">
      <template v-for="data in dataTemplate.list" v-if="data.name === 'Value_Curve'">
        <a
          v-if="role === 'Talent'"
          class="btn btn-default"
          @click="addBS(data.id)"
        >Add Value Curve</a>
        <hr>
      </template>
    </template>

    <!-- form -->
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

    <ondelete v-if="toconfirm" @close="toconfirm = false" v-bind:act="act" @confirmed="confirmed"></ondelete>
  </div>
</template>
<script>
import auth from '@/httpcontrol'
import FormBS from "../newBS";
import EditBS from "../editBS";
import OnDelete from "@/components/ondelete";

export default {
  props: ["data", "dataTemplate", "role"],
  name: "value_curve",
  data: function() {
    return {
      showForm: false,
      showeForm: false,
      tutorId: this.$route.params.tutorId,
      teamId: this.$route.params.teamId,
      ideaId: this.$route.params.ideaId,
      customersegmentId: this.$route.params.customersegmentId,
      personaId: this.$route.params.personaId,
      valuepropositionId: this.$route.params.valuepropositionId,
      templateId: "",
      template: "",
      toconfirm: false,
      confirmId: "",
      act: "",
    };
  },
  components: {
    "form-bs": FormBS,
    "form-ebs": EditBS,
    ondelete: OnDelete,
  },
  methods: {
    learningVC: function() {
      let routeData = this.$router.resolve({
        path: "/learning",
        query: { type: "ValueCurve" }
      });
      window.open(routeData.href, "_blank");
    },
    addBS: function(id) {
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
            this.$emit('closeModalRefresh');
          },
          error => {
            console.log(error);
            // alertControl.showError(this, error.body.meta);
            // this.loading = false;
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
    closeModalRefresh: function() {
      this.showForm = false
      this.showeForm = false
      this.$emit("getData");
    }
  }
};
</script>
