import * as CONFIG from '@/app.config.js'
import alertControl from '@/alertcontrol'

export default {
  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    const tokenData = window.localStorage.getItem('access_token')
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + tokenData
    }
    return headers;
  },
  getAuthData() {
    const data = window.localStorage.getItem('access_data')
    return JSON.parse(data)
  },
  login(context, path, credentials, role) {
    context.loading = true
    context.$http.post(CONFIG.APIENDPOINT + path, credentials)
      .then(response => {
        //              if(response.status === 500){
        //                //internal server error
        //                alertControl.showError(context, ["Internal Server Error"])
        //              }else{
        context.user = response.body.data
        context.$store.state.isLoggedIn = true

        localStorage.setItem('access_data', JSON.stringify(response.body.data))
        localStorage.setItem('access_token', response.headers.get('token'))
        localStorage.setItem('role', role)
        context.loading = false

        if (role === 'Admin') {
          context.$router.replace('/admin-inovasi/dashboard');
        } else if (role === 'Personnel') {
          context.$router.replace('/personnel/dashboard');
        } else if (role === 'Talent') {
          context.$router.replace('/talent/dashboard')
          //                      window.location.replace("http://bekup.web.id/#/talent/dashboard");
        } else {
          context.$router.replace('hello')
        }
        //              }
      }, error => {
        console.log(error)
        //              if(error.status === 500){
        //                alertControl.showError(context, ["invalid username/password or your DILo account hasn't been registered to this web"])
        //              }else{
        alertControl.showError(context, error.body.meta)
        //              }
        context.loading = false
      })
    //                    .catch(e=>{
    //              console.log("Caught", e);
    //            })
  },
  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('access_data')
    localStorage.removeItem('role')
    this.user.authenticated = false
  },
  getData(context, path) {
    context.loading = true
    context.onSubmit = true
    context.$http.get(CONFIG.APIENDPOINT + path, { headers: this.getAuthHeader() })
      .then(response => {
        if (response.status === 204) {
          context.loading = false
          context.onSubmit = false
        } else {
          return response.json()
        }
      }, error => {
        alertControl.showError(context, error.body.meta)
        context.loading = false
        context.onSubmit = false
      }).then(data => {
        context.data = data.data
        context.loading = false
        context.onSubmit = false
      })
  },
  getData2(context, path) {
    return context.$http.get(CONFIG.APIENDPOINT + path, { headers: this.getAuthHeader() })

  },
  postData(context, path, object) {
    context.onSubmit = true
    context.$http.post(CONFIG.APIENDPOINT + path, object, { headers: this.getAuthHeader() })
      .then(res => {
        console.log(res)
        context.onSubmit = false
        context.$emit('closeModalRefresh')
      }, error => {
        console.log(error)
        context.onSubmit = false
        alertControl.showError(context, error.body.meta)
      })
  },
  postData2(context, path, object) {
    return context.$http.post(CONFIG.APIENDPOINT + path, object, { headers: this.getAuthHeader() })
  },
  putData(context, path, object) {
    context.onSubmit = true
    context.$http.put(CONFIG.APIENDPOINT + path, object, { headers: this.getAuthHeader() })
      .then(res => {
        console.log(res)
        context.onSubmit = false
        context.$emit('closeModalRefresh')
      }, error => {
        console.log(error)
        context.onSubmit = false
        alertControl.showError(context, error.body.meta)
      })
  },
  putData2(context, path, object) {
    return context.$http.put(CONFIG.APIENDPOINT + path, object, { headers: this.getAuthHeader() })
  },
  deleteData(context, path) {
    context.$http.delete(CONFIG.APIENDPOINT + path, { headers: this.getAuthHeader() })
      .then(res => {
        console.log(res)
        context.closeModalRefresh()
      }, error => {
        console.log(error)
        alertControl.showError(context, error.body.meta)
      })
  },
  deleteData2(context, path) {
    return context.$http.delete(CONFIG.APIENDPOINT + path, { headers: this.getAuthHeader() })
  },
  formToJSON: function (elements) {
    /**
         * Checks that an element has a non-empty `name` and `value` property.
         * @param  {Element} element  the element to check
         * @return {Bool}             true if the element is an input, false if not
         */
    const isValidElement = element => {
      return element.name && element.value;
    };
    /**
     * Checks if an element’s value can be saved (e.g. not an unselected checkbox).
     * @param  {Element} element  the element to check
     * @return {Boolean}          true if the value should be added, false if not
     */
    const isValidValue = element => {
      return (!['checkbox', 'radio'].includes(element.type) || element.checked);
    };
    /**
     * Checks if an input is a checkbox, because checkboxes allow multiple values.
     * @param  {Element} element  the element to check
     * @return {Boolean}          true if the element is a checkbox, false if not
     */
    const isCheckbox = element => element.type === 'checkbox';
    const isRadio = element => element.type === "radio";
    /**
     * Checks if an input is a `select` with the `multiple` attribute.
     * @param  {Element} element  the element to check
     * @return {Boolean}          true if the element is a multiselect, false if not
     */
    const isMultiSelect = element => element.options && element.multiple;
    /**
     * Retrieves the selected options from a multi-select as an array.
     * @param  {HTMLOptionsCollection} options  the options for the select
     * @return {Array}                          an array of selected option values
     */
    const getSelectValues = options => [].reduce.call(options, (values, option) => {
      return option.selected ? values.concat(option.value) : values;
    }, []);

    var balik = [].reduce.call(elements, function (data, element) {
      if (isValidElement(element) && isValidValue(element)) {
        /*
         * Some fields allow for more than one value, so we need to check if this
         * is one of those fields and, if so, store the values as an array.
         */
        if (isCheckbox(element)) {
          data[element.name] = (data[element.name] || []).concat(element.value);
        } else if (isRadio(element)) {
          data[element.name] = (data[element.name] || []).concat(
            element.value
          )
        } else if (isMultiSelect(element)) {
          data[element.name] = getSelectValues(element);
        } else {
          data[element.name] = element.value;
        }
      }
      return data;
    }, {});
    var data = []
    for (var key in balik) {
      if (balik.hasOwnProperty(key)) {
        data.push({ field_template_id: key, value: balik[key] })
      }
    }
    return data;
  }
}
