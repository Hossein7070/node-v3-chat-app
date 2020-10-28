// const socket = io()

// socket.on ('countUpdated', (count)=>{
//     console.log('The my count has been updated', count)
// })

// document.querySelector('#increment').addEventListener('click',()=>{
//     console.log('clicked')
//     socket.emit('increment')
// })

///////////////////////////////
///////Challenge//////////
///////////////////////
// const socket = io()

// // socket.on ('countUpdated', (count)=>{
// //     console.log('The my count has been updated', count)
// // })

// // document.querySelector('#increment').addEventListener('click',()=>{
// //     console.log('clicked')
// //     socket.emit('increment')
// // })
    
// socket.on('message', (message)=>{
//     console.log(message)
// })

// document.querySelector('#Message-form').addEventListener('submit',(e)=>{
//     e.preventDefault()
    
//     // const message = document.querySelector('input').value
//     //if we had many input, inorder to avoid confusing we use bellow code
//     const message = e.target.elements.message

//     // socket.emit('sendMessage', message, (message)=>{
//     //     console.log('The message was delivered!', message)
//     // })
//     socket.emit('sendMessage', message, (error)=>{
//         if(error){
//             console.log(error)
//         }
//         console.log('Message delivered!')
//     })
// })

// document.querySelector('#send-location').addEventListener('click',()=>{
//         if(!navigator.geolocation){
//             return alert('gelolocation is not supported by your browser!')
//         }
//         navigator.geolocation.getCurrentPosition((position)=>{
//             //console.log(position)
//             socket.emit('sendLocation',{
//                 latitude: position.coords.latitude,
//                 longitude: position.coords.longitude
//             }, ()=>{
//                 console.log('Location Shared!')
//             })
            
           
//         })
// })

//Goal : Share coordinated with other users

// 1. Have client emit "sendLocation" with an object as the data
//  -Object should contain latitute and longtitute properties
// 2. Server should listen for "sendLocation"
//   -When fierd send a "message" to all connected clients "Location: lat, long"
// 3. Test your work
//------------------------------
// Goal: Setup acknowledgement

// 1. Setup the client acknowledgement function
// 2. Setup the server to acknowledgement the function
// 3. Have the client print "Location shared" when acknowledged
// 4, Test you work
///////////////////////////////////////
///////button and state////////////
///////////////////////////////
const socket = io()
//elements
const $messageForm= document.querySelector('#message-form')
const $messageFormInput=$messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton= document.querySelector('#send-location')
const $messages= document.querySelector('#messages')


//template
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

//options
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true})

// const autoscroll = ()=>{
//     //New message element
//     const $newMessage = $messages.lastElementChild

//     //Height of new meesage
//     const newMessagesStyles = getComputedStyle($newMessage)
//     const newMessageMargin = parseInt(newMessagesStyles.marginBottom)
//     const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

//     //visible Height
//     const visibleHeight = $message.offsetHeight

//     //Height of message container
//     const containerHeight = $message.scrollHeight

//     //How far have I scrolled?
//     const scrollOffset = $messages.scrollTop + visibleHeight

//     if(containerHeight - newMessageHeight <= scrollOffset){
//         $messages.scrollTop = $messages.scrollHeight
//     }
//
//}
//Goal: Create a separete event for location sharing mesages
//
// 1. Have server emit "locationMessage" with the URL
// 2. Have the client listen for "locationMessage" and print the URL to the console
// 3. Test your work by sharing a location!
//-------------------------------------------------------

//Goal: Render new template for location message
//
// 1. Duplicate the message template
// -Change the id to something else
// 2. Add a link inside the paragraph with the link test "My current location"
// - URL for link should be the maps URL (dynamic)
// 3. select the template from javascript
// 4. Render the template with the URL and append to message list
// 5. Test your work
//---------------------------------- 

//Goal: Add timestamps for location messages
//
// 1. create generateLocationMessage and export
//   -{url:'', createdAt:0 }
// 2. use generateLocationMessage when server emits locationMessages
// 3. Update template to render time before the url
// 4. Compile the template with the URL and formatted time
// 5. Test your work!
//-------------------------------------------

// socket.on ('countUpdated', (count)=>{
//     console.log('The my count has been updated', count)
// })

// document.querySelector('#increment').addEventListener('click',()=>{
//     console.log('clicked')
//     socket.emit('increment')
// })
    
socket.on('message', (message)=>{
    console.log(message)
    const html = Mustache.render(messageTemplate,{
        username: message.username,
        message: message.text,
        // createdAt: message.createdAt
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
   // autoscroll()
})

// socket.on('locationMessage', (url)=>{
//     console.log(url)
socket.on('locationMessage', (message)=>{
    console.log(message)
    const html = Mustache.render(locationMessageTemplate,{
        username: message.username,
        url: message.url,
        // createdAt: url.createdAt
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    //autoscroll()
})
socket.on('roomData', ({room, users})=>{
    // console.log(users)
    // console.log(room)
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})

$messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()


    $messageFormButton.setAttribute('disabled', 'disabled')
    //disable
    
    // const message = document.querySelector('input').value
    //if we had many input, inorder to avoid confusing we use bellow code
    const message = e.target.elements.message.value

    // socket.emit('sendMessage', message, (message)=>{
    //     console.log('The message was delivered!', message)
    // })
    socket.emit('sendMessage', message, (error)=>{

        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value=''
        $messageFormInput.focus()//move the cursor of mose to input field
        //enable

        if(error){
            console.log(error)
        }
        console.log('Message delivered!')
    })
})

// document.querySelector('#send-location').addEventListener('click',()=>{
    $sendLocationButton.addEventListener('click',()=>{
        if(!navigator.geolocation){
            return alert('gelolocation is not supported by your browser!')
        }
        $sendLocationButton.setAttribute('disabled', 'disabled')

        navigator.geolocation.getCurrentPosition((position)=>{
            //console.log(position)
            socket.emit('sendLocation',{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }, ()=>{
                $sendLocationButton.removeAttribute('disabled')
                console.log('Location Shared!')

             
                
            })
            
           
        })
})
socket.emit('join', {username, room},(error)=>{
    if(error){
        alert(error)
        location.href = '/'
    }

})

//Goal: Disable the send location button while lcation being sent

// 1. setup a selector at the top of the file
// 2. disable the button just before getting the current position
// 3. Enable the button in the acknowledgement callback
// 4.Test your work!
