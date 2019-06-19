<template>
  <div>
    <string-field  v-bind:field="fields" v-if="fields.type === 'string'"></string-field>
    <number-field  v-bind:field="fields" v-if="fields.type === 'integer'"></number-field>
    <select-field  v-bind:field="fields" v-if="fields.type === 'select'"></select-field>
    <attachment-field  v-bind:field="fields" v-if="fields.type === 'attachment'"></attachment-field>
  </div>
</template>

<script>
  import number from './number'
  import string from './string'
  import select from './select'
  import attachment from './attachment'

  export default {
    components: {
      'number-field': number,
      'string-field': string,
      'select-field': select,
      'attachment-field': attachment
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

