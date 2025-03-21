import { JSX, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import customAxios from "../Api/axiosInstatnce";

type CountryOption = {
  value: string;
  label: JSX.Element;
};
export const countryOptions: CountryOption[] = [
  {
    value: "IN",
    label: (
      <div className="flex items-center gap-1">
        <img
          src="https://flagcdn.com/w40/in.png"
          alt="India Flag"
          className="w-6 h-4 rounded-sm "
        />
        <span>+91</span>
      </div>
    ),
  },
];


export default function Login() {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    countryOptions[0]
  );
  const [mobile, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await customAxios.post("/api/auth/login", { mobile: mobile, password: password });
      console.log(response,"gvh")
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        navigate("/question");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="w-full flex-1  flex-col flex justify-center items-center gap-10 ">
      <div className="relative inline-block text-[31px] font-semibold text-[#2A586F] ">
        <h1 className="relative z-50">Login</h1>
        <span className="absolute left-0 bottom-1 w-full h-2 bg-[#fac166] z-0 "></span>
      </div>

      <form className="p-5 flex flex-col  shadow-lg " onSubmit={handleLogin}>
        <label className="text-[18px] font-bold">Mobile Number</label>
        <div className="flex gap-2 flex-row">
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
            placeholder="Enter mobile number"
            className=" p-2 md:pl-10 outline-none text-gray-700 border-2 border-[#c4c4c4] rounded-md mt-2 "
            value={mobile}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>

        <label className="text-[18px] font-bold mt-4 ">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          className="flex-1 p-2 outline-none text-gray-700 border-2 border-[#c4c4c4] rounded-md mt-2   "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          className="mt-8 py-2 font-semibold text-[14px] bg-[#2A586F]  text-white border-2 border-[#2A586F] hover:bg-transparent hover:text-[#2A586F] rounded-md">
          Login
        </button>

        <small className="text-center mt-5">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-600">
            Register Now
          </Link>
        </small>
      </form>
    </div>
  );
}
