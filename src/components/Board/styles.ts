import styled from "styled-components";

export const BoardContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 1rem;

	h1 {
		color: #0d3d56;
		text-align: center;
		padding: 2px;
	}

	section {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}
`;
