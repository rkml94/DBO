import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
// import { MDBDataTable } from 'mdbreact';
import  { IPSERVICE,PATH_SERVICE } from '../config';
import { MDBDataTable } from 'mdbreact';
import {Modal, ModalBody, ModalHeader, ModalFooter,Input, InputGroup,
   Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
  FormGroup,
  Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './../../scss/app.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

  }
  
  componentDidMount(){
   
  }
  

  render() {
    return (
      <div className="animated fadeIn zoom" className="bodyDashboard">
        <h1>Applikasi ini dibuat untuk test di DBO sebagai Enginner Front End</h1> 
        <h2>Ada beberapa Menu yang saya buat Seperti :</h2>
        <h3>- Menu Customer</h3>
        <h3>- Menu Order</h3>
        <h3>- Menu Supplier</h3>

        <h3>Untuk Auth nya saya sempat membuat login menggunakan node js(express js)</h3>
      </div>
  );
}
}

export default Dashboard;
