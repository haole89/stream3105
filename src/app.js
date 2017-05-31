const Peer =require("peerjs");
const uid = require("uid");
const $ = require("jquery");
const openStream = require("./openStream");
const playVideo = require("./playVideo");
const config={host:'stream3105.herokuapp.com', port: 443, secure:true, key:"peerjs"};


function getPeer(){
  const id=uid(10);
  $("#peer-id").append(id);
  return id;
}

const peer=Peer(getPeer(),config);

$("#btnCall").click(function(){
  const friendId=$("#txtFriendId").val();
  openStream(function(stream){
    playVideo(stream, "localStream");
    const call=peer.call(friendId, stream);
    console.log(call);
    call.on("stream", function(remoteStream){
      playVideo(remoteStream, "friendStream");
    });
  });
});

peer.on("call", function(call){
  openStream(function(stream){
    playVideo(stream, "localStream");
    call.answer(stream);
    call.on("stream", function(remoteStream){
      playVideo(remoteStream, "friendStream");
    });
  });
});
