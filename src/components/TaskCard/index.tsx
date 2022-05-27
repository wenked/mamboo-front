import { Delete, Edit } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FormProps } from "../Modal";

// import { Container } from './styles';
interface CardTaskProps {
	index: number;
	item: FormProps;
}

const CardTask: React.FC<CardTaskProps> = ({ index, item }) => {
	return (
		<Draggable draggableId={item._id as string} index={index} key={item._id}>
			{(provided, snapshot) => {
				return (
					<Card
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						sx={{ width: 250, background: "lightblue", margin: "0.5rem" }}
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
							<IconButton size="small">
								<Edit />
							</IconButton>
							<IconButton size="small">
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
