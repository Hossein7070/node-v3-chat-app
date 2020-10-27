const users = []

//Add users, Remove users, get Users, getUsersInroom

const AddUser = ({id, username, room}) =>{
    //Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //validate the data
    if(!username || !room){
        return{
            error: 'Username and Room are required!'
        }
    }

    //check for existing users
    const existingUser = users.find((user)=>{
        return (user.username === username && user.room === room)
    })

    //validate user
    if(existingUser){
        return {
            error: 'User is in use'
        }
    }

    //if data is valid and we can add them to the room it is time to store them 

    //Store user
    const user = {id, username, room}
    users.push(user) //push that object on to the array
    return{ user } //instead of adding error property if things go wrong we will set up user's property
}

const removeUser = (id)=>{
    const index = users.findIndex((user)=>{
        return user.id === id

        
    })
    
    //index is -1 if we did not find the match
    if(index !== -1){
        return users.splice(index, 1)[0] //this is going to to remove an array because we are going to remove more than one item , so we are only going to remove one item and we want to return an object and access the first one by its id 
    }
}

const getUser = (id)=>{
    
    return users.find((user)=> user.id === id)

    
}

const getUsersInRoom = (room)=>{
     room = room.trim().toLowerCase()
     return users.filter((user)=>user.room === room)
    
}

AddUser({
    id:22,
    username:'   Hossein',
    room: '    Vancouver'
})

AddUser({
    id:42,
    username:'   mike',
    room: '    Vancouver'
})

AddUser({
    id:32,
    username:'   Hossein',
    room: '    centered city'
})

// const user = getUser(420)
// console.log(user)

const userList = getUsersInRoom('centered city')
console.log(userList)
//******console.log(users)

// const res = AddUser({
//     id:33,
//     username:'',
//     room:''
// })
// const res2 = AddUser({
//     id:33,
//     username:'hossein',
//     room:'vancouver'
// })
// console.log(res2)

// *****const removedUser = removeUser(22)

// ******console.log(removedUser)
// ******console.log(users)
//------------------------------------------------------------
//here is the result when a user is removed
// [ { id: 22, username: 'hossein', room: 'vancouver' } ]
// { id: 22, username: 'hossein', room: 'vancouver' }
// []
//------------------------------------------------------
//Goal: Create two new functions for users

// 1. Create getUser
// - Accept id and return user object (or undefined)
// 2. Crate getUsersInRoom 
// - Accept room name and return array of users (or empty array)
// 3. Test your work by calling functions

module.exports = {
    AddUser,
    removeUser,
    getUser,
    getUsersInRoom

}