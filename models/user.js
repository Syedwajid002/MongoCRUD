const mongoose=require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/testapp1")

const userschema=mongoose.Schema({
    Name:String,
    Email:String,
    imgurl:String
})

module.exports = mongoose.model('user',userschema)