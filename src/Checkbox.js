import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';

const propTypes = {
  title: PropTypes.string,
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  inputRef: PropTypes.func,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};


class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({
        checked: nextProps.checked
      });
    }
  }
  handleChange(event) {
    const { onChange, disabled, value } = this.props;
    const target = event.target;
    const checked = !this.state.checked;

    if (disabled) {
      return;
    }

    this.setState({ checked }, () => {
      onChange && onChange(value ? target.value : checked, event);
    });
  }

  render() {

    const {
      inline,
      disabled,
      className,
      onChange,
      children,
      title,
      inputRef,
      style,
      checked,
      ...props
    } = this.props;

    const nextChecked = isUndefined(checked) ? this.state.checked : checked;
    const classes = classNames('checkbox', {
      'checkbox-inline': inline
    }, className);

    const checkboxClasses = classNames('checker', {
      disabled
    });

    const input = (
      <span className={classNames('checkbox-wrapper', { checked: nextChecked })}>
        <input
          {...props}
          type="checkbox"
          ref={inputRef}
          disabled={disabled}
          onChange={this.handleChange}
        />
      </span>
    );

    return (
      <div
        className={classes}
        style={style}
      >
        <div
          className={checkboxClasses}
          role="button"
        >
          <label title={title}>
            {input}
            {children}
          </label>
        </div>
      </div>
    );
  }
}

Checkbox.displayName = 'Checkbox';
Checkbox.propTypes = propTypes;

export default Checkbox;
