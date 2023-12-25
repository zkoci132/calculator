
const calculator = document.querySelector('.calculator')
let firstOp = true;
let displayArr = ['','',''];
//let left = true;
//let rhs;
//let op;
let result;
let firstRun = true;
//let eqPressed = false;
let inNum = true;
let addedDec = false;



main()

function main(){
    buildButtons();
    
    
}

function buildButtons(){
    if(displayArr[1] === ''){
        let numButton = document.querySelectorAll('.numButton');
        let opButton = document.querySelectorAll('.mathButton');
        let screen = document.querySelector('.screen');
        let eqButton = document.querySelector('.equals');
        let clearButton = document.querySelector('.clearButton');
        let decimalButton = document.querySelector('.decimal')
        let backspaceButton = document.querySelector('.backspaceButton');
        let plusMinusButton = document.querySelector('.plusMinusButton');

        plusMinusButton.addEventListener('click',()=>{
            console.log(screen.firstChild.nodeValue)
            if(firstOp === true){
                if(screen.firstChild.nodeValue !== '-'){
                    let minusSign = document.createTextNode('-');
                    screen.insertBefore(minusSign,screen.firstChild);
                    displayArr[0] = "-" + displayArr[0]  
                    console.log(displayArr)
                }
                else{
                    screen.removeChild(screen.firstChild)
                    displayArr[0] = displayArr[0].substring(1,displayArr[0].length);
                    console.log(displayArr)
                }
            }
            else{
                if(screen.firstChild.nodeValue !== '-'){
                    let minusSign = document.createTextNode('-');
                    screen.insertBefore(minusSign,screen.firstChild);
                    displayArr[2] = "-" + displayArr[2]  
                    console.log(displayArr)
                }
                else{
                    screen.removeChild(screen.firstChild)
                    displayArr[2] = displayArr[2].substring(1,displayArr[2].length);
                    console.log(displayArr)
                }

            }
            
        })

        backspaceButton.addEventListener('click',()=>{
            if(firstOp === true && displayArr[0] !== ''){
                if(displayArr[0].slice(-1) === '.'){
                    addedDec = false;
                }
                displayArr[0] = displayArr[0].substring(0,displayArr[0].length-1);
                screen.removeChild(screen.lastChild);
            }
            else if(firstOp !== true && displayArr[2] !== ''){
                if(displayArr[2].slice(-1) === '.'){
                    addedDec = false;
                }
                displayArr[2] = displayArr[2].slice(0,-1);
                screen.removeChild(screen.lastChild);
            }
        })

        numButton.forEach(function(bttn,idx){
            bttn.addEventListener('click',()=>{
                if(firstOp === true){
                    let newNumber = document.createTextNode(bttn.textContent)
                    displayArr[0] += bttn.textContent
                    screen.appendChild(newNumber)
                    console.log(displayArr)  
                }
                else{

                    if(inNum === false){
                        for (let i = 0; i < displayArr[0].length; i++) {
                            if(screen.firstChild === null){
                                continue
                            }
                            else{
                                screen.removeChild(screen.firstChild);
                            }
                            
                        }
                        inNum = true;
                    }

                    let currNum = bttn.textContent;
                
                    displayArr[2] += currNum;
                    let newNumber = document.createTextNode(currNum);
                    screen.appendChild(newNumber);
                    console.log(displayArr);
                }
            })
        })
        

        opButton.forEach(function(bttn,idx){
            bttn.addEventListener('click',()=>{
                inNum = false;
                addedDec = false;
              
                
                if(firstOp === true){
                   
                    displayArr[1] = bttn.textContent;
                    console.log(displayArr)
                    firstOp = false;
                }
                else{
                    if(displayArr[2]!== ''){
                        getValue(screen)
                    }
                    displayArr[1] = bttn.textContent;
                }
            })
        })
        eqButton.addEventListener('click',()=>{
            for (let i = 0; i < displayArr[0].length; i++) {
                if(screen.firstChild === null){
                    continue
                }
                else{
                    screen.removeChild(screen.firstChild);
                }
                
            }
            getValue(screen);
        })

        clearButton.addEventListener('click',()=>{
            for (let i = 0; i < displayArr[0].length; i++) {
                if(screen.firstChild === null){
                    continue
                }
                else{
                    screen.removeChild(screen.firstChild);
                }
                
            }
            displayArr[0] = '';
            displayArr[1] = '';
            displayArr[2] = '';
            firstOp = true;
            addedDec = false;
            console.log(displayArr);
        })

        decimalButton.addEventListener('click',()=>{
            if(firstOp === true && addedDec === false){
                addedDec = true;
                screen.appendChild(document.createTextNode('.'))
                displayArr[0] += '.';
            }
            else if(firstOp !== true && addedDec === false){
                addedDec = true;
                screen.appendChild(document.createTextNode('.'))
                displayArr[2] += '.';
            }
            else{
                console.log("Can only add one decimal")
            }
        })
        
    }
}


function getValue(screen){
    if(displayArr[0] === ''){
        displayArr[0] = '0'
    }
    if(displayArr[2] === ''){
        displayArr[2] = '0'
    }
    if(displayArr[0]!== '' && displayArr[1]!== '' && displayArr[2]!== ''){
      
        lhs = parseFloat(displayArr[0]);
        rhs = parseFloat(displayArr[2]);
        result = operate(lhs, displayArr[1], rhs);

        for (let i = 0; i < displayArr[2].length; i++) {
            if(screen.firstChild === null){
                continue
            }
            else{
                screen.removeChild(screen.firstChild);
            }
            
        }

        let resultNumber = document.createTextNode(String(result));
        screen.appendChild(resultNumber);
        console.log(result);

        displayArr[0] = "";
        displayArr[1] = "";
        displayArr[2] = "";
        displayArr[0] = String(result);
    }
}


function add(num1,num2){
    return num1 + num2
}


function sub(num1,num2){
    return num1 - num2
}


function mult(num1,num2){
    return num1 * num2
}


function div(num1,num2){
    return num1/num2
}


function operate(lhs,op,rhs){
    let num1 = parseFloat(lhs);
    let num2 = parseFloat(rhs);
    let operator = op
    switch(operator){
        case ' + ':
            return add(num1,num2);
        case ' - ':
            return sub(num1,num2);
        case ' * ':
            return mult(num1,num2);
        case ' / ':
            return div(num1,num2);
    }
}


