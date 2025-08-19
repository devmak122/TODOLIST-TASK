import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const TaskModal = ({ task, onClose, onSubmit }) => {
  const { API_URL, token } = useAuth();

  const formik = useFormik({
    initialValues: {
      title: task?.title || "",
      description: task?.description || "",
      dueDate: task?.dueDate ? task.dueDate.split("T")[0] : "",
      status: task?.status || "pending",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      dueDate: Yup.date().required("Due date is required"),
      status: Yup.string().oneOf(["pending", "completed"]).required(),
    }),
    onSubmit: async (values) => {
      try {
        if (task?._id) {
          //--------------------------------------------------for updating task--------------------------------------------------
          await axios.put(`${API_URL}/task/${task._id}`, values, {
            headers: { Authorization: `Bearer ${token}` },
          });
          toast.success("Task updated successfully");
        } else {
          // --------------------------------------------------For creating task---------------------------------------------------------------------
          await axios.post(`${API_URL}/task`, values, {
            headers: { Authorization: `Bearer ${token}` },
          });
          toast.success("Task created successfully");
        }
        onSubmit();
      } catch (err) {
        toast.error("Failed: " + (err.response?.data?.message || err.message));
      }
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/25 bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-md shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {task ? "Edit Task" : "Add Task"}
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              className="w-full px-4 py-2 border rounded-lg"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-sm">{formik.errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              rows="3"
              className="w-full px-4 py-2 border rounded-lg"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label className="block font-medium mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              className="w-full px-4 py-2 border rounded-lg"
              value={formik.values.dueDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dueDate && formik.errors.dueDate && (
              <p className="text-red-500 text-sm">{formik.errors.dueDate}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              name="status"
              className="w-full px-4 py-2 border rounded-lg"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#AC6AEC] text-white rounded-lg"
            >
              {task ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
