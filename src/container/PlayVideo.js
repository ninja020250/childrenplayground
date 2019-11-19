import React, { Component } from "react";

import { API } from "../static/constant";
import { LineLoading } from "../common/LineLoading";
import { Player } from "video-react";
import { httpService } from "../common/httpService";
import { toStringDate } from "../common/utilities";

export default class PlayVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      video: {}
    };
  }
  componentDidMount() {
    httpService.get(`${API.GET_VIDEO_LIST}${this.props.match.params.id}/`).then(res => {
      this.setState({
        loading: false,
        video: res.data
      });
      
    });
  }
  render() {
      var {videoLink, createdTime} =  this.state.video;
    return (
      <div>
        {this.state.loading ? <LineLoading /> :  
        <div>
  <h1>Video được ghi lại từ {toStringDate(createdTime)}</h1>
            <Player>
          <source src={videoLink} />
        </Player>
        </div>
        }
        
      </div>
    );
  }
}
