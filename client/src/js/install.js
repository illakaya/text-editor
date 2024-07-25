const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
let delayedPrompt;

// Function to check if the PWA is installed
function isPwaInstalled() {
  if (window.matchMedia("(display-mode: standalone)").matches) {
    return true;
  }
  // Check for Safari on iOS
  if (window.navigator.standalone) {
    return true;
  }
  return false;
}

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  // prevent refreshing or whatever the default browser behaviour
  event.preventDefault();
  // store the event to be triggered later
  delayedPrompt = event;
  // notify the user that PWA is available to install
  if (!isPwaInstalled()) {
    // Show the install button
    butInstall.style.display = "block";
  } else {
    // hide the install button if already installed
    butInstall.style.display = "none";
  }
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  // Exit if the beforeinstallprompt has not yet been fired
  if (!delayedPrompt) {
    return;
  }
  // otherwise, if the even has occurred, show the installation prompt
  delayedPrompt.prompt();
  // wait for the user to respond to the prompt, destructure the response
  const { outcome } = await delayedPrompt.userChoice;
  // log user decision
  console.log(`User response to installation: ${outcome}`);
  // clear the event from occurring
  delayedPrompt = null;
  // Hide the install button after prompting
  butInstall.style.display = "none";
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  // log installation finishing
  console.log("PWA was installed. ");
  // hide the install button
  butInstall.style.display = "none";
});
