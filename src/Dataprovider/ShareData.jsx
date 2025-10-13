import { useContext } from "react";
import { UserToken } from "./UserContext";

export const UserData =()=>{
   return  useContext(UserToken)
}