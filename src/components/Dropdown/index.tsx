import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

interface DropdownProps {
	setStatus: React.Dispatch<React.SetStateAction<string>>;
	status: string;
}

const Dropdown: React.FC<DropdownProps> = ({ setStatus, status }) => {
	const handleChange = (event: SelectChangeEvent) => {
		setStatus(event.target.value as string);
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Status</InputLabel>
				<Select
					id="demo-simple-select"
					label="Status"
					labelId="demo-simple-select-label"
					onChange={handleChange}
					value={status}
				>
					<MenuItem value={"pending"}>pending</MenuItem>
					<MenuItem value={"in progress"}>in progress</MenuItem>
					<MenuItem value={"testing"}>testing</MenuItem>
					<MenuItem value={"done"}>done</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};

export default Dropdown;
