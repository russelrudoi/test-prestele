import { NAV_ITEMS } from '@layout/sidebar/sidebar.data.tsx'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Logo from '@assets/icon/logo.svg?react'
import TitleLogo from '@assets/icon/title-logo.svg?react'
import InfoIcon from '@assets/layout/sidebar/info.svg?react'
import { INavItem } from '@type/types.ts'
import s from './style.module.scss'

const Sidebar = () => {
	const [collapsed, setCollapsed] = useState(false)
	const [selectedItem, setSelectedItem] = useState<INavItem>()
	const [selectedItemId, setSelectedItemId] = useState<number | null>(null)

	useEffect(() => {
		const closeSidebar = (event: MouseEvent) => {
			if (collapsed && !(event.target as HTMLElement).closest(`.${s.sidebar}`)) {
				setCollapsed(false)
				setSelectedItemId(null)
			}
		}

		document.addEventListener('click', closeSidebar)

		return () => {
			document.removeEventListener('click', closeSidebar)
		}
	}, [collapsed])

	useEffect(() => {
		if (selectedItemId !== null) {
			filteringSelectedItem(selectedItemId)
		}
	}, [selectedItemId])

	const onToggle = (id: number) => {
		if (id === selectedItemId) {
			setCollapsed(false)
			setSelectedItemId(null)
		} else {
			setCollapsed(true)
			setSelectedItemId(id)
		}
	}

	const filteringSelectedItem = (id: number) => {
		const navItem = NAV_ITEMS.filter(item => item.id === id)
		setSelectedItem(navItem[0])
	}

	return (
		<aside className={s.sidebar}>
			<div className={s.wrapper}>
				<div className={s.logo}>
					<Logo />
				</div>

				<nav className={s.nav}>
					<ul className={s.navList}>
						{NAV_ITEMS.map((item, index) => (
							<li className={s.navItem} key={index} onClick={() => onToggle(item.id)}>
								{item.icon}
							</li>
						))}
					</ul>
				</nav>

				<div className={s.footer}>
					<div className={s.info}>
						<InfoIcon />
					</div>
					<p className={s.version}>1.01</p>
				</div>
			</div>

			<div
				className={clsx(s.sidebarLinks, {
					[s.active]: collapsed,
				})}
			>
				<div className={s.sidebarHeader}>
					<TitleLogo />
				</div>

				<div className={s.sidebarContent}>
					<h3 className={s.navTitle}>{selectedItem?.title}</h3>
					<ul className={s.links}>
						{selectedItem?.links.map((item, index) => (
							<li key={index}>
								{item.title}
								{item.isNotific && <span className={s.notific}></span>}
							</li>
						))}
					</ul>
				</div>

				<div className={s.sidebarFooter}>
					<p className={s.help}>Help Started</p>
					<hr className={s.divider} />
					<p className={s.version}>Version . 1.00.0.2</p>
				</div>
			</div>
		</aside>
	)
}

export default Sidebar
