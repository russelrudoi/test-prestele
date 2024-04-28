import { URL } from '@data/URL.ts'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import AdminPanel from '@pages/admin-panel/AdminPanel.tsx'
import Home from '@pages/home/Home.tsx'
import HoverAnim from '@pages/hover-anim/HoverAnim.tsx'
import '@styles/global.scss'

function App() {
	const location = useLocation()

	return (
		<AnimatePresence>
			<Routes location={location} key={location.pathname}>
				<Route path={URL.HOME} element={<Home />} />
				<Route path={URL.ADMIN_PANEL} element={<AdminPanel />} />
				<Route path={URL.HOVER_ANIM} element={<HoverAnim />} />
			</Routes>
		</AnimatePresence>
	)
}

export default App
