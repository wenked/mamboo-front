import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { FormProps } from "../Modal";
import TaskCard from "../TaskCard";
import { ColumnContainer } from "./styles";

// import { Container } from './styles';

interface ColumnProps {
	column: any;
	id: string;
	handleEdit: (item: FormProps) => void;
}

const Column: React.FC<ColumnProps> = ({ column, handleEdit, id }) => {
	return (
		<Droppable droppableId={id}>
			{(provided, snapshot) => {
				return (
					<div>
						<h1 style={{ color: "#0D3D56" }}>{column.name}</h1>
						<ColumnContainer
							isDraggingOver={snapshot.isDraggingOver}
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{column.items.map((item: FormProps, index: number) => {
								return <TaskCard handleEdit={handleEdit} index={index} item={item} />;
							})}
							{provided.placeholder}
						</ColumnContainer>
					</div>
				);
			}}
		</Droppable>
	);
};

export default Column;
