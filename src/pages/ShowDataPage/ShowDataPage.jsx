import React, { Component } from 'react';
import { requestToApi } from 'react-data-fetching';

class ShowDataPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user : [],
      post : [],
      email : '',
    }
  }
  componentWillMount () {
    this.getUser();
  }

  getUser = async () => {
    const response = await requestToApi(
      {
        url: 'https://jsonplaceholder.typicode.com/users',
        method: 'GET',
      }
    ).catch(err => console.log(err))
    this.setState({ user: response.data })
  }

  postUser = async () => {
    if ( this.state.email ) {

      const response = await requestToApi(
        {
          url: 'http://localhost:3003/posts',
          method: 'POST',
          body: {
            email: this.state.email,
          }
        }
      ).catch(err => console.log(err))
    }
    else {
      console.log('EMAIL IS NULL');
    }
  }

  handdleChange = (e) => {
    let value = e.target.value;
    this.setState({ email: value })
  }

  render () {
    console.log(this.state);
    return (
      <div>
        <h1>Show Data Page</h1>
        <input type="text" onChange={this.handdleChange} />
        <button type="submit" onClick={this.postUser}>123</button>
      </div>
    )
  }
}

// const queryUser = () => (

// );
export default ShowDataPage;