import './App.css';
import { auth, app } from './config/firebase-config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState, useEffect } from 'react';
function App() {
  //#region UTIL FUNCTIONS
  /* UTIL */
  const loginFirebase = async () => {
    console.log("loginFirebase")
    const google_provider = new GoogleAuthProvider();
    const user_credentials = await signInWithPopup(auth, google_provider);
    console.log(user_credentials)
  }
  const logoutFirebase = async () => {
    console.log("logoutFirebase")
    await auth.signOut()
  }
  //#endregion UTIL FUNCTIONS
  //#region STATE
  /* STATE */
  const [user, setUser] = useState(null)
  /* EFFECT */
  useEffect(() => { // componentDidMount
    // on auth state change
    auth.onAuthStateChanged((user_credentials) => {
      console.log("onAuthStateChanged, user_credentials:", user_credentials)
      setUser(user_credentials)
    })
    
  })
  //#endregion STATE
  //#region RENDER
  /* RENDER */
  return (
    <div className="App">
      
      <h1>Aljana</h1>
      {user ? <>
          <h2>Logged in as {user.displayName}</h2> 
          <button onClick={logoutFirebase}>Logout</button>
        </>
        :<>
          <h2>Not logged in</h2>
          <button onClick={loginFirebase}>Login with Google</button>
        </>
      }
    </div>
  );
  //#endregion RENDER
}

export default App;
