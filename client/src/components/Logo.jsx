import React from 'react'
import logo from '../assets/logo3.png'
const Logo = ({styles}) => {
  return (
    <img src={logo} alt="logo" className={styles}/>
  )
}

export default Logo