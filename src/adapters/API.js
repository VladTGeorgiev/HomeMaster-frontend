import swal from 'sweetalert';
import App from '../App';
const endpoint = 'http://localhost:3000/api/v1'
const usersUrl = `${endpoint}/users`
const loginUrl = `${endpoint}/login`
const homesUrl = `${endpoint}/homes`
const tasksUrl = `${endpoint}/tasks`
const billsUrl = `${endpoint}/bills`
const billsplitsUrl = `${endpoint}/billsplits`
const essentialsUrl = `${endpoint}/essentials`
const validateUrl = `${endpoint}/validate`
const dataUrl = `${endpoint}/data`
const buyFromAmazon = 'https://www.amazon.co.uk/s?k='
const token = () => localStorage.getItem("token");

/////////  HELPERS

const jsonify = res => {
    if (res.ok)
        return res.json()
    else
        return Promise.resolve({error: 'no token'})
}

const handleServerError = response => {
    swal({
        title: "Error!",
        text: "Something didn't go as planned. Please, try again!",
        icon: "Error",
        timer: 1500,
        buttons: false
        });
}

/////////  USER AUTHENTICATION/AUTHORISATION

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

const clearToken = () => localStorage.removeItem('token')

/////////  FETCH REQUEST

const fetchData = () => {
    return fetch(dataUrl, {
        headers: {'Authorization': localStorage.getItem('token')}
    })
    .then(res => res.json())
  };

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
    billsplitsUrl,
    billsUrl,
    buyFromAmazon
}