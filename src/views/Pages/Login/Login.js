import React from 'react';
// import { Link } from 'react-router-dom';
import { Button, Card,Label,  CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
// import { Hash } from 'crypto';
import axios from 'axios';
import  { IPSERVICE, PATH_SERVICE } from '../../config';
import { Formik } from 'formik';

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      danger: false,
      username: '',
      password: '',
      defaultValue:{
      username: '',
      password: ''
      }
    }
    this.toggleDanger = this.toggleDanger.bind(this);
    // this.timeout();
    this.onload();
  }

  onload(){
       var ex = localStorage.getItem("error");
      if (ex !== null){
        setInterval(function(){
          localStorage.setItem('error', '')
        }, 10000)
        console.log('1', ex);
      }
  };
  timeout(){
    var times = new Date().getSeconds();
    localStorage.setItem('times', times);
    if(localStorage.getItem('times') !== null ){
      setTimeout(localStorage.clear(), 100000);
    }
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 4;
  }
  
  handleUsername(text){
    this.setState({username: text.target.value})
  }

  handlePassword(text){
    this.setState({password: text.target.value})
  }

  onFormSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    }

    
  toggleDanger() {
    this.setState({
      danger: !this.state.danger,
    });
  }

  goHome(values){
  var payload ='{"username":"'+values.username+'","password":"'+values.password+'" }';
  localStorage.setItem('username', values.username);
  axios.post(IPSERVICE+PATH_SERVICE+"signin",payload, {
  headers : {
        Accept: 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json'
        },
    })
    .then((response) => {
    console.log('1', response);
    if(response.status === 200){
      const userToken = response.data.accessToken;
      window.location.hash = "/";
      localStorage.setItem('status', response.status);
      localStorage.setItem('token', userToken);
      var rl =  response.data.roles[0];
      localStorage.setItem('role', rl);
      var admin = 'ROLE_ADMINISTRATOR';
      var roles =localStorage.getItem('role');
      if(roles === admin){
        window.location.hash="/"
      }

      }else{
        console.log('tidak login')
        console.log("Username does not exists");
        alert("Username atau password salah");
        window.location.hash = "/";
        }
        })
        .catch(function (error) {
        console.log(error);
        console.log('tidak login')
        console.log("Username does not exists");
        window.location.hash = "/";
        localStorage.setItem('error', 'Username atau Password Salah');
        console.log(localStorage.getItem('error'))
      });
    }
  goLogin(){
    window.location.hash = '/login';
    }
 
    afterFilter = () => {
      var cekData = localStorage.getItem('error');
      if (cekData === 1) {
        return false;
      }
      return true;
    }

  render() {
    return (
      <div className="app flex-row align-items-center backgroundLogin">
      <Container>
        <Row className="justify-content-center">
          <Col md="4">
            <CardGroup>
              <Card className="p-4">
              <Label className="titleLogin"> Login Disini !!!</Label>
                <CardBody>
                <Formik initialValues={this.state.defaultValue}
                    onSubmit={this.goHome}
                    render={({
                      values,
                      errors,
                      handleChange,
                      handleSubmit,
                      handleBlur,
                      touched
                    }) => (
                      <Form onSubmit={handleSubmit} noValidate name='loginForm'>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="username" name="username" placeholder="Username" autoComplete="username" invalid={touched.username && !!errors.username}
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="password" name="password" type="password" placeholder="Password" className="password" autoComplete="current-password"
                          invalid={touched.password && !!errors.password}
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}/>
                      </InputGroup>
                      <Row className="btn-container" style={{marginBottom:'-10%'}}>
                        <Col xs="12">
                          <Button type="submit" color="primary" id="btn-login" className="px-4 btn-block text-white btn-custom" style={{fontWeight:'450', borderRadius:'24px' ,width:'50%' ,margin:'auto'}}><span className="span-custom">Login</span></Button>
                        </Col>
                      </Row>
                    </Form>
                    )}
                    >
                    </Formik>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;

