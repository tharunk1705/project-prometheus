import { API } from "../../backend";


// Category Call
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`,{
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err=>console.log(err));
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

// get a category(one)

export const getCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`,{
        method : "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}


// delete category
export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method : "DELETE",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

// update category

export const updateCategory = (categoryId,userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method : "PUT",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}


// get all donors
export const getDonors = () => {
    return fetch(`${API}/donors`,{
        method : "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}
