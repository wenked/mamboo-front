import { Add } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getTasksService, updateTaskService } from "../../services/task.service";
import Column from "../Column";
import { FormProps } from "../Modal";
import MyModal from "../Modal";
import { BoardContainer } from "./styles";
import myColumns from "./utils/boardColumns";

const Board: React.FC = () => {
	const [open, setOpen] = useState(false);

	const [columns, setColumns] = useState(myColumns);
	const [selectedItem, setSelectedItem] = useState<FormProps>();
	const updateTask = useMutation(updateTaskService);
	const { isError } = useQuery<FormProps[], Error>(["tasks"], () => getTasksService({}), {
		onSuccess: (data) => {
			const newColumns = { ...columns };
			const pendingTasks = data.filter((task) => task.status === "pending");
			const inProgressTasks = data.filter((task) => task.status === "in progress");
			const testingTasks = data.filter((task) => task.status === "testing");
			const doneTasks = data.filter((task) => task.status === "done");
			newColumns.pending.items = pendingTasks;
			newColumns["in progress"].items = inProgressTasks;
			newColumns.testing.items = testingTasks;
			newColumns.done.items = doneTasks;
			setColumns(newColumns);
		},
	});
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleEdit = (item: FormProps) => {
		setSelectedItem(item);
		handleOpen();
	};

	const onDragEnd = async (result: any, columns: any) => {
		if (!result.destination) return;
		const { destination, source } = result;

		if (source.droppableId !== destination.droppableId) {
			const sourceColumn = columns[source.droppableId];
			const destColumn = columns[destination.droppableId];
			const sourceItems = [...sourceColumn.items];
			const destItems = [...destColumn.items];
			const [removed] = sourceItems.splice(source.index, 1);

			const updatedTask = { ...removed, status: destColumn.name };
			updateTask.mutate({ _id: updatedTask._id, status: destination.droppableId });
			destItems.splice(destination.index, 0, updatedTask);
			setColumns({
				...columns,
				[destination.droppableId]: {
					...destColumn,
					items: destItems,
				},
				[source.droppableId]: {
					...sourceColumn,
					items: sourceItems,
				},
			});
		} else {
			const column = columns[source.droppableId];
			const copiedItems = [...column.items];
			const [removed] = copiedItems.splice(source.index, 1);
			copiedItems.splice(destination.index, 0, removed);
			setColumns({
				...columns,
				[source.droppableId]: {
					...column,
					items: copiedItems,
				},
			});
		}
	};

	if (isError) {
		toast.error("Error loading tasks");
	}

	return (
		<BoardContainer>
			<h1>My Board</h1>
			<Button onClick={handleOpen} startIcon={<Add />} variant="outlined">
				Create task
			</Button>
			<section>
				<DragDropContext onDragEnd={(result) => onDragEnd(result, columns)}>
					{Object.entries(columns).map(([id, column]) => {
						return <Column column={column} handleEdit={handleEdit} id={id} key={id} />;
					})}
				</DragDropContext>
			</section>

			<MyModal handleClose={handleClose} open={open} selectedItem={selectedItem} />
		</BoardContainer>
	);
};

export default Board;
