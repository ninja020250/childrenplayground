import {
  Button,
  DatePicker,
  Input,
  Modal,
  PageHeader,
  Pagination,
  Tag
} from "antd";
import React, { Component } from "react";
import { resetFiltersDate, updateFiltersDate } from "../store/action/filterDateAction";

import { LineLoading } from "../common/LineLoading";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateImages } from "../store/action/imageAction";
import { updatePagination } from "../store/action/pagiAction";

const { Search } = Input;

class ImageList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { filterDate } = this.props;
    this.handleUpdateImageList(filterDate, 1);
    // this.props.updateImages(undefined, undefined);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.filterDate !== nextProps.filterDate) {
      this.handleUpdateImageList(nextProps.filterDate, 1);
    }
    if (this.props.pagi.page !== nextProps.pagi.page) {
      this.handleUpdateImageList(nextProps.filterDate, nextProps.pagi.page);
    }
  }
  handleUpdateImageList = (
    filterDate = this.props.filterDate,
    pagination = this.props.pagi.page
  ) => {
    this.props.updateImages(
      filterDate.from,
      filterDate.to,
      pagination,
      undefined,
      undefined
    );
  };

  render() {
    var { results, count } = this.props.imageList.data;
    var { loading } = this.props.imageList;
    return (
      <div className="content-wrapper">
        <h1>Hình Ảnh Phát Hiện Quá Tuổi Cho Phép</h1>

        <ImageListOption images={results} count={count} {...this.props} />
        <div className="table-1">
          {loading && <LineLoading />}
          <ImageTable images={results} {...this.props} />
        </div>
      </div>
    );
  }
}
class DateRange extends React.Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false
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
    var { startValue, endValue } = this.state;
    if (startValue !== null && endValue !== null)
      this.props.updateFiltersDate(startValue, endValue);
  };
  onResetFilterDate = ()=>{
    this.props.resetFiltersDate()
  }
  
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
          className="mr-2"
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
          className="mr-2"
        />
        <Button className="mr-2" onClick={this.onResetFilterDate}>
          Bỏ lọc
        </Button>
        <Button onClick={this.onFilterDate}>Lọc</Button>
      </div>
    );
  }
}

export const ImageListOption = props => {
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

export class ImageTable extends Component {
  state = { visible: false, currentPage: 1 };
  getRows = () => {
    return this.props.images.map((row, index) => {
      var AgePredicted = row.AgePredictions.map((age, index) => {
        return (
          <div key={`${index}-age`}>
            {age.age}:<Tag color="red">{age.levelWarning.levelWarningName}</Tag>
          </div>
        );
      });
      return (
        <tr key={`${index}-imageList`}>
          <td>{row.imageId}</td>
          <td>
            <img
              style={{ cursor: "pointer" }}
              alt="face detected"
              src={row.imageLink}
              onClick={() => {
                this.showModal(row.imageLink, row.createdTime);
              }}
            />
          </td>
          <td>{AgePredicted}</td>
          <td>{row.updatedTime}</td>
        </tr>
      );
    });
  };
  showModal = (imgLink, time) => {
    this.setState({
      visible: true,
      imgLink: imgLink,
      time: time
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
    var { imgLink, time } = this.state;
    return (
      <div>
        <Modal
          className="modal-zoomImage"
          title={time}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <img alt="zoom" src={imgLink} />
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
    imageList: state.imageList,
    filterDate: state.filterDate,
    pagi: state.pagi
  };
};

let mapDispatchToProps = dispatch => {
  return {
    updateImages: bindActionCreators(updateImages, dispatch),
    updateFiltersDate: bindActionCreators(updateFiltersDate, dispatch),
    updatePagination: bindActionCreators(updatePagination, dispatch),
    resetFiltersDate: bindActionCreators(resetFiltersDate, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageList);
