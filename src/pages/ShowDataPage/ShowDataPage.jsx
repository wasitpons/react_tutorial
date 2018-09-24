import React, { Component } from 'react';
import classnames from 'classnames';
import { Nav, NavItem, NavLink, TabContent, TabPane, Col, Row, InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import { Fetch, requestToApi } from 'react-data-fetching';
import Header from './components/Header';
import GradingTable from './components/GradingTable';
import './ShowDataPage.css';

class ShowDataPage extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      studentData: this.props.studentData,
      name: '',
      score: 0,
    };
  }

  handdleStudent = (e) => {
    this.setState({ name: e.target.value })
  }

  handdleScore = (e) => {
    this.setState({ score: e.target.value })
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  postData = async () => {
    if(this.state.name && this.state.score)
    {
        await requestToApi({
        url: 'http://localhost:3003/students',
        method: 'POST',
        body: {
          name: this.state.name,
          score: this.state.score,
        },
      }).catch(err => console.log(err));
      
      let studentArr = this.state.studentData;
      studentArr.push({ name: this.state.name, score: this.state.score})
      this.setState(pervState => ({ ...pervState, studentData: studentArr}))
      
    }
    
  }

  renderInitNavbarMenu = () => (
    <Nav tabs>
      <NavItem>
        <NavLink
          className={classnames({ active: this.state.activeTab === '1' })}
          onClick={() => { this.toggle('1'); }}
        >
          Overview
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: this.state.activeTab === '2' })}
          onClick={() => { this.toggle('2'); }}
        >
          Chart
        </NavLink>
      </NavItem>
    </Nav>
  )

  render () {
    return (
      <div>
        <Header />
        <Row>
          <Col md={{ size: 8, offset: 2}}>
            { this.renderInitNavbarMenu() }
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2}}>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <GradingTable studentData={this.state.studentData} />
                    <InputGroup size="lg" className="inputBox">
                      <InputGroupAddon addonType="prepend">Student Name</InputGroupAddon>
                      <Input onChange={this.handdleStudent} />
                    </InputGroup>
                    <InputGroup size="lg" className="inputBox">
                      <InputGroupAddon addonType="prepend">Score</InputGroupAddon>
                      <Input onChange={this.handdleScore} />
                    </InputGroup>
                    <Button className="submitButton" color="primary" onClick={this.postData}>Add</Button>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <h4>Chart</h4>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </div>
    )
  }
}

const queryStudents = WrappedComponent => props => (
  <Fetch
    url="http://localhost:3003/students"
    loading={() => console.log("Loading...")}
  >
    {
      ({data}) => (
        <WrappedComponent
          {...props}
          studentData={data}
        />
      )
    }
  </Fetch>
);

export default queryStudents(ShowDataPage);