const deepstream = require('deepstream.io-client-js')
const accountSid = '<Your Twilio SID>';
const authToken = '<Your Twilio auth token>'
const twilio = require('twilio')(accountSid, authToken)
const client = deepstream('<Your app URL>')
client.login()

client.rpc.provide('phone-call', (data, response) => {
  const { name, day, number } = data
  twilio.calls.create({
    url: `'<TwiML Bin URL>'?Name=${name}&Day=${day}`,//
    to: number,
    from: '<Registered phone number>'
  }, (err, call) => {
    if (err) {
      response.error(err)
    } else {
      response.send(null)
    }
  })
})
