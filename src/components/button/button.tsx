import clsx from 'clsx'
import { FC, ReactNode } from 'react'
import s from './style.module.scss'

interface IButton {
	readonly children: string
	readonly icon?: ReactNode
	// readonly theme?: 'blue' | 'transparent-grey' | 'transparent-blue'
	readonly disabled?: boolean
	readonly className?: string
	readonly onClick?: () => void
}

export const Button: FC<IButton> = props => {
	const { children, icon, className, onClick } = props
	return (
		<button onClick={onClick} className={clsx(s.button, className)}>
			{children}
			{icon}
		</button>
	)
}
