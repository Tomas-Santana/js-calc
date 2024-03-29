import './App.scss';
import React from 'react';


const buttons = [
  {
    id: 'clear',
    display: 'AC',
    value: 'clear',
  },
  {
    id: 'delete',
    display: 'D',
    value: 'delete', 
  },
  {
    id: 'divide',
    display: '/',
    value: '/',
  },
  {
    id: 'seven',
    display: 7,
    value: 7,
  },
  {
    id: 'eight',
    display: 8,
    value: 8,
  },
  {
    id: 'nine',
    display: 9,
    value: 9,
  },
  {
    id: 'multiply',
    display: 'x',
    value: '*',
  },
  {
    id: 'four',
    display: 4,
    value: 4,
  },
  {
    id: 'five',
    display: 5,
    value: 5,
  },
  {
    id: 'six',
    display: 6,
    value: 6,
  },
  {
    id: 'subtract',
    display: '-',
    value: '-',
  },
  {
    id: 'one',
    display: 1,
    value: 1,
  },
  {
    id: 'two',
    display: 2,
    value: 2,
  },
  {
    id: 'three',
    display: 3,
    value: 3,
  },
  {
    id: 'add',
    display: '+',
    value: '+',
  },
  {
    id: 'zero',
    display: 0,
    value: 0,
  },
  {
    id: 'decimal',
    display: '.',
    value: '.',
  },
  {
    id: 'equals',
    display: '=',
    value: '=',
  },
];
const operators = ['+', '-', '*', '/'];



function decimalPlaces(num) {
  var match = (''+num).match(/(?:\.(\d+))$/);
  if (!match) { return 0; }
  return Math.max(
       0,
       // Number of digits right of decimal point.
       (match[1] ? match[1].length : 0)
       // Adjust for scientific notation.
       - (match[2] ? +match[2] : 0));
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: '0',
      formula: '0',
      numbers: []
    }
    this.updateDisplay = this.updateDisplay.bind(this);
    this.handleDecimals = this.handleDecimals.bind(this);
    this.handleOperators = this.handleOperators.bind(this)
  }
  updateDisplay(value) {
    if (operators.includes(value)) {
      this.handleOperators(value);
      return;
    }
    if (value === 'clear') {
      this.setState({
        display: '0',
        numbers: [],
      })
    }
    else if (value === "delete") {
      if (this.state.display.toString().length === 1) {
        this.setState({
          display: '0',
          numbers: []
        })
      }
      else this.setState({
        display: this.state.display.slice(0,-1),
        numbers: this.state.display.split("+")
      })
    }
    else if (this.state.display === '0') {
      this.setState({
        display: value.toString(),
        numbers: this.state.display.split("+")
      })
    }
    else if (value === '.') {
      const lastIndex = this.state.numbers.length - 1;
      if (this.state.numbers[lastIndex].includes(".") || this.state.display.endsWith(".")) return;
      this.setState({
        display: this.state.display + value,
      })
    }
    else if (value === "=") {
      let result = eval(this.state.display).toString();
      if (decimalPlaces(result) > 6) {
        result = parseFloat(parseFloat(result).toFixed(6)).toString();
      }
      
      this.setState({
        display: result,
      })
      console.log(this.state.display)
    }
    else {
      this.setState({
      display: this.state.display + value.toString(),
      
      
    })
 
    }
    
  }
  
  handleOperators(value) {
    let lastChar = this.state.display.slice(-1);
    let slChar = this.state.display.slice(-2,-1);
    
    if (operators.includes(lastChar)) {
      if (lastChar === "-" && value === "-") {
        
        this.setState({
        display: this.state.display.slice(0,-1) + "+",
      })
      }
      else if (slChar === "*" || slChar === "/") {
        this.setState({
          display: this.state.display.slice(0,-2) + value,
        })
      }
      else if (lastChar === "+" && value === "-") {
        this.setState({
        display: this.state.display.slice(0,-1) + value,
      })
      }
      else if (value === "-") {
        this.setState({
        display: this.state.display + value,
      })
      }
      else this.setState({
        display: this.state.display.slice(0,-1) + value,
      })
    }
    else this.setState({display:this.state.display+value});
}
  handleDecimals(value) {
    return;
  }
  
  render() {
    // split on operators
    this.state.numbers = this.state.display.split(/[-+*/]/);
    return (
      <div id="calc-wrapper">
        <div id="displays">
          <div id="display"><h2 className='calc-text' id="display-text">{this.state.display}</h2></div>
        </div>
        <br/>
        <div id="buttons">
          {buttons.map(button => {
            return (
              <button className='button' onClick={() => this.updateDisplay(button.value)} key={button.id} id={button.id}>{button.display}</button>
            )
          })}
        </div>
      </div>
    )
  }
}

export default App;
