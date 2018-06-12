import React from 'react';
import firebase from 'firebase';
import { Input, Modal } from 'semantic-ui-react';
import { FlatButton } from '@aurobo/components';
import { Formik } from 'formik';
import Plasma, { Firestore } from '@aurobo/plasma';

const SalesOrderItemForm = props => {
  const defaultData = { id: undefined, material: '', quantity: '' };
  const { data = defaultData, parentBatch, salesOrderId } = props;
  return (
    <Modal
      trigger={<FlatButton size="tiny"> {data.id ? `Edit ${data.material}` : `Create Sales Order Item`}</FlatButton>}
    >
      <Plasma.Provider instance={firebase}>
        <Modal.Header>{data.id ? `Edit ${data.material}` : `Create Sales Order Item`}</Modal.Header>
        <Modal.Content scrolling>
          <Firestore.Set
            collectionPath={`salesOrders/${salesOrderId}/salesOrderItems`}
            //currently no facility to use existing back, should be handled later on
            //parentBatch={salesOrderId ? undefined : parentBatch}

            schemaless
          >
            {({ set, isLoading, error }) => (
              <Formik
                initialValues={data}
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
          <Firestore.Delete docPath={`salesOrders/${salesOrderId}/salesOrderItems/${data.id}`}>
            {({ deleteDoc }) => (
              <FlatButton size="tiny" onClick={deleteDoc}>
                Delete
              </FlatButton>
            )}
          </Firestore.Delete>
        </Modal.Content>
      </Plasma.Provider>
    </Modal>
  );
};
export default SalesOrderItemForm;
