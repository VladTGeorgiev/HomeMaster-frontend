import swal from 'sweetalert';
const endpoint = 'http://localhost:3000/api/v1'
const usersUrl = `${endpoint}/users`
const loginUrl = `${endpoint}/login`
const homesUrl = `${endpoint}/homes`
const tasksUrl = `${endpoint}/tasks`
const essentialsUrl = `${endpoint}/essentials`
const validateUrl = `${endpoint}/validate`
const dataUrl = `${endpoint}/data`
const token = () => localStorage.getItem("token");

const jsonify = res => {
    if (res.ok)
        return res.json()
    else
        return Promise.resolve({error: 'no token'})
}

const handleServerError = response => {
    console.error(response)
    swal({
        title: "Error!",
        text: "Something didn't go as planned. Please, try again!",
        icon: "Error",
        timer: 1500,
        buttons: false
        });
}

const clearToken = () => localStorage.removeItem('token')

const signUp = (user) =>fetch(usersUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
    }).then(jsonify)
    .then(data => {
        localStorage.setItem('token', data.token)
        return data.user
    })
    .catch(handleServerError)

const logIn = (user) => fetch(loginUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
    }).then(jsonify).then(data => {
        localStorage.setItem('token', data.token)
        return data.user
})

const validateUser = () => {
    if(!localStorage.getItem('token')) return Promise.resolve({error: 'no token'})
    return fetch(validateUrl, {
        headers: {'Authorization': localStorage.getItem('token')}
    }).then(resp => resp.json())
        .then(data => {
            localStorage.setItem('token', data.token)
            return data
        })
        .catch(handleServerError)
}

 /////////  FETCH REQUESTS

const fetchData = () => {
    return fetch(dataUrl, {
        headers: {'Authorization': localStorage.getItem('token')}
    }).then(res => res.json());
  };

// USER
const updateThisUser = (current_user, user) =>
    fetch(`${usersUrl}/${current_user.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token() 
        },
        body: JSON.stringify({ user })
        }).then(jsonify)
        .then(data => {
            localStorage.setItem('token', data.token)
            return data.user
        })
        .catch(handleServerError)

const deleteThisUser = (user) => {
    fetch(`${usersUrl}/${user.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token() 
        },
        body: JSON.stringify({ user })
        })
}

// HOME
const updateThisHome = (current_user, user) => ///edit to suit the purpose
    fetch(`${homesUrl}/${current_user.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token() 
        },
        body: JSON.stringify({ user })
        }).then(jsonify)
        .then(data => {
            console.log(data)
        })
        .catch(handleServerError)

// ESSENTIALS
const addNewEssential = (home, name) =>
    fetch(essentialsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token() 
        },
        body: JSON.stringify({ 
            name: name,
            more: false,
            home_id: home
         })
        }).then(jsonify)
        .then(
        swal({
            title: "Success!",
            text: "You have created a new hosehold item!",
            icon: "success",
            timer: 1500,
            buttons: false
            })
        )
        .catch(handleServerError)

const deleteThisEssential = (essential) => {
    fetch(`${essentialsUrl}/${essential.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token() 
        },
        body: JSON.stringify({ essential })
        })
}

// TASKS
const addNewTask = (user, home, name) => {
    console.log(user)
    console.log(home)
    console.log(name)
}
    // fetch(tasksUrl, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: token() 
    //     },
    //     body: JSON.stringify({ 
    //         name: name,
    //          description: ,
    //          date_due: ,
    //         completed: false,
    //         home_id: home,
    //         user_id: user,
    //          img: ''
    //      })
    //     }).then(jsonify)
    //     .then(
    //     swal({
    //         title: "Success!",
    //         text: "You have created a new task!",
    //         icon: "success",
    //         timer: 1500,
    //         buttons: false
    //         })
    //     )
    //     .catch(handleServerError)

const deleteThisTask = (task) => {
    fetch(`${essentialsUrl}/${task.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token() 
        },
        body: JSON.stringify({ task })
        })
}


export default {
    signUp,
    logIn,
    validateUser,
    clearToken,
    token,
    homesUrl,
    usersUrl,
    fetchData,
    essentialsUrl,
    tasksUrl,
    updateThisUser,
    deleteThisUser,
    updateThisHome,
    addNewEssential,
    deleteThisEssential,
    addNewTask,
    deleteThisTask
}