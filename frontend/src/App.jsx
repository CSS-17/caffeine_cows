import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import StartPage from "./pages/StartPage";
import CreatePage from "./pages/CreatePage";
import NavBar from "./components/NavBar";

function App() {
	return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <NavBar />
			<Routes>
        		<Route path='/' element={<StartPage />} />
				<Route path='/create' element={<CreatePage />} />
			</Routes>
		</Box>
	);
}

export default App;

