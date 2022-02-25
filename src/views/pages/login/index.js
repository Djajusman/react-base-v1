import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const dispatch = useDispatch()
  const isLogged = useSelector((state) => state.isLogged)
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  useEffect(() => {
    
  }, []);

  return (
    <div className="bg-base min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <h1>Login</h1>
                  <p className="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput type='text' id='userName' placeholder="Username" autoComplete="username" required />
                    <CFormFeedback invalid>Please provide a valid username.</CFormFeedback>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      id='password'
                      placeholder="Password"
                      autoComplete="current-password"
                      required
                    />
                    <CFormFeedback invalid>Password must have at least 8 character!</CFormFeedback>
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton type='submit' color="primary" className="px-4" onClick={() => dispatch({ type: 'set', isLogged: !isLogged })}>
                        Login
                      </CButton>
                    </CCol>
                    <CCol xs={6} className="d-flex flex-row-reverse">
                      <CButton color="link" className="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                  {/* <CButton
                    title="Sign In"
                    onPress={() =>
                      onSignIn({
                        uid: 'Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9',
                        username: 'Joaquin Phoenix',
                        email: 'phoenix@example.com',
                        credits: 42,
                      })
                    }
                  /> */}
                  {/* <CButton title="Test Crash" onPress={() => crashlytics().crash()} /> */}
                </CForm>
                <CRow className='text-center mt-3'>
                  <div>
                    Dont have any account?
                    <Link to="/register">
                      Register here
                    </Link>
                  </div>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
