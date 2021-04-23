import {API} from "../../backend";


// get user

export const getUser = (userId) => {
    return fetch(`${API}/user/${userId}`, {
        method : "GET"
    })
    .then((response) => {
        return response.json();
    })
    .catch((err) => console.log(err));
}

// get all categories
export const getCategories = () => {
    return fetch(`${API}/categories`,{
        method : "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const searchDonor = (token, bloodType, location) => {
    return fetch(`${API}/searchDonor`,{
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({bloodType, location})
    })
        .then(response => {
            return response.json();
        })
        .catch(err=>console.log(err));
}

export const createResource = (resource) => {
    return fetch(`${API}/resource/create`, {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(resource)
    })
        .then(response => {
            return response.json();
        })
        .catch(err=>console.log(err));
}

export const getAllResources = () => {
    return fetch(`${API}/resource/available`,{
        method : "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
} 

export const getMyResources = (userId) => {
    return fetch(`${API}/user/${userId}/resource`,{
        method : "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
} 