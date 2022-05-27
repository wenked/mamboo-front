import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { FormProps } from "../Modal";
import TaskCard from "../TaskCard";

// import { Container } from './styles';

interface ColumnProps {
	column: any;
	id: string;
}

const Column: React.FC<ColumnProps> = ({ column, id }) => {
	return (
		<Droppable droppableId={id}>
			{(provided, snapshot) => {
				return (
					<div>
						<h1>{column.name}</h1>
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							style={{
								background: snapshot.isDraggingOver ? "lightyellow" : "lightgrey",
								padding: 4,
								width: 300,
								height: 500,
								overflowY: "auto",
								borderRadius: 10,
							}}
						>
							{column.items.map((item: FormProps, index: number) => {
								return <TaskCard index={index} item={item} />;
							})}
							{provided.placeholder}
						</div>
					</div>
				);
			}}
		</Droppable>
	);
};

export default Column;
