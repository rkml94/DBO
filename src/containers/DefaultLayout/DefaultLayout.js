import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container, Alert } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import navigation from '../../_nav';
import {roleAdmin} from '../../_nav'; 

class DefaultLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      users :[],
      status:'',
      checkstatus: ''
    }
    // this.roleDashboard();
    this.checkDate();
    this.checkLs();
    const  checkstatus = localStorage.getItem("status");
    console.log('haii... Please Login !!!')
    }

  roleError(){
    if (localStorage.getItem("status") != 200) {
      return <Redirect to='/login' />
    }
  }

  checkDate(){
    var d = new Date();
      var allDate = d.getFullYear() +"-"+ ("0"+(d.getMonth()+1)).slice(-2) +"-"+("0" + d.getDate()).slice(-2);
       console.log('datanya tanggal', allDate)
       localStorage.setItem('DFilter', allDate);
  }

  checkLs(){
    if (localStorage.getItem("status") != 200) {
      return <Redirect to='/login' />
    }
  }

  render() {
    if(localStorage.getItem("status") != 200){
      return (<Redirect to="/login" />);
    }
    
    let navigation = '';
    var rolesave = localStorage.getItem('role');
    var admin = 'ROLE_ADMIN';
    var customer = 'ROLE_CUSTOMER';
    var supplier = 'ROLE_SUPPLIER';
  if (rolesave === admin){
    console.log('admin');
    navigation = roleAdmin;
  }else if( rolesave !== admin){
    console.log('role tidak tersedia');
    localStorage.setItem('error', "Maaf, Anda tidak punya akses di aplikasi ini, Silahkan hubungi Administrator");
    return <Redirect to='/login' />
  }
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />{console.log('NV', navigation)}
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes}/> */}
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/login" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
