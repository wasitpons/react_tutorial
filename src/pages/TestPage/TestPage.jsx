import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import './TestPage.css';

class TestPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      TargetValue: 0,
      RandonValue: 0,
    }
  }

  renderAlert = () => (
    <Alert color="danger">
      This state over 10!!
    </Alert>
  );

  handdleClick = () => {
    this.setState({ age: this.state.age + 1})
  }

  render() {
    return (
      <div>
        { this.state.age > 10 ? this.renderAlert() : '' }
        <div className="Box">
          { Math.ceil(Math.random() * 100) % 10 }
        </div>
        <button type="button" onClick={this.handdleClick}>Counter</button>
      </div>
    );
  }
}

export default TestPage;