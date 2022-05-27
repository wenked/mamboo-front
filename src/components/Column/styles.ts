import styled from "styled-components";

interface ColumnContainerProps {
	isDraggingOver: boolean;
}

export const ColumnContainer = styled.div<ColumnContainerProps>`
	background: ${(props) => (props.isDraggingOver ? "lightblue" : "lightgrey")};
	padding: 4px;
	width: 300px;
	height: 700px;
	overflow-y: auto;
	border-radius: 10px;
	scrollbar-width: thin;

	&::-webkit-scrollbar {
		width: 11px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #808080;
		border-radius: 6px;
		border: 3px solid #808080;
	}
`;
