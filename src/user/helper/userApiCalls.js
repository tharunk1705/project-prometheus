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

// export const 