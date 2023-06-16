import update from './grid.js';

const peer=new Peer(undefined,{
	host:"Paste Your Peer server Url Here",
	secure:true,
	port:'443',
	path:'/peerjs/app/'
})
const socket=io('/')
var peerID;
peer.on('open',id=>{
	peerID=id;
})

var vid=document.createElement('video')
var div=document.querySelector('div[id="videoGrid"]')
vid.id="usrStream"
vid.poster="/icons/error.jpg"
vid.preload="none"

var videoToggle=true;
var audioToggle=true;
var permissions=false;
var img=document.querySelector('img[id="videoimg"]')
var audimg=document.querySelector('img[id="audimg"]')
var btn=document.querySelector('button[class="btntoogle btnx video"]')
var audbtn=document.querySelector('button[class="btntoogle btnx audio"]')
var callendbtn=document.querySelector('button[class="btntoogle btnx call"]')
var connectedPeers={}
var peers=[]
var diverr=document.querySelector('div[id="onerror"]')
var divonload=document.querySelector('div[id="video"]')
var viderrbtn=document.querySelector('img[class="viderr"]')
var auderrbtn=document.querySelector('img[class="auderr"]')
var btnpopup=document.querySelector('button[class="popup btnx"]')
var span=document.querySelector('span[class="close"]')
var modal=document.querySelector('div[class="modal"]')
var chat=document.querySelector('div[id="chat"]')
var form=document.querySelector('form')
var input=document.querySelector('input[id="msg"]')
var usrNameinput=document.querySelector('input[id="usrName"]')
var sendbtn=document.querySelector('button[id="sendMsgbtn"]')
var body=document.querySelector('body')
vid.muted=true;
var userName;

access()
function access(){
	var videoerr=document.querySelector('video[class="error"]')
	videoerr.muted=true;
	var joinbtn=document.querySelector('button[id="btnjoin"]')
	var err=document.querySelector('h5[id="warning"]')
	var audstream=null;
	joinbtn.disabled=true
	navigator.mediaDevices.getUserMedia({
		audio:{
			echoCancellation:true,
			noiseSuppression:true,
			sampleRate:44100
		}
	}).then(aud=>{
		audstream=aud;
		// console.log(aud.getAudioTracks()[0].enabled)
	})
	navigator.mediaDevices.getUserMedia({
		video:{
			width: {max: 720},
			 height: {max: 720},
			 aspectRatio: {ideal: 1}
		}
	}).then(stream=>{
		stream=new MediaStream([...stream.getTracks(),...audstream.getTracks()])
		videoControl(stream,videoerr,joinbtn,err)	

	}).catch(err=>{
		var stream = new MediaStream()
		videoerr.srcObject=stream;
		viderrbtn.addEventListener("click",()=>{
			if(!permissions){
				access()
			}
		})
	})
}

function videoControl(stream,videoerr,joinbtn,err){
	videoerr.srcObject=stream;
		videoerr.onloadedmetadata=()=>{
			videoerr.play()
			permissions=true;
			joinbtn.disabled=false
			err.style.display="none"
			viderrbtn.src="/icons/video-on.png"
			auderrbtn.src="/icons/mic.png"
		}
		
		viderrbtn.addEventListener("click",()=>{
			togglerVideo(viderrbtn,stream)
		})
		auderrbtn.addEventListener("click",()=>{
			togglerAudio(auderrbtn,stream)
		})

		//join button
		joinVideoStream(videoerr,joinbtn,stream)
}



function calluser(userid,stream){
		console.log("calling "+userid+"...")
		var call=peer.call(userid,stream);
		var video=document.createElement('video');
		call.on('stream',streamFromAns=>{
			if(!peers.includes(call.peer)){
				addVideoToGrid(video,streamFromAns);
				peers.push(call.peer)
			}
			
		})

		call.on('close',()=>{
			video.remove();
			rmVideoDiv();

		})
		connectedPeers[userid]=call;
}


function addVideoToGrid(video,stream,id){
		var vidContain=document.createElement('div')
		vidContain.className="videoContainer"
		vidContain.setAttribute("data","video")
		video.srcObject=stream;
		// video.controls=true
		video.onloadedmetadata=()=>{
			video.play()
		}
		vidContain.append(video)
		div.append(vidContain);
		update();
}


sendbtn.addEventListener("click",(e)=>{
	e.preventDefault()
	if(input.value.length!=0){
		sendMsg(input.value);
		input.value="";
	}
})

btnpopup.addEventListener("click",()=>{
	modal.style.display="block"
})
span.addEventListener("click",()=>{
	modal.style.display="none"
})


function sendMsg(msg){
	socket.emit("message",userName,msg)
	addMsg("you",msg)
}

socket.on("message",(user,msg)=>{
	addMsg(user,msg)
})

function addMsg(user,msg){
	var chatdiv=document.createElement('ul')
	var usr=document.createElement('li')
	usr.className="li";
	var content=document.createElement('li')
	usr.innerText=user;
	content.innerText=msg;
	chatdiv.append(usr)
	chatdiv.append(content)
	chatdiv.className="msg";
	chat.append(chatdiv)
}


function joinVideoStream(videoerr,joinbtn,stream){
	joinbtn.addEventListener("click",()=>{
			if(usrNameinput.value.length==0){
				alert("username is required")
			}else{
				userName=usrNameinput.value;
				videoerr.srcObject=undefined;
				diverr.style.display="none"
				divonload.style.display="block"

				addVideoToGrid(vid,stream);
				var emitID=setInterval(()=>{
					if(peerID!=undefined && peerID!=null){
						socket.emit("peerid",roomid,peerID);
						clearInterval(emitID)
		
					}
				},100)
				updatebtn()
				//toggle video audio stream
				btn.addEventListener("click",()=>{
					togglerVideo(img,stream)
				 })
				audbtn.addEventListener("click",()=>{
					togglerAudio(audimg,stream)
				 })

				//answer call with stream
				peer.on('call',call=>{	
						call.answer(stream);
						console.log("call from"+call)
						call.on('stream',streamFromCall=>{
						if(!peers.includes(call.peer)){
							var video=document.createElement('video')
							addVideoToGrid(video,streamFromCall);
							peers.push(call.peer)
							connectedPeers[call.peer]=call

							call.on('close',()=>{
								video.remove();
								rmVideoDiv();
							})
						}
				  	})
			  	})

			  	peer.on('error',err=>{
			  		console.log(err)
			  	})

			  	socket.on('remove',id=>{
			  		console.log(id)
			  		if(connectedPeers[id]!=undefined){
			  			connectedPeers[id].close()
			  		}
			  	})

			  	socket.on("peer_id",userid=>{
			  		if(connectedPeers[userid]==undefined){
			  			setTimeout(calluser,50,userid,stream)
			  		}
				})
			}
		})
}


function rmVideoDiv(){
	var container=document.querySelectorAll('div[data="video"]')
	container.forEach(e=>{
			if(e.childElementCount==0){
				e.remove();
			}
		})
	update();
}


window.addEventListener('resize',()=>{
    update();
})


function togglerVideo(btn,stream){
	if(videoToggle==true){
					btn.src="/icons/video-off.png"
					stream.getVideoTracks()[0].enabled=!videoToggle;
					videoToggle=!videoToggle
				}else{
					btn.src="/icons/video-on.png"
					stream.getVideoTracks()[0].enabled=!videoToggle;
					videoToggle=!videoToggle;
		}
}

function togglerAudio(btn,stream){
	try{
		if(audioToggle==true){
					btn.src="/icons/mic-off.png"
					stream.getAudioTracks()[0].enabled=!audioToggle;
					audioToggle=!audioToggle
				}else{
					btn.src="/icons/mic.png"
					stream.getAudioTracks()[0].enabled=!audioToggle;
					audioToggle=!audioToggle
		}
		// stream.getAudioTracks()[0].enabled=false
	}catch(err){
		console.log(err)
	}
}


function toggleStream(stream){
	navigator.mediaDevices.getDisplayMedia({video:true}).then(displaystream=>{
		stream=displaystream;
	})
}

function updatebtn(){
	img.src=videoToggle?"/icons/video-on.png":"/icons/video-off.png"
	audimg.src=audioToggle?"/icons/mic.png":"/icons/mic-off.png"
}

callendbtn.addEventListener("click",()=>{
	socket.emit('callend',peerID)
	setTimeout(()=>{
		window.location.replace('/')
	},100)
})

// var stream = new MediaStream();
