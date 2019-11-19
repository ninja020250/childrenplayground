import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  Modal,
  PageHeader,
  Pagination,
  Tag
} from "antd";
import React, { Component } from "react";
import {
  resetFiltersDate,
  updateFiltersDate
} from "../store/action/filterDateAction";
import {
  resetFiltersRange,
  updateFiltersRange
} from "../store/action/filterRangeAction";

import { LineLoading } from "../common/LineLoading";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updatePagination } from "../store/action/pagiAction";
import { updateVideos } from "../store/action/videoAction";

class VideoList extends Component {
  componentDidMount() {
    const { filterDate, filterRange } = this.props;

    this.handleUpdateVideoList(
      filterDate,
      1,
      filterRange.min,
      filterRange.max,
      undefined,
      undefined
    );
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.filterDate !== nextProps.filterDate) {
      this.handleUpdateVideoList(
        nextProps.filterDate,
        nextProps.pagi.page,
        nextProps.filterRange.min,
        nextProps.filterRange.max
      );
    } else if (this.props.pagi.page !== nextProps.pagi.page) {
      this.handleUpdateVideoList(
        nextProps.filterDate,
        nextProps.pagi.page,
        nextProps.filterRange.min,
        nextProps.filterRange.max
      );
    } else if (this.props.filterRange !== nextProps.filterRange) {
      this.handleUpdateVideoList(
        nextProps.filterDate,
        nextProps.pagi.page,
        nextProps.filterRange.min,
        nextProps.filterRange.max
      );
    }
  }
  handleUpdateVideoList = (
    filterDate = this.props.filterDate,

    pagination = this.props.pagi.page,
    min = this.props.filterRange.min,
    max = this.props.filterRange.max
  ) => {
    this.props.updateVideos(
      filterDate.from,
      filterDate.to,
      pagination,
      min,
      max,
      undefined,
      undefined
    );
  };
  render() {
    var { results, count } = this.props.videoList.data;
    var { loading } = this.props.videoList;
    return (
        <div className="content-wrapper">
          <h1>Danh Sách Video</h1>
  
          <VideoListOption videos={results} count={count} {...this.props} />
          <div className="table-1">
            {loading && <LineLoading />}
            <VideoTable videos={results} {...this.props} />
          </div>
        </div>
      );
  }
}

class DateRange extends React.Component {
    state = {
      startValue: null,
      endValue: null,
      endOpen: false,
      min: undefined,
      max: undefined
    };
  
    disabledStartDate = startValue => {
      const { endValue } = this.state;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    };
  
    disabledEndDate = endValue => {
      const { startValue } = this.state;
      if (!endValue || !startValue) {
        return false;
      }
      return endValue.valueOf() <= startValue.valueOf();
    };
  
    onChange = (field, value) => {
      this.setState({
        [field]: value
      });
    };
    onChangeMin = value => {
      value = (value === null) ? undefined : value;
      this.setState({
        ...this.state,
        min: value
      });
      // this.props.updateFiltersRange({
      //   min: value,
      //   max: this.props.filterRange.max
      // });
    };
    onChangeMax = value => {
      value = (value === null) ? undefined : value;
      this.setState({
        ...this.state,
        max: value
      });
      // this.props.updateFiltersRange({
      //   min: this.props.filterRange.min,
      //   max: value
      // });
    };
    onStartChange = value => {
      this.onChange("startValue", value);
    };
  
    onEndChange = value => {
      this.onChange("endValue", value);
    };
  
    handleStartOpenChange = open => {
      if (!open) {
        this.setState({ endOpen: true });
      }
    };
  
    handleEndOpenChange = open => {
      this.setState({ endOpen: open });
    };
  
    onFilterDate = () => {
      var { startValue, endValue, min, max } = this.state;
      if (startValue !== null && endValue !== null)
        this.props.updateFiltersDate(startValue, endValue);
  
      this.props.updateFiltersRange(min, max);
    };
    onResetFilterDate = () => {
      this.props.resetFiltersDate();
    };
  
    render() {
      const { startValue, endValue, endOpen } = this.state;
      return (
        <div>
          <DatePicker
            disabledDate={this.disabledStartDate}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={startValue}
            placeholder="Từ ngày"
            onChange={this.onStartChange}
            onOpenChange={this.handleStartOpenChange}
            className="mr-1"
          />
          <DatePicker
            disabledDate={this.disabledEndDate}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={endValue}
            placeholder="Đến ngày"
            onChange={this.onEndChange}
            open={endOpen}
            onOpenChange={this.handleEndOpenChange}
            className="mr-1"
          />
          <InputNumber
            className="mr-1"
            min={11}
            max={70}
            onChange={this.onChangeMin}
            placeholder="tuổi thấp nhất"
          />
          <InputNumber
            className="mr-1"
            min={11}
            max={70}
            onChange={this.onChangeMax}
            placeholder="tuổi cao nhất"
          />
          <Button className="mr-1" onClick={this.onResetFilterDate}>
            Bỏ lọc
          </Button>
  
          <Button onClick={this.onFilterDate}>Lọc</Button>
        </div>
      );
    }
  }
export const VideoListOption = props => {
    const onChangePageNumber = (page, pageSize) => {
      props.updatePagination(page, pageSize);
    };
    return (
      <ul className="opt">
        <li>
          <Pagination
            pageSize={100}
            defaultCurrent={1}
            total={props.count}
            onChange={onChangePageNumber}
          />
        </li>
        <li>
          <ul className="opt">
            <li>
              <DateRange {...props} />
            </li>
          </ul>
        </li>
      </ul>
    );
  };
export class VideoTable extends Component {
    state = { visible: false, currentPage: 1, row: {} };
    getRows = () => {
        
      return this.props.videos.map((row, index) => {
        // var AgePredicted = row.AgePredictions.map((age, index) => {
        //   return (
        //     <div key={`${index}-age-${row.videoId}`}>
        //       {age.age}:<Tag color="red">{age.levelWarning.levelWarningName}</Tag>
        //     </div>
        //   );
        // });
        return (
          <tr key={`${index}-videoList-${row.videoId}`}>
            <td>{row.videoId}</td>
            <td>
              <img
                style={{ cursor: "pointer" }}
                alt="face detected"
                src={row.videoLink}
                onClick={() => {
                  this.showModal(row);
                }}
              />
            </td>
            <td/>
            <td>{row.updatedTime}</td> 
            <td><Button>Xem Lại Video</Button></td> 
            {/* <td>
              <img
                style={{ cursor: "pointer" }}
                alt="face detected"
                src={row.videoLink}
                onClick={() => {
                  this.showModal(row);
                }}
              />
            </td>
            <td>{AgePredicted}</td>
            <td>{row.updatedTime}</td> */}
          </tr>
        );
      });
    };
    showModal = row => {
      this.setState({
        visible: true,
        row: row
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
  
    render() {
      var { videoLink, createdTime } = this.state.row;
      return (
        <div>
          <Modal
            className="modal-zoomvideo"
            title={createdTime}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <img alt="zoom" src={videoLink} />
          </Modal>
          <table className="">
            <tbody>
              <tr>
                <th>
                  <div>ID</div>
                </th>
                <th>
                  <div>Ảnh</div>
                </th>
                <th>
                  <div>Tuổi phát hiện</div>
                </th>
                <th>
                  <div>Ngày Phát Hiện</div>
                </th>
                <th>
                  <div>Tùy Chọn</div>
                </th>
              </tr>
              {this.getRows()}
            </tbody>
          </table>
        </div>
      );
    }
  }

const mapStateToProps = state => {
    return {
      videoList: state.videoList,
      filterDate: state.filterDate,
      filterRange: state.filterRange,
      pagi: state.pagi
    };
  };
  
  let mapDispatchToProps = dispatch => {
    return {
      updateVideos: bindActionCreators(updateVideos, dispatch),
      updateFiltersDate: bindActionCreators(updateFiltersDate, dispatch),
      updatePagination: bindActionCreators(updatePagination, dispatch),
      resetFiltersDate: bindActionCreators(resetFiltersDate, dispatch),
      updateFiltersRange: bindActionCreators(updateFiltersRange, dispatch),
      resetFiltersRange: bindActionCreators(resetFiltersRange, dispatch)
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(VideoList);