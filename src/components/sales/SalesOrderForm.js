import React from 'react';
import { Input, Modal, Header } from 'semantic-ui-react';
import { FlatButton } from '@innovic/components/shared';
import { Formik } from 'formik';
import Plasma, { Firestore } from '@innovic/plasma';
import firebase from 'firebase';
import SalesOrderItemModalButton from './SalesOrderItemModalButton.js';

const SalesOrderForm = props => {
  const { set, initialValues, batch, docRef, mode } = props;
  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues || { customer: '', customerReference: '' }}
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
      <Firestore.Collection path={`${docRef.path}/salesOrderItems`} schemaless>
        {({ collection, isLoading, error }) =>
          collection.map((soi, index) => {
            return (
              <SalesOrderItemModalButton
                key={index}
                data={{ ...soi }}
                parentdocRef={docRef}
                parentBatch={batch}
                mode={mode}
              />
            );
          })
        }
      </Firestore.Collection>

      <SalesOrderItemModalButton
        data={{ material: '', quantity: '' }}
        parentdocRef={docRef}
        parentBatch={batch}
        mode={mode}
      />
    </React.Fragment>
  );
};

export default SalesOrderForm;
