import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import CompanyGuidanceGroupTableView from "../../../views/CompanyAdmin/GudanceGroup/TableView";
import CompanyGuidanceGroupUpdateDrawerView from "../../../views/CompanyAdmin/GudanceGroup/UpdateDrawerView";
import Logout from "../../../components/Elements/Logout";
import { getKelBimbinganPerusahaan } from "../../../services/company-admin/company-guidance-group.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function CompanyAdminGuidanceGroupPage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");

  const handleKelBimbinganPerusahaan = useCallback(() => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getKelBimbinganPerusahaan(token, (status, data) => {
          if (status) {
            setData(data);
          }
        });
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
    handleKelBimbinganPerusahaan();
  }, [handleKelBimbinganPerusahaan]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1>Kelompok Bimbingan</h1>
        <p>
          Anda dapat meilhat kelompok bimbingan yang ada atau menambahkan data
          pembimbing baru atau mengubah kelompok bimbingan yang ada. Namun, anda
          tidak dapat menghapus kelompok bimbingan yang sudah ditambahkan.
        </p>
        <div className="not-format">
          <CompanyGuidanceGroupTableView
            data={data}
            setSelected={setSelected}
          />
          <CompanyGuidanceGroupUpdateDrawerView
            handleKelBimbinganPerusahaan={handleKelBimbinganPerusahaan}
            selected={selected}
            id="1"
          />
        </div>
      </div>
    </>
  );
}
