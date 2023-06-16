const express=require("express")
const app=express()

var server=app.listen(process.env.PORT||3000,()=>{
	console.log("server started");
})

const {v4:uuid4}=require("uuid")
const io=require("socket.io")(server)


app.set('view-engine','ejs')
app.use(express.static('static'))

app.get("*", function (req, res, next) {
    if ("https" !== req.headers["x-forwarded-proto"]) {
        res.redirect("https://" + req.hostname + req.url)
    } else {
        next()
    }

})



app.get('/',(req,res)=>{
	res.sendFile(__dirname+"/static/meet.html")
})


app.get('/createroom',(req,res)=>{
	res.redirect(`/${uuid4()}`)
})



app.get('/:room',(req,res)=>{
	res.render('video.ejs',{roomid:req.params.room})
})



io.on('connection',socket=>{
	socket.on("peerid",(roomid,id)=>{
		socket.join(roomid)
		socket.to(roomid).emit("peer_id",id)
		socket.on("message",(user,msg)=>{
			socket.to(roomid).emit("message",user,msg)
		})
		socket.on('disconnect',()=>{
			socket.to(roomid).emit("remove",id)
		})
	})
})
