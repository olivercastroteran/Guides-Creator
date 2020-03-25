// Listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    // get data
    db.collection('guides')
      .get()
      .then(snapshot => {
        setupGuides(snapshot.docs);
        setupUI(user);
      });
  } else {
    setupUI();
    setupGuides([]);
  }
});

// Signup
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', e => {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // Sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// Logout
const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
  e.preventDefault();
  auth.signOut();
});

// Login
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // login the user
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    // close login modal and reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
