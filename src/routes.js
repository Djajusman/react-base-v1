import React from 'react'

const Dashboard = React.lazy(() => import('./views/pages/dashboard'))
const SocialMedia = React.lazy(() => import('./views/pages/socialMedia'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/social-media', name: 'Social Media', component: SocialMedia }
]

export default routes
