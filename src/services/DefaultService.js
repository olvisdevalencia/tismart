import Endpoint from '@/services/Endpoint'

const endPointUrl = 'http://ec2-3-85-55-237.compute-1.amazonaws.com/api/'

export default class Default extends Endpoint {
  constructor () {
    super(endPointUrl)
  }

  getFaculties = () => {
    return this.request.get('faculties')
  }
}
