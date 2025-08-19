import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
// import mainlogo from "../../src/assets/images/logo.svg";
import purpleBg from "../../src/assets/images/purpleBg.png";
import signupIllustration from "../../src/assets/images/mainbg.png";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
    const { login, API_URL } = useAuth();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
        }),
        onSubmit: async (values) => {
            try {
                const { data } = await axios.post(`${API_URL}/auth/login`, {
                    email: values.email,
                    password: values.password
                });
                login(data.token);
                navigate('/tasks');
                toast.success("logged in successfully");

            } catch (err) {
                toast.error('Login failed');
                toast.error("Login failed: " + (err.response?.data?.message || err.message));

            }

        },
    });

    return (
        <div className="flex 1280:flex-row h-auto w-full 1280:h-screen flex-col-reverse">
            {/*---------------------------------------left main div ---------------------------------------------------------------- */}
            <div className="flex flex-col justify-center px-6 1900:px-52 1800:px-40 1700:px-40 1600:px-36 1500:px-32 1440:px-28 1366:px-24 1280:px-20 1024:px-32 768:px-24 600:px-8 w-full 1280:w-1/2">
                <div className="mb-6 max-768:mt-10 flex items-center justify-center">

                </div>

                <h2 className="text-2xl 600:text-3xl font-medium mb-2 text-center 1280:text-left">
                    Welcome Back!
                </h2>
                <p className="font-medium mb-6 text-center 1280:text-left">
                    Enter Your Details
                </p>

                <form onSubmit={formik.handleSubmit} className="space-y-5 768:space-y-6">
                    {/*------------------------------------------------------------- Email Field----------------------------------------- */}
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

                    {/*------------------------------------------------- Password Field----------------------------------------------- */}
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
                            <p className="text-red-500 text-sm mt-1">
                                {formik.errors.password}
                            </p>
                        )}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex flex-col 768:flex-row 768:items-center justify-between">
                        <div
                            className="flex items-center mb-2 768:mb-0 cursor-pointer"
                            onClick={() =>
                                formik.setFieldValue("rememberMe", !formik.values.rememberMe)
                            }
                        >
                            <input
                                type="checkbox"
                                name="rememberMe"
                                className="accent-purple-500 h-5 w-5 cursor-pointer"
                                checked={formik.values.rememberMe}
                                onChange={formik.handleChange}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <label className="ml-2 text-sm font-normal">Remember me</label>
                        </div>

                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#AC6AEC] to-[#BB7FF5] text-white py-2 font-semibold rounded-lg hover:bg-purple-700 transition cursor-pointer"
                    >
                        Sign in
                    </button>

                    {/* Sign Up Link */}
                    <p className="text-center text-gray-500 mt-4 mb-7">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-black font-semibold">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>


            {/*---------------------------------------left main div end ---------------------------------------------------------------- */}
            {/*----------------------------------------------------------- Right div----------------------------------------- */}
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
                        Very good works are waiting for you! Login Now!!!
                    </h2>
                    <img
                        src={signupIllustration}
                        alt="Signup Illustration"
                        className="mt-4 1024:w-[50%] 1280:w-[95%] 768:w-1/2"
                    />
                </div>
            </div>
            {/*----------------------------------------------------------- Right div end----------------------------------------- */}
        </div>
    );
};

export default Login;
