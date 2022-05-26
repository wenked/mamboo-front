import { QueryClient, QueryClientProvider } from "react-query";
import Board from "./components/Board";
import { GlobalStyle } from "./styles/global";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div>
				<GlobalStyle />
				<Board />
			</div>
		</QueryClientProvider>
	);
}

export default App;
