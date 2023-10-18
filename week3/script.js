let slideIndex =0; //sets slide index to 0
let images = []; //empty array for images
const intervalTime = 3000; //time interval between each image slide

images = [  //image list with the paths
  'images/swiss1.jpg',
  'images/italy1.jpg',
  'images/france1.jpg',
  'images/uk1.jpg',
  'images/korea1.jpg',
];

function slideImage() {  
    const slide = document.getElementById('slide'); //gets the html element with Id slide and stores it
    slide.src = images[slideIndex]; //sets the src sttribute to the image at the current slideIndex
    slideIndex = (slideIndex + 1) % images.length; //increments the slideIndex and makes the slideIndex 0 when the array ends
}

setInterval(slideImage, intervalTime); //calls slide interval every 3000ms(intervalTime)

//Adds an event listener to the 'load' event of window, so that the function runs when the webpage loads
window.addEventListener("load", slideImage);


//FORM.HTML JS

//get the form element
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const submitButton = document.getElementById('submit-button');


//function to display error message and apply error styles
const setError = (element, message) => {
  const inputControl = element.parentElement; //gets the parent element of the input
  inputControl.classList.add('error'); //adds the error class to the parent element
  const errorDisplay = inputControl.querySelector('.error'); //selects the first child element
  errorDisplay.innerText = message; //sets the error message
}

//function to indicate success by removing error message and applying success styles
const setSuccess = element => {
  const inputControl = element.parentElement; //gets the parent element of the input
  inputControl.classList.add('success'); //adds the 'success class to the parent element
  inputControl.classList.remove('error'); //removes the 'error' class from the parent element
  const errorDisplay = inputControl.querySelector('.error'); //selects the first child element
  errorDisplay.innerText = ''; //clears the error message
}

//function to validate username
const validateUsername = () => {
  const usernameValue = username.value.trim();
  if(usernameValue === '') {
    setError(username, 'Username is required'); //calls function to set error message
  }
  else if(usernameValue.length <=2) {
    setError(username, 'Username must be atleast 3 characters long');
  }
  else {
    setSuccess(username); //calls function to set success message
  } 
}

//function to validate email
const validateEmail = () => {
  const emailValue = email.value.trim();
  if(emailValue === '') {
    setError(email, 'Email is required'); //calls function to set error message
  }
  else if(!validEmailChecker(emailValue)) {
    setError(email, 'Invalid email format'); //calls function to set error message
  }
  else {
    setSuccess(email); //calls function to set success message
  } 
}

function validEmailChecker(email) {
    const emailCheck =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailCheck.test(email);
  } 

//function to validate password
const validatePassword = () => {
  const passwordValue = password.value.trim();
  if(passwordValue === '') {
    setError(password, 'Password is required'); //calls function to set error message
  }
  else if(passwordValue.length<8) {
    setError(password, 'Password must be atleast 8 characters long'); //calls function to set error message
  }
  else {
    setSuccess(password); //calls function to set success message
  } 
}

//function to validate confirm password
const validateConfirmPassword = () => {
  const confirmPasswordValue = confirmPassword.value.trim();
  const passwordValue = password.value.trim();
  if(confirmPasswordValue === '') {
    setError(confirmPassword, 'Password is required'); //calls function to set error message
  }
  else if(confirmPasswordValue !==  passwordValue) {
    setError(confirmPassword, 'Passwords do not match'); //calls function to set error message
  }
  else {
    setSuccess(confirmPassword); //calls function to set success message
  } 
}

//main function to validate inputs
const validateInputs = () => {
  validateUsername();
  validateEmail();
  validatePassword();
  validateConfirmPassword();

  if(username.parentElement.classList.contains('success') && email.parentElement.classList.contains('success') &&
  password.parentElement.classList.contains('success') && confirmPassword.parentElement.classList.contains('success')) {
    alert('User registered successfully!');
 }
};

//event listener for the form on submit event
form.addEventListener('submit',event=> {
  event.preventDefault(); //prevents the form from submitting and refreshing the page
  validateInputs(); //calls the function to validate inputs
});

//event listeners for real-time validation
username.addEventListener('input', validateUsername);
email.addEventListener('input', validateEmail);
password.addEventListener('input', validatePassword);
confirmPassword.addEventListener('input', validateConfirmPassword);

