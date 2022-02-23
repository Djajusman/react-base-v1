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

const Dashboard = () => {

  // const random = (min, max) => {
  //   return Math.floor(Math.random() * (max - min + 1) + min)
  // }
  const token = '8455c5d5685200059c36aa9783ae516f26ce651715cffba3b5a4095490a6ecca'
  const [listDataUser, setListDataUser] = useState([])
  const [visible, setVisible] = useState(false)
  const [name, nameInput] = useInput({ type: "text", placeholder:"Masukkan Nama" });
  const [email, emailInput] = useInput({ type: "email", placeholder:"nama@lalala.com" });
  const [gender, genderInput] = useInput({ type: "text", placeholder:"male/female" });
  const [status, statusInput] = useInput({ type: "text", placeholder:"active/inactive" });
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

  function userList() {
    fetch(
      "https://gorest.co.in/public/v2/users",
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      }
    )
      .then((response) => response.json())
      .then((res) => {
        var tempList = [];
        tempList = res;
        console.log("List Data User => ", tempList);
        setListDataUser(tempList);
      })
      .catch((error) => console.log(error));
  };
  function userAdd() {
    var body = {
      name: name,
      email: email,
      gender: gender,
      status: status,
    }
    fetch(
      "https://gorest.co.in/public/v2/users",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      }
    )
      .then((response) => response.json())
      .then((res) => {
        setVisible(false)
        userList()
        addToast(successToast);
      })
      .catch((error) => console.log(error));
  };
  function useInput({ type, placeholder /*...*/ }) {
    const [value, setValue] = useState("");
    const input = <CFormInput value={value} onChange={e => setValue(e.target.value)} type={type} placeholder={placeholder} />;
    return [value, input];
  }
  useEffect(() => {
    userList()
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
          <CButton color="primary" onClick={() => userAdd()}>Tambah</CButton>
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
