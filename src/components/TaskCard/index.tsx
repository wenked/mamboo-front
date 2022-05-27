import { Delete, Edit } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteTaskService } from "../../services/task.service";
import { FormProps } from "../Modal";

interface CardTaskProps {
	index: number;
	item: FormProps;
	handleEdit: (item: FormProps) => void;
}

const CardTask: React.FC<CardTaskProps> = ({ handleEdit, index, item }) => {
	const deleteTask = useMutation(deleteTaskService);
	const queryClient = useQueryClient();

	const handleDelete = async () => {
		await deleteTask.mutateAsync(item._id as string, {
			onSuccess: () => {
				queryClient.invalidateQueries("tasks");
				toast.success("Task deleted successfully");
			},
		});
	};

	if (deleteTask.isError) {
		toast.error("Something went wrong");
	}

	return (
		<Draggable draggableId={item._id as string} index={index} key={item._id}>
			{(provided, snapshot) => {
				return (
					<Card
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						sx={{ width: 250, background: "#ffff99", margin: "0.5rem", height: 160 }}
					>
						<CardContent>
							<Typography color="text.secondary" gutterBottom sx={{ fontSize: 14 }}>
								{item.status}
							</Typography>
							<Typography component="div" variant="h5">
								{item.name}
							</Typography>

							<Typography variant="body2">{item.description}</Typography>
						</CardContent>
						<CardActions
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "end",
							}}
						>
							<IconButton onClick={() => handleEdit(item)} size="small">
								<Edit />
							</IconButton>
							<IconButton onClick={handleDelete} size="small">
								<Delete />
							</IconButton>
						</CardActions>
					</Card>
				);
			}}
		</Draggable>
	);
};

export default CardTask;
