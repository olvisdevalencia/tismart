const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ3ZWJzaXRlIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTgwMzE5NzA3LCJleHAiOjE1ODA0MDYxMDd9.P4g5Ay8FbxUaklabLSEZ9g-e5I0dPv6y3H_xxg8qlbA';

const mocks = {
  auth: { POST: { token } },
  'user/me': { GET: { id: 1, username: 'oquintana', role: 'admin', iat: 1579560354, exp: 1579646754 } }
}

const apiCall = ({ url, method, ...args }) => new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      resolve(mocks[url][method || 'GET'])
      console.log(`Mocked '${url}' - ${method || 'GET'}`)
      console.log('response: ', mocks[url][method || 'GET'])
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

export default apiCall
