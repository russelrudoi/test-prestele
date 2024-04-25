import MainLayout from '@layout/main-layout/MainLayout.tsx'
import s from './style.module.scss'

const AdminPanel = () => {
	return (
		<section className={s.wrapper}>
			<MainLayout>
				<div className={s.content}>content</div>
			</MainLayout>
		</section>
	)
}

export default AdminPanel
