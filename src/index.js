// const express = require('express')
// const path = require('path')

// const app = express()

// const port = process.env.PORT || 3000

// const publicDirectoryPath = path.join(__dirname, '../public')

// app.use(express.static(publicDirectoryPath))





// app.listen(port, ()=>{
//     console.log(`server is up on port ${port}!`)
// })
/////////////////////////////////////////
///////WEB SOCKET IO (refactoring)/////////////
/////////////////////////////
// const express = require('express')
// const path = require('path')
// const http = require('http')
// const socketio = require('socket.io')

// const app = express()
// const server = http.createServer(app)
// const io = socketio(server)

// const port = process.env.PORT || 3000

// const publicDirectoryPath = path.join(__dirname, '../public')

// app.use(express.static(publicDirectoryPath))

// io.on('connection', ()=>{
//     console.log('new websocket connection!')
// })





// server.listen(port, ()=>{
//     console.log(`server is up on port ${port}!`)
// })
///////////////////////////////////////
////////////Socket.io events////////////
//////////////////////////////////////
// const express = require('express')
// const path = require('path')
// const http = require('http')
// const socketio = require('socket.io')

// const app = express()
// const server = http.createServer(app)
// const io = socketio(server)

// const port = process.env.PORT || 3000

// const publicDirectoryPath = path.join(__dirname, '../public')

// app.use(express.static(publicDirectoryPath))

// let count = 0

// //server (emit) --> client (receive) - countUpdated
// // client (emit) --> server (received) - increment

// // io.on('connection', ()=>{
// //     console.log('new websocket connection!')
// // })

// io.on('connection', (socket)=>{
//     console.log('new websocket connection')

//     socket.emit('countUpdated', count)

//     socket.on('increment',()=>{
//         count++
//         //socket.emit('countUpdated',count)
        
//         //for every single connection that currently available and show update for all the clients
//         io.emit('countUpdated', count)
//     })
// })




// server.listen(port, ()=>{
//     console.log(`server is up on port ${port}!`)
// })
///////////////////////////////
//////////////Challenge//////////
//////////////////////////////
// const express = require('express')
// const path = require('path')
// const http = require('http')
// const socketio = require('socket.io')

// const app = express()
// const server = http.createServer(app)
// const io = socketio(server)

// const port = process.env.PORT || 3000

// const publicDirectoryPath = path.join(__dirname, '../public')

// app.use(express.static(publicDirectoryPath))

// // Goal: welcome message to new users

// // 1. Have server emit "message" when new client connects
// //  - send "welcome!" as the event data
// // 2. Have client listen for "message" event and print the message to console
// // 3. Test your work
// //--------------------------------------

// //Goal: Allow clients to send message

// // 1. Create a form with an input and button
// //  -Similiar to the weather form
// // 2. Setup event listener for form submission
// //   -Emit "sendMessage" with input string as message data
// // 3. Have server listen for "saveMessage"
// //  -Send message to all connected clients
// // 4. Test your work

// //let count = 0

// //server (emit) --> client (receive) - countUpdated
// // client (emit) --> server (received) - increment




// io.on('connection', (socket)=>{
//     console.log('new websocket connection')

//     // socket.emit('countUpdated', count)

//     // socket.on('increment',()=>{
//     //     count++
//     //     //socket.emit('countUpdated',count)
        
//     //     //for every single connection that currently available and show update for all the clients
//     //     io.emit('countUpdated', count)
//     // })
    
    
//     socket.emit('message', 'welcome!')//from server to spesific client

//     socket.on('sendMessage', (message)=>{
//         io.emit('message', message)//to the all clients are connected 
//     })

   

// })




// server.listen(port, ()=>{
//     console.log(`server is up on port ${port}!`)
// })
//////////////////////////////////////////
//////////////When new user join or delete
//////////////////////////////////////////
const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessages, generateLocationMessage} = require('./utils/messages')
const {AddUser,removeUser, getUser, getUsersInRoom} = require('./utils/users')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

//Goal: Render user name fr text message

// 1. setup the server to send username to client
// 2. Edit every call to "generateMessage" to include username
// -use Admin for sys messages like connect/welcome/ disconnect
// 3. update client to render username in template
// 4. Test your work!



//let count = 0

//server (emit) --> client (receive) - countUpdated
// client (emit) --> server (received) - increment




io.on('connection', (socket)=>{
    console.log('new websocket connection')

    // socket.emit('countUpdated', count)

    // socket.on('increment',()=>{
    //     count++
    //     //socket.emit('countUpdated',count)
        
    //     //for every single connection that currently available and show update for all the clients
    //     io.emit('countUpdated', count)
    // })
    
    
    // socket.emit('message', 'welcome!')//from server to spesific client
    //**this code and after bellow one should go down socket.emit('message', generateMessages('Welcome!'))
    // socket.broadcast.emit('message','A new user has joined')
    //** socket.broadcast.emit('message', generateMessages('A new user has joined'))
    //every body see the message except new user


//new one for sending data (username, room)
//and it's server's job to setup a listener for join
//---------------------------------------------------------
    // socket.on('join', ({username, room}, callback)=>{
    //    const {error, user} = AddUser({id: socket.id, username, room})
//---------------------------------------------------------------------------------
socket.on('join', (options, callback)=>{
    const {error, user} = AddUser({id: socket.id, ...options})
       if(error){
            return callback(error)
       }
    
        //socket.join allows us to join a given chatroom and we pass to  it the name the room we are trying to join
        socket.join(user.room)//only those who are in that room can see messages

        socket.emit('message', generateMessages('Admin','Welcome!'))
        // socket.broadcast.emit('message', generateMessages('A new user has joined'))
        socket.broadcast.to(user.room).emit('message', generateMessages('Admin',`${user.username} has joined!`))
       io.to(user.room).emit('roomData',{
           room: user.room,
           users: getUsersInRoom(user.room)
       })
        callback() //letting clients know they have joined

        //socket.emit, io.emit, socket.broadcast.emit
        //((io.to.emit)) --> it emits an event to everybody in a specific room
        //((socket.broadcast.to.emit)) --> sending an event to everyone except for the specific client but is is limiting it to specific chatroom

    })
    
    //Goal: Send message to correct room

    // 1. Use getUser inside "sendMessage event handler to get user data
    // 2.emit the message to their current room
    // 3. Test your work
    // 4. Repeat for sendLocation
    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id)
        const filter= new Filter()
        
        

        if(filter.isProfane(message)){
           return callback('profanity is not allowed!')
        }

        // io.emit('message', message)//to the all clients are connected 
        // io.emit('message', generateMessages(message))
        // io.to('Center City').emit('message', generateMessages(message))
        io.to(user.room).emit('message', generateMessages(user.username, message))
        // callback('Delivered!')
        callback()
    })

    socket.on('sendLocation',(coords, callback)=>{
        const user = getUser(socket.id)

        
        // io.emit('message',`Location: ${coords.latitude},${coords.logitude}`)
        // io.emit('locationMessage',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        // io.emit('locationMessage',generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        // io.to(user.room).emit('locationMessage',generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        io.to(user.room).emit('locationMessage',generateLocationMessage(user.username,`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()

       
    })

    

    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message',generateMessages('Admin',`${user.username} has left!`))
            io.to(user.room).emit('roomData',{
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
        // io.emit('message','A user has left!')
        // io.emit('message',generateMessages('A user has left!'))
        //we need to move top code to if condition if there is a user we just need to send a message that the user has left
    })

    

   

})




server.listen(port, ()=>{
    console.log(`server is up on port ${port}!`)
})