let clacWindow = document.getElementById('result');
let mainClac = document.querySelector(".main-Calculator");
let mainClacHead = document.querySelector(".main-Calculator .header h1");
let mode = document.getElementById('mode');
let res=null;
function input(val){
    if (!clacWindow.value ) {
        clacWindow.value = "";
    }
    clacWindow.value += val;
}
function calculate() {
    const res = eval(clacWindow.value || null);
    if (isNaN(res)) {
        clacWindow.value = "Math Error :(";
        setTimeout(() => {
            clacWindow.value = "";
        }, 3300);
    }
    else clacWindow.value = res;
}
// (%) precent
function precent(){
    clacWindow.value /=100;
}
// clear - (AC)
function clearAll(){
    output1 = "";
    clacWindow.value ="";
}
//  Change Theme function
mode.onclick = function(){
    if(mode.innerHTML=='Light'){
        mode.innerHTML='Dark';
        document.body.style.backgroundColor ='#fff';
        mainClac.style.backgroundColor = '#eee';
        mainClacHead.style.color= '#000';
    }
    else {
        mode.innerHTML = 'Light';
        document.body.style.backgroundColor ='#1e1e1e';
        mainClac.style.backgroundColor = '#161515';
        mainClacHead.style.color= '#fff';
    }
}