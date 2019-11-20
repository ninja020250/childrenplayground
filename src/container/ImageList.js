import { Button, DatePicker, Icon, Input, InputNumber, Modal, Pagination, Tag } from "antd";
import React, { Component } from "react";
import { getDetectDescription, toStringDate } from "../common/utilities";
import { resetFiltersDate, updateFiltersDate } from "../store/action/filterDateAction";
import { resetFiltersRange, updateFiltersRange } from "../store/action/filterRangeAction";

import { LineLoading } from "../common/LineLoading";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateImages } from "../store/action/imageAction";
import { updatePagination } from "../store/action/pagiAction";

class ImageList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { filterDate, filterRange } = this.props;

    this.handleUpdateImageList(
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
      this.handleUpdateImageList(
        nextProps.filterDate,
        nextProps.pagi.page,
        nextProps.filterRange.min,
        nextProps.filterRange.max
      );
    } else if (this.props.pagi.page !== nextProps.pagi.page) {
      this.handleUpdateImageList(
        nextProps.filterDate,
        nextProps.pagi.page,
        nextProps.filterRange.min,
        nextProps.filterRange.max
      );
    } else if (this.props.filterRange !== nextProps.filterRange) {
      this.handleUpdateImageList(
        nextProps.filterDate,
        nextProps.pagi.page,
        nextProps.filterRange.min,
        nextProps.filterRange.max
      );
    }
  }
  handleUpdateImageList = (
    filterDate = this.props.filterDate,

    pagination = this.props.pagi.page,
    min = this.props.filterRange.min,
    max = this.props.filterRange.max
  ) => {
    this.props.updateImages(
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
    value = value === null ? undefined : value;
    this.setState({
      ...this.state,
      min: value
    });
  };
  onChangeMax = value => {
    value = value === null ? undefined : value;
    this.setState({
      ...this.state,
      max: value
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
    var { startValue, endValue, min, max } = this.state;
    if (startValue !== null && endValue !== null)
      this.props.updateFiltersDate(startValue, endValue);

    this.props.updateFiltersRange(min, max);
  };
  onResetFilterDate = () => {
    this.setState({
      startValue: null,
      endValue: null,
      endOpen: false,
      min: undefined,
      max: undefined
    }, ()=>{
      this.props.resetFiltersDate();
    })
  
  };

  render() {
    const { startValue, endValue, endOpen, min, max } = this.state;
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
          value={min}
        />
        <InputNumber
          className="mr-1"
          min={11}
          max={70}
          onChange={this.onChangeMax}
          placeholder="tuổi cao nhất"
          value={max}
        />
        <Button className="mr-1" onClick={this.onResetFilterDate}>
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
  state = {
    visible: false,
    currentPage: 1,
    row: {},
    currentRow: {},
    nexRow: {},
    preRow: {}
  };
  getRows = () => {
    return this.props.images.map((row, index) => {
      var ages = Object.assign([], row.agePredictions);
      var agePredicted = row.agePredictions.map((age, index) => {
        return (
          <div key={`${index}-age-${row.imageId}`}>
            {age.age}:<Tag color="red">{age.levelWarning.levelWarningName}</Tag>
          </div>
        );
      });
      var detectDate = toStringDate(row.createdTime);
      return (
        <tr key={`${index}-imageList-${row.imageId}`}>
          <td>{index}</td>
          <td>
            <img
              style={{ cursor: "pointer" }}
              alt="face detected"
              src={row.imageLink}
              onClick={() => {
                var nexRow = index + 1;
                var preRow = index - 1;
                if (index + 1 >= this.props.images.length) {
                  nexRow = undefined;
                }
                if (index - 1 < 0) {
                  preRow = undefined;
                }
                this.setState(
                  { currentRow: index, nexRow: nexRow, preRow: preRow },
                  () => {
                    this.showModal(row, ages);
                  }
                );
              }}
            />
          </td>
          <td>{agePredicted}</td>
          <td>{detectDate}</td>
        </tr>
      );
    });
  };
  showModal = (row, ages) => {
    this.setState({
      visible: true,
      row: row,
      ages: ages
    });
  };
  handleNext = ( ) =>{
    var { nexRow } = this.state;
    if ( nexRow !== undefined) {
      var currentRow = nexRow;
      var nexRow = currentRow + 1;
      var preRow = currentRow - 1;
      if (currentRow + 1 >= this.props.images.length) {
        nexRow = undefined;
      }
      if (currentRow - 1 < 0) {
        preRow = undefined;
      }
      
      this.setState({
        visible: true,
        row: this.props.images[currentRow],
        ages: this.props.images[currentRow].agePredictions,
        currentRow: currentRow, nexRow: nexRow, preRow: preRow
      });
    }
  }
  handlePre = ( ) =>{
    var { preRow } = this.state;
    if ( preRow !== undefined) {
      var currentRow = preRow;
      var nexRow = currentRow + 1;
      var preRow = currentRow - 1;
      if (currentRow + 1 >= this.props.images.length) {
        nexRow = undefined;
      }
      if (currentRow - 1 < 0) {
        preRow = undefined;
      }
      
      this.setState({
        visible: true,
        row: this.props.images[currentRow],
        ages: this.props.images[currentRow].agePredictions,
        currentRow: currentRow, nexRow: nexRow, preRow: preRow
      });
    }
  }
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
    var { imageLink, createdTime, imageId } = this.state.row;
    var { ages } = this.state;
    var timeDescription = toStringDate(createdTime);
    var dectectionDescription = getDetectDescription(ages);
    return (
      <div>
        <Modal
          className="modal-zoomImage"
          title={`Số Hiệu Hình Ảnh: ${imageId}`}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="dl-col">
            <p>{`Chụp vào ${timeDescription}`}</p>
            <p>{dectectionDescription}</p>
            <div class="model-group-switchimage">
              <Icon type="caret-left" onClick={this.handlePre}/>
              <Icon type="caret-right" onClick={this.handleNext}/>
            </div>
            <img key={imageId} alt="zoom" src={imageLink} className="" />
          </div>
        </Modal>
        <table >
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
    filterRange: state.filterRange,
    pagi: state.pagi
  };
};

let mapDispatchToProps = dispatch => {
  return {
    updateImages: bindActionCreators(updateImages, dispatch),
    updateFiltersDate: bindActionCreators(updateFiltersDate, dispatch),
    updatePagination: bindActionCreators(updatePagination, dispatch),
    resetFiltersDate: bindActionCreators(resetFiltersDate, dispatch),
    updateFiltersRange: bindActionCreators(updateFiltersRange, dispatch),
    resetFiltersRange: bindActionCreators(resetFiltersRange, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageList);
