type colors =
	| undefined
	| "default"
	| "error"
	| "info"
	| "primary"
	| "secondary"
	| "success"
	| "warning";

const getChipColor = (status: undefined | string): colors => {
	switch (status) {
		case "done":
			return "success";
		case "in progress":
			return "info";
		case "pending":
			return "warning";
		case "testing":
			return "primary";
		default:
			return "default";
	}
};

export default getChipColor;
