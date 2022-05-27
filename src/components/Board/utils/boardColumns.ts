import { FormProps } from "../../Modal";

// sortier-ignore-nodes - Prevents sorting the switch statement along with all descendant nodes (e.g. see "a3, a1")
const myColumns = {
	pending: {
		items: [] as FormProps[],
		name: "pending",
	},
	"in progress": {
		items: [] as FormProps[],
		name: "in progress",
	},
	testing: {
		items: [] as FormProps[],
		name: "testing",
	},
	done: {
		items: [] as FormProps[],
		name: "done",
	},
};

export default myColumns;
