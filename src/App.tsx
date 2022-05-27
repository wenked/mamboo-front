import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Board from "./components/Board";
import { GlobalStyle } from "./styles/global";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div>
				<GlobalStyle />
				<Board />
				<ToastContainer />
			</div>
		</QueryClientProvider>
	);
}

export default App;
