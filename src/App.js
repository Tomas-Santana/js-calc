import logo from './logo.svg';
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
    display: <i className="fa-solid fa-delete-left"></i>,
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
    display: 'X',
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

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: '0',
      result: '0',
    }
    this.updateDisplay = this.updateDisplay.bind(this);
  }
  updateDisplay(value){
    if (value === 'clear'){
      this.setState({
        display: '0',
        result: '0',
      })
    }
    else if (value === 'delete') {
      if (this.state.display.length > 1){
        this.setState({
          display: this.state.display.slice(0, -1),
        })
      }
      else {
        this.setState({
          display: '0',
        })
      }

    }
    else if (value === '=') {
      this.setState({
        result: eval(this.state.display),
        display: eval(this.state.display),
      })
    }
    else if (this.state.display === '0') {
      this.setState({
        display: value,
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
        <div id="displays">
          <div id="display"><h2 className='calc-text' id="display-text">{this.state.display}</h2></div>
          <h2 className='calc-text' id="result-text">{this.state.result}</h2>
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
