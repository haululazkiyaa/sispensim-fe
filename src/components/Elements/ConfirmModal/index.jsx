import PropTypes from "prop-types";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";

export default function ConfirmModal(props) {
  const { desc, labelOk, labelCancel, onClick } = props;

  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <>
      <button
        id="init-modal"
        onClick={() => {
          const elmt = document.querySelector("div[modal-backdrop]");
          if (elmt) {
            elmt.style.backgroundColor = "rgb(107 114 128 / 0.5)";
            elmt.classList.replace("z-40", "z-50");
          }
        }}
        data-modal-target="confirm-modal"
        data-modal-toggle="confirm-modal"
        hidden
      >
        Aktifkan
      </button>
      <div
        id="confirm-modal"
        tabIndex="-1"
        data-modal-backdrop="static"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[60] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="confirm-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {desc}
              </h3>
              <button
                onClick={onClick}
                data-modal-hide="confirm-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
              >
                {labelOk}
              </button>
              <button
                data-modal-hide="confirm-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                {labelCancel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ConfirmModal.propTypes = {
  desc: PropTypes.string,
  labelOk: PropTypes.string,
  labelCancel: PropTypes.string,
  onClick: PropTypes.func,
};
