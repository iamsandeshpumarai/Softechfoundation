import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2, Mail, Briefcase, Building2, User } from "lucide-react";

const Userdetails = ({ userData = [] }) => {
  const queryClient = useQueryClient();

  // Mutation with better UX handling
  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationKey: ['deletedata'],
    mutationFn: async (id) => {
      const response = await axios.delete(`https://softechbackend-2.onrender.com/user/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("User removed from records");
      queryClient.invalidateQueries(['userdetails']);
    },
    onError: () => {
      toast.error("Failed to delete user");
    }
  });

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      {/* Table Header Section */}
      <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
        <div>
          <h3 className="text-lg font-bold text-slate-800">System Users</h3>
          <p className="text-sm text-slate-500">A total of {userData.length} registered accounts</p>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">User Details</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Company</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Contact</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Job Title</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {userData.map((user, index) => {
              const fullName = user.UserName || `${user.FirstName || ""} ${user.LastName || ""}`;
              
              return (
                <tr key={user._id} className="hover:bg-slate-50/80 transition-colors group">
                  {/* User Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs border border-indigo-200">
                        {getInitials(fullName)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{fullName}</div>
                        <div className="text-[11px] text-slate-400 font-medium">ID: #{user._id.slice(-6)}</div>
                      </div>
                    </div>
                  </td>

                  {/* Company Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Building2 size={14} className="text-slate-400" />
                      {user.CompanyName}
                    </div>
                  </td>

                  {/* Contact Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail size={14} className="text-slate-400" />
                      <span className="truncate max-w-[180px]">{user.BusinessEmail}</span>
                    </div>
                  </td>

                  {/* Job Title Column */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      <Briefcase size={12} />
                      {user.Jobtitle || "Standard User"}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 text-right">
                    <button
                      disabled={isDeleting}
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this user?")) {
                          deleteUser(user._id);
                        }
                      }}
                      className={`p-2 rounded-lg transition-all ${
                        isDeleting 
                        ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
                        : 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                      }`}
                      title="Delete User"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}

            {userData.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <User size={40} className="opacity-20" />
                    <p className="text-sm font-medium">No users found in the database</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Userdetails;