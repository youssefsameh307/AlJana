import "./App.css";
import { auth, app } from "./config/firebase-config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState, useEffect } from "react";
import { getUserTickets } from "./api";
import UserContext from "./contexts/userContext";
import UserTickets from "./components/UserTickets";
function App() {
  //#region UTIL FUNCTIONS
  /* UTIL */
  const loginFirebase = async () => {
    console.log("loginFirebase");
    const google_provider = new GoogleAuthProvider();
    const user_credentials = await signInWithPopup(auth, google_provider);
    console.log(user_credentials);
  };
  const logoutFirebase = async () => {
    console.log("logoutFirebase");
    await auth.signOut();
  };
  
  //#endregion UTIL FUNCTIONS
  //#region STATE
  /* STATE */
  const [user, setUser] = useState(null);
  //#endregion STATE
  //#region EFFECT
  /* EFFECT */
  useEffect(() => {
    // componentDidMount
    // on auth state change
    auth.onAuthStateChanged((user_credentials) => {
      console.log("onAuthStateChanged, user_credentials:", user_credentials);
      setUser(user_credentials);
      // get ID token from user on login
      if (user_credentials) {
        user_credentials.getIdToken().catch(()=> console.error("getIdToken failed"));
      }
    });
  });
  //#endregion EFFECT
  //#region RENDER
  /* RENDER */
  return (
    <div className="App">
      <h1>Aljana</h1>
      {/* login<->logout user */}
      {user ? (
        <>
          <h2>Logged in as {user.displayName}</h2>
          <button onClick={logoutFirebase}>Logout</button>
        </>
      ) : (
        <>
          <h2>Not logged in</h2>
          <button onClick={loginFirebase}>Login with Google</button>
        </>
      )}
      {/* main */}

      <UserContext.Provider value={user}>
        {user ? (
          <>
            {" "}
            {/* user is logged in */}
            <UserTickets />
          </>
        ) : (
          <> {/* user is not logged in */}</>
        )}
      </UserContext.Provider>
    </div>
  );
  //#endregion RENDER
}

export default App;
