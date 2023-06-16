
# Meetx

A Peer to Peer Video conferencing web application with Vannila JavaScript , ExpressJs, Socket.io and WebRTC.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)



## Run Locally

Clone the project

```bash
  git clone https://github.com/dine-5h/meetx
```

Go to the project directory

```bash
  cd meetx
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Modify

scripts/script.js 

```javascript
const peer=new Peer(undefined,{
	host:"Paste Your Peer server Url Here",
	secure:true,
	port:'443',
	path:'/peerjs/app/'
})
```

with Your peer sever Url
## Peer Server

To Host or run your own peer server navigate 'peerserver' folder and run


Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

The peerserver will start on port 3001


## License

[MIT](https://choosealicense.com/licenses/mit/)

