let darkMode = false;

function toggleMode() {
  const body = document.body;
  //const nav = document.nav;    //doesn't work, but actually im fine that
                                 //i want the nav to be different no matter with version 
  darkMode = !darkMode;

  if (darkMode) {
    body.classList.add('dark-mode');
    //nav.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  //  nav.classList.remove('dark-mode');
  }
}

