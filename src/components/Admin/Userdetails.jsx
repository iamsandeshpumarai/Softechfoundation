import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Userdetails = ({ userData=[] }) => {
const navigate =  useNavigate()
const queryClient = useQueryClient()
  const deleteUser = useMutation(
    {
  mutationKey:['deletedata'],
  mutationFn:async function(id){
const data = await axios.delete(`https://softechbackend-1.onrender.com/user/${id}`)
return data
  },
  onSuccess:()=>{
    toast.success("User Deleted")
    queryClient.invalidateQueries(['userdetails'])
  }
},
)
function DeleteUser(id){
  deleteUser.mutate(id)
}
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border border-gray-300 table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border text-left">#</th>
            <th className="px-4 py-2 border text-left">Name</th>
            <th className="px-4 py-2 border text-left">Company</th>
            <th className="px-4 py-2 border text-left">Email</th>
            <th className="px-4 py-2 border text-left">Job Title</th>
            <th className="px-4 py-2 border text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => {
            const fullName = user.UserName || `${user.FirstName || ""} ${user.LastName || ""}`;
            return (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{fullName}</td>
                <td className="px-4 py-2 border">{user.CompanyName}</td>
                <td className="px-4 py-2 border break-all">{user.BusinessEmail}</td>
                <td className="px-4 py-2 border">{user.Jobtitle || "-"}</td>
                <td className="px-4 py-2 border space-x-1 flex flex-wrap gap-1">
               
                  <button
onClick={()=>DeleteUser(user._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm sm:text-base"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Userdetails;
