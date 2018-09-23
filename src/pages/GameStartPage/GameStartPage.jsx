import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import { map } from 'lodash';
import { Fetch, requestToApi } from 'react-data-fetching';
import Box from './components/Box';
import whitePlayerLogo from './images/whitePlayer.png';
import blackPlayerLogo from './images/blackPlayer.svg';
import './GameStartPage.css';

class GameStartPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      randomValue: this.randomNumber(),
      targetValue: this.randomNumber(),
      currentPlayer: 1,
      players : [ 0, 100, 100 ],
    }
  }

  
  renderContent = ({ error, data }) => {
    console.log(data);
    //return error ? (<h1>error</h1>) : '';
  }
  randomNumber = () => (
    Math.ceil(Math.random() * 100) % 10
  );
  
  addMoney = (money) => {
    let players = [...this.state.players];
    players[this.state.currentPlayer] += money;
    this.setState({ players });
  }

  handdleClick = (predict) => {
    if(predict === 'high' && this.state.randomValue > this.state.targetValue) {
      this.addMoney(20);
    }
    else if(predict === 'low' && this.state.randomValue < this.state.targetValue) {
      this.addMoney(20);
    }
    else if(predict === 'eq' && this.state.randomValue === this.state.targetValue) {
      this.addMoney(100);
    }
    else {
      this.addMoney(-20);
    }
    this.setState( prevState => ({
      currentPlayer: prevState.currentPlayer === 1 ? 2 : 1,
      randomValue: this.randomNumber(),
      targetValue: this.randomNumber(),
    }))
  }
  
  async postData() {
    console.log('postData');
    const apiResponse = await requestToApi({
      url: 'http://localhost:3003/posts',
      method: 'GET',
    }).catch( err => console.log(err));
    
    console.log(apiResponse);
  }

  renderPlayerStatus = () => (
    <Row>
      <Col md={{ size: 2, offset: 1 }}>
        <img src={whitePlayerLogo} alt="whitePlayer" className="playerLogo" />
        <span className="playerMoneyOne"> { this.state.players[1] } </span>
      </Col>
      <Col md={{ size: 2, offset: 6 }}>
        <span className="playerMoneyTwo"> { this.state.players[2] } </span>
        <img src={blackPlayerLogo} alt="whitePlayer" className="playerLogo" />
      </Col>
    </Row>
  );

  renderRandomNumberBox = () => (
    <Row>
      <Col md={{ size: 3, offset: 4}} className="Box">
        <span className="randomValue">{ this.state.randomValue }</span>
      </Col>
    </Row>
  )

  renderButton = () => (
    <Row>
      <Col md={{ size: 3, offset: 4}} className="ButtonGroup">
        <Button color="success" onClick={() => this.handdleClick('high')}>High</Button>
        <Button style={{marginLeft: 20}} onClick={() => this.handdleClick('low')}>Equal</Button>
        <Button color="danger" style={{marginLeft: 20}} onClick={() => this.handdleClick('eq')}>Low</Button>
      </Col>
    </Row>
  );

  render() {
    console.log(this.props);
    return (
      <div>
        {this.renderPlayerStatus()}
        {this.renderRandomNumberBox()}
        {this.renderButton()}
        {
          map(this.props.userData, data => <h1 key={data.name}>{data.name}</h1>)
        }
        <Box title={this.state.randomValue} />
        <button onClick={this.postData} type="submit">Submit</button>
      </div>
    );
  }
}

// map
/*
  map( data, function)
*/
const queryUser = WrappedComponent => props => (
  <Fetch 
    url="https://jsonplaceholder.typicode.com/users"
    loader={() => <h1>Loading...</h1>}
  >
    {
      ({ data }) => (
        <WrappedComponent
          {...props}
          userData={data}
        />
      )
    }
  </Fetch>
)

// props
/*
    [
      title : {},
      postfix : {},
    ]
*/

// ...props
/*
    title : {},
    postfix : {}
*/

export default queryUser(GameStartPage);