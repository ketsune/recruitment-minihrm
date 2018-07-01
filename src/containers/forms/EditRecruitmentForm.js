import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const EditRecruitmentForm = ({ data }) => (
  <Form>
    {/* {data} */}
  </Form>
);

EditRecruitmentForm.defaultProps = {
  data: []
};

EditRecruitmentForm.propTypes = {
  data: PropTypes.array
};
export default EditRecruitmentForm;
