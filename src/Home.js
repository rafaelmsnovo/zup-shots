import React, { Component } from 'react';

class Home extends Component {

  constructor(props) {
    super(props);
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const code = params.get('code');

    this.state = {
        request: {
          code: code,
          client_id: '204bbb5cd76683111d4c9a5d71c76f8ebca37a1ecc62255c92e1e189353bf5fe',
          client_secret: '40d33bb4d920b8bf0eab7f2b894b7c81d00ec7a29a09308d870bd30b28b1914b'
        }
    };
  }

  componentDidMount() {
    console.log(JSON.stringify(this.state.request));
    fetch('https://dribbble.com/oauth/token', {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'    
      },
      mode: 'no-cors',
      body: JSON.stringify(this.state.request)
      }).then(response => {
          if (response.ok) {
            response.json().then(json => {
              console.log(json);
            });
          }
      }).then(function(data) {
          console.log('Error: ', data);
      });
  }



  render() {
    return (
      <div>
        teste home
        {this.state.code}
      </div>
    );
  }
}

export default Home;
