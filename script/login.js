console.log("Login script loaded");
document.getElementById("login-btn").addEventListener("click", function() {
    console.log("Login button clicked");
    //1-- get the username input value
    const inputUsername = document.getElementById("input-username");
    const contactUsername = inputUsername.value;
    console.log("Username:", contactUsername);

    //2--get the password input value
    const inputPassword = document.getElementById("input-password");
    const contactPassword = inputPassword.value;
    console.log("Password:", contactPassword);

    //3-- match the username and password
    if (contactUsername === "admin" && contactPassword === "admin123") {
        alert("Login successful");

        window.location.assign("/home.html");
    }
    else {
        alert("Login failed. Please check your username and password.");
        return; // Exit the function if login fails
    }



});