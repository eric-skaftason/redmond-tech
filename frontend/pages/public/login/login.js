function togglePassword() {
    const pwd = document.getElementById('password');
    pwd.type = (pwd.type === 'password') ? 'text' : 'password';
}

function login2() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');


    /*
    const validUsername = "user";
    const validPassword = "1234";

    if(username === validUsername && password === validPassword) {
        alert("Login successful!");
    } else {
        errorMsg.textContent = "Invalid username or password!";
    }

    */

    
}
async function logincheck(username, password){
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },


        body: JSON.stringify({username: username, password: password})
    });

    const data = await response.json();
}
