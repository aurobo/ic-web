import React from 'react';
import { Link } from 'react-router-dom';
import ListCell from '@aurobo/anatomy/ListCell';
class Invoices extends React.Component {
  render() {
    const listTableColumns = [
      {
        Header: 'Key',
        accessor: 'key',
        Cell: ({ original }) => <Link to={'/sales/invoices/' + original.id}>{original.key}</Link>,
      },
      {
        Header: 'Sales Order',
        accessor: 'salesOrderKey',
        Cell: ({ original }) => (
          <Link to={'/sales/sales-orders/' + original.salesOrderId}>{original.salesOrderKey}</Link>
        ),
      },
      {
        Header: 'Customer',
        accessor: 'salesOrderCustomerName',
        Cell: ({ original }) => (
          <Link to={'/master/customer/' + original.salesOrderCustomerId + '/view'}>
            {original.salesOrderCustomerName}
          </Link>
        ),
      },
      {
        Header: 'Created On',
        accessor: 'key',
        Cell: ({ original }) => <span>{new Date(original.createdOn).toLocaleDateString()}</span>,
      },
    ];

    return <ListCell name="Invoices" getUrl="/invoices" tableColumns={listTableColumns} />;
  }
}

export default Invoices;
