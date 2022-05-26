import { Delete, Edit } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import * as React from "react";

// import { Container } from './styles';

const CardTask: React.FC = () => {
	return (
		<Card sx={{ width: 250, background: "lightblue" }}>
			<CardContent>
				<Typography color="text.secondary" gutterBottom sx={{ fontSize: 14 }}>
					pending
				</Typography>
				<Typography component="div" variant="h5">
					teste
				</Typography>

				<Typography variant="body2">
					well meaning and kindly.
					<br />
					{'"a benevolent smile"'}
				</Typography>
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
};

export default CardTask;
