import React, { Component, PropTypes } from 'react';
import { abouts, departments } from '../../utils/constant';
import Checkbox from '../../components/checkbox.jsx';
import { Collapse } from 'react-bootstrap';

class Settings extends Component {
  constructor (...args) {
    super(...args);
    this.state = { open: false };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick () {
    this.setState({ open: !this.state.open });
  }
  render () {
    const { handleAboutClick, handleDepartmentClick, selectedAbouts, selectedDepartments } = this.props;
    const departmentNodes = departments.map(department =>
      <Checkbox
        isSelected={selectedDepartments.indexOf(department) >= 0}
        key={department}
        onClick={handleDepartmentClick}
        value={department}
      >
        {department}
      </Checkbox>
    );
    const aboutNodes = abouts.map(about =>
      <Checkbox
        isSelected={selectedAbouts.indexOf(about) >= 0}
        key={about}
        onClick={handleAboutClick}
        value={about}
      >
        {about}
      </Checkbox>
    );
    return (
      <section className="settings">
        <h2 className="h3">
          <a
            onClick={this.handleClick}
            role="button"
          >
            <span className={this.state.open ? 'glyphicon glyphicon-chevron-down' : 'glyphicon glyphicon-chevron-right'} />
            {'Settings'}
          </a>
        </h2>
        <Collapse in={this.state.open}>
          <div>
            <h3>{'表示する情報'}</h3>
            <dl>
              <dt>{'学部'}</dt>
              <dd>{departmentNodes}</dd>
              <dt>{'種別'}</dt>
              <dd>{aboutNodes}</dd>
            </dl>
          </div>
        </Collapse>
      </section>
    );
  }
}

Settings.propTypes = {
  handleAboutClick: PropTypes.func.isRequired,
  handleDepartmentClick: PropTypes.func.isRequired,
  selectedAbouts: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedDepartments: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Settings;