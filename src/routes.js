import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';
function Loading() {
  return <div>Loading...</div>;
}

const Customer = Loadable({
  loader: () => import('./views/Customer/Customer'),
  loading: Loading,
});
const Order = Loadable({
  loader: () => import('./views/Order/order'),
  loading: Loading,
});
const Supplier = Loadable({
  loader: () => import('./views/Supplier/supplier'),
  loading: Loading,
});
const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard, exact: true }, 

  { path: '/customer/customer', exact: true, name: 'Customer', component: Customer},
  { path: '/order/order', exact: true, name: 'Order', component: Order},
  { path: '/supplier/supplier', exact: true, name: 'Supplier', component: Supplier},
];

export default routes;
