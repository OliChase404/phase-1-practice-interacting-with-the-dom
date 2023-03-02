const counter = document.getElementById('counter')
const minusBtn = document.getElementById('minus')
const plusBtn = document.getElementById('plus')
const heartBtn = document.getElementById('heart')
const pauseBtn = document.getElementById('pause')
const commentSection = document.getElementById('list')
const commentForm = document.getElementById('comment-form')
const commentInput = document.getElementById('comment-input')
const likesList = document.getElementsByClassName('likes')
const hyperDrive = document.getElementById('hyperDrive')

const restartBtn = document.getElementById('restart')
restartBtn.addEventListener('click', restartBtnEvents)
restartBtn.classList.add('hidden')

const previousLikes = {}

let counterValue = 0
let pauseBtnIsClicked = true
let hyperDriveActivated = false
let count
let hyperCount

commentForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const newComment = document.createElement('li')
    newComment.textContent = commentInput.value
    commentSection.appendChild(newComment)
    commentInput.value = null
})

document.addEventListener('DOMContentLoaded', () => pauseBtn.click())

pauseBtn.addEventListener('click', () => {
    pauseBtnIsClicked = !pauseBtnIsClicked
    if(!pauseBtnIsClicked){
        count = setInterval(incrementCounterValue, 1000)
        pauseBtn.innerText = ('Pause')
        minusBtn.addEventListener('click', minusBtnEvents)
        plusBtn.addEventListener('click', plusBtnEvents)
        heartBtn.addEventListener('click', heartBtnEvents)
        hyperDrive.addEventListener('click', hyperDriveEvents)
        restartBtn.classList.add('hidden')
    }else if (pauseBtnIsClicked){
        clearInterval(count)
        pauseBtn.innerText = ('Resume')
        minusBtn.removeEventListener('click', minusBtnEvents)
        plusBtn.removeEventListener('click', plusBtnEvents)
        heartBtn.removeEventListener('click', heartBtnEvents)
        hyperDrive.removeEventListener('click', hyperDriveEvents)
        restartBtn.classList.remove('hidden')
    } else {console.error('ERROR in pauseBtn Event Handler')}
})


function incrementCounterValue(){
    counterValue += 1
    counter.innerText = counterValue
}

function restartBtnEvents(){
    counterValue = 0
    counter.innerText = counterValue
    pauseBtn.click()
}

function minusBtnEvents(){
    counterValue -= 1
    counter.innerText = counterValue
}

function plusBtnEvents(){
    counterValue += 1
    counter.innerText = counterValue
}

function heartBtnEvents(){
    if(Object.entries(previousLikes).find(([key]) => key == counterValue)){
        previousLikes[counterValue] += 1
        newLike = document.createElement('li')
        newLike.innerText = (`${counterValue} has been liked ${previousLikes[counterValue]} times`)
        likesList[0].appendChild(newLike)
    } else {
        newLike = document.createElement('li')
        previousLikes[counterValue] = 1
        newLike.innerText = (`${counterValue} has been liked ${previousLikes[counterValue]} times`)
        likesList[0].appendChild(newLike)
    }
    
}

function hyperDriveEvents(){
    hyperDriveActivated = !hyperDriveActivated
    if(hyperDriveActivated){
        hyperCount = setInterval(incrementCounterValue, 1)
        hyperDrive.innerText = ('Ok, that\'s enough.')
    }else{
        clearInterval(hyperCount)
        hyperDrive.innerText = ('Hyper Drive!')
    }  
}