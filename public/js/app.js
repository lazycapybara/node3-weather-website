console.log('Client side JS file is loaded!');

// !!!!!!the first fetch does not work!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// See https://fr.javascript.info/fetch-api
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// fetch('http://puzzle.mead.io/puzzle', {mode:"no-cors", credentials: "same-origin" }).then( (response) => {
//     console.log(response)    
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');


// preventDefault forces the browser to NOT refresh the page
// after the form loads. that way we can see the result of the console.log below.
// Without thr call to the preventDefault function the result of
// the console.log below doesn't stay in the console.
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let location = search.value;

    messageOne.textContent = 'Loading ...';
    messageTwo.textContent = '';

// that fetch is working...curiouser and curiouser....
    fetch('/weather?address='+ location).then((response) => {
        response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = `${data.forecast.wdesc}/${data.forecast.temperature}/${data.forecast.feelslike}`;
        }
    })
})
});