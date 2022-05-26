import { FormProps } from "../components/Modal";
import api from "./api";

interface UpdateInputTask {
	_id: string;
	description?: string;
	name?: string;
	status?: "done" | "in progress" | "pending" | "testing";
}

interface GetInputTasks {
	status?: "done" | "in progress" | "pending" | "testing";
}

export const createTaskService = async (input: FormProps) => {
	const { data } = await api.post("/create", input);
	return data;
};

export const updateTaskService = async (input: UpdateInputTask) => {
	const { data } = await api.post(`/update/${input._id}`, input);
	return data;
};

export const getTasksService = async (input: GetInputTasks) => {
	const { data } = await api.get("/list", { params: input });
	return data;
};

export const deleteTaskService = async (_id: string) => {
	const { data } = await api.delete(`/delete/${_id}`);
	return data;
};
