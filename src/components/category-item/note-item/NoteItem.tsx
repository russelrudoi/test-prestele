import React, { FC } from 'react'
import EditBlock from '@components/edit-block/EditBlock.tsx'
import DragIcon from '@assets/pages/admin-panel/category-item/drag.svg?react'
import { ICollection, INote } from '@type/types.ts'
import s from './style.module.scss'

interface INoteItem {
	note: INote
	collection: ICollection
	editId: string | null
	editName: string
	setEditName: React.Dispatch<React.SetStateAction<string>>
	dragOverHandler: (e: React.DragEvent<HTMLDivElement>, collection: ICollection) => void
	dragLeaveHandler: (e: React.DragEvent<HTMLDivElement>) => void
	dragStartHandler: (collection: ICollection, note: INote) => void
	dragEndHandler: (e: React.DragEvent<HTMLDivElement>) => void
	dropHandler: (e: React.DragEvent<HTMLDivElement>, collection: ICollection, note: INote) => void
	handleEdit: (id: string, name: string, isNote?: boolean) => void
	handleDelete: (id: string, isNote?: boolean) => void
}

const NoteItem: FC<INoteItem> = props => {
	const {
		note,
		collection,
		editId,
		editName,
		setEditName,
		dragLeaveHandler,
		dragOverHandler,
		dragStartHandler,
		dragEndHandler,
		dropHandler,
		handleEdit,
		handleDelete,
	} = props

	return (
		<div
			key={note.id}
			className={s.note}
			draggable={true}
			onDragOver={e => dragOverHandler(e, collection)}
			onDragLeave={e => dragLeaveHandler(e)}
			onDragStart={() => dragStartHandler(collection, note)}
			onDragEnd={e => dragEndHandler(e)}
			onDrop={e => dropHandler(e, collection, note)}
		>
			<DragIcon className={s.btnDrag} />

			<p className={s.noteName}>
				{note.id === editId ? (
					<input
						type="text"
						value={editName}
						onChange={e => setEditName(e.target.value)}
						maxLength={15}
					/>
				) : (
					note.name
				)}
			</p>
			<div>
				<EditBlock
					id={note.id}
					name={note.name}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
					isNote={true}
					classname={s.btnGray}
				/>
			</div>
		</div>
	)
}

export default NoteItem
