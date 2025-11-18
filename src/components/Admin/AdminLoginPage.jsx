import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

const AdminLoginPage = () => {
  const navigate = useNavigate();
const queryClient = useQueryClient()

  const adminData = useMutation({
    mutationKey: ["admindata"],
    mutationFn: async (admindata) => {
      const res = await axios.post(
        "https://softechbackend-2.onrender.com/admin/adminlogin",
        admindata,
        { withCredentials: true }
      );
      return res.data;
    },
    onMutate: () => {
      toast.info("Logging in...");
    },
    onSubmit:()=>{
      toast.info("submited")
    }
    ,
    onError: (err) => {
      toast.dismiss()
      toast.error(err.response.data.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["userlogin"])
      toast.dismiss()
            toast.success("Logged in successfully!");
            navigate("/admindashboard"); // redirects
            console.log(data,'is the data')
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    adminData.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-2 font-semibold">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full border rounded-lg p-3 focus:outline-none border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="@gmail.com"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-semibold">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full border rounded-lg p-3 focus:outline-none border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || adminData.isPending}
            className={`w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ${
              isSubmitting || adminData.isPending
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isSubmitting || adminData.isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          © 2025 Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
