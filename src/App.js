import logo1 from './passminatorT300.png';
import './App.css';
import React, { useState} from "react";

function App() {
  const [checked, setChecked] = useState(true);
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(true);
  const [pass, setPass] = useState('*****');
  const [inputOne, setInputOne] = useState(12);
  
  function handleChange() {
    setChecked(!checked); 
    }
    function handleChange1() {
      setChecked1(!checked1); 
      }
      function handleChange2() {
        setChecked2(!checked2); 
        }


function handleSubmit(e) {
  e.preventDefault();
  document.querySelector('.CopyToClip').innerHTML = ''
  function gen_password(inputOne){
    if(isNaN(parseFloat(inputOne)) && !isFinite(inputOne)) return setPass('введите число');
    if(isNaN(Math.trunc(inputOne))) return setPass('введите число ;)');
    if(inputOne[0] == '-' ) return setPass('введите положительное число');
    if( inputOne[0] == '+' ) return setPass('введите число');
    
    let password = "";
    let a = "";
    if(checked1){
      a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    }
    let b = "";
    if(checked){
      b = "0123456789";
    }
    let c = "";
    if(checked2){
      c = "!№;%:?*()_+=";
    }
    let symbols = `${a}${b}${c}`;
    if(symbols.length === 0) return  setPass('задайте условия!')
    if(inputOne == 0 || inputOne === '') return  setPass('проверьте длину пароля')
    for (let i = 0; i < inputOne; i++){
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));     
    }
    setInputOne(inputOne);
    return setPass(password);
}
gen_password(inputOne)
}
const handleKeyDown = event => {
 
  if (event.key === 'Enter') {
   
    handleSubmit(event)
  }
};

const handleSelect = (e) => {
  e.target.select();
};
let flag = '*****'
const useCopyToClipboard = (e) => {
  const el = e.target;
  if(el.innerHTML == flag ) return 0

  navigator.clipboard.writeText(el.innerHTML)
  .then(() => {  
      if(document.querySelector('.CopyToClip').innerHTML == 'скопировано'){
        document.querySelector('.CopyToClip').innerHTML = ''
      }else{
        document.querySelector('.CopyToClip').innerHTML += 'скопировано'
      }
  })
  .catch(err =>{
    console.log(err);
  })
  flag = el.innerHTML
};
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo1} className="App-logo" alt="logo" />
        <p className="Pass">
          PASSMINATOR
        </p>
        <p>Задайте условия для надежного пароля:</p>
        <div  className="cond">
        <div className="checkbox">
    <label className="custom-checkbox">
      <input type="checkbox" checked={checked} onChange={handleChange}  />
      <span>цифры</span>
    </label>
  </div>
  <div className="checkbox">
    <label className="custom-checkbox">
      <input type="checkbox" checked={checked1} onChange={handleChange1}/>
      <span>буквы</span>
    </label>
  </div>
  <div className="checkbox2">
    <label className="custom-checkbox">
      <input type="checkbox" checked={checked2} onChange={handleChange2}/>
      <span>символы</span>
    </label>
  </div>
        </div>
        <div  className="cond t">
        <p>Длина пароля:</p>
        <input  type="text"
    name='input1' 
    value={inputOne} 
    onChange={(e) => setInputOne(e.target.value)}
    onKeyDown={handleKeyDown}
    onClick={handleSelect} 
    />
      </div>
      
        <div className='Passcopy' onClick={useCopyToClipboard}>{pass}</div>
        <div className='CopyToClip'></div>
        <button className="btn third" onClick={handleSubmit}>СОЗДАТЬ ПАРОЛЬ</button>
      </header>
     
    </div>
  );
}

export default App;
