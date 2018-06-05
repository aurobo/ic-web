import React from 'react';
import { Input } from 'semantic-ui-react';
import { FlatButton } from '@innovic/components/shared';
import { Formik } from 'formik';

const SalesOrderForm = ({ onSubmit, initialValues }) => {
  return (
    <Formik
      initialValues={initialValues || { customer: '', customerReference: '' }}
      onSubmit={onSubmit}
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
  );
};

export default SalesOrderForm;
