import { URL } from '@data/URL.ts'
import { dataCorporatelElipse, dataHomeElipse, dataRelocationElipse } from '@data/data-anim.ts'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import AnimatedBackground from '@components/animated-background/AnimatedBackground.tsx'
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
					<Link to={URL.ADMIN_PANEL}>
						<Button icon={<ArrowSvg />} className={s.btnNav}>
							Case Study
						</Button>
					</Link>
				</div>
			</div>
			<div className={clsx(s.hoverAnim, s.container)}>
				<div>
					<p className={s.suptitle}>Test 2</p>
					<h2 className={s.title}>
						Hover animation <br />
						With drag and drop
					</h2>
					<Link to={URL.HOVER_ANIM}>
						<Button icon={<ArrowSvg />} className={s.btnNav}>
							Case Study
						</Button>
					</Link>
				</div>
			</div>
			<div className={clsx(s.graphicAnim, s.container)}>
				<div>
					<p className={s.suptitle}>Test 3</p>
					<h2 className={s.title}>Graphic animation</h2>
					<Link to={URL.GRAPHIC_ANIM}>
						<Button icon={<ArrowSvg />} className={s.btnNav}>
							Case Study
						</Button>
					</Link>
					<div>
						<div className={s.relocationWrapper}>
							<AnimatedBackground
								dataElement={dataRelocationElipse}
								classnameWrapper={s.relocationWrapper}
								classnameAnim={s.relocationAnim}
							/>
						</div>
						<div className={s.corporate}>
							<AnimatedBackground
								dataElement={dataCorporatelElipse}
								classnameWrapper={s.animWrapper}
								classnameAnim={s.anim}
							/>
						</div>
						<div className={s.home}>
							<AnimatedBackground
								dataElement={dataHomeElipse}
								classnameWrapper={s.animWrapper}
								classnameAnim={s.anim}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Home
