import logo from './logo.svg';
import './App.scss';
import React from 'react';


const buttons = [
  {
    id: 'clear',
    value: 'AC',
  },
  {
    id: 'delete',
    value: <i className="fa-solid fa-delete-left"></i>, 
  },
  {
    id: 'divide',
    value: '/',
  },
  {
    id: 'seven',
    value: 7,
  },
  {
    id: 'eight',
    value: 8,
  },
  {
    id: 'nine',
    value: 9,
  },
  {
    id: 'multiply',
    value: '*',
  },
  {
    id: 'four',
    value: 4,
  },
  {
    id: 'five',
    value: 5,
  },
  {
    id: 'six',
    value: 6,
  },
  {
    id: 'subtract',
    value: '-',
  },
  {
    id: 'one',
    value: 1,
  },
  {
    id: 'two',
    value: 2,
  },
  {
    id: 'three',
    value: 3,
  },
  {
    id: 'add',
    value: '+',
  },
  {
    id: 'zero',
    value: 0,
  },
  {
    id: 'decimal',
    value: '.',
  },
  {
    id: 'equals',
    value: '=',
  },
];

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: '0',
    }
    this.updateDisplay = this.updateDisplay.bind(this);
  }
  updateDisplay(value){
    if (value === 'AC'){
      this.setState({
        display: '0',
      })
    }
    else if (value === '='){
      this.setState({
        display: eval(this.state.display),
      })
    }
    else if (this.state.display === '0'){
      this.setState({
        display: String(value),
      })
    }
    else if (value ===  <i className="fa-solid fa-delete-left"></i>) {
      this.setState({
        display: this.state.display.slice(0, -1),
      })
    }
    else {
      this.setState({
        display: this.state.display + String(value),
      })
    }
  }
  render() {
    return (
      <div id="calc-wrapper">
        <div id="display"><h2 id="display-text">{this.state.display}</h2></div>
        <br/>
        <div id="buttons">
          {buttons.map(button => {
            return (
              <button onClick={() => this.updateDisplay(button.value)} key={button.id} id={button.id}>{button.value}</button>
            )
          })}
        </div>

      </div>
    )
  }
}

export default App;
