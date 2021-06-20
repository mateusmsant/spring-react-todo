import todoApi from "../api/todoApi";

export const fetchTodos = async () => {
  return await todoApi.get("/todos");
};

export const fetchSingleTodo = async (id) => {
  return await todoApi.get(`/todos/${id}`);
};

export const deleteTodo = async (id) => {
  return await todoApi.delete(`/todos/${id}`);
};
