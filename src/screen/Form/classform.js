import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AddClass, GetAllTeachers } from "../../api/apis";
import CircularProgress from '@mui/material/CircularProgress';

const Field = ({ label, id, ...rest }) => (
  <div className="mb-3 w-full">
    <label className="block color-[#000]" htmlFor={id}>
      {label}
    </label>
    <input
      className="my-2 p-2 w-full h-12 border border-[#E49BFF] rounded-md"
      id={id}
      {...rest}
    />
  </div>
);

const Select = ({ label, id, error, children, ...rest }) => (
  <div className="mb-3 w-full">
    <label htmlFor={id}>{label}</label>
    <select
      className="my-2 p-2 w-full h-12 border border-[#E49BFF] rounded-md"
      id={id}
      {...rest}
    >
      {children}
    </select>
  </div>
);

function ClassForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    className: "",
    year: "",
    studentFees: "",
    teachers: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (e, value) => {
    e.preventDefault();
    console.log("onSubmit", formData);
    await AddClass(formData, setLoading);
    navigate('/');
  };

  const GetTeachers = async () => {
    const res = await GetAllTeachers(setLoading);
    setTeachers(res.data);
  }

  useEffect(() => {
    GetTeachers();
  },[]);

  return (
    <div className="flex flex-col justify-center items-center">
      <MdClose
        onClick={() => navigate("/")}
        size={30}
        className="cursor-pointer absolute top-5 right-5"
      />
      <p className="text-2xl font-bold mt-5">Fill form to add class</p>
      <form
        onSubmit={submitHandler}
        className="mt-12 mx-auto w-[500px] p-5 rounded-lg border border-[#E49BFF]"
      >
        <Field
          onChange={handleChange}
          label="Class Name"
          id="class-name"
          name="className"
          required
        />
        <Field
          onChange={handleChange}
          label="Year"
          id="year"
          name="year"
          required
        />
        <Field
          onChange={handleChange}
          label="Student Fees"
          id="student-fees"
          name="studentFees"
          required
        />
        <Select
          onChange={handleChange}
          label="Teachers"
          id="teachers"
          name="teachers"
          required
        >
          <option value="" disabled selected>I'm interesting in...</option>
          {teachers?.map(item => <option value={item?._id}>{item?.name}</option>)}
        </Select>
        <input
          className="h-10 w-full my-2 text-base text-white bg-blue-500 cursor-pointer"
          type="submit"
        />
      </form>
    </div>
  );
}

export default ClassForm;
