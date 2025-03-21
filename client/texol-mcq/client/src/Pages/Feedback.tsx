import { useEffect, useState } from "react";
import { GoHome } from "react-icons/go";
import { Link, useLocation, useNavigate } from "react-router-dom";
import customAxios from "../Api/axiosInstatnce";


export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state || location.state.score === null) {
      navigate("/login");
    }
  }, [location, navigate]);

  if (!location.state || location.state.score === null) {
    return null;
  }
  const { score } = location.state

  const [rating, setSelectedRating] = useState<number | null>(null);
  const [feedback, setComment] = useState<string>('');
  const emojis = [
    { rating: 1, emoji: '😢', label: 'Very Dissatisfied' },
    { rating: 2, emoji: '😔', label: 'Dissatisfied' },
    { rating: 3, emoji: '😐', label: 'Neutral' },
    { rating: 4, emoji: '😊', label: 'Satisfied' },
    { rating: 5, emoji: '😁', label: 'Very Satisfied' }
  ];

  const token = localStorage.getItem("token");
  const handleSubmit = async () => {
    const response = await customAxios.post('/api/feedback/submit', { score, feedback, rating }, {
      headers: {
        Authorization: token
      }
    });
    alert(response.data.message)
    navigate('/')
  }

  return (
    <div className="flex flex-col justify-center items-center p-3 lg:p-0  ">
      <div className="flex flex-col justify-center items-center gap-2">
        <img src="/check.png" alt="Sucess" className="w-[70px]" />
        <p className="font-semibold text-[18px] text-center">
          Congratulations you have Succesfully Completed The Test
        </p>
        <p className="font-bold">
          Score &nbsp;:&emsp;
          <span className="bg-[#fac166] px-4 py-1 font-semibold  rounded-3xl">
            {score}/50
          </span>
        </p>
        <div className="font-bold text-[20px] text-white bg-[#2A586F] mt-2 rounded-md px-4 py-2">
          Your ID: 7564
        </div>
      </div>

      {/*feedback section*/}
      <div className="bg-white rounded-lg shadow-xl md:p-6 p-2 md:w-[60%] mt-2">
        <h2 className="text-xl font-bold ">Feedback</h2>

        <div className="mt-3">
          <h3 className="text-xl font-bold tracking-wider">Give us a feedback!</h3>
          <p className="text-gray-600  text-justify">Your input is important for us. We take customer feedback very seriously.</p>
        </div>


        <div className="flex  mt-5 mb-5 gap-3 ">
          {emojis.map((item) => (

            <button
              key={item.rating}
              onClick={() => setSelectedRating(item.rating)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl
            ${rating === item.rating
                  ? 'bg-[#2A586F] '
                  : 'bg-gray-200 hover:bg-gray-300'}`}
              aria-label={item.label}
            >
              {item.emoji}
            </button>
          ))}
        </div>

        <div className="mb-2 ">
          <textarea
            className="w-full border-[#c4c4c4] border-1 rounded-md p-4 h-24 focus:outline-none  shadow-md"
            placeholder="Add a comment"
            value={feedback}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button

          disabled={rating === null}
          className={`md:w-1/3 bg-[#2A586F] lg:px-4 border px-1  py-2 rounded-md text-white font-bold text-sm
          ${rating !== null
              ? ' hover:bg-transparent hover:text-[#2A586F] border-[#2A586F] '
              : ' bg-[#2A586F] cursor-not-allowed'}`}
          onClick={handleSubmit}
        >
          Submit Feedback
        </button>
      </div>
      <Link to={"/"} className="flex items-center gap-2 my-2"><GoHome /><span>Back to home</span></Link>
    </div>
  );
}
