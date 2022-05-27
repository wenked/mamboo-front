import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { FormProps } from "../Modal";

interface DropdownProps {
	filter?: boolean;
	formData?: undefined | FormProps;
	setFormData?: React.Dispatch<React.SetStateAction<FormProps>>;
	setValue?: React.Dispatch<React.SetStateAction<string>>;
	value?: string;
}
type StatusType = "done" | "in progress" | "pending" | "testing";

const Dropdown: React.FC<DropdownProps> = ({ filter, formData, setFormData, setValue, value }) => {
	const handleChange = (event: SelectChangeEvent) => {
		if (filter && setValue) {
			setValue(event.target.value);
		} else if (setFormData) {
			setFormData({
				...formData,
				status: event.target.value as StatusType,
			});
		}
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Status</InputLabel>
				<Select
					fullWidth
					id="demo-simple-select"
					label="Status"
					labelId="demo-simple-select-label"
					onChange={handleChange}
					value={filter ? value : formData?.status}
				>
					{filter && <MenuItem value={"all"}>all</MenuItem>}
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
