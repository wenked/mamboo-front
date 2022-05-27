import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { createTaskService, updateTaskService } from "../../services/task.service";

import { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import { Form } from "./styles";

const style = {
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	left: "50%",
	p: 4,
	position: "absolute" as "absolute",
	top: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
};

interface MyModalProps {
	open: boolean;
	selectedItem: undefined | FormProps;
	handleClose: () => void;
}

export interface FormProps {
	_id?: string;
	description?: string;
	name?: string;
	status?: "done" | "in progress" | "pending" | "testing";
}

export interface UpdateFormProps {
	_id: string;
	description?: string;
	name?: string;
	status?: "done" | "in progress" | "pending" | "testing";
}

const MyModal: React.FC<MyModalProps> = ({ handleClose, open, selectedItem }) => {
	const [formData, setFormData] = useState<FormProps>({});
	const queryClient = useQueryClient();

	const createTask = useMutation(createTaskService);
	const editTask = useMutation(updateTaskService);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			if (selectedItem && formData) {
				await editTask.mutateAsync(formData as UpdateFormProps, {
					onSuccess: () => {
						queryClient.invalidateQueries("tasks");
						toast.success("Task edited successfully");
					},
				});
			} else {
				await createTask.mutateAsync(formData, {
					onSuccess: () => {
						queryClient.invalidateQueries("tasks");
						toast.success("Task created successfully");
					},
				});
			}

			handleClose();
			setFormData({});
		} catch (error) {
			toast.error("Something went wrong");
			console.log(error);
		}
	};

	async function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	}

	useEffect(() => {
		if (selectedItem) {
			setFormData(selectedItem);
		}
	}, [selectedItem]);

	return (
		<div>
			<Modal
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
				aria-describedby="transition-modal-description"
				aria-labelledby="transition-modal-title"
				closeAfterTransition
				onClose={() => {
					handleClose();
					setFormData({});
				}}
				open={open}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Form onSubmit={handleSubmit}>
							<Typography component="h2" id="transition-modal-title" variant="h6">
								Create Task
							</Typography>
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
									gap: "1rem",
									width: "100%",
								}}
							>
								<TextField
									fullWidth
									helperText={`${formData?.name?.length || 0}/${40}`}
									id="outlined-name"
									inputProps={{
										maxlength: 40,
									}}
									label="Task name"
									name="name"
									onChange={handleFormChange}
									value={formData?.name}
								/>
								<Dropdown formData={formData} setFormData={setFormData} />
							</Box>
							<TextField
								fullWidth
								helperText={`${formData?.description?.length || 0}/${200}`}
								id="outlined-name"
								inputProps={{
									maxlength: 200,
								}}
								label="Description"
								multiline
								name="description"
								onChange={handleFormChange}
								rows={4}
								value={formData?.description}
							/>
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									alignItems: "flex-end",
									gap: "1rem",
									width: "100%",
								}}
							>
								<Button sx={{ width: 100 }} type="submit" variant="outlined">
									Save
								</Button>
								<Button
									color="secondary"
									onClick={() => {
										handleClose();
										setFormData({});
									}}
									sx={{ width: 100 }}
									type="button"
									variant="outlined"
								>
									Cancel
								</Button>
							</Box>
						</Form>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

export default MyModal;
