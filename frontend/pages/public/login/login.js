
function togglePassword() {
    const pwd = document.getElementById('password');
    pwd.type = (pwd.type === 'password') ? 'text' : 'password';
}
document.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        logincheck();
    }
});

function displayError(message) {
    const errMessageEle = document.getElementById('errorMsg');
    errMessageEle.innerText = message;

    setTimeout(() => {
        errMessageEle.innerText = '';
    }, 2000);

}

async function logincheck(){
    // Get username and password
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Semds Login to backend
    const response = await fetch('/api/accounts/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },


        body: JSON.stringify({username: username, password: password})
    });
    //wait for response
    const data = await response.json();
    if (response.ok){
        document.location='/';

    }else{
        displayError(data.message);
    }
    console.log(data);
}
