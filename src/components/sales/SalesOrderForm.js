import React from 'react';
import { Input, Modal, Header } from 'semantic-ui-react';
import { FlatButton } from '@innovic/components/shared';
import { Formik } from 'formik';
import Plasma, { Firestore } from '@innovic/plasma';
import firebase from 'firebase';

const SalesOrderForm = props => {
  const { set, initialValues, batch, docRef } = props;
  return (
    <Formik
      initialValues={initialValues || { customer: '', customerReference: '' }}
      onSubmit={set}
      render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <React.Fragment>
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

          <Modal trigger={<FlatButton size="tiny">Add Sales Order Item</FlatButton>}>
            <Plasma.Provider instance={firebase}>
              <Modal.Header>Create Sales Order Item</Modal.Header>
              <Modal.Content scrolling>
                {/* TO_CONFIRM */}
                <Firestore.Set path="salesOrderItems" parentBatch={batch} parentdocRef={docRef} schemaless>
                  {({ set }) => (
                    <Formik
                      initialValues={initialValues || { material: '', quantity: '' }}
                      onSubmit={set}
                      render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                          <Input
                            type="text"
                            name="material"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.material}
                          />
                          {touched.material && errors.material && <div>{errors.material}</div>}
                          <Input
                            type="password"
                            name="quantity"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.quantity}
                          />
                          {touched.quantity && errors.quantity && <div>{errors.quantity}</div>}
                          <FlatButton type="submit" disabled={isSubmitting}>
                            Submit
                          </FlatButton>
                        </form>
                      )}
                    />
                  )}
                </Firestore.Set>
              </Modal.Content>
            </Plasma.Provider>
          </Modal>
        </React.Fragment>
      )}
    />
  );
};

export default SalesOrderForm;
