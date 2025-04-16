function Random(){
let number = Math.random() *100;
return <h4 style={{'background-color':'#989881'}}>Random Number is: {Math.round(number)}</h4>

}

export default Random;