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

export interface ICategoryItem {
	id: string
	collections: ICollection[]
}

export interface ICollection {
	id: string
	name: string
	notes: INote[]
}

export interface INote {
	id: string
	name: string
}
