(()=>{"use strict";var e=document.querySelector('div[id="videoGrid"]'),t=document.querySelectorAll('div[data="video"]'),o=(document.querySelector('div[id="display"]'),document.querySelector('video[id="usrStream"]'),e.offsetWidth),n=e.offsetHeight;function c(t){let c=0,r=0,i=t;for(;c<e.childElementCount;)r+t>o&&(r=0,i+=t),r+=t,c++;return!(i>n||t>o)&&t}e.childElementCount;const r=function(){t=document.querySelectorAll('div[data="video"]'),o=e.offsetWidth,n=e.offsetHeight,e.childElementCount,function(){let e=0;for(let t=1;t<5e3;t++)if(!1===c(t)){e=t-1;break}e-=35,t.forEach((t=>{t.style=`height:${e}px;width:${e}px`}))}()},i=new Peer(void 0,{host:"peerxz.herokuapp.com",secure:!0,port:"443",path:"/peerjs/app/"}),d=io("/");var l;i.on("open",(e=>{l=e}));var a=document.createElement("video"),s=document.querySelector('div[id="videoGrid"]');a.id="usrStream",a.poster="/icons/error.jpg",a.preload="none";var u,m=!0,v=!0,p=!1,g=document.querySelector('img[id="videoimg"]'),y=document.querySelector('img[id="audimg"]'),f=document.querySelector('button[class="btntoogle btnx video"]'),S=document.querySelector('button[class="btntoogle btnx audio"]'),b=document.querySelector('button[class="btntoogle btnx call"]'),h={},q=[],E=document.querySelector('div[id="onerror"]'),k=document.querySelector('div[id="video"]'),w=document.querySelector('img[class="viderr"]'),x=document.querySelector('img[class="auderr"]'),L=document.querySelector('button[class="popup btnx"]'),T=document.querySelector('span[class="close"]'),j=document.querySelector('div[class="modal"]'),A=document.querySelector('div[id="chat"]'),C=(document.querySelector("form"),document.querySelector('input[id="msg"]')),M=document.querySelector('input[id="usrName"]'),N=document.querySelector('button[id="sendMsgbtn"]');function O(e,t){console.log("calling "+e+"...");var o=i.call(e,t),n=document.createElement("video");o.on("stream",(e=>{q.includes(o.peer)||(D(n,e),q.push(o.peer))})),o.on("close",(()=>{n.remove(),G()})),h[e]=o}function D(e,t,o){var n=document.createElement("div");n.className="videoContainer",n.setAttribute("data","video"),e.srcObject=t,e.onloadedmetadata=()=>{e.play()},n.append(e),s.append(n),r()}function z(e,t){var o=document.createElement("ul"),n=document.createElement("li");n.className="li";var c=document.createElement("li");n.innerText=e,c.innerText=t,o.append(n),o.append(c),o.className="msg",A.append(o)}function G(){document.querySelectorAll('div[data="video"]').forEach((e=>{0==e.childElementCount&&e.remove()})),r()}function H(e,t){1==m?(e.src="/icons/video-off.png",t.getVideoTracks()[0].enabled=!m,m=!m):(e.src="/icons/video-on.png",t.getVideoTracks()[0].enabled=!m,m=!m)}function I(e,t){try{1==v?(e.src="/icons/mic-off.png",t.getAudioTracks()[0].enabled=!v,v=!v):(e.src="/icons/mic.png",t.getAudioTracks()[0].enabled=!v,v=!v)}catch(e){console.log(e)}}document.querySelector("body"),a.muted=!0,function e(){var t=document.querySelector('video[class="error"]');t.muted=!0;var o=document.querySelector('button[id="btnjoin"]'),n=document.querySelector('h5[id="warning"]'),c=null;o.disabled=!0,navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,sampleRate:44100}}).then((e=>{c=e})),navigator.mediaDevices.getUserMedia({video:{width:{max:720},height:{max:720},aspectRatio:{ideal:1}}}).then((e=>{!function(e,t,o,n){t.srcObject=e,t.onloadedmetadata=()=>{t.play(),p=!0,o.disabled=!1,n.style.display="none",w.src="/icons/video-on.png",x.src="/icons/mic.png"},w.addEventListener("click",(()=>{H(w,e)})),x.addEventListener("click",(()=>{I(x,e)})),function(e,t,o){t.addEventListener("click",(()=>{if(0==M.value.length)alert("username is required");else{u=M.value,e.srcObject=void 0,E.style.display="none",k.style.display="block",D(a,o);var t=setInterval((()=>{null!=l&&null!=l&&(d.emit("peerid",roomid,l),clearInterval(t))}),100);g.src=m?"/icons/video-on.png":"/icons/video-off.png",y.src=v?"/icons/mic.png":"/icons/mic-off.png",f.addEventListener("click",(()=>{H(g,o)})),S.addEventListener("click",(()=>{I(y,o)})),i.on("call",(e=>{e.answer(o),console.log("call from"+e),e.on("stream",(t=>{if(!q.includes(e.peer)){var o=document.createElement("video");D(o,t),q.push(e.peer),h[e.peer]=e,e.on("close",(()=>{o.remove(),G()}))}}))})),i.on("error",(e=>{console.log(e)})),d.on("remove",(e=>{console.log(e),null!=h[e]&&h[e].close()})),d.on("peer_id",(e=>{null==h[e]&&setTimeout(O,50,e,o)}))}}))}(t,o,e)}(e=new MediaStream([...e.getTracks(),...c.getTracks()]),t,o,n)})).catch((o=>{var n=new MediaStream;t.srcObject=n,w.addEventListener("click",(()=>{p||e()}))}))}(),N.addEventListener("click",(e=>{var t;e.preventDefault(),0!=C.value.length&&(t=C.value,d.emit("message",u,t),z("you",t),C.value="")})),L.addEventListener("click",(()=>{j.style.display="block"})),T.addEventListener("click",(()=>{j.style.display="none"})),d.on("message",((e,t)=>{z(e,t)})),window.addEventListener("resize",(()=>{r()})),b.addEventListener("click",(()=>{d.emit("callend",l),setTimeout((()=>{window.location.replace("/")}),100)}))})();