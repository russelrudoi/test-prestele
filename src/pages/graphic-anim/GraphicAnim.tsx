import { dataCorporatelElipse, dataPersonalElipse, dataRelocationElipse } from '@data/data-anim.ts'
import { motion, useAnimationControls } from 'framer-motion'
import React, { useState } from 'react'
import AnimatedBackground from '@components/animated-background/AnimatedBackground.tsx'
import s from './style.module.scss'

const GraphicAnim = () => {
	const [activeRelocation, setActiveRelocation] = useState(false)
	const controls = useAnimationControls()

	const relocationVariant = {
		visible: {
			x: 0,
			transition: { type: 'spring', duration: 3 },
		},
		exit: {
			x: '-45vw',
			transition: { type: 'spring', duration: 3 },
		},
	}

	const personalVariant = {
		hidden: {
			y: '70vh',
			x: '-50%',
		},
		visible: {
			y: '70vh',
			transition: { type: 'spring', duration: 3 },
		},
		exit: {
			y: '-5%',
			transition: { type: 'spring', duration: 3 },
		},
	}
	const corporateVariant = {
		hidden: {
			y: '70vh',
			x: '50%',
		},
		visible: {
			y: '70vh',
			transition: { type: 'spring', duration: 3 },
		},
		exit: {
			y: '-5%',
			transition: { type: 'spring', duration: 3 },
		},
	}

	const onToggle = (
		currentState: boolean,
		setState: React.Dispatch<React.SetStateAction<boolean>> | null
	) => {
		if (setState !== null) {
			setState(prev => !prev)
		}
		console.log(currentState)
		if (currentState) {
			console.log('visible')
			return controls.start('visible')
		} else {
			console.log('exit')

			return controls.start('exit')
		}
	}

	return (
		<motion.div
			className={s.wrapper}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 2 } }}
			exit={{ opacity: 0 }}
		>
			<motion.div
				className={s.relocation}
				variants={relocationVariant}
				initial="visible"
				animate={controls}
				exit="exit"
				onClick={() => onToggle(activeRelocation, setActiveRelocation)}
			>
				<AnimatedBackground dataElement={dataRelocationElipse} />
			</motion.div>

			<motion.div>
				<motion.div
					className={s.personal}
					variants={personalVariant}
					initial="hidden"
					animate={controls}
					exit="exit"
					onClick={() => onToggle(!activeRelocation, null)}
				>
					<AnimatedBackground dataElement={dataPersonalElipse} />
				</motion.div>
				<motion.div
					className={s.corporate}
					variants={corporateVariant}
					initial="hidden"
					animate={controls}
					exit="exit"
					onClick={() => onToggle(!activeRelocation, null)}
				>
					<AnimatedBackground dataElement={dataCorporatelElipse} />
				</motion.div>
			</motion.div>
		</motion.div>
	)
}

export default GraphicAnim
