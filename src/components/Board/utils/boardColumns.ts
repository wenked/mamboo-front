import { FormProps } from "../../Modal";

// sortier-ignore-nodes - Prevents sorting the switch statement along with all descendant nodes (e.g. see "a3, a1")
const myColumns = {
	done: {
		items: [] as FormProps[],
		name: "done",
	},
	"in progress": {
		items: [] as FormProps[],
		name: "in progress",
	},
	pending: {
		items: [] as FormProps[],
		name: "pending",
	},
	testing: {
		items: [] as FormProps[],
		name: "testing",
	},
};

export default myColumns;
