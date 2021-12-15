// exports.__esModule = true;
export const roleAdmin = {
  items: [
    {
      name: 'Dashboard',
      url: '/',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Menu',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    
    {
      name: 'Customer',
      url: '/customer/customer',
      icon: 'fa fa-user',
    },
    {
      name: 'Supplier',
      url: '/supplier/supplier',
      icon: 'fa fa-child',
    },
    {
      name: 'Order',
      url: '/order/order',
      icon: 'icon-basket',
    },
  ]
};
