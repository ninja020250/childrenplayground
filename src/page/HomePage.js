import { Icon, Menu, Tag } from "antd";
import { ImageList, Stream } from "../container";
import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import React, { Component } from "react";

import { Layout } from "antd";
import { bindActionCreators } from "redux";
import { checkToken } from "../store/action/userAction";
import { connect } from "react-redux";
import moduleName from "./";

const { SubMenu } = Menu;
const { Sider, Header, Footer, Content } = Layout;

class HomePage extends Component {
  componentDidMount() {
    this.props.checkToken(
      {},
      () => {},
      () => {
        this.props.history.push("/");
      }
    );
  }
  render() {
    return (
      <div>
        <Layout className="ant-layout-container">
          <HeaderMenu />
          <Layout className="layout">
            <Sider className="ant-sider">
              <SideMenu />
            </Sider>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              <Switch>
                <Route
                  key="route-1"
                  path={`${this.props.match.path}/`}
                  exact
                  component={ImageList}
                />
                <Route
                  key="route-2"
                  path={`${this.props.match.path}/images`}
                  exact
                  component={ImageList}
                />
                <Route
                  key="route-3"
                  path={`${this.props.match.path}/stream`}
                  component={Stream}
                />
              </Switch>
            </Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      </div>
    );
  }
}
export class HeaderMenu extends React.Component {
  render() {
    return (
      <div className="dl">
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: "64px", width: "70%" }}
        >
          <Menu.Item style={{ padding: "0" }}>
            <div
              className=" flex-center"
              style={{
                width: "200px",
                height: "64px",
                background: "rgba(255, 255, 255, 0.2)"
              }}
            >
              <img
                style={{ width: "30px", height: "30px" }}
                alt="loto"
                src={require("../static/imgs/cctv.png")}
              />
            </div>
          </Menu.Item>
          <li key="header-menu-1" className="ant-menu-item  custom-menu-item">
            <NavLink
              exact
              activeClassName="ant-menu-item-active ant-menu-item-selected"
              to="/home/stream/"
            >
              Quan Sát Video
            </NavLink>
          </li>
          <li key="header-menu-2" className="ant-menu-item  custom-menu-item">
            <NavLink
              exact
              activeClassName="ant-menu-item-active ant-menu-item-selected "
              to="/home/images"
            >
              Danh Sách Ảnh
            </NavLink>
          </li>
        </Menu>
        <div className="right-header" style={{ width: "30%" }}>
          <Tag color="blue">
            <strong>Hệ Thống Quan Sát Khu Vui Chơi Trẻ Em</strong>
          </Tag>
        </div>
      </div>
    );
  }
}
class SideMenu extends React.Component {
  handleClick = e => {
    console.log("click ", e);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        mode="inline"
        theme="dark"
        style={{ height: "100%", borderRight: 0 }}
      >
        <li className="ant-menu-item  custom-menu-item">
          <NavLink
            exact
            activeClassName="ant-menu-item-active ant-menu-item-selected "
            to="/home/images"
          >
            Danh Sách Ảnh
          </NavLink>
        </li>
        <li className="ant-menu-item  custom-menu-item">
          <NavLink
            exact
            activeClassName="ant-menu-item-active ant-menu-item-selected"
            to="/home/stream/"
          >
            Quan Sát Video
          </NavLink>
        </li>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

let mapDispatchToProps = dispatch => {
  return {
    checkToken: bindActionCreators(checkToken, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
