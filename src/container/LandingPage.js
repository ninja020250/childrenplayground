import { Button, Card, List } from "antd";
import React, { Component } from "react";

const data = [
  {
    title: "Danh Sách Hình Ảnh",
    description:
      "Danh sách hình ảnh những người quá độ tuổi quy định đã vào khu vui chơi trẻ em trong chung cư.",
    router: "/home/images",
    keyrender: "1"
  },
  {
    title: "Danh Sách Video Đã Lưu",
    description:
      "Danh sách những video đã được ghi lại trước đó. bạn có thể xem lại video bằng cách bấm vào nút xem video ở video đó",
    router: "/home/videos",
    keyrender: "2"
  },

  {
    title: "Camera Quan Sát",
    description:
      "Hệ thống quan sát và thông báo khu vực vui chơi trẻ em thông qua camera đã lắp đặt sẵn.",
    router: "/home/stream",
    keyrender: "3"
  },
  {
    title: "Title 4"
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
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Card title={item.title} className="card-landing-custom">
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
