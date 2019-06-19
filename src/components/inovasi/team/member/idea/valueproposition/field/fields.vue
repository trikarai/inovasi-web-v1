<template>
  <div>
    <string-field  v-bind:field="fields" v-if="fields.field_template.type === 'string'"></string-field>
    <number-field  v-bind:field="fields" v-if="fields.field_template.type === 'integer'"></number-field>
    <select-field  v-bind:field="fields" v-if="fields.field_template.type === 'select'"></select-field>
  </div>
</template>

<script>
  import number from './number'
  import string from './string'
  import select from './select'

  export default {
    components: {
      'number-field': number,
      'string-field': string,
      'select-field': select
    },
    props: ['fields'],
    data: function () {
      return {
        show: false,
        value: '',
        form: {
          value: ''
        }
      }
    },
    methods: {
    }
  }
</script>