const Lab = require('lab')

Lab.test('await server.inject', async () => {  
  const options = {
    url: '/',
    method: 'GET'
  }

  const response = await server.inject(options)
  const payload = response.payload
})