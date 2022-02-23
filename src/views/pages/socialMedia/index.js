import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react'

const SocialMedia = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    dispatch({ type: 'set', sidebarShow: !sidebarShow })
  }, [])
  return (
    <div className="bg-base min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4 text-center">
                <h1>Social Media</h1>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default SocialMedia
