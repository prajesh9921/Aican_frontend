import React, { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GetExpense } from "../../api/apis";

export default function ExpenseAnalysis() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const GetExpenseData = async () => {
    const res = await GetExpense(setLoading);
    setData(res?.data);
  };

  const res = Math.abs(parseInt(data?.spent - data?.earned));

  useEffect(() => {
    GetExpenseData();
  }, []);

  return (
    <div className="p-5">
      <IoMdArrowBack
        size={30}
        onClick={() => navigate("/")}
        className="cursor-pointer mb-5"
      />

      <p onClick={() => console.log(data)} style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20 }}>
        Class Analysis
      </p>

      {loading ? <p>Loading...</p> : <div>
        <p className="font-bold text-[20px]">
          Total expenditure: <span className="text-[50px]">{data?.spent}</span>
        </p>
        <p className="font-bold text-[20px]">
          Total earning: <span className="text-[50px]">{data?.earned}</span>
        </p>
        <p className="font-bold text-[20px]">
          Difference: <span className="text-[50px]">{res}</span>
        </p>
        <p
          className={`font-bold text-[40px] ${
            data?.spent > data?.earned ? "text-red-500" : "text-green-500"
          }`}
        >
          Total {data?.spent > data?.earned ? "Loss" : "Profit"}: {res}
        </p>
      </div> }
    </div>
  );
}
