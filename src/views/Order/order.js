import React, { Component } from 'react';
import { InputGroup, Label,Input, Card, CardHeader, Col, Row,  Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import  { IPSERVICE,PATH_SERVICE } from '../config';
import Jsonorder from '../Json/order.json';
import { get } from 'core-js/core/dict';

class Order extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
          order: [],
          viewData: {
             orderId:'',
             orderName:'', 
             jumlahOrder:'', 
             note:'',  
             harga:'',
             totalHarga:'',
             customerName:'',
             supplierName:'',
          },
          addOrder: {
             orderId:'',
             orderName:'', 
             jumlahOrder:'', 
             note:'', 
             harga:'', 
             totalHarga:'',
             customerName:'',
             supplierName:'',
          },
          viewModal: false,
          Bearer : '',
          NewAdd : false,
          delete : false,
          viewdelete: false,
      }
    }
  
    componentDidMount() {
      this.getOrder();//untuk memanggil data findall
      this.setState({ order : Jsonorder });
    }

    getOrder(){
      const auth = localStorage.getItem('Token');
      this.serverRequest = axios.get(IPSERVICE+PATH_SERVICE+"order/findAll", {
        mode: "no-cors",
        headers:{
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: auth,
          },
        })
      .then(response => {
          if (response && response.data) {
            this.setState({ order : Jsonorder });
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
          addOrder: {
               orderId:'',
               orderName:'', 
               jumlahOrder:'', 
               note:'',  
               harga:'',
               totalHarga:'',
               customerName:'',
               supplierName:'',
        }
      })
    }

    toggleDelete() {
      localStorage.removeItem('orderId')
      localStorage.removeItem('orderName')
      this.setState({
        viewdelete: ! this.state.viewdelete
      })
    }
    
    toggleSync() {
      this.setState({
        sync: ! this.state.sync
      })
    }
    

    addNewOrder() {
      var payload ='{"orderId":"'+this.state.addOrder.orderId+'","orderName":"'+this.state.addOrder.orderName+'","jumlahOrder": "'+this.state.addOrder.jumlahOrder+'","note": "'+this.state.addOrder.note+'","totalHarga": "'+this.state.addOrder.totalHarga+'","Harga": "'+this.state.addOrder.Harga+'","customerName": "'+this.state.addOrder.customerName+'","supplierName": "'+this.state.addOrder.supplierName+'" }';
      const auth = localStorage.getItem('Bearer');
      // console.log('auth', auth);
      this.serverRequest = axios.post(IPSERVICE+PATH_SERVICE+"order/api/save", payload, {
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

    
    codeDelete(  orderId, orderName ) {
      localStorage.setItem('orderId', orderId);
      localStorage.setItem('orderName', orderName);
      this.setState({
        viewData: {  orderId, orderName }, viewdelete: ! this.state.viewdelete
      });
      // console.log('tes data view', this.setState.timeZone);
    }

    delete() {
      const code = localStorage.getItem('orderid');
      const auth = localStorage.getItem('Bearer');
      axios.delete(IPSERVICE+PATH_SERVICE+"order/api/"+code , {
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: auth,
        },
        })
          localStorage.removeItem('orderId')
          localStorage.removeItem('orderName')
    
        this.toggleDelete();
      
    }

   
    
    viewDatas(orderId, orderName, jumlahOrder, note, harga, totalHarga,customerName,supplierName) {
      this.setState({
        viewData: {orderId, orderName, jumlahOrder, note, harga, totalHarga,customerName,supplierName}, viewModal: ! this.state.viewModal
      });
    }

    updateOrder(){
      var payload ='{"orderId":"'+this.state.viewData.orderId+'","orderName":"'+this.state.viewData.orderName+'","jumlahOrder": "'+this.state.viewData.jumlahOrder+'","note": "'+this.state.viewData.note+'","totalHarga": "'+this.state.viewData.totalHarga+'","Harga": "'+this.state.viewData.Harga+'","customerName": "'+this.state.viewData.customerName+'","supplierName": "'+this.state.viewData.supplierName+'" }';
      const auth = localStorage.getItem('Bearer');
      // console.log('auth', auth);
      this.serverRequest = axios.post(IPSERVICE+PATH_SERVICE+"order/api/save",payload, {
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
      let { order } = this.state;
      const data = {
        columns: [
          {
            label: 'Order Id',
            field: 'orderId',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Order Nama',
            field: 'orderName',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Jumlah Order',
            field: 'jumlahOrder',
            sort: 'asc',
            width: 100
          },
          {
            label: 'note',
            field: 'note',
            sort: 'asc',
            width: 200
          },
          {
            label: 'Harga',
            field: 'harga',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Total Harga',
            field: 'totalHarga',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Customer Name',
            field: 'customerName',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Supplier Name',
            field: 'supplierName',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Action ',
            field: 'delete',
            sort: 'asc',
            width: 20
          }
        ],
        rows: order.map(order => {
          return {
            orderId: order.orderId,
            orderName: order.orderName,
            jumlahOrder: order.jumlahOrder,
            note: order.note,
            harga: order.harga,
            totalHarga: order.totalHarga,
            customerName: order.customerName,
            supplierName: order.supplierName,
           delete: 
           <div class="action">
            <Button title="View" size="sm" className="btn-twitter btn-brand mr-1 mb-1 msmw "onClick={this.viewDatas.bind(this, order.orderId, order.orderName, order.jumlahOrder, order.note,  order.harga, order.totalHarga,order.customerName,order.supplierName)}><i className="fa fa-eye"></i></Button>
            <Button title="Delete" size="sm" className="btn-youtube btn-brand mr-1 mb-1 msmw" onClick={this.codeDelete.bind(this, order.orderId, order.orderName)}><i className="fa fa-trash"></i></Button>
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
                    <i className="icon-basket" /> Order
                  </strong>
                 <Button onClick={this.toggleNewAdd.bind(this)} size="sm" className="mr-1 mb-1 float-right" title="Add Order" color="success"> <i className="fa fa-plus">
                  </i></Button>
                  </h4>
                  </CardHeader>
                  <Modal isOpen={this.state.NewAdd} toggle={this.toggleNewAdd.bind(this)}>
                    <ModalHeader toggle={this.toggleNewAdd.bind(this)}>Add Order</ModalHeader>
                    <ModalBody>
                    <div>
                      <InputGroup>
                        <Input type="text" id="orderId" name="orderId" placeholder="Enter orderId" value={this.state.addOrder.orderId} 
                        onChange={(e) => {
                          let {addOrder} = this.state;
                          addOrder.orderId = e.target.value;
                          this.setState({ addOrder });
                        }}/>
                      </InputGroup>
                      <br />
                      <InputGroup>
                        <Input type="text" id="orderName" name="orderName" placeholder="Enter orderName" value={this.state.addOrder.orderName} 
                        onChange={(e) => {
                          let {addOrder} = this.state;
                          addOrder.orderName = e.target.value;
                          this.setState({ addOrder });
                        }}/>
                      </InputGroup>
                      <br />
                      <InputGroup>
                        <Input type="text" id="jumlahOrder" jumlahOrder="jumlahOrder" placeholder="Enter jumlahOrder "  value={this.state.addOrder.jumlahOrder} 
                        onChange={(e) => {
                          let {addOrder} = this.state;
                          addOrder.jumlahOrder = e.target.value;
                          this.setState({ addOrder });
                        }}/>
                      </InputGroup>
                      <br />
                      <InputGroup>
                        <Input type="text" name="harga" id="harga" placeholder="Enter Harga" value={this.state.addOrder.harga} 
                        onChange={(e) => {
                          let {addOrder} = this.state;
                          addOrder.harga = e.target.value;
                          this.setState({ addOrder });
                        }}>
                      </Input>
                      </InputGroup>
                      <br/>
                      <InputGroup>
                      <Input type="text" name="totalHarga" id="totalHarga" placeholder="Enter Total Harga" value={this.state.addOrder.totalHarga} 
                        onChange={(e) => {
                          let {addOrder} = this.state;
                          addOrder.totalHarga = e.target.value;
                          this.setState({ addOrder });
                        }}>
                      </Input>
                      </InputGroup>
                      <br/>
                      <InputGroup>
                      <Input type="text" name="customerName" id="customerName" placeholder="Enter Customer Name" value={this.state.addOrder.customerName} 
                        onChange={(e) => {
                          let {addOrder} = this.state;
                          addOrder.customerName = e.target.value;
                          this.setState({ addOrder });
                        }}>
                      </Input>
                      </InputGroup>
                      <br/>
                      <InputGroup>
                      <Input type="text" name="supplierName" id="supplierName" placeholder="Enter supplier Name" value={this.state.addOrder.supplierName} 
                        onChange={(e) => {
                          let {addOrder} = this.state;
                          addOrder.supplierName = e.target.value;
                          this.setState({ addOrder });
                        }}>
                      </Input>
                      </InputGroup>
                      <br/>
                      <InputGroup>
                      <Input type="textarea" name="note" id="note" placeholder="Enter note" value={this.state.addOrder.note} 
                        onChange={(e) => {
                          let {addOrder} = this.state;
                          addOrder.note = e.target.value;
                          this.setState({ addOrder });
                        }}>
                      </Input>
                      </InputGroup>
                    </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="success" onClick={this.addNewOrder.bind(this)}>Save</Button>
                      <Button color="danger" onClick={this.toggleNewAdd.bind(this)}>Cancel</Button>
                    </ModalFooter>
                  </Modal>

                <Modal isOpen={this.state.viewModal} toggle={this.toggleView.bind(this)}>
                    <ModalHeader toggle={this.toggleView.bind(this)}>View Order</ModalHeader>
                    <ModalBody>
                    <div><InputGroup>
                      <Label md="3">Order Id</Label>
                      <Input md="9"type="text" id="orderId" name="orderId" placeholder="Enter orderId"  value={this.state.viewData.orderId} 
                        onChange={(e) => {
                          let {viewData} = this.state;
                          viewData.orderId = e.target.value;
                          this.setState({ viewData });
                        }}/>
                      </InputGroup>
                      <br/>
                      <InputGroup>
                      <Label md="3">orderName</Label>
                        <Input md="9" type="text" id="orderName" name="orderName" placeholder="Enter orderName"  value={this.state.viewData.orderName} 
                        onChange={(e) => {
                          let {viewData} = this.state;
                          viewData.orderName = e.target.value;
                          this.setState({ viewData });
                        }}/>
                      </InputGroup>
                      <br />
                      <InputGroup>
                      <Label md="3">jumlahOrder</Label>
                        <Input md="9" type="text" id="jumlahOrder" name="jumlahOrder" placeholder="Enter jumlahOrder" value={this.state.viewData.jumlahOrder} 
                        onChange={(e) => {
                          let {viewData} = this.state;
                          viewData.jumlahOrder = e.target.value;
                          this.setState({ viewData });
                        }}/>
                      </InputGroup>
                      <br />
                      <InputGroup>
                      <Label md="3">Harga</Label>
                        <Input md="9" type="text" id="Harga" name="Harga" placeholder="Enter Harga"  value={this.state.viewData.harga} 
                        onChange={(e) => {
                          let {viewData} = this.state;
                          viewData.harga = e.target.value;
                          this.setState({ viewData });
                        }}/>
                      </InputGroup>
                      <br />
                      <InputGroup>
                      <Label md="3">Total Harga</Label>
                      <Input md="9"type="text" id="totalHarga" name="totalHarga" placeholder="Enter totalHarga"  value={this.state.viewData.totalHarga} 
                        onChange={(e) => {
                          let {viewData} = this.state;
                          viewData.totalHarga = e.target.value;
                          this.setState({ viewData });
                        }}/>
                      </InputGroup>
                      <br />
                      <InputGroup>
                      <Label md="3">Customer Name</Label>
                      <Input md="9"type="text" id="customerName" name="customerName" placeholder="Enter customerName"  value={this.state.viewData.customerName} 
                        onChange={(e) => {
                          let {viewData} = this.state;
                          viewData.customerName = e.target.value;
                          this.setState({ viewData });
                        }}/>
                      </InputGroup>
                      </div> 
                      <br />
                      <InputGroup>
                      <Label md="3">Supplier Name</Label>
                      <Input md="9"type="text" id="suppliername" name="suppliername" placeholder="Enter suppliername"  value={this.state.viewData.supplierName} 
                        onChange={(e) => {
                          let {viewData} = this.state;
                          viewData.supplierName = e.target.value;
                          this.setState({ viewData });
                        }}/>
                      </InputGroup>
                       <br />
                      <InputGroup>
                      <Label md="3">Note</Label>
                      <Input md="9"type="text" id="note" name="note" placeholder="Enter note"  value={this.state.viewData.note} 
                        onChange={(e) => {
                          let {viewData} = this.state;
                          viewData.note = e.target.value;
                          this.setState({ viewData });
                        }}/>
                      </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="success" onClick={this.updateOrder.bind(this)}>Update</Button>
                      <Button color="danger" onClick={this.toggleView.bind(this)}>Back</Button>
                    </ModalFooter>
                  </Modal>

                  <Modal isOpen={this.state.viewdelete} toggle={this.toggleDelete.bind(this)}>
                    <ModalHeader toggle={this.toggleDelete.bind(this)}>Delete</ModalHeader>
                    <ModalBody>
                    <div>

                    <Label style={{color: 'red', textAlign: 'center', fontSize:'15px'}}>Anda yakin akan meng - HAPUS Order Id <span style={{color: 'red', textAlign: 'center', fontSize:'15px', fontWeight:'bold'}}>{localStorage.getItem('orderId')} - {localStorage.getItem('orderName')}</span> ?</Label>
                 
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
export default Order;