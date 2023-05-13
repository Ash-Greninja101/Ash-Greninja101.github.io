const forms = document.querySelectorAll(".needs-validation");
const closing_btns = document.querySelectorAll(".modal-closer");
const inputs = document.getElementsByClassName("form-control");
const registeredModal = new bootstrap.Modal("#registered-modal");
let bodyText = document.getElementById("body-text");
let background = document.getElementById("background");
let submitter = document.getElementById("submitter");
let homeBtn = document.getElementById("home-link");

Array.from(forms).forEach((form) => {
  form.addEventListener(
    "submit",
    (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        event.stopPropagation();
        bodyText.innerHTML =
          "Thanks " +
          inputs[0].value +
          " for registering. We will get back to you in 24 to 48 hours";
        registeredModal.show();
      }

      form.classList.add("was-validated");
    },
    false
  );
});

Array.from(closing_btns).forEach((closing_btn) => {
  closing_btn.onclick = () => {
    homeBtn.click();
    // window.location.href = 
  };
});
window.addEventListener("DOMContentLoaded", () => {
  // getModal.show();
});
