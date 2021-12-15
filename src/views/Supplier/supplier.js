import React, { Component } from 'react';
import { InputGroup, Label,Input, Card, CardHeader, Col, Row,  Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import  { IPSERVICE,PATH_SERVICE } from '../config';
import Jsonsupplier from '../Json/supplier.json';
import { get } from 'core-js/core/dict';

class Supplier extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
          supplier: [],
          viewData: {
             supplierId:'',
             supplierName:'',
             alamat:'',
             noHp:'',
          },
          addsupplier: {
            supplierId:'',
             supplierName:'',
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
      this.getSupplier();//untuk memanggil data findall
      this.setState({ supplier : Jsonsupplier });
    }

    getSupplier(){
      const auth = localStorage.getItem('Token');
      this.serverRequest = axios.get(IPSERVICE+PATH_SERVICE+"supplier/findAll", {
        mode: "no-cors",
        headers:{
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: auth,
          },
        })
      .then(response => {
          if (response && response.data) {
            this.setState({ supplier : Jsonsupplier });
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
          addsupplier: {
            supplierId:'',
            supplierName:'',
            alamat:'',
            noHp:'',
        }
      })
    }

    toggleDelete() {
      localStorage.removeItem('supplierId')
      localStorage.removeItem('supplierName')
      this.setState({
        viewdelete: ! this.state.viewdelete
      })
    }
    
    toggleSync() {
      this.setState({
        sync: ! this.state.sync
      })
    }
    

    addNewsupplier() {
      var payload ='{"supplierId":"'+this.state.addsupplier.supplierId+'","supplierName":"'+this.state.addsupplier.supplierName+'","alamat": "'+this.state.addsupplier.alamat+'","noHp": "'+this.state.addsupplier.noHp+'"}';
      const auth = localStorage.getItem('Bearer');
      // console.log('auth', auth);
      this.serverRequest = axios.post(IPSERVICE+PATH_SERVICE+"supplier/api/save", payload, {
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

    
    codeDelete(  supplierId, supplierName ) {
      localStorage.setItem('supplierId', supplierId);
      localStorage.setItem('supplierName', supplierName);
      this.setState({
        viewData: {  supplierId, supplierName }, viewdelete: ! this.state.viewdelete
      });
      // console.log('tes data view', this.setState.timeZone);
    }

    delete() {
      const code = localStorage.getItem('supplierId');
      const auth = localStorage.getItem('Bearer');
      axios.delete(IPSERVICE+PATH_SERVICE+"supplier/api/"+code , {
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: auth,
        },
        })
          localStorage.removeItem('supplierId')
          localStorage.removeItem('supplierName')
    
        this.toggleDelete();
      
    }

   
    
    viewDatas(supplierId, supplierName, alamat, noHp) {
      this.setState({
        viewData: {supplierId, supplierName, alamat, noHp}, viewModal: ! this.state.viewModal
      });
    }

    updatesupplier(){
      var payload ='{"supplierId":"'+this.state.viewData.supplierId+'","supplierName":"'+this.state.viewData.supplierName+'","alamat": "'+this.state.viewData.alamat+'","noHp": "'+this.state.viewData.noHp+'"}';
      const auth = localStorage.getItem('Bearer');
      // console.log('auth', auth);
      this.serverRequest = axios.post(IPSERVICE+PATH_SERVICE+"supplier/api/save",payload, {
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
      let { supplier } = this.state;
      const data = {
        columns: [
          {
            label: 'supplier Id',
            field: 'supplierId',
            sort: 'asc',
            width: 100
          },
          {
            label: 'supplier Nama',
            field: 'supplierName',
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
        rows: supplier.map(supplier => {
          return {
            supplierId: supplier.supplierId,
            supplierName: supplier.supplierName,
            alamat: supplier.alamat,
            noHp: supplier.noHp,
           delete: 
           <div class="action">
            <Button title="View" size="sm" className="btn-twitter btn-brand mr-1 mb-1 msmw "onClick={this.viewDatas.bind(this, supplier.supplierId, supplier.supplierName, supplier.alamat, supplier.noHp)}><i className="fa fa-eye"></i></Button>
            <Button title="Delete" size="sm" className="btn-youtube btn-brand mr-1 mb-1 msmw" onClick={this.codeDelete.bind(this, supplier.supplierId, supplier.supplierName)}><i className="fa fa-trash"></i></Button>
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
                    <i className="fa fa-child" /> supplier
                  </strong>
                 <Button onClick={this.toggleNewAdd.bind(this)} size="sm" className="mr-1 mb-1 float-right" title="Add supplier" color="success"> <i className="fa fa-plus">
                  </i></Button>
                  </h4>
                  </CardHeader>
                  <Modal isOpen={this.state.NewAdd} toggle={this.toggleNewAdd.bind(this)}>
                    <ModalHeader toggle={this.toggleNewAdd.bind(this)}>Add supplier</ModalHeader>
                    <ModalBody>
                    <div>
                      <InputGroup>
                        <Input type="text" id="supplierId" name="supplierId" placeholder="Enter supplierId" value={this.state.addsupplier.supplierId} 
                        onChange={(e) => {
                          let {addsupplier} = this.state;
                          addsupplier.supplierId = e.target.value;
                          this.setState({ addsupplier });
                        }}/>
                      </InputGroup>
                      <br />
                      <InputGroup>
                        <Input type="text" id="supplierName" name="supplierName" placeholder="Enter supplierName" value={this.state.addsupplier.supplierName} 
                        onChange={(e) => {
                          let {addsupplier} = this.state;
                          addsupplier.supplierName = e.target.value;
                          this.setState({ addsupplier });
                        }}/>
                      </InputGroup>
                      <br />
                      <InputGroup>
                        <Input type="text" id="alamat" name="alamat" placeholder="Enter alamat "  value={this.state.addsupplier.alamat} 
                        onChange={(e) => {
                          let {addsupplier} = this.state;
                          addsupplier.alamat = e.target.value;
                          this.setState({ addsupplier });
                        }}/>
                      </InputGroup>
                      <br />
                      <InputGroup>
                        <Input type="text" name="noHp" id="noHp" placeholder="Enter noHp" value={this.state.addsupplier.noHp} 
                        onChange={(e) => {
                          let {addsupplier} = this.state;
                          addsupplier.noHp = e.target.value;
                          this.setState({ addsupplier });
                        }}>
                      </Input>
                      </InputGroup>
                      
                    </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="success" onClick={this.addNewsupplier.bind(this)}>Save</Button>
                      <Button color="danger" onClick={this.toggleNewAdd.bind(this)}>Cancel</Button>
                    </ModalFooter>
                  </Modal>

                <Modal isOpen={this.state.viewModal} toggle={this.toggleView.bind(this)}>
                    <ModalHeader toggle={this.toggleView.bind(this)}>View supplier</ModalHeader>
                    <ModalBody>
                    <div><InputGroup>
                      <Label md="3">supplier Id</Label>
                      <Input md="9"type="text" id="supplierId" name="supplierId" placeholder="Enter supplierId"  value={this.state.viewData.supplierId} 
                        onChange={(e) => {
                          let {viewData} = this.state;
                          viewData.supplierId = e.target.value;
                          this.setState({ viewData });
                        }}/>
                      </InputGroup>
                      <br/>
                      <InputGroup>
                      <Label md="3">supplierName</Label>
                        <Input md="9" type="text" id="supplierName" name="supplierName" placeholder="Enter supplierName"  value={this.state.viewData.supplierName} 
                        onChange={(e) => {
                          let {viewData} = this.state;
                          viewData.supplierName = e.target.value;
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
                      <Button color="success" onClick={this.updatesupplier.bind(this)}>Update</Button>
                      <Button color="danger" onClick={this.toggleView.bind(this)}>Back</Button>
                    </ModalFooter>
                  </Modal>

                  <Modal isOpen={this.state.viewdelete} toggle={this.toggleDelete.bind(this)}>
                    <ModalHeader toggle={this.toggleDelete.bind(this)}>Delete</ModalHeader>
                    <ModalBody>
                    <div>

                    <Label style={{color: 'red', textAlign: 'center', fontSize:'15px'}}>Anda yakin akan meng - HAPUS supplier Id <span style={{color: 'red', textAlign: 'center', fontSize:'15px', fontWeight:'bold'}}>{localStorage.getItem('supplierId')} - {localStorage.getItem('supplierName')}</span> ?</Label>
                 
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
export default Supplier;