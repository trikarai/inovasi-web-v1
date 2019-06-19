export default {
  showError: function (context, msg) {
    context.error = true
    context.err_msg = msg
  },
  showSuccess: function (context, msg) {
    context.success = true
    context.err_msg = msg
  }
}
