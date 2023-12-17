import { AuthContext } from "../../../context/AuthContext.jsx";
import Button from "../../../components/Elements/Button/index.jsx";
import ConfirmModal from "../../../components/Elements/ConfirmModal/index.jsx";
import Dropdown from "../../../components/Elements/Dropdown/index.jsx";
import Logout from "../../../components/Elements/Logout/index.js";
import PropTypes from "prop-types";
import { refreshToken } from "../../../services/auth/auth.service.js";
import { setPembimbing } from "../../../services/school-admin/supervisor-data.service.js";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function InstructorDataTableView(props) {
  const { handleDataInstruktur, data, selected, setSelected } = props;
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleStatusPembimbing = () => {
    setProgress(30);
    const data = {
      id: selected.id,
      status_aktif: !selected?.status_aktif,
    };
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        setPembimbing(data, token, (status) => {
          if (status) {
            toast.success(
              `Sukses! Pembimbing a.n. ${selected?.nama} telah berstatus ${
                selected?.status_aktif ? "non-akitf" : "aktif"
              }`,
              {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
            handleDataInstruktur();
          } else {
            toast.error(
              `Gagal ${
                selected?.status_aktif ? "menon-aktifkan" : "mengaktifkan"
              } instruktur a.n. ${selected?.nama}!`,
              {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
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
  };

  const initModal = (item) => {
    setSelected(item);
    document.getElementById("init-modal").click();
  };

  const updateDrawer = (item) => {
    setSelected(item);
    document.getElementById("update-drawer1").click();
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Instruktur
              </th>
              <th scope="col" className="px-6 py-3">
                No. HP
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Password Sementara
              </th>
              <th scope="col" className="px-6 py-3">
                Siswa Bimbingan
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length != 0 ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 truncate text-left">{item.nama}</td>
                  <td className="px-6 py-4 truncate text-left">{item.no_hp}</td>
                  <td className="px-6 py-4">{item.user?.username}</td>
                  <td className="px-6 py-4">{item.user?.temp_password}</td>
                  <td className="px-3 py-2">
                    <Button
                      outline={true}
                      onClick={() => navigate(`${item.id}`)}
                    >
                      Tampilkan
                    </Button>
                  </td>
                  <td className="flex items-center justify-center px-3 py-2">
                    <Dropdown
                      index={index}
                      listMenu={[
                        {
                          variant: "default",
                          onClick: () => updateDrawer(item),
                          label: "Edit",
                        },
                        {
                          variant: `${
                            item.status_aktif ? "danger" : "default"
                          }`,
                          onClick: () => initModal(item),
                          label: `${
                            item.status_aktif ? "Non-aktifkan" : "Aktifkan"
                          }`,
                        },
                      ]}
                    >
                      Aksi
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="px-6 py-4">
                <td colSpan={5}>Tidak ada data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        desc={`Apakah anda yakin ingin ${
          selected?.status_aktif ? "menon-aktifkan" : "mengaktifkan"
        } instruktur a.n. ${selected?.nama}?`}
        labelOk="Ya"
        labelCancel="Tidak"
        onClick={() => handleStatusPembimbing()}
      />
    </>
  );
}

InstructorDataTableView.propTypes = {
  data: PropTypes.any,
  handleDataInstruktur: PropTypes.func,
  selected: PropTypes.any,
  setSelected: PropTypes.any,
  id: PropTypes.string,
};