const axios = require('axios');

const processPendingTicket = async (message) => {
  console.log('[processPendingTicket]', message)
  if(message.body.matchNumber > 64 || message.body.matchNumber < 1) return;
  axios.get(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}`).then( res => {
    let count = 0
    if(message.body.tickets.category == 1){
       count = JSON.stringify(res.data[0].availability.category1.pending)
       console.log(count)
       if(count > 20) return;
       axios.put(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}&categoryNumber=${message.body.tickets.category}&pending=${parseInt(count) + message.body.tickets.quantity}`)
      }
      else if(message.body.tickets.category == 2){
       count = JSON.stringify(res.data[0].availability.category2.pending)
       if(count > 20) return;
       axios.put(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}&categoryNumber=${message.body.tickets.category}&pending=${parseInt(count) + message.body.tickets.quantity}`)
      }
      else if(message.body.tickets.category == 3){
       count = JSON.stringify(res.data[0].availability.category3.pending)
       if(count > 20) return;
       axios.put(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}&categoryNumber=${message.body.tickets.category}&pending=${parseInt(count) + message.body.tickets.quantity}`)
        }
    })
    .catch(err => {
      console.log(err)
    })
  return Promise.resolve('[processPendingTicket]')
};

const processCancelledTicket = async (message) => {
  console.log('[processCancelledTicket]', message)
  // here I need to add if tickets are cancelled then the pending will decrease by 1
  if(message.body.matchNumber > 64 || message.body.matchNumber < 1) return;
  axios.get(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}`).then( res => {
    let count = 0
    if(message.body.tickets.category == 1){
       count = JSON.stringify(res.data[0].availability.category1.pending)
       console.log(count)
       if(count === 0 || (count === 1 && message.body.tickets.quantity === 2)) return;
       axios.put(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}&categoryNumber=${message.body.tickets.category}&pending=${parseInt(count) - message.body.tickets.quantity}`)
      }
      else if(message.body.tickets.category == 2){
       count = JSON.stringify(res.data[0].availability.category2.pending)
       if(count === 0 || (count === 1 && message.body.tickets.quantity === 2)) return;
       axios.put(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}&categoryNumber=${message.body.tickets.category}&pending=${parseInt(count) - message.body.tickets.quantity}`)
      }
      else if(message.body.tickets.category == 3){
       count = JSON.stringify(res.data[0].availability.category3.pending)
       if(count === 0 || (count === 1 && message.body.tickets.quantity === 2)) return;
       axios.put(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}&categoryNumber=${message.body.tickets.category}&pending=${parseInt(count) - message.body.tickets.quantity}`)
        }
    })
    .catch(err => {
      console.log(err)
    })
  return Promise.resolve('[processCancelledTicket]')
};

const processReservedTicket = async (message) => {
  console.log('[processReservedTicket]', message)
  // update the available tickets in masterlist in matches db
  // decrease pending by 1 if tickets are reserved but the problem is what if we receive in the consumer reserved only
  // without receiving pending?
  if(message.body.matchNumber > 64 || message.body.matchNumber < 1) return;
  axios.get(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}`).then( res => {
    let count = 0
    if(message.body.tickets.category == 1){
       count = JSON.stringify(res.data[0].availability.category1.count)
       console.log(count)
       axios.patch(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}&categoryNumber=${message.body.tickets.category}&count=${parseInt(count) - message.body.tickets.quantity}`)
      }
      else if(message.body.tickets.category == 2){
       count = JSON.stringify(res.data[0].availability.category2.count)
       axios.patch(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}&categoryNumber=${message.body.tickets.category}&count=${parseInt(count) - message.body.tickets.quantity}`)
      }
      else if(message.body.tickets.category == 3){
       count = JSON.stringify(res.data[0].availability.category3.count)
       axios.patch(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}&categoryNumber=${message.body.tickets.category}&count=${parseInt(count) - message.body.tickets.quantity}`)
        }
    })
    .catch(err => {
      console.log(err)
    })
    axios.get(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}`).then( res => {
    let count = 0
    if(message.body.tickets.category == 1){
       count = JSON.stringify(res.data[0].availability.category1.pending)
       console.log(count)
       if(count === 0 || (count === 1 && message.body.tickets.quantity === 2)) return;
       axios.put(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}&categoryNumber=${message.body.tickets.category}&pending=${parseInt(count) - message.body.tickets.quantity}`)
      }
      else if(message.body.tickets.category == 2){
       count = JSON.stringify(res.data[0].availability.category2.pending)
       if(count === 0 || (count === 1 && message.body.tickets.quantity === 2)) return;
       axios.put(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}&categoryNumber=${message.body.tickets.category}&pending=${parseInt(count) - message.body.tickets.quantity}`)
      }
      else if(message.body.tickets.category == 3){
       count = JSON.stringify(res.data[0].availability.category3.pending)
       if(count === 0 || (count === 1 && message.body.tickets.quantity === 2)) return;
       axios.put(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}&categoryNumber=${message.body.tickets.category}&pending=${parseInt(count) - message.body.tickets.quantity}`)
        }
    })
    .catch(err => {
      console.log(err)
    })
  return Promise.resolve('[processReservedTicket]')
};

const processMasterlist = async (message) => {
  console.log('[processMasterlist]', message)
  return Promise.resolve('[processMasterlist]')
};

module.exports = {
  processPendingTicket,
  processReservedTicket,
  processCancelledTicket,
};
