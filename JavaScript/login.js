document.addEventListener("DOMContentLoaded", function() 
{
  // Check if the current page URL contains "login.html".
  // Without this all pages will display the account information.
  // Cloudflare learned what happens if you display critical user info.
  if (window.location.href.includes("login.html")) 
  {
      checkLoggedIn();
  }
});

// Logging out the user.
function logoutUser() 
{
  localStorage.removeItem("loggedInUser");
  // Send them back to the login/signup page
  displayLoginForm();
}

//checks if the user is actually logged in.
function checkLoggedIn() 
{
  const user = localStorage.getItem("loggedInUser");

  if (user) 
  {
      const userDetails = JSON.parse(user);
      const storedUser = localStorage.getItem('user_' + userDetails.accountName);

      if (storedUser) 
      {
          const storedUserData = JSON.parse(storedUser);
          const userFirstName = storedUserData.firstName;

          // Successful login attempt.
          if (userFirstName) 
          {
              displayWelcome(userFirstName);
          } 
          
          // error handling.
          else 
          {
              displayLoginForm();
          }
      }
      
      else 
      {
          displayLoginForm();
      }
  } 
  
  else 
  {
      displayLoginForm();
  }
}

// Getting the users information to log them in
function displayLoginForm() 
{
  // Just getting the account name and password.
  // They can also select forgot password or sign up.
  // They need to sign up first, which might not be clear, but im crunched for time.
  const loginFormHTML = `
      <h2>Login</h2>
      <form id="loginForm">
          <label for="accountName">Account Name</label>
          <input type="text" id="accountName" name="accountName" required>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required>
          <br/>
          <button type="submit">Log In</button>
          <button type="button" onclick="displaySignupForm()">Sign Up</button>
          <br/>
          <a href="#" onclick="forgotPassword()">Forgot Password?</a>
      </form>
  `;
  document.querySelector(".content-area").innerHTML = loginFormHTML;

  document.getElementById("loginForm").addEventListener("submit", function(event) 
  {
    event.preventDefault();

    // Grab the information entered.
    const accountName = document.getElementById('accountName').value;
    const password = document.getElementById('password').value;

    // make objects for the information.
    const user = 
    {
        accountName: accountName,
        password: password
    };

    // Call the log in user function to let them in.
    loginUser(user);
});
}

// The form to sign up.
function displaySignupForm() 
{
  const signupFormHTML = `
      <h2>Sign Up</h2>
      <form id="signupForm">
          <div class="form-group">
          <label for="accountName">Account Name</label>
          <input type="text" class="form-control" id="accountName" name="accountName" required>
          </div>  
          <div class="form-group">
              <label for="firstName">First Name</label>
              <input type="text" class="form-control" id="firstName" name="firstName" required>
          </div>
          <div class="form-group">
              <label for="lastName">Last Name</label>
              <input type="text" class="form-control" id="lastName" name="lastName" required>
          </div>
          <div class="form-group">
              <label for="dateOfBirth">Date of Birth</label>
              <input type="date" class="form-control" id="dateOfBirth" name="dateOfBirth" required>
          </div>
          <div class="form-group">
              <label for="Email">Email</label>
              <input type="email" class="form-control" id="Email" name="Email" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" placeholder="Please enter a valid email address">
          </div>
          <div class="form-group">
              <label for="mobileNumber">Mobile Number</label>
              <input type="tel" class="form-control" id="mobileNumber" name="mobileNumber" required>
          </div>
          <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" name="password" required>
          </div>
          <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" required>
          </div>
          <div class="form-check">
              <input type="checkbox" class="form-check-input" id="receiveEmails" name="receiveEmails">
              <label class="form-check-label" for="receiveEmails">Receive Emails</label>
          </div>
          <div class="form-check">
              <input type="checkbox" class="form-check-input" id="receiveMobileMessages" name="receiveMobileMessages">
              <label class="form-check-label" for="receiveMobileMessages">Receive Mobile Messages</label>
          </div>
          <div class="form-check">
              <input type="checkbox" class="form-check-input" id="dataProtection" name="dataProtection" required>
              <label class="form-check-label" for="dataProtection">I agree to the Data Protection Policy</label>
          </div>
          <div class="form-group">
              <label for="addressLine1">Address Line 1</label>
              <input type="text" class="form-control" id="addressLine1" name="addressLine1" required>
          </div>
          <div class="form-group">
              <label for="addressLine2">Address Line 2</label>
              <input type="text" class="form-control" id="addressLine2" name="addressLine2" required>
          </div>
          <div class="form-group">
              <label for="addressLine3">Address Line 3 (Optional)</label>
              <input type="text" class="form-control" id="addressLine3" name="addressLine3">
          </div>
          <button type="submit" class="btn btn-primary mt-3">Sign Up</button>
      </form>
  `;
  document.querySelector(".content-area").innerHTML = signupFormHTML;

  document.getElementById("signupForm").addEventListener("submit", function(event) 
  {
      event.preventDefault();
      signUpUser();
  });
}

// Saving the information recieved by the form.
function signUpUser() 
{
  // Retrieve form data
  const userFirstName = document.getElementById('firstName').value; //this is the name actually displayed. Weird that.
  const userLastName = document.getElementById('lastName').value;
  const dateOfBirth = document.getElementById('dateOfBirth').value;
  const email = document.getElementById('Email').value;
  const mobileNumber = document.getElementById('mobileNumber').value;
  const userPassword = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const receiveEmails = document.getElementById('receiveEmails').checked;
  const receiveMobileMessages = document.getElementById('receiveMobileMessages').checked;
  const dataProtection = document.getElementById('dataProtection').checked;
  const addressLine1 = document.getElementById('addressLine1').value;
  const addressLine2 = document.getElementById('addressLine2').value;
  const addressLine3 = document.getElementById('addressLine3').value; // Can be null. It's optional.
  const accountName = document.getElementById('accountName').value; //incidentially it will never be used except for login

  // Ensure the passwords match!
  if (userPassword !== confirmPassword) 
  {
      alert("Passwords do not match");
      return;
  }

  // Create an object to represent the user.
  const user = 
  {
      accountName: accountName,
      firstName: userFirstName,
      lastName: userLastName,
      dateOfBirth: dateOfBirth,
      email: email,
      mobileNumber: mobileNumber,
      password: userPassword,
      receiveEmails: receiveEmails,
      receiveMobileMessages: receiveMobileMessages,
      dataProtection: dataProtection,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      addressLine3: addressLine3,
  };

  // Store the user object in localStorage.
  localStorage.setItem('user_' + accountName, JSON.stringify(user));

  // Tell user they have successfully signed up.
  alert('Signed up successfully!');
  
  checkLoggedIn();
}

// Log in / Sign up Logic.
function loginUser(user) 
{
  // Retrieve the user details from localStorage based on the provided accountName.
  const storedUser = localStorage.getItem('user_' + user.accountName);

  // If the user exists & the password was correct. This condition must be true though.
  if (storedUser) 
  {
      const storedUserData = JSON.parse(storedUser);
      
      // Check if the entered password matches the accounts password. Checks for true equality
      if (user.password === storedUserData.password) 
      {
          // The user has been successfully logged in and brought back to the function to check if they were successful.
          localStorage.setItem('loggedInUser', JSON.stringify({ accountName: storedUserData.accountName }));
          checkLoggedIn();
      } 
      
      else 
      {
          alert('Invalid password. Please try again.');
      }
  } 
  // if no account was found.
  else 
  {
      alert('Invalid account name. Please try again.');
  }
}

// If the user forgot their password...
function forgotPassword() 
{
  // get the account they wish to reset the password of.
  const accountName = prompt("Enter your account name:");
  const storedUser = localStorage.getItem('user_' + accountName);

  // Now, usually you would get an email for this to confirm you really are who you say.
  // But, i can't be arsed to write that, so just reset the password.
  if (storedUser) 
  {
    const newPassword = prompt("Enter your new password:");
    const confirmPassword = prompt("Confirm your new password:");

    if (newPassword === confirmPassword && newPassword !== null && newPassword !== "") 
    {
      const storedUserData = JSON.parse(storedUser);
      storedUserData.password = newPassword;
      localStorage.setItem('user_' + accountName, JSON.stringify(storedUserData));
      alert("Password reset successfully!");
    } 
    
    else 
    {
      alert("Passwords do not match or are empty.");
    }
  } 
  
  else 
  {
    alert("Account not found. Please enter a valid account name.");
  }
}

// Displays the welcome message. It doesn't use the account name but the first name of the user.
function displayWelcome(firstName) 
{
  const welcomeHTML = `
    <h2>Welcome, ${firstName}!</h2>
    <button onclick="logoutUser()">Logout</button>
  `;
  document.querySelector(".content-area").innerHTML = welcomeHTML;
}