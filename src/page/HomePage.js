import { Button, Icon, Layout, Menu, Tag } from "antd";
import { ImageList, LandingPage, Stream } from "../container";
import { NavLink, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import { checkToken, userLogout } from "../store/action/userAction";

import PlayVideo from "../container/PlayVideo";
import VideoList from "../container/VideoList";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const { SubMenu } = Menu;
const { Sider, Header, Footer, Content } = Layout;
const routes = [
  {
    name: "Trang Chính",
    address: "/home",
    iconType: "home"
  },
  {
    name: "Danh Sách Ảnh",
    address: "/home/images",
    iconType: "file-image"
  },
  {
    name: "Danh Sách Video",
    address: "/home/videos",
    iconType: "database"
  },
  {
    name: "Camera Quan Sát",
    address: "/home/stream",
    iconType: "video-camera"
  }
];

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
                     <Route
                     exact
                      key="route-4"
                      path={`${this.props.match.path}/videos`}
                      component={VideoList}
                    />
                    <Route
                    exact
                      key="route-5"
                      path={`${this.props.match.path}/videos/:id`}
                      component={PlayVideo}
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
          <Menu.Item style={{ padding: "0"  }}>
            <div
              className=" flex-center"
              style={{
                width: "200px",
                height: "64px",
                background: "rgba(255, 255, 255, 0.2)",
                border: "10px solid",
              }}
            >
              <NavLink
                exact
                // activeClassName="ant-menu-item-active ant-menu-item-selected"
                to="/home"
              >
                <img
                  style={{ width: "30px", height: "30px", }}
                  alt="logo"
                  src={require("../static/imgs/cctv.png")}
                />
              </NavLink>
            </div>
          </Menu.Item>
          {routes.map((route, index) => {
            return (
              <Menu.Item key={`header-menu-${index}-nv`} className="custom-menu-item">
              
                  <NavLink
                    exact
                    activeClassName="item-active-custom"
                    to={route.address}
                  >
                    {route.name}
                  </NavLink>
              </Menu.Item>
            );
          })}
        </Menu>
        <div
          className="right-header"
          style={{ width: "30%" }}
          key="user-logout"
        >
          <Tag color="blue">
            <strong>Hệ Thống Quan Sát Khu Vui Chơi Trẻ Em</strong>
          </Tag>
          <Button type="primary" size="small" onClick={this.logOut}>
            Logout <Icon type="logout" />
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
        key="side-menu"
        onClick={this.handleClick}
        // mode="inline"
        theme="dark"
        style={{ height: "100%", borderRight: 0 }}
      >
        {routes.map((route, index) => {
          return (
            <Menu.Item key={`sidemenu-${index}`} className="custom-menu-item">
              <NavLink
                exact
                activeClassName="item-active-custom"
                to={`${route.address}`}
              >
                <Icon type={route.iconType} /> {route.name}
              </NavLink>
            </Menu.Item>
          );
        })}
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
