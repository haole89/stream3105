const playVideo=require("./playVideo");

function openStream(cb){
  navigator.mediaDevices.getUserMedia({audio:true, video:true})
  .then(function(stream){
    cb(stream);
  })
  .catch(function(err){console.log(err)});
}
module.exports=openStream;
