/**
 * @returns Jwt token
 */
let getAuthToken = async () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    try {
        let options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }
        let data = await postData("http://localhost:8080/api/v1/login", options);
        return sessionStorage.setItem('jwt', data.token);

    } catch (error) {
        console.log(error);
    }
}

let postData = async (url, options) => {
    return await fetch(url, options)
        .then(res => res.json());
}
