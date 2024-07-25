const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let delayedPrompt;

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // prevent refreshing or whatever the default browser behaviour
  event.preventDefault();
  // store the event to be triggered later
  delayedPrompt = event;
  // notify the user that PWA is available to install
  butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // if the event has not occurred, exit installation
  if(!delayedPrompt) {
    return;
  }

  // otherwise, if the even has occurred, show the installation prompt
  delayedPrompt.prompt();
  // wait for the user to respond to the prompt, destructure the response
  const { outcome } = await delayedPrompt.userChoice;
  // log user decision
  console.log(outcome);
  // clear the event from occurring
  delayedPrompt = null;
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // log installation finishing
  console.log('PWA was installed. ', event);
  // hide the install button
  butInstall.style.display = 'none';
});
