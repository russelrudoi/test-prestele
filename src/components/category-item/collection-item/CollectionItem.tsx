import clsx from 'clsx'
import React, { FC, ReactElement, useState } from 'react'
import EditBlock from '@components/edit-block/EditBlock.tsx'
import ArrowCollapseIcon from '@assets/pages/admin-panel/category-item/arrow-collaps.svg?react'
import FolderIcon from '@assets/pages/admin-panel/category-item/folder.svg?react'
import { ICollection } from '@type/types.ts'
import s from './style.module.scss'

interface ICollectionItem {
	children: ReactElement
	collection: ICollection
	editId: string | null
	editName: string
	setEditName: React.Dispatch<React.SetStateAction<string>>
	handleDelete: (id: string, isNote?: boolean) => void
	handleEdit: (id: string, name: string, isNote?: boolean) => void
	addNote: (id: string) => void
	dragOverHandler: (e: React.DragEvent<HTMLDivElement>, collection: ICollection) => void
	dropCardHandler: (e: React.DragEvent<HTMLDivElement>, collection: ICollection) => void
}

const CollectionItem: FC<ICollectionItem> = props => {
	const {
		collection,
		dragOverHandler,
		dropCardHandler,
		setEditName,
		editName,
		editId,
		handleEdit,
		handleDelete,

		children,
	} = props

	const [collapseContent, setCollapseContent] = useState(true)

	const onToggle = () => {
		setCollapseContent(prev => !prev)
	}
	return (
		<div
			key={collection.id}
			onDragOver={e => dragOverHandler(e, collection)}
			onDrop={e => dropCardHandler(e, collection)}
		>
			<div className={s.collection}>
				<div>
					<button
						className={clsx(s.btnCollapse, { [s.active]: collapseContent })}
						onClick={onToggle}
					>
						<ArrowCollapseIcon />
					</button>

					<p className={s.nameCollection}>
						<FolderIcon />

						{collection.id === editId ? (
							<input
								className={s.input}
								type="text"
								value={editName}
								maxLength={20}
								onChange={e => setEditName(e.target.value)}
							/>
						) : (
							collection.name
						)}
					</p>
				</div>
				<div className={s.editBlock}>
					<EditBlock
						handleEdit={handleEdit}
						handleDelete={handleDelete}
						id={collection.id}
						name={collection.name}
					/>
				</div>
			</div>
			<div className={clsx(s.content, { [s.active]: collapseContent })}>
				<div className={s.contentInner}>{children}</div>
			</div>
		</div>
	)
}

export default CollectionItem
