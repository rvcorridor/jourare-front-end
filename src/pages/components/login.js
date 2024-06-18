async function doLogIn (username, password) {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/session", {
        method : 'POST',
        credentials : 'include',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({username : username, password : password})
    })

    return await response.json()
}

export default doLogIn