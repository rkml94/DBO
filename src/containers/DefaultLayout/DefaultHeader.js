import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Badge, UncontrolledDropdown,DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavDropdown } from 'reactstrap';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import sygnet from '../../assets/img/brand/sygnet.svg'



const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
 constructor(props) {
    super(props);
    this.state = {
      primary: false,
      checkstatus: '',
    };
    const  checkstatus = localStorage.getItem("status"); 
   this.checkLs();
   this.timeout();
  
    this.togglePrimary = this.togglePrimary.bind(this);
  }

  checkLs(){
    if(localStorage.getItem('status') !== '200'){
      // console.log('check lagi', localStorage.getItem('status'));
      <Redirect to="/login"/>
    }else if (localStorage.getItem('status') === '') {
      <Redirect from="/" to="/login"/>
    }else if (localStorage.getItem('status') === 'null') {
      <Redirect from="" to="/login"/>
    }else if (localStorage.length === '0') {
      <Redirect to="/login"/>
    }
    return
  }

  togglePrimary() {
    this.setState({
      primary: !this.state.primary,
      
    });
    localStorage.clear();
  }

  toggleClear() {
    this.setState({
      primary: !this.state.primary,
      
    });
    localStorage.clear();
  }

  clear = (e) => {
    localStorage.clear();
  }

  timeout(){
    console.log('tes timeout');
    var hours = 24; // Reset when storage is more than 24hours
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');
    // console.log('now', now);
    // console.log('setupptime', setupTime);
    // console.log('hasil', hours*60*60*1000);
    if (setupTime == null) {
        localStorage.setItem('setupTime', now)
    } else {
        if(now-setupTime > hours*60*60*1000) {
            localStorage.clear()
            localStorage.setItem('setupTime', now);
        }
    }
  }
  


  handleGetTime = () => {
    var tempDate = new Date();
    var LS = localStorage.getItem('username');
    if(tempDate.getHours() >= 0 && tempDate.getHours() <= 11){
      return "Good Morning" + ', ' + LS;
    }else if(tempDate.getHours() > 11 && tempDate.getHours() <= 17){
      return "Good Afternoon" + ', ' + LS;
    }else if(tempDate.getHours() > 17 && tempDate.getHours() <= 22){
      return "Good Evening" + ', ' + LS;
    }else{
      return "Good Night" + ', ' + LS;
    }
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
         
        </Nav> 
        <Nav className="ml-auto" navbar>
         
          <Nav className="ml-auto" navbar>
          <UncontrolledDropdown>
            <DropdownToggle nav>
              <span className="mr-3">
              <strong className="hidden-name-xs">{this.handleGetTime()}</strong> 
                <i className="fa fa-chevron-down ml-2" aria-hidden="true" style={{fontSize:"0.8em", fontWeight:"normal"}}></i>
              </span>
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto', height: '120px' }}>
              <DropdownItem header tag="div" className="text-center"><strong>To Do</strong></DropdownItem>
              <Link to="/usermanagement/changePassword" className="navbar-item has-text-centered" style={{color:'white'}}>
              <DropdownItem><i className="icon-lock-open text-primary"></i> Change Password</DropdownItem>
              </Link>
               <Link to="/"className="navbar-item has-text-centered" style={{color:'white'}}>
              <DropdownItem onClick={e => this.clear()}><i className="fa fa-sign-out text-primary"></i> Logout</DropdownItem>
              </Link>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
          <NavItem className="d-md-down-none" right style={{ right: 'auto' }}>
                <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                       className={'modal-primary ' + this.props.className}>
                  <ModalHeader>Logout Notif</ModalHeader>
                  <ModalBody>
                  Thank you, don't forget to visit again
                  </ModalBody>
                  <ModalFooter>
                    <Link to="/" className="navbar-item has-text-centered" style={{color:'white'}}>
                      <Button color="primary" onClick={this.togglePrimary}>
                        Oke
                      </Button>
                    </Link>
                  </ModalFooter>
                </Modal>
                
          </NavItem>
          
        </Nav>
       </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
