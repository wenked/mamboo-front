import { Delete, Edit } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Typography from "@mui/material/Typography";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteTaskService } from "../../services/task.service";
import { FormProps } from "../Modal";
import getChipColor from "./utilts/getChipColor";

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
						sx={{
							width: 250,
							background: "#f5f5f5",
							margin: "0.5rem",
							minHeight: 160,
							maxHeight: 400,
						}}
					>
						<CardContent>
							<Chip
								color={getChipColor(item.status)}
								label={item.status}
								size="small"
								sx={{ marginBottom: 1 }}
							/>

							<Typography component="div" variant="h5">
								{item.name}
							</Typography>

							<Typography sx={{ wordBreak: "break-all" }} variant="body2">
								{item.description}
							</Typography>
						</CardContent>
						<CardActions
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "end",
							}}
						>
							<Tooltip arrow title="Edit">
								<IconButton onClick={() => handleEdit(item)} size="small">
									<Edit />
								</IconButton>
							</Tooltip>
							<Tooltip arrow title="Delete">
								<IconButton onClick={handleDelete} size="small">
									<Delete />
								</IconButton>
							</Tooltip>
						</CardActions>
					</Card>
				);
			}}
		</Draggable>
	);
};

export default CardTask;
