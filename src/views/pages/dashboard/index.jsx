import React, { useEffect, useRef, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CModalHeader,
  CForm,
  CFormLabel,
  CFormInput,
  CToaster,
  CToastBody,
  CToast,
  CToastClose
} from '@coreui/react'
import { getUserList, postUser } from 'src/api'
import { getToken, onMessageListener, firebase } from '../../../config/initFirebase'

const Dashboard = () => {

  // const random = (min, max) => {
  //   return Math.floor(Math.random() * (max - min + 1) + min)
  // }
  const [listDataUser, setListDataUser] = useState([])
  const [visible, setVisible] = useState(false)
  const [name, nameInput] = useInput({ type: "text", placeholder: "Masukkan Nama" });
  const [email, emailInput] = useInput({ type: "email", placeholder: "nama@lalala.com" });
  const [gender, genderInput] = useInput({ type: "text", placeholder: "male/female" });
  const [status, statusInput] = useInput({ type: "text", placeholder: "active/inactive" });
  const [toast, addToast] = useState(0);
  const toaster = useRef();
  const successToast = (
    <CToast autohide={true} visible={false} color="success" className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody>Success</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  );
  const failedToast = (
    <CToast autohide={true} visible={false} color="danger" className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody>Failed</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  );

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  

  
  function messagingFirebase() {
    onMessageListener().then(payload => {
      setShow(true);
      setNotification({title: payload.notification.title, body: payload.notification.body})
      console.log(payload);
    }).catch(err => console.log('failed: ', err));
    // const messaging = firebase.messaging()
    // messaging.requestPermission().then(() => {
    //   return messaging.getToken()
    // }).then(token => {
    //   console.log('Firebase Token : ', token)
    // }).catch((err) => {
    //   console.log(err);
    // })
  }

  function getUserData() {
    getUserList().then((res) => {
      var tempList = [];
      tempList = res.data;
      console.log("List Data User => ", tempList);
      setListDataUser(tempList);
    })
  };

  function postUserData() {
    var data = {
      name: name,
      email: email,
      gender: gender,
      status: status,
    }
    postUser(data).then((res) => {
      console.log("Api status => ", res);
      if (res.statusText === "Created") {
        setVisible(false)
        getUserData()
        addToast(successToast);
      } else {
        addToast(failedToast);
      }
    })
  };

  function useInput({ type, placeholder /*...*/ }) {
    const [value, setValue] = useState("");
    const input = <CFormInput value={value} onChange={e => setValue(e.target.value)} type={type} placeholder={placeholder} />;
    return [value, input];
  }

  useEffect(() => {
    messagingFirebase();
    getToken(setTokenFound)
    getUserData()
  }, [])

  return (
    <>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Tambah User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="name">Name</CFormLabel>
              {nameInput}
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="gender">Gender</CFormLabel>
              {genderInput}
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="email">Email</CFormLabel>
              {emailInput}
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="status">Status</CFormLabel>
              {statusInput}
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Batal
          </CButton>
          <CButton color="primary" onClick={() => postUserData()}>Tambah</CButton>
        </CModalFooter>
      </CModal>
      <CCol className="d-flex flex-row-reverse mb-4">
        <CButton onClick={() => setVisible(!visible)}>Tambah User</CButton>
      </CCol>
      <CCard className='mb-4'>
        <CCardHeader className='fw-bold'>
          List Users
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {listDataUser.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{index + 1}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.gender}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.email}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.status}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CToaster ref={toaster} push={toast} placement="top-end" />
    </>
  )
}

export default Dashboard
