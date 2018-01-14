import React, { Component } from 'react';
import cookie from 'react-cookies';
import Shot from './Shot';

class Shots extends Component {

  constructor(props) {
    super(props);
    const search = props.location.search;
    const params = new URLSearchParams(search);

    const imgMode = params.get('imgMode');
    const searchShot = params.get('search');
    this.state = {
      access_token: cookie.load('access_token'),
      shots: [],
      imgMode: imgMode ? imgMode : 'teaser',
      loading: '',
      search: searchShot ? searchShot: '',
      searchField: ''
    }

    this.getShots = this.getShots.bind(this);
    this.search = this.search.bind(this);
    this.setSearchField = this.setSearchField.bind(this);
  }

  componentDidMount() {
    this.getShots();
  }

  setSearchField(e){
    this.setState({searchField: e.target.value});
  }

  search() {
    if(this.state.search !== '') {
      var shots = [];
      this.state.shots.map((shot, i) => {
        if(shot.title.indexOf(this.state.search) >= 0) {
          shots.push(shot);
        }
      });
      this.setState({ shots: shots});
    }
  }

  getShots() {
    this.setState({ loading: 'Carregando.....'});

    fetch('https://api.dribbble.com/v2/user/shots', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.state.access_token
      }
      }).then(response => {
          if (response.ok) {
            response.json().then(json => {
              this.setState({ loading: ''});
              var sample = JSON.parse(`[
                    {
                      "id" : 471756,
                      "title" :  "Sasquatch",
                      "description" : "<p>Quick, messy, five minute sketch of something that might become a fictional something.</p>",
                      "width" : 400,
                      "height" : 300,
                      "images" : {
                        "hidpi" : null,
                        "normal" :  "https://d13yacurqjgara.cloudfront.net/users/1/screenshots/471756/sasquatch.png",
                        "teaser" : "https://d13yacurqjgara.cloudfront.net/users/1/screenshots/471756/sasquatch_teaser.png"
                      },
                      "published_at" : "2012-03-15T01:52:33Z",
                      "updated_at" : "2012-03-15T02:12:57Z",
                      "html_url" : "https://dribbble.com/shots/471756-Sasquatch",
                      "animated" : false,
                      "tags" : [
                        "fiction",
                        "sasquatch",
                        "sketch",
                        "wip"
                      ],
                      "attachments" : [
                        {
                          "id" : 206165,
                          "url" : "https://d13yacurqjgara.cloudfront.net/users/1/screenshots/1412410/attachments/206165/weathered-ball-detail.jpg",
                          "thumbnail_url" : "https://d13yacurqjgara.cloudfront.net/users/1/screenshots/1412410/attachments/206165/thumbnail/weathered-ball-detail.jpg",
                          "size" : 116375,
                          "content_type" : "image/jpeg",
                          "created_at" : "2014-02-07T16:35:09Z"
                        }
                      ],
                      "projects" : [
                        {
                          "id" : 3,
                          "name" : "Web Standards Sherpa",
                          "description" : "I did visual design and art direction for this project, working with the <a href=\\"http://webstandards.org\\">Web Standards Project</a> and Microsoft.",
                          "shots_count" : 4,
                          "created_at" : "2011-04-14T03:43:47Z",
                          "updated_at" : "2012-04-04T22:39:53Z"
                        }
                      ],
                      "team" : {
                        "id" : 39,
                        "name" : "Dribbble",
                        "username" : "dribbble",
                        "html_url" : "https://dribbble.com/dribbble",
                        "avatar_url" : "https://d13yacurqjgara.cloudfront.net/users/39/avatars/normal/apple-flat-precomposed.png?1388527574",
                        "bio" : "Show and console.log(sample));tell for designers. This is Dribbble on Dribbble.",
                        "location" : "Salem, MA",
                        "links" : {
                          "web" : "http://dribbble.com",
                          "twitter" : "https://twitter.com/dribbble"
                        },
                        "type" : "Team",
                        "created_at" : "2009-08-18T18:34:31Z",
                        "updated_at" : "2014-02-14T22:32:11Z"
                      },
                      "low_profile" : false
                    }
                  ]`);
              var shots = sample.concat(sample, sample, sample, sample, sample);
              shots = shots.concat(json);
              this.setState({ shots: shots});
              this.search();
            });
          } else {
            this.setState({ loading: 'Erro ao carregar suas shots tente novamente!'});
          }
      }).catch(err => {
        this.setState({ loading: 'Erro ao carregar suas shots tente novamente!'});
      });
  }

  render() {
    return (
      <div>
        <div>
          <h3>Minhas Shots</h3>
          <div>
            tamanho: <a href="/zup-shots/shots?imgMode=teaser">pequeno</a> | <a href="/zup-shots/shots?imgMode=normal" >grande</a>
          </div>
          <div>
            buscar pelo título: <input type="text" value={this.state.searchField} onChange={this.setSearchField}/><a href={"/zup-shots/shots?search="+this.state.searchField}>OK</a>
          </div>
          <div className="App-borderTop"></div>
          <br />
            Suas shots aparecerao após os 6 Sasquatch de exemplos fixos, caso você tenha shots!
        </div>
        <div className="App-shots">
          {this.state.loading}
          {this.state.shots.map((shot, i) =>
            <Shot key={i} value={shot} img={this.state.imgMode}/>
          )}
        </div>
      </div>
    );
  }
}export default Shots;
