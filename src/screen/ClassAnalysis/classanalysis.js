import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { GetAllClasses, GetAllTeachers, GetGenderRatio } from "../../api/apis";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ClassAnalysis = () => {
  const navigate = useNavigate();
  const [classData, setClassData] = useState([]);
  const [teachersData, setTeachersData] = useState([]);
  const [loading, setLoading] = useState(false);

  const CallApis = async () => {
    try {
      const classes = await GetAllClasses(setLoading);
      const teachers = await GetAllTeachers(setLoading);
      setClassData(classes?.data);
      setTeachersData(teachers?.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
    }
  };

  useEffect(() => {
    CallApis();
  }, []);

  const getTeacherName = (teacherId) => {
    const teacher = teachersData?.find((teacher) => teacher._id === teacherId);
    console.log(teacher);
    return teacher ? teacher.name : "Unknown";
  };

  return (
    <div style={{ padding: 20 }}>
      <IoMdArrowBack
        size={30}
        onClick={() => navigate("/")}
        className="cursor-pointer"
      />

      <p
        onClick={() => console.log(teachersData)}
        style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20 }}
      >
        Class Analysis
      </p>
      {loading ? (
        <p>Loading....</p>
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Year
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Teacher
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Student Fees
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Student List
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classData?.map((row) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.name}
                </TableCell>
                <TableCell align="right">{row?.year}</TableCell>
                <TableCell align="right">
                  {getTeacherName(row?.teacher)}
                </TableCell>
                <TableCell align="right">{row?.studentfees}</TableCell>
                <TableCell align="right">
                  {row.studentlist.length !== 0 ? (
                    row?.studentlist.map((student, index) => (
                      <p key={index}>{student}</p>
                    ))
                  ) : (
                    <p>No students enrolled</p>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ClassAnalysis;
