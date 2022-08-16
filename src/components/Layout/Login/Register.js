import React, { useState, useEffect } from "react";
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../services/Customer';
import { Spinner } from '../../Layout/Helpers/animation';

function Register(props) {
  const { lang, curr } = props.match.params;

  const [stateObject, setObjectState] = useState({
    givenName: null,
    familyName: null,
    userName: null,
    password: null,
    confirmPassword: null,
    loading: false,
  });

  const dispatch = useDispatch();
  const customer = useSelector(state => state.customer);

  const setGivenName = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setObjectState((prevState) => ({
      ...prevState,
      givenName: value,
    }));
  }

  const setFamilyName = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setObjectState((prevState) => ({
      ...prevState,
      familyName: value,
    }));
  }

  const setUsername = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setObjectState((prevState) => ({
      ...prevState,
      userName: value,
    }));
  }

  const setPassword = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setObjectState((prevState) => ({
      ...prevState,
      password: value,
    }));
  }

  const setConfirmPassword = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setObjectState((prevState) => ({
      ...prevState,
      confirmPassword: value,
    }));
  }

  const registerCustomer = (e) => {
    e.preventDefault();
    setObjectState((prevState) => ({
      ...prevState,
      loading: true,
    }));
  }

  useEffect(() => {
    if (stateObject.loading) {
      dispatch(register(stateObject, lang, curr))
        .finally(() => {
          setObjectState((prevState) => ({
            ...prevState,
            loading: false,
          }));
        });
    }
  }, [stateObject.loading]);

  return (
    (stateObject.loading)
      ?
      <div className="login-form">
        <div className="row">
          <div className="col-md-12 col-12 mb-20">
            <Spinner />
          </div>
        </div>
      </div>
      :
      <Form onSubmit={registerCustomer}>
        <div className="login-form">
          <h4 className="login-title">Register</h4>
          <div className="row">
            <div className="col-md-6 col-12 mb-20">
              <label>First Name</label>
              <input required id="customer.givenName" onChange={setGivenName} className="mb-0" type="text" placeholder="Given Name" />
            </div>
            <div className="col-md-6 col-12 mb-20">
              <label>Last Name</label>
              <input required id="customer.familyName" onChange={setFamilyName} className="mb-0" type="text" placeholder="Family Name" />
            </div>
            <div className="col-md-12 mb-20">
              <label>Email Address*</label>
              <input required id="customer.userName" onChange={setUsername} className="mb-0" type="email" placeholder="Email Address" />
            </div>
            <div className="col-md-6 mb-20">
              <label>Password</label>
              <input required id="customer.password" onChange={setPassword} className="mb-0" type="password" placeholder="Password" />
            </div>
            <div className="col-md-6 mb-20">
              <label>Confirm Password</label>
              <input required onChange={setConfirmPassword} className="mb-0" type="password" placeholder="Confirm Password" />
            </div>
            <div className="col-12">
              <button className="register-button mt-0">Register</button>
            </div>
            <div className="col-md-12">
              {(customer.isError) ? `${customer.error.code} - ${customer.error.description}` : ``}
            </div>
          </div>
        </div>
      </Form>
  )
}

export default Register;
