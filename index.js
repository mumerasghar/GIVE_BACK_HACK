var express = require('express')
const scan = require('./scanner')
const regex = require('./addRemove')
const { createContext, removeContext } = require('./addRemove');
// let url = 'https://public-firing-range.appspot.com'
let url = 'http://www.itsecgames.com'

app = express()

app.get('/', (req, res) => {

    createContext(req, res, "Default", url)

})

app.listen(3000, () => {
    console.log("Server is listening")
})