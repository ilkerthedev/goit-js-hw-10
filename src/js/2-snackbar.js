import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const myForm = document.querySelector(".form");
const formInput = document.querySelector('input[name="delay"]');
const fulfilledInput = document.querySelector('input[value="fulfilled"]');
const rejectedInput = document.querySelector('input[value="rejected"]');

myForm.addEventListener('submit', formSubm);
function formSubm(event) {
    event.preventDefault()
    const userDelay = formInput.value;
   const btnState = event.currentTarget.elements.state.value;

new Promise((resolve, reject) => {
    setTimeout(() => {
        if (btnState === "fulfilled") {
        resolve(userDelay);
      } else {
        reject(userDelay);
      }
    }, userDelay);
  })
.then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
.catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
}