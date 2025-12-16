import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
  

    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const password = watch("password");
    const [upazila, setUpazila] = useState([])
    const [districts, setDistricts] = useState([])

    useEffect(() => {
        axios.get('/district.json')
            .then(res => {
                setDistricts(res.data.districts);
                
                 
            })
            .catch(err => console.error(err));

        axios.get('/upazila.json')
            .then(res => {
                setUpazila(res.data.upazilas); 
            })
            .catch(err => console.error(err));
    }, []);
    
    

    const handleRegistration = async (data) => {
        try {
            // 1. Create auth user
            const result = await registerUser(data.email, data.password);

            // 2. Upload avatar to imgBB
            const formData = new FormData();
            formData.append("image", data.avatar[0]);

            const imgURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
            const imgRes = await axios.post(imgURL, formData);

            const photoURL = imgRes.data.data.url;

            // 3. Update Firebase profile
            await updateUserProfile({
                displayName: data.name,
                photoURL,
            });

            // 4. Save user to database
            await axios.post("http://localhost:3000/users", {
                name: data.name,
                email: data.email,
                photoURL,
                bloodGroup: data.bloodGroup,
                district: data.district,
                upazila: data.upazila,
                role: "donor",
                createdAt: new Date(),
            });

            navigate(location.state || "/");
        } catch (error) {
            console.error(error);
        }
        console.log("Form submitted data:", data); 
    };

    return (
        <div className="lg:w-9/12 mx-auto">
            <h2 className="text-4xl font-bold mb-2">Create an Account</h2>
           

            <div className="card bg-base-100 max-w-md shadow-xl">
                <form onSubmit={handleSubmit(handleRegistration)} className="card-body space-y-3">

                    {/* Name */}
                    <input
                        className="input input-bordered"
                        placeholder="Full Name"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <p className="text-red-500">Name is required</p>}

                    {/* Email */}
                    <input
                        type="email"
                        className="input input-bordered"
                        placeholder="Email"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <p className="text-red-500">Email is required</p>}

                    {/* Avatar */}
                    <input
                        type="file"
                        className="file-input file-input-bordered"
                        {...register("avatar", { required: true })}
                    />
                    {errors.avatar && <p className="text-red-500">Avatar is required</p>}

                    {/* Blood Group */}
                    <select
                        className="select select-bordered"
                        {...register("bloodGroup", { required: true })}
                        defaultValue=""
                    >
                        <option disabled value="">Select Blood Group</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                            <option key={bg}>{bg}</option>
                        ))}
                    </select>
                    {errors.bloodGroup && <p className="text-red-500">Blood group required</p>}

                    <select
                        className="select select-bordered"
                        {...register("district", { required: true })}
                        defaultValue=""
                    >
                        <option value="" disabled>Select District</option>

                        {districts?.map(d => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>



                    {/* Upazila */}
                    <select
                        className="select select-bordered"
                        {...register("upazila", { required: true })}
                        defaultValue=""
                    >
                        <option value="" disabled>Select Upazila</option>
                        {upazila.map(u => (
                            <option key={u.id} value={u.name}>{u.name}</option>
                        ))}
                    </select>


                    {/* Password */}
                    <input
                        type="password"
                        className="input input-bordered"
                        placeholder="Password"
                        {...register("password", {
                            required: true,
                            minLength: 6,
                            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/,
                        })}
                    />
                    

                    {/* Confirm Password */}
                    <input
                        type="password"
                        className="input input-bordered"
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {
                            validate: value => value === password || "Passwords do not match",
                        })}
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500">{errors.confirmPassword.message}</p>
                    )}

                    <button className="btn btn-primary mt-4">Register</button>

                    <p className="text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary font-semibold">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
