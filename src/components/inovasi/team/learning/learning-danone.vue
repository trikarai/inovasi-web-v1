<template>
  <div>
    <loading v-show="loading"></loading>

    <section class="content">

      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

    <div class="box" v-if="type=='customerSegment'">
        <div class="box-body">
<!--           <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSzedi_A5nxCA4LgnRQLxIeZ9mO9qEz_9v577oKji-CqxNFBgNQsBiWHZF3kwD1FuRl0Pa6exTzbS_4/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
<!--           <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQJGdaailp4ctZjJ-LTYXlCT1w3_5FmDUQDrS5EGBLOAtSwYY25ySxf3WyCEKlQE_M0uKeSpKUNAMQK/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRzmGXUVYfttmXOTSSrU7-zpIrfVEQ_6147egUTwsjLdRPgUeJUEkmYbvxsg0hVjVAemEhoLAAaoQQs/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>
    </div>
    <div class="box" v-else-if="type=='businessModelCanvas'">
        <div class="box-body">
<!--           <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vStWoYO2GjQDItImrGPewpfdrp8feN08kmAj53SJPR5mnxu62BgD-c0Vbd6GLppt07AZWyFyCeqdfhh/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
<!--               <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTF4XHI7ZdmXUz2TIjAjxRqzYDX3LwhNQXY3vS2S1LEcVLKsVt9ZPm-gFYBxjIhkN2AROWF_EA0GsPq/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTRig85Rt3xhcr_Qs3P2xb-1pd8uNTNXbLB6yzZZtW81hgnTUjZMTxcJM3Un3WS2NNCpscaFoKqggmJ/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>
    </div>  
    <div class="box" v-else-if="type=='LeanCanvas'">
        <div class="box-body">
<!--           <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQhC8mIGTP1pOP1S4LsFLaYuu6g0KlEUGeojRrQ8zalM_rjaVENhJjeM9xmStzyBtbgfFynwQKcsXBe/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
<!--               <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTnLPhIDwl0cV63FpF-sukmGgaf44pFEP_71R2bYU3aG380jMVDSuiCnt6Xrsn4qY6yVleeVwdz50Oy/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRI3MebkIVwfaidWXmIgPNXP2zjnaSSOtZSEgKCflB9dONE0MQ1e7nDKvjbOlMdnExDFM8kzw6JkLnX/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>
    </div>
    <div class="box" v-else-if="type=='ValueProposition'">
        <div class="box-body">
<!--           <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQXwUn9A3bz9tTWbwJaMzkjFDwWPxhI3-TL8ChzkcmJ-UViR-8mtGmDOnqVyy6KuDHLd8PodHzYO4PW/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
<!--            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQCFxPqY-Lg9MBaMqyBOEzynORu2Ud2c_jsD_HAMtvQoPG1R1sSeB9_3H4IU2XpJv1-kY8_vkrhFC23/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRdJXAkWpDsu-NKgnazkoVi6UKlPXmQs557hzrQxX9TN8YfYyHHusO_XZUoQ-jqh8OO45pU-DRmRZ1i/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>
    </div>
    <div class="box" v-else-if="type=='MarketSize'">
        <div class="box-body">
<!--           <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRKIyvES7ZH3kZNRh5EvH0oQqq979lL0lPRmzxNen8GSgSEyKySfLg9__3oIJJXUZmGaGTE8AjNT6-L/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
<!--            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vT1uM0IwG3m8ruVxrhliL4BFL9p_Hq4EP4NEmxXkp8wkhvDwMkWMlfz10WRuuCuady5Lmc2_FH4Kn4-/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRI4Bwkrq-Tmn8HMzZbcdiL1A-Dh7A88XpomYfWLP103OXXyqJ4uvWFe85WOOTOfNviXDw5L8XXvWqq/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>
    </div>
    <div class="box" v-else-if="type=='MarketAnalysis'">
        <div class="box-body">
<!--           <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQfNxtoXifoq-luICqgChKIcUVqwtSsPe27cL2t9VN6HbseXXl0JR-UDViMJYhIBHdOIZUwFge4YiUH/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
<!--            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQBjnu4gNLQIATJOXXmCcrn_1z76mjSaE1IbMdTUQr98yNLspOtX0rcq5Kh3Y5HViqSsUmlXZ6NAl-I/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRRZrDwdyx7ELcmxjFo3p5pTKx395SUHvcsx1XiNbresPGeojg_e2AW9rfZ8mD-IBG7DNYI4XVaqwrY/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>
    </div>
    <div class="box" v-else-if="type=='SWOT'">
        <div class="box-body">
<!--           <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSrarC6rUZbMrMZePfrtP9AtZs6TXLJErWAucm6qNhHU7hG9lVP1lMR6dZ22n1fUMb87YQKT6yPtCCK/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
<!--            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRGGEzMHad24qkb3KZ6xOu4v2JzxC5qIy5f1u_DX4MpdJ40M9LFaK8AkLEXP6DfG6b5SVTFeXpSAXpu/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRuJ9KEQh51AXiesw2QDBcPsxWe15fWnPm2CLWZnGAQvUg9Pk_4hQLSdeCb6sIFEKnHlcW-A6gH7MVE/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>
    </div>
    <div class="box" v-else-if="type=='competitor'">
        <div class="box-body">
<!--           <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTce-GQXQ2ZoR8GBPAymRkDehg43Yo6Wr1UR-nMfdJjpM1J5mGjcq77EsJ9Iwu09SrLhpilv_iJsmFR/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
<!--            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTRnH5vYkIY8bmiH_Ru4x9rYWTybMHt753wA_oilipY-Sigbv39ijX71eaRSFlqMVAgb6swgAX0q6I6/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSmJNH-246-P_ZrbBGue6R-Rg9IBX_Kgtu9MsKiMdYrM073CC7c6-G7qDGwgMCrdcfkjwTzRKrE8JG2/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>
    </div>
    <div class="box" v-else-if="type=='Javelin Board'">
        <div class="box-body">
<!--           <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTo2txTXTQQjKsjlXwAUUZkxVlas9SiZkb2s6fWhycrDgex6o5d-lhlEeLwhowpc7rdIaAqgxqhFR10/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
<!--            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRrDxGDxS39rwo82M_KvvkS8KHAHptXyKCZ0vkcAPRcU_dYSN3u39ngVBFUJDmlWyrzUo7FsVl1q57J/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSJ9LDfZIxqZLbQx2AugzEIiwMB9tyTPOLwmAhVcZ4g9JregR9Aln_r9wT1-kS9RUwHnJUNH9qDgcMV/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>
    </div>
    <div class="box" v-else-if="type=='Customer Journey'">
        <div class="box-body">
<!--           <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRB_jz2YpAoU9vjxUdbg_nVFZ0d7ktikhCKgv40ERKBwYBVpm4lFsQSwbRvw1sj6A0JOLG_qRxy-NIP/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
<!--            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQeiSxHbhO2rEWprpdlapka5Tw79fImodsrDEHce5jJX6FxNADA9P62ibr1g9x8AQIQbgCR92KNHYi2/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSE7uzRgUXrcpPiRgPZWd-MDS9lO9aHlnPlOE-VxyaGJ6zVKlzhgpkb1yPzOOmYDI2pR9R2k4pS8pwQ/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>
    </div>
    <div class="box" v-else-if="type=='Concierge'">
        <div class="box-body">
<!--           <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRzo41tQEhghg_vtPu9l8T6nxw2vZM3l2B4fMZTvWDF5DsFR3o6DJ0NGgU-R2ErBjab5vETfJtXEhZB/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
<!--            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQ-f6XZ_wcPriERhSjZJH0EKugG9jCl5RuVTH8hN7cOskSXKnrEsBIW4KJyFu-fp7BnXNc3OoOuw1wU/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vR2mVBabum0rHPAzc0sYY2Qds8F55_TItxpLDABBTZjkuCMKq3W6DCGV5FcaQCNq5VrGKKtQ42P40mW/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>
    </div>
    <div class="box" v-else-if="type=='Interview'">
        <div class="box-body">
<!--           <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSVqZ005MJQkGPoaOYuxeM_3AE4RBWPX8hT6YnD__u8btMWFJuIjd1O3KURF4PXONtUQ6XvVIOmmqi_/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
<!--            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTSF-NECQm5sqaCrJWplLZnGE_VdixilmwCA-HHPoRhLvQalgKoD6anowRp_uV20wuOuHQzjpit6NBR/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vT294SxFre1gv1hAXXU8WcIok47DRW1w05sDSTQChVx6oLMKWTlLh05QV_OvVgbIuGkcSRRhu3E0sDp/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>
    </div>
    <div class="box" v-else-if="type=='Pitch'">
        <div class="box-body">
<!--           <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRhUHYQYLN9jnZgzyxuOIrchH-viMci6zZsNmQfeyzM4qDV1ppNxuYsK_MVyoBKCr74EkBksZf27UMO/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
<!--            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTDMimqDrktnfyq0PbTyYc9l_gWj6Cw__E_Qtkw68h7T7Az0CZdrQ5dsuHGFssb6vTOG5Hq9dCnIIUc/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTW9fNGNezBceLDwFRPMzLPrY3WW4EM72VXqhMfXiUdck3xNekZIzbM2oj-EBVwVIyrqdAnVJIXImQS/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>
    </div>
    <div class="box" v-else-if="type=='Wizard of Oz'">
        <div class="box-body">
<!--           <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTalF_atxa6hzSs5BvR3_ZPQ2qtbzVKsQ1axnYCsijzJOilsC12fX0JSzYQ5XBRXcdFv4-H-lSTIkyO/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
<!--            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSESkMA6XRHY_aRH3nE97KSys_N51_ahw3YlxOpGwcukALIOpQHSoLRjSFNM5AnMZUQo5n8diqckYKy/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRdJXAkWpDsu-NKgnazkoVi6UKlPXmQs557hzrQxX9TN8YfYyHHusO_XZUoQ-jqh8OO45pU-DRmRZ1i/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>
    </div>
    <div class="box" v-else-if="type=='Hipotesa'">
        <div class="box-body">
<!--           <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vT3-DLE7JUSqRJqfQw1zvMJCNb2w5VyGk_LjUgvKveZ3uul2gIZkDkdqdsBsCQtBb7y6HMpzP09WBaH/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>-->
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vT1FNWHTysOHXs3R0xxTsQnCnPjYhTFuTddIqk0rH4F5yO9BSor2pHvsR15GncFrp6VehejWOPspoFC/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="440" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>
    </div>
    <div class="box" v-else>
        <div class="box-body">
          No Learning Material Yet
        </div>
    </div>
        
           
    </section>



  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '@/components/inovasi/errorflash'
  import Loading from '@/components/loading'

  export default {
    props: [],  
    data: function () {
      return {
        data: {total:0, list:[]},
        err_msg: '',
        success: false,
        error: false,
        type: this.$route.query.type,
        page: {
          page: 1,
          size: 5
        },
        status : '',
        loading : false
      }
    },
    computed: {
      pageTotal: function () {
        return Math.ceil(this.data.total / this.page.size)
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading
    },
    created: function () {
    },
    methods: {
    }
  } 
</script>  
<style scoped>
    
    .dttmnm {
        background: #8bc751;
        color: #fff;
        padding: 12px;
    }
    
    
    .drpdwn {
        padding: 3px;
        border-color: #e4e4e4;
        font-size: 11px;
        color: #8bc751;
    }
</style>  