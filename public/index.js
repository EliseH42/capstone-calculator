const numberBtns = document.querySelectorAll('.number')
const functionBtns = document.querySelectorAll('.function')
const equalsBtn = document.getElementById('equals')
const backspaceBtn = document.getElementById('backspace')
const clearBtn = document.getElementById('clear')



baseURL = "http://localhost:4444"


function equals () {
    let currentVal = document.querySelector('.current-number').innerText
    if (currentVal.includes("+")){
        let index = currentVal.indexOf("+")
        let num1 = currentVal.slice(0,(index))
        let num2 = currentVal.slice(index+1,currentVal.length)
        axios.get(`${baseURL}/add/${num1}/${num2}`)
        .then((res) =>{
            let equation = `${currentVal}=${res.data}`
            updateResults(res.data)
            addHistory(equation)
        })
        .catch(err => console.log(err))
    }else if (currentVal.includes("-")){
        let index = currentVal.indexOf("-")
        let num1 = currentVal.slice(0,(index))
        let num2 = currentVal.slice(index+1,currentVal.length)

        axios.get(`${baseURL}/subtract/${num1}/${num2}`)
        .then((res) =>{
            let equation = `${currentVal}=${res.data}`
            updateResults(res.data)
            addHistory(equation)
        })
        .catch(err => console.log(err))
    }else if (currentVal.includes("x")){
        let index = currentVal.indexOf("x")
        let num1 = currentVal.slice(0,(index))
        let num2 = currentVal.slice(index+1,currentVal.length)

        axios.get(`${baseURL}/multiply/${num1}/${num2}`)
        .then((res) =>{
            let equation = `${currentVal}=${res.data}`
            updateResults(res.data)
            addHistory(equation)
        })
        .catch(err => console.log(err))
    }else if (currentVal.includes("÷")){
        let index = currentVal.indexOf("÷")
        let num1 = currentVal.slice(0,(index))
        let num2 = currentVal.slice(index+1,currentVal.length)
        
        axios.get(`${baseURL}/divide/${num1}/${num2}`)
        .then((res) =>{
            let equation = `${currentVal}=${res.data}`
            updateResults(res.data)
            addHistory(equation)
        })
        .catch(err => console.log(err))
    }
}

function addHistory (equation) {
    axios.post(baseURL+"/addHistory",{equation})
    .then((res) => {
        renderHistory(res.data)
    })
    .catch
}

function renderHistory(historyArr){
    const historyContainer = document.querySelector("#history-container")
    historyContainer.innerHTML = ''
    for(i=0;i<historyArr.length;i++){
        let {equation, ID} = historyArr[i]
        creatHistoryCard(equation, ID)
    }
}

function creatHistoryCard (equation, ID) {
const historyCard = document.createElement('li')
historyCard.innerHTML = `${equation}
    <button onclick="deleteHistory(${ID})">X</button>
`
const historyContainer = document.querySelector("#history-container")
historyContainer.appendChild(historyCard)
ID++
}


function deleteHistory(ID) {

    axios.delete(`${baseURL}/delete/${ID}`)
    .then(response => {
        renderHistory(response.data)
    })
}

function updateResults (result) {
    document.querySelector('.current-number').innerHTML = result
}


function appendNumber (number) {
    let currentVal = document.querySelector('.current-number').innerText
    if (currentVal === "0"){
        currentVal =""
    }
    currentVal = currentVal+number
    document.querySelector('.current-number').innerText = currentVal
}

function appendfunction (operator) {
    let currentVal = document.querySelector('.current-number').innerText

    currentVal = currentVal+operator
    document.querySelector('.current-number').innerText = currentVal
}

function backspace () {
    let currentVal = document.querySelector('.current-number').innerText
    currentVal = currentVal.slice(0,(currentVal.length-1))
    document.querySelector('.current-number').innerText = currentVal
}

function clear () {
    document.querySelector('.current-number').innerText = "0"
}


numberBtns.forEach(button => {
    button.addEventListener("click",function(){appendNumber(button.innerText)
    })
})

functionBtns.forEach(button => {
    button.addEventListener("click",function(){appendfunction(button.innerText)
    })
})

backspaceBtn.addEventListener("click",function(){backspace()})
clearBtn.addEventListener("click",function(){clear()})

equalsBtn.addEventListener("click",function(){equals()})
