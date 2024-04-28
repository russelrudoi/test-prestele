import React, { FC, useReducer, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import CollectionItem from '@components/category-item/collection-item/CollectionItem.tsx'
import NoteItem from '@components/category-item/note-item/NoteItem.tsx'
import AddIcon from '@assets/pages/admin-panel/add-icon.svg?react'
import { collectionsReducer } from '@utils/reducers/collectionReducer.ts'
import { ICategoryItem, ICollection, INote } from '@type/types.ts'
import s from './style.module.scss'

interface ICategory {
	item: ICategoryItem
}

const CategoryItem: FC<ICategory> = ({ item }) => {
	const [collections, dispatch] = useReducer(collectionsReducer, item.collections)
	const [editId, setEditId] = useState<string | null>(null)
	const [editName, setEditName] = useState('')
	const [currentCollection, setCurrentCollection] = useState<ICollection | null>(null)
	const [currentNote, setCurrentNote] = useState<INote | null>(null)

	const addCollection = () => {
		dispatch({
			type: 'ADD_COLLECTION',
			payload: { id: uuidv4(), name: 'New collection', notes: [] },
		})
	}

	const addNote = (collectionId: string) => {
		dispatch({
			type: 'ADD_NOTE',
			payload: { collectionId, note: { id: uuidv4(), name: 'New note' } },
		})
	}

	const handleEdit = (id: string, name: string, isNote = false) => {
		if (editId === id) {
			dispatch({
				type: isNote ? 'EDIT_NOTE' : 'EDIT_COLLECTION',
				payload: { id, editName },
			})
			setEditId(null)
			setEditName('')
		} else {
			setEditId(id)
			setEditName(name)
		}
	}

	const handleDelete = (id: string, isNote = false) => {
		dispatch({
			type: isNote ? 'DELETE_NOTE' : 'DELETE_COLLECTION',
			payload: id,
		})
	}

	//Drag and Drop
	function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault()
		const dragElement = e.target as HTMLElement

		if (dragElement.className == `${s.note}`) {
			dragElement.style.boxShadow = '0 2px 3px gray'
		}
	}

	function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
		;(e.target as HTMLElement).style.boxShadow = 'none'
	}

	function dragStartHandler(collection: ICollection, note: INote) {
		setCurrentCollection(collection)
		setCurrentNote(note)
	}

	function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
		;(e.target as HTMLElement).style.boxShadow = 'none'
	}

	function dropHandler(e: React.DragEvent<HTMLDivElement>, collection: ICollection, note: INote) {
		e.preventDefault()
		e.stopPropagation()

		if (currentNote !== null) {
			const currentIndex = currentCollection?.notes?.indexOf(currentNote)
			if (currentIndex !== undefined) currentCollection?.notes.splice(currentIndex, 1)
		}

		if (currentNote !== null) {
			const dropIndex = collection?.notes?.indexOf(note)
			if (dropIndex !== null) collection?.notes.splice(dropIndex + 1, 0, currentNote)
		}

		dispatch({
			type: 'UPDATE_COLLECTIONS',
			payload: { collection, currentCollection },
		})
		;(e.target as HTMLElement).style.boxShadow = 'none'
	}

	function dropCardHandler(e: React.DragEvent<HTMLDivElement>, collection: ICollection) {
		e.stopPropagation()

		if (currentNote !== null) {
			collection.notes.push(currentNote)

			const currentIndex = currentCollection?.notes?.indexOf(currentNote)
			if (currentIndex !== undefined) currentCollection?.notes.splice(currentIndex, 1)
		}

		dispatch({
			type: 'UPDATE_COLLECTIONS',
			payload: { collection, currentCollection },
		})
		;(e.target as HTMLElement).style.boxShadow = 'none'
	}

	return (
		<div className={s.wrapper}>
			<div className={s.container}>
				{collections.map(collection => (
					<CollectionItem
						key={collection.id}
						collection={collection}
						editId={editId}
						editName={editName}
						setEditName={setEditName}
						handleDelete={handleDelete}
						handleEdit={handleEdit}
						addNote={addNote}
						dragOverHandler={dragOverHandler}
						dropCardHandler={dropCardHandler}
					>
						{collection.notes.length !== 0 ? (
							<>
								{collection.notes.map(note => (
									<NoteItem
										key={note.id}
										note={note}
										dragLeaveHandler={dragLeaveHandler}
										collection={collection}
										dragEndHandler={dragEndHandler}
										dragOverHandler={dragOverHandler}
										dragStartHandler={dragStartHandler}
										dropHandler={dropHandler}
										editId={editId}
										editName={editName}
										handleDelete={handleDelete}
										handleEdit={handleEdit}
										setEditName={setEditName}
									/>
								))}
							</>
						) : (
							<div className={s.addNote} onClick={() => addNote(collection.id)}>
								<AddIcon /> Add
							</div>
						)}
					</CollectionItem>
				))}
			</div>

			{collections.length <= 1 && (
				<div className={s.footer}>
					<div className={s.addButton} onClick={addCollection}>
						Add New Collection <AddIcon />
					</div>
					<p>Drag treeNode to insert after the other treeNode.</p>
				</div>
			)}
		</div>
	)
}

export default CategoryItem
