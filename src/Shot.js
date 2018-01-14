import React, { Component } from 'react';

class Shot extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shot: props.value,
      img: props.img,
      imgUrl: props.value.images.teaser
    }
  }

  componentDidMount() {
    if(this.state.img === 'normal'){
      this.setState({imgUrl: this.state.shot.images.normal})
    }
  }

  render() {
    return (
        <div>
          <div className="header"><b>{this.state.shot.title}</b></div>
          <div className="img"><img src={this.state.imgUrl} alt=""/></div>
          <div className="footer"><a href="">like indisponível v2 da api</a></div>
        </div>
    );
  }

}export default Shot;
