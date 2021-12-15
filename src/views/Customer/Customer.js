import React, { Component } from 'react';
import { InputGroup, Label,Input, Card, CardHeader, Col, Row,  Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import  { IPSERVICE,PATH_SERVICE } from '../config';
import Jsoncustomer from '../Json/customer.json';
import { get } from 'core-js/core/dict';

class Customer extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
          customer: [],
          viewData: {
             customerId:'',
             customerName:'',
             alamat:'',
             noHp:'',
          },
          addCustomer: {
            customerId:'',
             customerName:'',
             alamat:'',
             noHp:'',
          },
          viewModal: false,
          Bearer : '',
          NewAdd : false,
          delete : false,
          viewdelete: false,
      }
    }
  
    componentDidMount() {
      this.getCustomer();//untuk memanggil data findall
      this.setState({ customer : Jsoncustomer });
    }

    getCustomer(){
      const auth = localStorage.getItem('Token');
      this.serverRequest = axios.get(IPSERVICE+PATH_SERVICE+"customer/findAll", {
        mode: "no-cors",
        headers:{
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: auth,
          },
        })
      .then(response => {
          if (response && response.data) {
            this.setState({ customer : Jsoncustomer });
          }
        })
        .catch(error => console.log(error));
    }

    toggleView() {
      this.setState({
        viewModal: ! this.state.viewModal
      })
    }

    toggleNewAdd() {
      this.setState({
        NewAdd: ! this.state.NewAdd,
          addCustomer: {
            customerId:'',
            customerName:'',
            alamat:'',
            noHp:'',
        }
      })
    }

    toggleDelete() {
      localStorage.removeItem('customerId')
      localStorage.removeItem('customerName')
      this.setState({
        viewdelete: ! this.state.viewdelete
      })
    }
    
    toggleSync() {
      this.setState({
        sync: ! this.state.sync
      })
    }
    

    addNewCustomer() {
      var payload ='{"customerId":"'+this.state.addCustomer.customerId+'","customerName":"'+this.state.addCustomer.customerName+'","alamat": "'+this.state.addCustomer.alamat+'","noHp": "'+this.state.addCustomer.noHp+'"}';
      const auth = localStorage.getItem('Bearer');
      // console.log('auth', auth);
      this.serverRequest = axios.post(IPSERVICE+PATH_SERVICE+"customer/api/save", payload, {
      mode: 'no-cors',
      headers : {
        'Content-Type': 'application/json',
        Authorization: auth,
        // "Authorization": "Bearer" +localStorage.getItem('Bearer1'),
      },
    })
    this.componentDidMount();
    this.refresh();
    this.toggleNewAdd();
    }

    
    codeDelete(  customerId, customerName ) {
      localStorage.setItem('customerId', customerId);
      localStorage.setItem('customerName', customerName);
      this.setState({
        viewData: {  customerId, customerName }, viewdelete: ! this.state.viewdelete
      });
      // console.log('tes data view', this.setState.timeZone);
    }

    delete() {
      const code = localStorage.getItem('customerId');
      const auth = localStorage.getItem('Bearer');
      axios.delete(IPSERVICE+PATH_SERVICE+"customer/api/"+code , {
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: auth,
        },
        })
          localStorage.removeItem('customerId')
          localStorage.removeItem('customerName')
    
        this.toggleDelete();
      
    }

   
    
    viewDatas(customerId, customerName, alamat, noHp) {
      this.setState({
        viewData: {customerId, customerName, alamat, noHp}, viewModal: ! this.state.viewModal
      });
    }

    updateCustomer(){
      var payload ='{"customerId":"'+this.state.viewData.customerId+'","customerName":"'+this.state.viewData.customerName+'","alamat": "'+this.state.viewData.alamat+'","noHp": "'+this.state.viewData.noHp+'"}';
      const auth = localStorage.getItem('Bearer');
      // console.log('auth', auth);
      this.serverRequest = axios.post(IPSERVICE+PATH_SERVICE+"customer/api/save",payload, {
       mode: 'no-cors',
       headers : {
         'Content-Type': 'application/json',
         Authorization: auth,
       },
     })
     this.componentDidMount();
     this.toggleView();
    }
  
    render() {
      let { customer } = this.state;
      const data = {
        columns: [
          {
            label: 'Customer Id',
            field: 'customerId',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Customer Nama',
            field: 'customerName',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Alamat',
            field: 'alamat',
            sort: 'asc',
            width: 100
          },
          {
            label: 'No Hp',
            field: 'noHp',
            sort: 'asc',
            width: 200
          },
          {
            label: 'Action ',
            field: 'delete',
            sort: 'asc',
            width: 20
          }
        ],
        rows: customer.map(customer => {
          return {
            customerId: customer.customerId,
            customerName: customer.customerName,
            alamat: customer.alamat,
            noHp: customer.noHp,
           delete: 
           <div class="action">
            <Button title="View" size="sm" className="btn-twitter btn-brand mr-1 mb-1 msmw "onClick={this.viewDatas.bind(this, customer.customerId, customer.customerName, customer.alamat, customer.noHp)}><i className="fa fa-eye"></i></Button>
            <Button title="Delete" size="sm" className="btn-youtube btn-brand mr-1 mb-1 msmw" onClick={this.codeDelete.bind(this, customer.customerId, customer.customerName)}><i className="fa fa-trash"></i></Button>
           </div>
          
          }
        })
      }

      return (
        <div className="animated fadeIn">
         <Row>
        <Col>
            <Card>
              <CardHeader className="overscroll">
              <CardHeader>
              <h4>
                  <strong>
                    <i className="fa fa-child" /> Customer
                  </strong>
                 <Button onClick={this.toggleNewAdd.bind(this)} size="sm" className="mr-1 mb-1 float-right" title="Add Customer" color="success"> <i className="fa fa-plus">
                  </i></Button>
                  </h4>
                  </CardHeader>
                  <Modal isOpen={this.state.NewAdd} toggle={this.toggleNewAdd.bind(this)}>
                    <ModalHeader toggle={this.toggleNewAdd.bind(this)}>Add Customer</ModalHeader>
                    <ModalBody>
                    <div>
                      <InputGroup>
                        <Input type="text" id="customerId" name="customerId" placeholder="Enter customerId" value={this.state.addCustomer.customerId} 
                        onChange={(e) => {
                          let {addCustomer} = this.state;
                          addCustomer.customerId = e.target.value;
                          this.setState({ addCustomer });
                        }}/>
                      </InputGroup>
                      <br />
                      <InputGroup>
                        <Input type="text" id="customerName" name="customerName" placeholder="Enter customerName" value={this.state.addCustomer.customerName} 
                        onChange={(e) => {
                          let {addCustomer} = this.state;
                          addCustomer.customerName = e.target.value;
                          this.setState({ addCustomer });
                        }}/>
                      </InputGroup>
                      <br />
                      <InputGroup>
                        <Input type="text" id="alamat" name="alamat" placeholder="Enter alamat "  value={this.state.addCustomer.alamat} 
                        onChange={(e) => {
                          let {addCustomer} = this.state;
                          addCustomer.alamat = e.target.value;
                          this.setState({ addCustomer });
                        }}/>
                      </InputGroup>
                      <br />
                      <InputGroup>
                        <Input type="text" name="noHp" id="noHp" placeholder="Enter noHp" value={this.state.addCustomer.noHp} 
                        onChange={(e) => {
                          let {addCustomer} = this.state;
                          addCustomer.noHp = e.target.value;
                          this.setState({ addCustomer });
                        }}>
                      </Input>
                      </InputGroup>
                      
                    </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="success" onClick={this.addNewCustomer.bind(this)}>Save</Button>
                      <Button color="danger" onClick={this.toggleNewAdd.bind(this)}>Cancel</Button>
                    </ModalFooter>
                  </Modal>

                <Modal isOpen={this.state.viewModal} toggle={this.toggleView.bind(this)}>
                    <ModalHeader toggle={this.toggleView.bind(this)}>View Customer</ModalHeader>
                    <ModalBody>
                    <div><InputGroup>
                      <Label md="3">Customer Id</Label>
                      <Input md="9"type="text" id="customerId" name="customerId" placeholder="Enter customerId"  value={this.state.viewData.customerId} 
                        onChange={(e) => {
                          let {viewData} = this.state;
                          viewData.customerId = e.target.value;
                          this.setState({ viewData });
                        }}/>
                      </InputGroup>
                      <br/>
                      <InputGroup>
                      <Label md="3">customerName</Label>
                        <Input md="9" type="text" id="customerName" name="customerName" placeholder="Enter customerName"  value={this.state.viewData.customerName} 
                        onChange={(e) => {
                          let {viewData} = this.state;
                          viewData.customerName = e.target.value;
                          this.setState({ viewData });
                        }}/>
                      </InputGroup>
                      <br />
                      <InputGroup>
                      <Label md="3">alamat</Label>
                        <Input md="9" type="text" id="alamat" name="alamat" placeholder="Enter alamat" value={this.state.viewData.alamat} 
                        onChange={(e) => {
                          let {viewData} = this.state;
                          viewData.alamat = e.target.value;
                          this.setState({ viewData });
                        }}/>
                      </InputGroup>
                      <br />
                      <InputGroup>
                      <Label md="3">noHp</Label>
                        <Input md="9" type="text" id="noHp" name="noHp" placeholder="Enter noHp"  value={this.state.viewData.noHp} 
                        onChange={(e) => {
                          let {viewData} = this.state;
                          viewData.noHp = e.target.value;
                          this.setState({ viewData });
                        }}/>
                      </InputGroup>
                      </div> 
                    </ModalBody>
                    <ModalFooter>
                      <Button color="success" onClick={this.updateCustomer.bind(this)}>Update</Button>
                      <Button color="danger" onClick={this.toggleView.bind(this)}>Back</Button>
                    </ModalFooter>
                  </Modal>

                  <Modal isOpen={this.state.viewdelete} toggle={this.toggleDelete.bind(this)}>
                    <ModalHeader toggle={this.toggleDelete.bind(this)}>Delete</ModalHeader>
                    <ModalBody>
                    <div>

                    <Label style={{color: 'red', textAlign: 'center', fontSize:'15px'}}>Anda yakin akan meng - HAPUS Customer Id <span style={{color: 'red', textAlign: 'center', fontSize:'15px', fontWeight:'bold'}}>{localStorage.getItem('customerId')} - {localStorage.getItem('customerName')}</span> ?</Label>
                 
                      <br />                  
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="success" onClick={this.delete.bind(this)}>Delete</Button>
                      <Button color="danger" onClick={this.toggleDelete.bind(this)}>Back</Button>
                    </ModalFooter>
                  </Modal>
        <MDBDataTable
            striped
            bordered
            hover
            data={data}
          />
          </CardHeader>
          </Card>
          </Col>
          </Row>
      </div>
    );
  }
}
export default Customer;