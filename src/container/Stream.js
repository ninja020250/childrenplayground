import { Alert, Col, Row } from "antd";
import React, { Component } from "react";

import { API } from "../static/constant";
import firebase from "../common/firebase";

// Required for side-effects

export default class Stream extends Component {
  constructor(props) {
    super(props);
    this.state = { notifications: [] };
  }
  componentDidMount() {
    const firebaseRef = firebase.database().ref("notification");
    firebaseRef.on("value", snapshot => {
      var notifications = snapshot.val();
      this.setState({
        notifications: Object.assign([], notifications)
      });
    });
  }
  render() {
    return (
      <Row>
        <Col span={16}><img src={API.GET_STREAM} alt="Streaming"/></Col>
        <Col span={8}>
          <div className="group-notification">
            <h2>Thông báo phát hiện</h2>
            {this.state.notifications.map((res, index) => {
              return (
                <div key={`${index}-noti`}>
                  <Alert
                    className="animated fadeInUp"
                    message={`Phát hiện tuổi ${res.age}, mức độ: ${res.level_warning} vào lúc: ${res.timeCreated}`}
                    type="error"
                  >
                    <br />
                  </Alert>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    );
  }
}
