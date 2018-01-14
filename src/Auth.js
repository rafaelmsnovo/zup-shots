import React, { Component } from 'react';
import cookie from 'react-cookies';

class Auth extends Component {

  constructor(props) {
    super(props);
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const code = params.get('code');

    this.state = {
        request: {
          client_id: '204bbb5cd76683111d4c9a5d71c76f8ebca37a1ecc62255c92e1e189353bf5fe',
          client_secret: '40d33bb4d920b8bf0eab7f2b894b7c81d00ec7a29a09308d870bd30b28b1914b',
          code: code
        },
        loading: '',
    };

    this.getToken = this.getToken.bind(this);
  }

  getToken() {
    this.setState({ loading: 'Carregando.....'});

    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var targetUrl = 'https://dribbble.com/oauth/token';
    fetch(proxyUrl + targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.request)
      }).then(response => {
          if (response.ok) {
            response.json().then(json => {

              this.setState({ loading: ''});
              cookie.save('access_token', json.access_token, { path: '/' });
              this.props.history.push("/zup-shots/shots");

            });
          } else {
            this.setState({ loading: 'Erro ao autenticar com o dribbble, tente novamente!'});
          }
      }).catch(err => {
        this.setState({ loading: 'Erro ao autenticar com o dribbble, tente novamente!'});
      });
  }

  componentDidMount() {
    if(cookie.load('access_token')) {
      this.props.history.push("/zup-shots/shots");
    } else {
      this.getToken();
    }
  }

  render() {
    return (
      <div>
        {this.state.loading}
      </div>
    );
  }

}export default Auth;
