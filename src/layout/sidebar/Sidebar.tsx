import clsx from 'clsx'
import { useState } from 'react'
import s from './style.module.scss'

const Sidebar = () => {
	const [collapsed, setCollapsed] = useState(false)

	const onToggle = () => {
		setCollapsed(prev => !prev)
	}

	return (
		<aside className={s.sidebar}>
			<div>
				<nav className={s.nav}>
					<ul>
						<li onClick={onToggle}>1</li>
						<li>2</li>
						<li>3</li>
						<li>4</li>
					</ul>
				</nav>
			</div>
			<div
				className={clsx(s.sidebarLinks, {
					[s.active]: collapsed,
				})}
			>
				<div>dfsgsdgdsfgsdfg</div>
				<div>dfsgsdgdsfgsdfg</div>
				<div>dfsgsdgdsfgsdfg</div>
				<div>dfsgsdgdsfgsdfg</div>
				<div>dfsgsdgdsfgsdfg</div>
				<div>dfsgsdgdsfgsdfg</div>
				<div>dfsgsdgdsfgsdfg</div>
				<div>dfsgsdgdsfgsdfg</div>
			</div>
		</aside>
	)
}

export default Sidebar
