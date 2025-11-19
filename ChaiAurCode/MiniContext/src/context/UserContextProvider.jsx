import React from "react";
import UserContext from "./UserContext";

//chidren ek genericname hai jo component ke andar jo bhi content hoga wo represent karega
const UserContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  return <>
  <UserContext.Provider value={{ user, setUser }}>
  {children}
  </UserContext.Provider>
  </>;
};

export default UserContextProvider;
