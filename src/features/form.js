import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class ContactForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <Field name="firstName" component={React.DOM.input} type="text"/>
        </div>
        <div>
          <label>Last Name</label>
          <Field name="lastName" component={React.DOM.input} type="text"/>
        </div>
        <div>
          <label>Email</label>
          <Field name="email" component={React.DOM.input} type="email"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

// Decorate the form component
ContactForm = reduxForm({
  form: 'contact' // a unique name for this form
})(ContactForm);

export default ContactForm;