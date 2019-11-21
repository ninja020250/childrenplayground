import { API, LEVEL_WARNING } from "../static/constant";
import { Alert, Col, Modal, Row } from "antd";
import React, { Component } from "react";

import {LineLoading} from '../common/LineLoading';
import firebase from "../common/firebase";
import { toStringDate } from "../common/utilities";

// Required for side-effects

export default class Stream extends Component {
  constructor(props) {
    super(props);
    this.state = { notifications: [], loading: true, video: {},  visible: false, row: {}};
  }
  showModal = (row) => {
    
    this.setState({
      visible: true,
      row: row,
    });
  };
  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  componentDidMount() {
    const firebaseRef = firebase.database().ref("notification");
    firebaseRef.on("value", snapshot => {
      var notifications = snapshot.val();
      var noti_arr = [];
      for (var i  in notifications) {
        var noti = notifications[i];
        for (var j in noti.agePredictions) {
          noti_arr.push({
            key: noti.imageId + j,
            age: noti.agePredictions[j].age,
            level_warning: noti.agePredictions[j].level_warning,
            createdTime: noti.createdTime,
            imageId: noti.imageId,
            imageLink:  noti.imageLink,
          });
        }
      }
      this.setState({
        notifications: Object.assign([], noti_arr.reverse())
      });
    });
  }
  render() {
    var { notifications, row } = this.state;
    var timeDescription = toStringDate(row.createdTime);
    // var dectectionDescription = getDetectDescription(ages);
    return (
      <Row>
         <Modal
          className="modal-zoomImage"
          title={`Số Hiệu Hình Ảnh: ${row.imageId}`}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="dl-col">
            <p>{`Chụp vào ${timeDescription}`}</p>
            {/* <p>{dectectionDescription}</p> */}
            <img key={row.imageId} alt="zoom" src={row.imageLink} className="" />
          </div>
        </Modal>
        <Col span={16}>
          <img className="frame-stream " src={API.GET_STREAM} alt="Streaming" />
        </Col>
        <Col span={8}>
        <h2><strong>Thông báo phát hiện</strong></h2>
          <div className="group-notification">
           {notifications.length === 0 && <LineLoading/>}
            {notifications.map((res, index) => {
              console.log(res);
              let type = "warning";
              if(res.level_warning === LEVEL_WARNING.MIDDLE){
                 type = "error";
              }
              return (
                <div key={`${res.key}-noti`} className="clickable"  onClick={() => {
                  this.showModal(res);
                }}>
                  <Alert
                    className="animated fadeInUp mt-1 "
                    message={`Phát hiện tuổi ${res.age}, mức độ: ${res.level_warning}\n vào lúc: ${res.createdTime}`}
                    type={type}
                   
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
