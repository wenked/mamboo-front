import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "react-query";
import { createTaskService } from "../../services/task.service";

import { useState } from "react";
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
	handleClose: () => void;
}

export interface FormProps {
	_id?: string;
	description?: string;
	name?: string;
	status?: "done" | "in progress" | "pending" | "testing";
}

const MyModal: React.FC<MyModalProps> = ({ handleClose, open }) => {
	const [formData, setFormData] = useState<FormProps>({});
	const queryClient = useQueryClient();

	const createTask = useMutation(createTaskService);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const data = await createTask.mutate(formData, {
				onSuccess: () => queryClient.invalidateQueries("tasks"),
			});

			handleClose();
			setFormData({});
		} catch (error) {
			console.log(error);
		}
	};

	async function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	}

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
				onClose={handleClose}
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
									id="outlined-name"
									label="Task name"
									name="name"
									onChange={handleFormChange}
									value={formData?.name}
								/>
								<Dropdown formData={formData} setFormData={setFormData} />
							</Box>
							<TextField
								fullWidth
								id="outlined-name"
								label="Description"
								name="description"
								onChange={handleFormChange}
								value={formData?.description}
							/>
							<Button type="submit" variant="outlined">
								Save
							</Button>
						</Form>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

export default MyModal;
