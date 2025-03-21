import { JSX, useState } from "react";
import { countryOptions } from "./Login";
import { Link, useNavigate } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import customAxios from "../Api/axiosInstatnce";


type CountryOption = {
  value: string;
  label: JSX.Element;
};
export default function Register() {

  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    countryOptions[0]
  );
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobileNumber] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await customAxios.post("/api/auth/register", { fullName: fullName, email: email, mobile: mobile, status: status, password: password });
      alert(response.data.message)
      navigate('/login')
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };
  return (
    <div className="w-full flex-1  flex-col flex justify-center items-center   ">
      <div className="relative inline-block text-[31px] font-bold  ">
        <h1 className="relative z-50">Register</h1>
        <span className="absolute left-0 bottom-1 w-full h-2 bg-[#fac166] z-0 "></span>
      </div>

      <form className="p-4 flex flex-col shadow-lg" onSubmit={handleRegister}>
        <label className="text-[18px] font-bold mt-3 ">Full Name</label>
        <input
          type="text"
          className="flex-1 p-2 outline-none text-gray-700 border-2 border-[#c4c4c4] rounded-md mt-2   "
          placeholder="Enter your name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <label className="text-[18px] font-bold mt-3 ">Email</label>
        <input
          type="text"
          className="flex-1 p-2 outline-none text-gray-700 border-2 border-[#c4c4c4] rounded-md mt-2   "
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="text-[18px] font-semibold  mt-2 ">
          Mobile Number
        </label>
        <div className="flex gap-2 flex-row  ">
          <Select
            options={countryOptions}
            value={selectedCountry}
            onChange={(newValue: SingleValue<CountryOption>) =>
              setSelectedCountry(newValue)
            }
            className="md:w-[110px]  w-[75px] text-gray-800 border-2  border-[#c4c4c4] rounded-md mt-2"
            isSearchable={false}
            styles={{
              control: (provided) => ({
                ...provided,
                border: "none",
                boxShadow: "none",
                backgroundColor: "transparent",
              }),

              indicatorSeparator: () => ({
                display: "none", // Removes vertical separator
              }),

              dropdownIndicator: (provided) => ({
                ...provided,
                padding: "2px", // Reduces space around the arrow
              }),
            }}
          />

          <input
            type="tel"
            placeholder="Enter your phone number"
            className=" p-2 md:pl-10 outline-none text-gray-700 border-2 border-[#c4c4c4] rounded-md mt-2 "
            value={mobile}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <label className="text-[18px] font-bold mt-3 ">Current Status</label>
        <div className="flex gap-4 items-center">
          {/* Student */}
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="role"
              value="student"
              className="hidden group-[&:checked]:bg-[#2A586F]"
              onChange={(e) => setStatus(e.target.value)}
            />
            <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center group-has-[:checked]:border-[#2A586F]">
              <div className="w-2.5 h-2.5 bg-gray-400 rounded-full group-has-[:checked]:bg-[#2A586F]"></div>
            </div>
            <span className="text-black">Student</span>
          </label>

          {/* Employee */}
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="role"
              value="employee"
              className="hidden"
              onChange={(e) => setStatus(e.target.value)}
            />
            <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center group-has-[:checked]:border-[#2A586F]">
              <div className="w-2.5 h-2.5 bg-gray-400 rounded-full group-has-[:checked]:bg-[#2A586F]"></div>
            </div>
            <span className="text-black">Employee</span>
          </label>
        </div>

        <label className="text-[18px] font-bold mt-3 ">Password</label>
        <input
          type="password"
          className="flex-1 p-2 outline-none text-gray-700 border-2 border-[#c4c4c4] rounded-md mt-2"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          className="mt-5 py-2 font-semibold text-[14px] bg-[#2A586F]  text-white border-2 border-[#2A586F] hover:bg-transparent hover:text-[#2A586F] rounded-md">
          Save
        </button>
        <small className="text-center mt-3">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600">
            Login Now
          </Link>
        </small>
      </form>
    </div>
  );
}
