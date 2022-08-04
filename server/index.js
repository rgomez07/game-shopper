const { db } = require('./db')
const PORT = process.env.PORT || 8080
const app = require('./app')
const seed = require('../script/seed');

console.log('this is from index.js')


const init = async () => {
  try {
    if(process.env.SEED === 'true'){
      await seed();
    }
    else {
      await db.sync()
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`GAME SHOPPING ON PORT ${PORT}`))
  } catch (ex) {
    console.log('ISSUE INITIATING THE SERVER',ex)
  }
}

init()
