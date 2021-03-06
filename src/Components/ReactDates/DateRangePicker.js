import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import momentPropTypes from "react-moment-proptypes";
// import "moment/locale/zh-cn";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import omit from "lodash/omit";
import { DateRangePicker } from "react-dates";
import { withStyles, withStylesPropTypes, css } from "react-with-styles";

const propTypes = {
  ...withStylesPropTypes,

  // example props for the demo
  autoFocus: PropTypes.bool,
  autoFocusEndDate: PropTypes.bool,
  initialStartDate: momentPropTypes.momentObj,
  initialEndDate: momentPropTypes.momentObj,
  presets: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      start: momentPropTypes.momentObj,
      end: momentPropTypes.momentObj
    })
  ),
  ...omit({}, [
    "startDate",
    "endDate",
    "onDatesChange",
    "focusedInput",
    "onFocusChange"
  ])
};
const today = moment();
const tomorrow = moment().add(1, 'day');
const defaultProps = {
  // example props for the demo
  autoFocus: false,
  autoFocusEndDate: false,
  initialStartDate: null,
  initialEndDate: null,
  presets: [
      {
    text: 'Today',
    start: today,
    end: today,
  },
  {
    text: 'Tomorrow',
    start: tomorrow,
    end: tomorrow,
  },
  {
    text: 'Next Week',
    start: today,
    end: moment().add(1, 'week'),
  },
  {
    text: 'Next Month',
    start: today,
    end: moment().add(1, 'month'),
  }
  ],
  

  // input related props
  startDateId: "startDate",
  startDatePlaceholderText: 'Start Date',
  endDateId: "endDate",
  endDatePlaceholderText: 'End Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: "",
  showClearDates: true,
  showDefaultInputIcon: false,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,

  // calendar presentation and interaction related props
  renderMonthText: null,
  orientation: "horizontal",
  anchorDirection: "left",
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 1,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},

  // day presentation and interaction related props
  renderDayContents: null,
  minimumNights: 0,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: () => {},
  isDayHighlighted: () => false,

  // internationalization
  displayFormat: () => moment.localeData().longDateFormat("L"),
  monthFormat: 'MMMM YYYY'
};

class DateRangePickerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      focusedInput: null
    };
  }

  onDatesChange = ({ startDate, endDate }) =>
    this.setState({ startDate, endDate });

  onFocusChange = focusedInput => this.setState({ focusedInput });

  renderDatePresets = () => {
    const { presets, styles } = this.props;
    const { startDate, endDate } = this.state;
    console.log(styles);

    return (
      <div {...css(styles.PresetDateRangePicker_panel)}>
        {presets.map(({ text, start, end }) => {
          const isSelected =
            isSameDay(start, startDate) && isSameDay(end, endDate);
          return (
            <button
              key={text}
              {...css(
                styles.PresetDateRangePicker_button,
                isSelected && styles.PresetDateRangePicker_button__selected
              )}
              type="button"
              onClick={() =>
                this.onDatesChange({ startDate: start, endDate: end })
              }
            >
              {text}
            </button>
          );
        })}
      </div>
    );
  };

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    const props = omit(this.props, [
      "autoFocus",
      "autoFocusEndDate",
      "initialStartDate",
      "initialEndDate",
      "presets"
    ]);
    return (
      <React.Fragment>
        <DateRangePicker
          {...props}
          renderCalendarInfo={this.renderDatePresets}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={focusedInput}
          onFocusChange={this.onFocusChange}
          
        />
        {/* {console.log(this.state.startDate, this.state.endDate)} */}
        {localStorage.setItem('startDatePicker', this.state.startDate)}
        {localStorage.setItem('endDatePicker', this.state.endDate)}
        {localStorage.setItem('tglfilter', this.state.endDate)}
      </React.Fragment>
    );
  }
}

DateRangePickerWrapper.propTypes = propTypes;
DateRangePickerWrapper.defaultProps = defaultProps;

function isSameDay(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  // Compare least significant, most likely to change units first
  // Moment's isSame clones moment inputs and is a tad slow
  return (
    a.date() === b.date() && a.month() === b.month() && a.year() === b.year()
  );
}

export default withStyles(({ reactDates: { color } }) => ({
  PresetDateRangePicker_panel: {
    padding: "0 22px 11px 22px"
  },

  PresetDateRangePicker_button: {
    position: "relative",
    height: "100%",
    textAlign: "center",
    background: "none",
    border: `2px solid ${color.core.primary}`,
    color: color.core.primary,
    padding: "4px 12px",
    marginRight: 8,
    font: "inherit",
    fontWeight: 700,
    lineHeight: "normal",
    overflow: "visible",
    boxSizing: "border-box",
    cursor: "pointer",

    ":active": {
      outline: 0
    }
  },

  PresetDateRangePicker_button__selected: {
    color: color.core.white,
    background: color.core.primary
  }
}))(DateRangePickerWrapper);
