import { Button, Checkbox, Form, Icon, Input } from "antd";
import { Col, Row } from "antd";
import React, { Component } from "react";

import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { initUser } from "../store/action/userAction";

const LoginBackground = require("../static/imgs/loginBackground.jpg");

class Login extends Component {
  render() {
    var WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
      NormalLoginForm
    );
    return (
      <div className="">
        <Row>
          <Col span={16}>
            <div className="login-banner">
              {/* <img src={LoginBackground} /> */}
            </div>
          </Col>
          <Col span={8} className=" login-form-container">
            <WrappedNormalLoginForm initUser={this.props.initUser} {...this.props}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isRemember: false,
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    const { username, password, isRemember } = this.state;
    this.props.form.validateFields((err, values) => {
      var data = {
        username: username,
        password: password,
        isRemember: isRemember,
      };
      this.props.initUser(
        data,
        () => {
          this.props.history.push("/home")
        },
        () => {
          alert("invalid Username or password");
        }
      );
    });

    // e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log("Received values of form: ", values);
    //   }
    // });
  };

  handleInput = e => {
    var value = e.target.value;
    var name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  handleCheckbox = e =>{
    var value = e.target.checked;
    var name = e.target.name;
    this.setState({
      [name]: value
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {isRemember} = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form ">
        <h1 style={{ textAlign: "center" }}>HỆ THỐNG QUẢN LÝ CAMERA</h1>
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Vui lòng điền tên đang nhập!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Tên Đăng Nhập"
              name="username"
              onChange={this.handleInput}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Vui lòng điền mật khẩu!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Mật Khẩu"
              name="password"
              onChange={this.handleInput}
            />
          )}
        </Form.Item>
        <Form.Item>
          {/* {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: isRemember
          })(<Checkbox name="isRemember" onChange={this.handleCheckbox}></Checkbox>)}
          */}
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Đăng Nhập
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return{};
};

let mapDispatchToProps = dispatch => {
  return {
    initUser: bindActionCreators(initUser, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
