import { Button, Card, Icon, List } from "antd";
import React, { Component } from "react";

const data = [
  {
    icon: "file-image",
    title: "Danh Sách Hình Ảnh",
    description:
      "Danh sách hình ảnh những người quá độ tuổi quy định đã vào khu vui chơi trẻ em trong chung cư.",
    router: "/home/images",
    keyrender: "1"
  },
  {
    icon: "database",
    title: "Danh Sách Video Đã Lưu",
    description:
      "Danh sách những video đã được ghi lại trước đó. bạn có thể xem lại video bằng cách bấm vào nút xem video ở video đó",
    router: "/home/videos",
    keyrender: "2"
  },

  {
    icon: "video-camera",
    title: "Camera Quan Sát",
    description:
      "Hệ thống quan sát và thông báo khu vực vui chơi trẻ em thông qua camera đã lắp đặt sẵn.",
    router: "/home/stream",
    keyrender: "3"
  },
  {
    icon: "question-circle",
    title: "Hướng dẫn sử dụng",
    description:
      "Nếu đay là lần đầu bạn sử dụng hệ thống, vui lòng đọc hướng dẫn sử dụng tại đây.",
    router: "/home/tutorial",
    keyrender: "4"
  }
];

export default class LandingPage extends Component {
  navigate = router => {
    this.props.history.push(router);
  };
  render() {
    return (
      <div className="content-wrapper">
        <List
        className="landingpage-container"
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Card title={item.title} className="card-landing-custom">
              <Icon type={item.icon} />
                <p>{item.description}</p>
                <Button type="primary" onClick={()=>this.navigate(item.router)}>
                  Chuyển Đến
                </Button>
              </Card>
            </List.Item>
          )}
        />
        ,
      </div>
    );
  }
}
