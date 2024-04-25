import { ReactNode } from 'react'

export interface INavItem {
	id: number
	title: string
	icon: ReactNode
	links: {
		title: string
		isNotific?: boolean
	}[]
}
