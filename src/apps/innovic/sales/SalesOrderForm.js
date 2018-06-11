import React from 'react';
import { Input, Modal, Header } from 'semantic-ui-react';
import { FlatButton } from '@aurobo/components';
import { Formik } from 'formik';
import Plasma, { Firestore } from '@aurobo/plasma';
import firebase from 'firebase';
import SalesOrderItemForm from './SalesOrderItemForm';

const SalesOrderForm = props => {
  let defaultData = { id: undefined, customer: '', customerReference: '' };
  const { set, data = defaultData, batch } = props;
  return (
    <React.Fragment>
      <Formik
        initialValues={data}
        onSubmit={set}
        render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Input type="text" name="customer" onChange={handleChange} onBlur={handleBlur} value={values.customer} />
            {touched.customer && errors.customer && <div>{errors.customer}</div>}
            <Input
              type="password"
              name="customerReference"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.customerReference}
            />
            {touched.customerReference && errors.customerReference && <div>{errors.customerReference}</div>}
            <FlatButton type="submit" disabled={isSubmitting}>
              Submit
            </FlatButton>
          </form>
        )}
      />
      <Firestore.Collection path={`salesOrders/${data.id}/salesOrderItems`} schemaless>
        {({ collection, isLoading, error }) =>
          collection.map((soi, index) => {
            return <SalesOrderItemForm salesOrderId={data.id} key={index} data={{ ...soi }} parentBatch={batch} />;
          })
        }
      </Firestore.Collection>

      {data.id ? (
        <React.Fragment>
          <Firestore.Delete docPath={`salesOrders/${data.id}`}>
            {({ deleteDoc }) => (
              <FlatButton size="tiny" onClick={deleteDoc}>
                Delete
              </FlatButton>
            )}
          </Firestore.Delete>
          <SalesOrderItemForm salesOrderId={data.id} parentBatch={batch} />
        </React.Fragment>
      ) : (
        'please SAVE the sales order to add sales items in it'
      )}
    </React.Fragment>
  );
};

export default SalesOrderForm;
