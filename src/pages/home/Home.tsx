import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { Button } from '@components/button/button.tsx'
import ArrowSvg from '@assets/icon/arrow.svg?react'
import s from './style.module.scss'

const Home = () => {
	return (
		<section className={s.wrapper}>
			<div className={clsx(s.adminPanel, s.container)}>
				<div className={s.adminPanelInfo}>
					<p className={s.suptitle}>Test 1</p>
					<h2 className={s.title}>
						Admin Panel <br />
						Manage Category Page
					</h2>
					<Link to={'/admin-panel'}>
						<Button icon={<ArrowSvg />} className={s.btnNav}>
							Case Study
						</Button>
					</Link>
				</div>
			</div>
			<div className={clsx(s.hoverAnim, s.container)}>
				<p className={s.suptitle}>Test 2</p>
				<h2 className={s.title}>
					Hover animation <br />
					With drag and drop
				</h2>
				<Button icon={<ArrowSvg />} className={s.btnNav}>
					Case Study
				</Button>
			</div>
			<div className={clsx(s.graphicAnim, s.container)}>
				<p className={s.suptitle}>Test 3</p>
				<h2 className={s.title}>Graphic animation</h2>
				<Button icon={<ArrowSvg />} className={s.btnNav}>
					Case Study
				</Button>
			</div>
		</section>
	)
}

export default Home
