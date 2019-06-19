<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../errorflash'
  import onSubmit from '@/components/onsubmit'
  import OnDelete from '@/components/ondelete'

  export default {
    template:require('./comment.html'),
    data: function () {
      return {
        err_msg: '',
        success: false,
        error: false,
        edit: false,
        tutorId: this.$route.params.tutorId,  
        teamId: this.$route.params.teamId,
        ideaId: this.$route.params.ideaId,
        customersegmentId: this.$route.params.customersegmentId,
        personaId: this.$route.params.personaId,
        valuepropositionId: this.$route.params.valuepropositionId,
        experimentId: this.$route.params.experimentId,
        loading : false,
        onComment : false,
        commentsExperiment : {total:0, list:[]},
        komentar : {
          content : ''
        },
        balasan : {
          content : ''
        },
        showId : '',
        role: '',
        dataId: '',
        toconfirm : false,
        confirmId : '',
        act : '',
        type: ''
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'onsub' : onSubmit,
      'ondelete' : OnDelete
    },
    created: function () {
      this.getAuthData()
      this.getComments()
    },
    methods: {
      getAuthData: function (){
        this.dataId = auth.getAuthData().id 
        this.role = localStorage.getItem('role')
      },
      getComments: function () {
        auth.getData2(this, '/team_member/team/' + this.teamId + '/idea/' + this.ideaId + '/customer_segment/' + this.customersegmentId + '/persona/' + this.personaId + '/value_proposition/' + this.valuepropositionId + '/experiment/' + this.experimentId + '/comment')
                .then(res=>{
                  if(res.status === 204){ 
                  }else{
                    return res.json()
                  }
                }, error=>{
                  console.log(error)
                  alertControl.showError(error.body.meta)
                }).then(data=>{
                  this.commentsExperiment = data.data
                })
      },
      sendComment: function () {
        auth.postData2(this, '/team_member/team/' + this.teamId + '/idea/' + this.ideaId + '/customer_segment/' + this.customersegmentId + '/persona/' + this.personaId + '/value_proposition/' + this.valuepropositionId + '/experiment/' + this.experimentId + '/comment', this.komentar)
                .then(res=>{
                  console.log(res)
                  this.komentar.content = ''
                  this.getComments()
                }, error=>{
                  console.log(error)
                  alertControl.showError(error.body.meta)
                })
      },
      sendCommentTutor: function () {
        auth.postData2(this, '/tutor/'+ this.tutorId +'/team/' + this.$route.params.teamId + '/idea/' + this.$route.params.ideaId + '/customer_segment/' + this.$route.params.customersegmentId + '/persona/' + this.$route.params.personaId + '/value_proposition/' + this.valuepropositionId + '/experiment/' + this.experimentId + '/comment', this.komentar)
                .then(res=>{
                  console.log(res)
                  this.komentar.content = ''
                  this.getComments()
                }, error=>{
                  console.log(error)
                  alertControl.showError(error.body.meta)
                })
      },
      openReply: function (id){
        this.showId = id
        this.balasan.content = ''
      },
      closeReply: function (){
        this.showId = ''
      },
      sendReply: function (id){
        auth.postData2(this, '/team_member/team/' + this.teamId + '/idea/' + this.ideaId + '/customer_segment/' + this.customersegmentId + '/persona/' + this.personaId + '/value_proposition/' + this.valuepropositionId + '/experiment/' + this.experimentId + '/comment/' + id, this.balasan)
                .then(res=>{
                  console.log(res)
                  this.closeReply()
                  this.getComments()
                }, error=>{
                  console.log(error)
                  alertControl.showError(error.body.meta)
                })
      },
      sendReplyTutor: function (id){
        auth.postData2(this, '/tutor/'+this.tutorId+'/team/' + this.$route.params.teamId + '/idea/' + this.$route.params.ideaId + '/customer_segment/' + this.$route.params.customersegmentId + '/persona/' + this.$route.params.personaId + '/value_proposition/' + this.valuepropositionId + '/experiment/' + this.experimentId + '/comment/' + id, this.balasan)
                .then(res=>{
                  console.log(res)
                  this.closeReply()
                  this.getComments()
                }, error=>{
                  console.log(error)
                  alertControl.showError(error.body.meta)
                })
      },
      deleteComment: function (id) {
        auth.deleteData2(this, '/team_member/team/' + this.teamId + '/idea/' + this.ideaId + '/customer_segment/' + this.customersegmentId + '/persona/' + this.personaId + '/value_proposition/' + this.valuepropositionId + '/experiment/' + this.experimentId + '/comment/' + id)
                .then(res=>{
                  console.log(res)
                  this.getComments()
                }, error=>{
                  console.log(error)
                  alertControl.showError(error.body.meta)
                })
      },
      deleteCommentTutor: function (id) {
        auth.deleteData2(this, '/tutor/'+ this.tutorId +'/team/' + this.$route.params.teamId + '/idea/' + this.$route.params.ideaId + '/customer_segment/' + this.$route.params.customersegmentId + '/persona/' + this.$route.params.personaId + '/value_proposition/' + this.valuepropositionId + '/experiment/' + this.experimentId + '/comment/' + id)
                .then(res=>{
                  console.log(res)
                  this.getComments()
                }, error=>{
                  console.log(error)
                  alertControl.showError(error.body.meta)
                })
      },
      confirm: function(act, type, id){
        this.toconfirm = true
        this.act = act
        this.type = type
        this.confirmId = id
        
      },
      confirmed: function (){
        this.toconfirm = false
        switch(this.type){
          case 'Talent': 
            this.deleteComment(this.confirmId) 
            break;
          case 'Tutor': 
            this.deleteCommentTutor(this.confirmId) 
            break;
          default:
            alert('Portal to the Multiverse is Opened..!!');
        }
      }
    }
  }  
</script>  

<style scoped>
  .pagebody {
    /*  display: flex;*/
    padding: 2em 2em 2em 2em;
  }
  /* Sidenav */
  .sidenav__tabs {
    text-align: center;
    background-color: $primary-color;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
  }
  .sidenav__tab {
    align-self: flex-start;
    width: 100%;
    list-style-type: none;
    /*   border-bottom: 1px solid #ccc; */
    padding: .6em .4em .6em .8em;
    color: #a5a5a5;
    font-size: 1.1em;
    letter-spacing: 0;
    transition: all 300ms;
  }
  .sidenav__tab:hover {
    background-color: darken($primary-color, 10%);
    cursor: pointer;
    box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.22);
  }
  .sidenav__tab__info {
    font-size: .65em;
    margin-top: 3px;
    color: #ccc;
    font-style: italic;
    letter-spacing: 0;
  }
  .active-tab {
    background-color: darken($primary-color, 10%);
    box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.22);
    border-top-style: solid;
    border-top-color: #eaeaea;
    border-top-width: 1px;
    background: #464646;
    color: #fff;
  }
  /* End Sidenav */

  .rightsection {
    width: 100%;
    /*  margin-left: 10px;*/
    background-color: white;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
    align-self: flex-start;
  }

  /* Styles for Link box li */
  .linkli__header {
    background-color: $primary-color;
    color: white;
    /*  padding: .7em;*/
    text-align: center;
    font-style: italic;
  }
  .linkli {
    display: flex;
    /*  border-top: 1px solid #ccc;*/
    // border-left: 1px solid #ccc;
    // border-right: 1px solid #ccc;
    padding: 1em;
    background-color: white;
  }
  .linkli__title {
    font-size: 1.2em;
    margin-bottom: 8px;
  }
  .linkli__url {
    font-style: italic;
    font-size: 0.8em;
    color: #777;
  }
  .flexleft {
    color: #333300;
    width: 100%;
    margin-right: 8px;
  }
  .deletebutton {
    align-self: center;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
  }
  ul.sidenav__tabs {
    -webkit-padding-start: 0px !important;
  }
  .brdleft {
    background: #8bc751;
    color: #fff;
    padding: 10px;
    border-left-width: thick;
    border-left-style: solid;
    border-left-color: #68bd16;
  }
  label {
    margin-top:12px;
  }
  .tabcs {
    background: #f1f1f1;
    padding: 10px;
    display: -webkit-inline-box;
    margin-bottom: auto;
    padding-right: 13px;
    font-size: 14px;
    border-top-right-radius: 14px;
    color: #8bc751;
  }
  .tambahan {
    line-height: 28px;
    margin-bottom:0px !important;
    height: 42px;
    margin-left: 5px;
  }
  .nodata {
    background: orange;
    color: #fff;
    text-align: center;
    padding: 5px;
  }
  a:hover {
    cursor:pointer;
  }
  .pb-cmnt-container {
    font-family: Lato;
    margin-top: 20px;
  }
  .pb-cmnt-textarea {
    resize: none;
    padding: 20px;
    height: 130px;
    width: 100%;
    border: 1px solid #F2F2F2;
  }
  textarea::placeholder {
    color: darkgrey;
    font-style: italic;
}
</style>
