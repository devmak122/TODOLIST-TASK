import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import purpleBg from "../../src/assets/images/purpleBg.png";
import signupIllustration from "../../src/assets/images/mainbg.png";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import axios from "axios";

const Register = () => {
    const { API_URL } = useAuth();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            userName: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .min(3, "userName must be at least 3 characters")
                .required("userName is required"),
            email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
        }),
        onSubmit: async (values) => {

            try {
                await axios.post(`${API_URL}/auth/signup`, {
                    userName: values.userName,
                    email: values.email,
                    password: values.password,
                });

                toast.success("User registered successfully!");
                navigate("/login");
            } catch (err) {
                toast.error(
                    "Registration failed: " + (err.response?.data?.message || err.message)
                );
            }
        },

    });

    return (
        <div className="flex 1280:flex-row h-auto w-full 1280:h-screen flex-col-reverse">
            {/* Left Section */}
            <div className="flex flex-col justify-center px-6 1900:px-52 1800:px-40 1700:px-40 1600:px-36 1500:px-32 1440:px-28 1366:px-24 1280:px-20 1024:px-32 768:px-24 600:px-8 w-full 1280:w-1/2">
                <h2 className="text-2xl 600:text-3xl font-medium mb-2 text-center 1280:text-left">
                    Create Your Account
                </h2>
                <p className="font-medium mb-6 text-center 1280:text-left">
                    Fill in your details to register
                </p>

                <form onSubmit={formik.handleSubmit} className="space-y-5 768:space-y-6">
                    {/* userName Field */}
                    <div>
                        <label className="block font-medium mb-1">userName</label>
                        <input
                            type="text"
                            name="userName"
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-[#F2F2F2] focus:outline-none focus:border-purple-500"
                            placeholder="Enter your userName"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.userName && formik.errors.userName && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.userName}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block font-medium mb-1">Email address</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-[#F2F2F2] focus:outline-none focus:border-purple-500"
                            placeholder="Enter your email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-[#F2F2F2] focus:outline-none focus:border-purple-500"
                            placeholder="Enter password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                        )}
                    </div>



                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#AC6AEC] to-[#BB7FF5] text-white py-2 font-semibold rounded-lg hover:bg-purple-700 transition cursor-pointer"
                    >
                        Sign Up
                    </button>

                    {/* Login Link */}
                    <p className="text-center text-gray-500 mt-4 mb-7">
                        Already have an account?{" "}
                        <Link to="/login" className="text-black font-semibold">
                            Login
                        </Link>
                    </p>
                </form>
            </div>

            {/* Right Section */}
            <div className="290:hidden 768:flex 768:w-full 1280:w-1/2 items-center justify-center relative bg-no-repeat 1280:px-0 1280:py-0 768:bg-cover bg-center 768:px-10 768:py-10">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={purpleBg}
                        alt="Background"
                        className="w-full h-full object-cover 768:rounded-b-4xl 1280:rounded-l-4xl 1280:rounded-br-none"
                    />
                </div>

                {/* Main Content Box */}
                <div className="bg-white/20 backdrop-blur-[52%] p-6 768:px-10 rounded-2xl 768:rounded-[46px] shadow-lg text-center relative z-10 1280:w-[70%] flex 768:flex-row 1280:flex-col items-center">
                    <h2 className="text-2xl 768:text-2xl 1024:text-4xl text-white font-bold mb-4 leading-13 1280:max-w-md">
                        Join us today and start managing your tasks!
                    </h2>
                    <img
                        src={signupIllustration}
                        alt="Signup Illustration"
                        className="mt-4 1024:w-[50%] 1280:w-[95%] 768:w-1/2"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
