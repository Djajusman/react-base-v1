import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CAvatar, CCol, CImage, CRow, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import swamediaLogo from './../assets/brand/logo-swamedia.png'
import avatar from './../assets/images/avatars/7.jpg'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      className='bg-base-color'
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CImage className='sidebar-brand-full' src={swamediaLogo} alt='Swamedia' height={45} />
        <CImage className="sidebar-brand-narrow" src='https://swamedia.co.id/wp-content/uploads/2020/08/cropped-favicon-1-192x192.png' height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <div className='sidebar-brand-full'>
          <CRow>
            <CCol className='d-flex justify-content-center pt-5 pb-3'>
              <CAvatar className='sidebar-brand-full' src={avatar} alt='Avatar' size="xl" />
            </CCol>
          </CRow>
          <CRow>
            <CCol className='d-flex justify-content-center pb-5'>
              <strong>Admin Swamedia</strong>
            </CCol>
          </CRow>
        </div>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
