import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import AddTask from "../models/AddTask";
import Pagination from "../utils/Pagination";
import DeleteModel from "../models/DeleteTask";
import plus from "../assets/icons/plus.svg";

const statusColors = {
  pending:
    "bg-[#FFF8E1] bg-opacity-80 backdrop-blur-md border border-[#FFD180] text-[#23272F]",
  completed:
    "bg-[#E3FCEC] bg-opacity-80 backdrop-blur-md border border-[#84DDCE] text-[#23272F]",
};

const Task = () => {
  const { token, API_URL } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [isAddTaskModal, setIsAddTaskModal] = useState(false);
  const [isDeleteTaskModal, setIsDeleteTaskModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchTasks = async (page = 1, searchTerm = "") => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/task`, {
        params: { page, search: searchTerm, status: statusFilter },
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      toast.error("Failed to fetch tasks");
      setTasks([]);
      setPagination({ page: 1, totalPages: 1 });
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchTasks(1, search);
  }, [statusFilter]);
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/task/${selectedTask._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Task deleted successfully");
      setIsDeleteTaskModal(false);
      fetchTasks(pagination.page, search);
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks(pagination.page, search);
    }
  }, [token, pagination.page, search]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="min-h-screen bg-[#F1F6F3] dark:bg-[#181A20] px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handlePageChange(1);
          }}
          className="w-full sm:w-1/3 px-4 py-2 rounded-md border border-[#82BADA] bg-white dark:bg-[#23272F] text-[#04417C] dark:text-[#84DDCE] focus:outline-none focus:ring-2 focus:ring-[#84DDCE]"
        />

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              handlePageChange(1);
            }}
            className="px-4 py-2 rounded-md border border-[#82BADA] bg-white dark:bg-[#23272F] text-[#04417C] dark:text-[#84DDCE] focus:outline-none focus:ring-2 focus:ring-[#84DDCE] w-full sm:w-auto"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          {/* Add Task */}
          <button
            className="px-6 py-2 cursor-pointer flex justify-center items-center rounded-md bg-[#04417C] dark:bg-[#23272F] text-[#84DDCE] font-bold shadow  border border-[#82BADA] w-full sm:w-auto"
            onClick={() => setIsAddTaskModal(true)}
          >
            <img src={plus} className="w-4 mr-2" alt="" />
            <span>Add New Task</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
        {loading ? (
          <div className="text-[#04417C] dark:text-[#84DDCE] text-lg col-span-full">
            Loading...
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-[#04417C] dark:text-[#84DDCE] text-lg col-span-full flex items-center justify-center h-64">
            No tasks found.
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className={`rounded-2xl shadow-xl p-8 min-h-[240px] flex flex-col gap-4  duration-200 ${
                statusColors[task.status]
              } dark:bg-[#23272F] dark:bg-opacity-80 dark:backdrop-blur-md`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold text-[#23272F] dark:text-[#84DDCE]">
                  {task.title}
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-semibold border border-[#FFD180] bg-[#FFF8E1] dark:bg-[#23272F] text-[#DFA14D] dark:text-[#FFD180] capitalize">
                  {task.status}
                </span>
              </div>
              <p className="text-base text-[#23272F] dark:text-[#BAC7DD] mb-2">
                {task.description}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-sm font-medium text-[#04417C] dark:text-[#84DDCE]">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedTask(task);
                      setIsAddTaskModal(true);
                    }}
                    className="px-3 py-1 rounded-lg bg-[#84DDCE] text-[#04417C] font-semibold shadow hover:bg-[#82BADA] transition cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTask(task);
                      setIsDeleteTaskModal(true);
                    }}
                    className="px-3 py-1 rounded-lg bg-[#FFD180] text-[#23272F] font-semibold shadow hover:bg-[#FFB300] transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Pagination */}
      {tasks.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}{" "}
      {/*------------------------------------------------------- Add Task Modal ------------------------------------------------------------- */}
      {isAddTaskModal && (
        <AddTask
          task={selectedTask}
          onClose={() => setIsAddTaskModal(false)}
          isLoading={loading}
          onSubmit={() => {
            setIsAddTaskModal(false);
            fetchTasks(pagination.page, search);
          }}
        />
      )}
      {/*------------------------------------------------------- Delete Task Modal ------------------------------------------------------------- */}
      {isDeleteTaskModal && (
        <DeleteModel
          onClose={() => setIsDeleteTaskModal(false)}
          isLoading={loading}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Task;
