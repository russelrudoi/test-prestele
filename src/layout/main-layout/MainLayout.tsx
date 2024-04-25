import Header from '@layout/header/Header.tsx'
import Sidebar from '@layout/sidebar/Sidebar.tsx'
import clsx from 'clsx'
import { ReactElement, memo } from 'react'
import s from './style.module.scss'

interface IMainLayout {
	className?: string
	children: ReactElement
}

const MainLayout = memo((props: IMainLayout) => {
	const { className, children } = props
	return (
		<div className={clsx(s.layout, className)}>
			<Sidebar />
			<div className={s.wrapper}>
				<Header />
				<main>{children}</main>
			</div>
		</div>
	)
})

export default MainLayout
