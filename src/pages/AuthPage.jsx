import React from 'react'
import {signInWithPopup, signInWithRedirect} from "firebase/auth"
import { auth, provider } from '../firebase/firebaseConfig'

const AuthPage = () => {

  const handleClick = () => {
    signInWithRedirect(auth, provider)
  }

  return (
    <div className='auth'>
      <h1>Chat Room</h1>
      <p>Devam Etmek İçin Giriş Yapın</p>

      <button onClick={handleClick}>
        <img src="/google-logo.png" alt="google ile giris" />
        <span>Google ile Giriş Yap</span>
      </button>
    </div>
  )
}

export default AuthPage;