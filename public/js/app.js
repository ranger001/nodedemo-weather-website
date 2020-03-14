console.log('client side javascript file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const searchField = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchField.value  //get the input text box
    messageOne.textContent = 'Getting weather...'
    messageTwo.textContent = ''

    const url = 'http://localhost:3000/weather?address=' + location

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                //console.log(data.error)
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})