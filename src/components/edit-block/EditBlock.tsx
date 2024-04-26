import clsx from 'clsx'
import { FC } from 'react'
import DeleteIcon from '@assets/pages/admin-panel/category-item/delete.svg?react'
import EditIcon from '@assets/pages/admin-panel/category-item/edit.svg?react'
import s from './style.module.scss'

interface IEditBlock {
	id: string
	name: string
	isNote?: boolean
	handleDelete: (id: string, isNote?: boolean) => void
	handleEdit: (id: string, name: string, isNote?: boolean) => void
	classname?: string
}

const EditBlock: FC<IEditBlock> = ({ handleEdit, handleDelete, id, name, isNote, classname }) => {
	return (
		<div className={clsx(s.block, classname)}>
			<button onClick={() => handleDelete(id, isNote)}>
				<DeleteIcon />
			</button>
			<button onClick={() => handleEdit(id, name, isNote)}>
				<EditIcon />
			</button>
		</div>
	)
}

export default EditBlock
