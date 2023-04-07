const options = document.querySelectorAll(".options-div");
let trainingModal = new bootstrap.Modal("#trainingModal");
let launchModal = new bootstrap.Modal("#launchModal");
let safetyModal = new bootstrap.Modal("#safetyModal");
let recoveryModal = new bootstrap.Modal("#recoveryModal");
options[0].onclick = () => {
  trainingModal.show();
};
options[1].onclick = () => {
  launchModal.show();
};
options[2].onclick = () => {
  safetyModal.show();
};
options[3].onclick = () => {
  recoveryModal.show();
};
