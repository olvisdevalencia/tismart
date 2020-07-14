import axios from 'axios'

export default class Endpoint {
  constructor (endPointUrl) {
    this.endPointUrl = endPointUrl
    this.request = this.initial()
    this.checker(this.request)
  }

  initial = () => {
    return axios.create({
      baseURL: this.endPointUrl,
      mode: 'no-cors',
      timeout: (60000 * 5)
    })
  }

  endPointUrl = {
    get: function () {
      return this._endPointUrl
    },
    set: function (val) {
      this._endPointUrl = val
    }
  }

  request = {
    get: function () {
      return this._request
    },
    set: function (val) {
      this._request = val
    }
  }
}
