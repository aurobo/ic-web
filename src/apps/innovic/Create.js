import React from 'react';
import { ControlPanel, Button } from '@aurobo/components';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Segment, Input } from 'semantic-ui-react';
import { Formik } from 'formik';
import { Firestore } from '@aurobo/plasma';

const Create = props => (
  <React.Fragment>
    <ControlPanel title={props.title}>
      <Link to={props.cells.create}>
        <Button size="tiny" flat="true" light="true">
          Create
        </Button>
      </Link>
      <Link to={props.cells.import}>
        <Button size="tiny" flat="true">
          Import
        </Button>
      </Link>
    </ControlPanel>
    <Segment attached>
      <Firestore.Set collectionPath="salesOrders" schemaless onSubmit={data => props.history.push(props.cells.list)}>
        {({ set }) => (
          <Formik
            initialValues={{ id: undefined, customer: '', customerReference: '' }}
            onSubmit={set}
            render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Input
                  type="text"
                  name="customer"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.customer}
                />
                {touched.customer && errors.customer && <div>{errors.customer}</div>}
                <Input
                  type="text"
                  name="customerReference"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.customerReference}
                />
                {touched.customerReference && errors.customerReference && <div>{errors.customerReference}</div>}
                <Button type="submit" disabled={isSubmitting} flat="true" light="true">
                  Submit
                </Button>
              </form>
            )}
          />
        )}
      </Firestore.Set>
    </Segment>
  </React.Fragment>
);

export default withRouter(Create);
