//delete project model
import { useRef, useEffect } from "react";

const DeleteModel = ({ onClose, isLoading, handleDelete }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-6">
      <div
        className="bg-white rounded-lg shadow-lg w-[500px] p-6 dark:bg-[#261E35] dark:text-white"
        ref={modalRef}
      >
        <div>
          <h3 className="block text-lg text-center font-semibold text-black  dark:text-white py-4">
            Are you sure you want to delete this?
          </h3>
        </div>
        <div className="flex justify-center gap-3 px-6 py-4">
          <button
            className="px-4 py-2 text-white bg-[#AC6AEC] rounded-md cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // <-- Prevent card click
              handleDelete();
            }}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
          <button
            className="px-4 py-2 text-black bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // <-- Prevent card click
              onClose();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


export default DeleteModel;
