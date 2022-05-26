import { Add } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useState } from "react";
import MyModal from "../Modal";
import TaskCard from "../TaskCard";
import { BoardContainer } from "./styles";

const Board: React.FC = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<BoardContainer>
			<h1>My Board</h1>
			<Button onClick={handleOpen} startIcon={<Add />} variant="outlined">
				Create task
			</Button>
			<TaskCard />
			<MyModal handleClose={handleClose} open={open} />
		</BoardContainer>
	);
};

export default Board;
