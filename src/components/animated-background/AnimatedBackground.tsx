import clsx from 'clsx'
import { motion } from 'framer-motion'
import { FC } from 'react'
import { IAnim } from '@type/types.ts'
import s from './style.module.scss'

interface IAnimatedBackground {
	dataElement: IAnim
	classnameWrapper?: string
	classnameAnim?: string
}

const AnimatedBackground: FC<IAnimatedBackground> = ({
	dataElement,
	classnameWrapper,
	classnameAnim,
}) => {
	return (
		<div className={clsx(s.wrapper, classnameWrapper)}>
			<div className={s.title} data-heading={dataElement.title}>
				{dataElement.title}
			</div>
			{dataElement.icon.map((elem, index) => (
				<div className={clsx(s.animWrapper, classnameAnim)}>
					<motion.img
						src={elem}
						alt=""
						animate={{ rotate: index % 2 ? 360 : -360 }}
						transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
					/>
				</div>
			))}
		</div>
	)
}

export default AnimatedBackground
