import React from 'react'
import { Redirect } from 'react-router-dom'

const LandingPage = () => {
  return (
    <Redirect to="/signin" />
  )
}
export default LandingPage