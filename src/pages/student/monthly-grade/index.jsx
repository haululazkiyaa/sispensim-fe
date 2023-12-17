import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import Logout from "../../../components/Elements/Logout";
import StudentMonthlyGradeTableView from "../../../views/Student/MonthlyGrade/TableView";
import StudentMonthlyGradeUpdateDrawerView from "../../../views/Student/MonthlyGrade/UpdateDrawerView";
import StudentMonthlyGradeView from "../../../views/Student/MonthlyGrade/GradeView";
import { getNilaiBulananPembimbing } from "../../../services/supervisor/supervisor-monthly-grade.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function StudentMonthlyGradePage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");

  const handleDataHarian = useCallback(() => {
    const today = new Date();
    const filterMonth = String(today.getMonth() + 1);
    const filterYear = today.getFullYear();

    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getNilaiBulananPembimbing(
          filterMonth,
          filterYear,
          token,
          (status, data) => {
            if (status) {
              setData(data);
            }
          }
        );
      } else {
        Logout((status) => {
          if (status) {
            navigate("/login");
          }
        });
      }
      setProgress(100);
    });
  }, [setProgress, navigate]);

  useEffect(() => {
    handleDataHarian();
  }, [handleDataHarian]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1>Penilaian Bulanan</h1>
        <p>
          Anda dapat meilhat nilai bulanan siswa yang ada atau menambahkan nilai
          bulanan siswa yang ada atau mengubah nilai bulanan siswa yang ada.
        </p>
        <div className="not-format">
          <StudentMonthlyGradeTableView data={data} setSelected={setSelected} />
          <StudentMonthlyGradeUpdateDrawerView
            handleDataHarian={handleDataHarian}
            selected={selected}
            id="1"
          />
          <StudentMonthlyGradeView data={data} selected={selected} />
        </div>
      </div>
    </>
  );
}