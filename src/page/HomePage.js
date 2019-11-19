import { Button, Dropdown, Icon, Menu, Tag } from "antd";
import { ImageList, LandingPage, Stream } from "../container";
import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import React, { Component } from "react";
import { checkToken, forgetUser, userLogout } from "../store/action/userAction";

import { Layout } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moduleName from "./";

const { SubMenu } = Menu;
const { Sider, Header, Footer, Content } = Layout;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoading: true
    };
  }
  componen;
  componentWillMount() {
    this.props.checkToken(
      {},
      () => {
        this.setState({
          pageLoading: false
        });
      },
      () => {
        this.props.history.push("/");
      }
    );
  }
  componentWillUnmount() {}
  render() {
    return (
      <div>
        {!this.state.pageLoading && (
          <div>
            <Layout className="ant-layout-container">
              <HeaderMenu {...this.props} />
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
                      component={LandingPage}
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
        )}
      </div>
    );
  }
}

export class HeaderMenu extends React.Component {
  logOut = () => {
    this.props.userLogout(() => {
      this.props.history.push("/login");
    });
  };
  render() {
    return (
      <div className="dl">
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: "64px", width: "70%" }}
        >
          <Menu.Item key="menu-header-1" style={{ padding: "0" }}>
            <div
              className=" flex-center"
              style={{
                width: "200px",
                height: "64px",
                background: "rgba(255, 255, 255, 0.2)"
              }}
            >
              <NavLink
                key={"header-menu-logo"}
                exact
                // activeClassName="ant-menu-item-active ant-menu-item-selected"
                to="/home"
              >
                <img
                  style={{ width: "30px", height: "30px" }}
                  alt="logo"
                  src={require("../static/imgs/cctv.png")}
                />
              </NavLink>
            </div>
          </Menu.Item>
          <li
            key="header-menu-li-1"
            className="ant-menu-item  custom-menu-item"
          >
            <NavLink
              key={"header-menu-li-nav-1"}
              exact
              activeClassName="ant-menu-item-active ant-menu-item-selected"
              to="/home/stream/"
            >
              Quan Sát Video
            </NavLink>
          </li>
          <li
            key="header-menu-li-2"
            className="ant-menu-item  custom-menu-item"
          >
            <NavLink
              key={"header-menu-li-nav-2"}
              exact
              activeClassName="ant-menu-item-active ant-menu-item-selected "
              to="/home/images"
            >
              Danh Sách Ảnh
            </NavLink>
          </li>
          <li
            key="header-menu-li-3"
            className="ant-menu-item  custom-menu-item"
          >
            <NavLink
              key={"header-menu-li-nav-3"}
              exact
              activeClassName="ant-menu-item-active ant-menu-item-selected "
              to="/home"
            >
              Trang Chủ
            </NavLink>
          </li>
        </Menu>
        <div className="right-header" style={{ width: "30%" }}>
          <Tag color="blue">
            <strong>Hệ Thống Quan Sát Khu Vui Chơi Trẻ Em</strong>
          </Tag>
          <Button type="primary" size="small" onClick={this.logOut}>
            Logout
          </Button>
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
        <li className="ant-menu-item  custom-menu-item" key="side-menu-item-1">
          <NavLink
            key="side-menu-1"
            exact
            activeClassName="ant-menu-item-active ant-menu-item-selected "
            to="/home"
          >
            Trang Chủ
          </NavLink>
        </li>
        <li className="ant-menu-item  custom-menu-item" key="side-menu-item-2">
          <NavLink
            key="side-menu-1"
            exact
            activeClassName="ant-menu-item-active ant-menu-item-selected "
            to="/home/images"
          >
            Danh Sách Ảnh
          </NavLink>
        </li>
        <li className="ant-menu-item  custom-menu-item" key="side-menu-item-3">
          <NavLink
            key="side-menu-2"
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
    checkToken: bindActionCreators(checkToken, dispatch),
    userLogout: bindActionCreators(userLogout, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
