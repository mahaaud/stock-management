import Landing from './pages/landing.page';

import { Route, Routes } from 'react-router-dom';
import PortfolioPage from './pages/portfolio.page';

export function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<Landing />
				}
			/>
			<Route
				path="/portfolio"
				element={
					<PortfolioPage />
				}
			/>
		</Routes>
	);
}

export default App;
