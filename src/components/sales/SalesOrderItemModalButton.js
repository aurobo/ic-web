import React from 'react';
import firebase from 'firebase';
import { Input, Modal } from 'semantic-ui-react';
import { FlatButton } from '@innovic/components/shared';
import { Formik } from 'formik';
import Plasma, { Firestore } from '@innovic/plasma';

const SalesOrderItemModalButton = ({ soi, parentdocRef, parentBatch, mode }) => (
  <Modal trigger={<FlatButton size="tiny"> {soi ? `Edit ${soi.material}` : `Create Sales Order Item`}</FlatButton>}>
    <Plasma.Provider instance={firebase}>
      <Modal.Header>{soi ? `Edit ${soi.material}` : `Create Sales Order Item`}</Modal.Header>
      <Modal.Content scrolling>
        {/* TO_CONFIRM */}
        <Firestore.Set
          path={soi ? `salesOrderItems/${soi.id}` : `salesOrderItems`}
          parentdocRef={parentdocRef}
          parentBatch={mode === 'create' ? parentBatch : undefined}
          schemaless
          shouldCommit={mode === 'edit'}
        >
          {({ set }) => (
            <Formik
              initialValues={soi}
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
);
export default SalesOrderItemModalButton;
