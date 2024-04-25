import { Route, Routes } from 'react-router-dom'
import AdminPanel from '@pages/admin-panel/AdminPanel.tsx'
import '@styles/global.scss'
import Home from './pages/home/Home.tsx'

function App() {
	return (
		<Routes>
			<Route path={'/'} element={<Home />} />
			<Route path={'/admin-panel'} element={<AdminPanel />} />
		</Routes>
	)
}

export default App
