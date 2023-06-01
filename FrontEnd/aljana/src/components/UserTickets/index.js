import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/userContext";
import { getUserTickets } from "../../api";

const UserTickets = () => {
  /* USER CONTEXT passed from parent */
  const user = useContext(UserContext);
  //#region STATE
  /* STATE */
  const [tickets, setTickets] = useState(null);
  //#endregion STATE
  //#region EFFECT
  /* EFFECT */
  useEffect(() => {
  }, [user]);
  //#endregion EFFECT
  //#region UTIL FUNCTIONS
    /* UTIL */
    const fetchData = async () => {
        let tickets = await getUserTickets(user);
        setTickets(tickets);
    };
  //#endregion UTIL FUNCTIONS
  //#region RENDER
  /* RENDER */
  if (!user) return <h1>To view user Tickets please Login</h1>;
  return (
    <>
      <h1>User Tickets</h1>
      <button onClick={fetchData}>show your tickets</button>
      <p>{JSON.stringify(tickets)}</p>
    </>
  );
  //#endregion RENDER
};

export default UserTickets;
