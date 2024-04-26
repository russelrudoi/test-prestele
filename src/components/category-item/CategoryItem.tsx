import clsx from 'clsx'
import React, { FC, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import AddIcon from '@assets/pages/admin-panel/add-icon.svg?react'
import ArrowCollapseIcon from '@assets/pages/admin-panel/category-item/arrow-collaps.svg?react'
import DeleteGrayIcon from '@assets/pages/admin-panel/category-item/delete-gray.svg?react'
import DeleteIcon from '@assets/pages/admin-panel/category-item/delete.svg?react'
import DragIcon from '@assets/pages/admin-panel/category-item/drag.svg?react'
import EditGrayIcon from '@assets/pages/admin-panel/category-item/edit-gray.svg?react'
import EditIcon from '@assets/pages/admin-panel/category-item/edit.svg?react'
import FolderIcon from '@assets/pages/admin-panel/category-item/folder.svg?react'
import { ICategoryItem, ICollection, INote } from '@type/types.ts'
import s from './style.module.scss'

interface ICategory {
	item: ICategoryItem
}

const CategoryItem: FC<ICategory> = ({ item }) => {
	const [collections, setCollections] = useState<ICollection[]>(item.collections)

	const [editId, setEditId] = useState<string | null>(null)
	const [editName, setEditName] = useState('')

	const [currentCollection, setCurrentCollection] = useState<ICollection | null>(null)
	const [currentNote, setCurrentNote] = useState<INote | null>(null)

	const addCollection = () => {
		// const newCollectionName = window.prompt('Enter the name of the new collection:')
		const newCollection: ICollection = {
			id: uuidv4(),
			name: 'New collection',
			notes: [],
		}

		setCollections([...collections, newCollection])
	}

	const addNote = (id: string) => {
		const newNote = {
			id: uuidv4(),
			name: 'New note',
		}

		const editedCollections: ICollection[] = [...collections].map(item => {
			if (item.id === id) {
				return { ...item, notes: [newNote] }
			} else {
				return { ...item }
			}
		})
		setCollections([...editedCollections])
	}

	const handleEdit = (id: string, name: string, isNote = false) => {
		if (editId === id) {
			const newCollections = [...collections]

			newCollections.forEach(item => {
				if (item.id === id && !isNote) {
					item.name = editName
				} else if (isNote) {
					item.notes.forEach(note => {
						if (note.id === id) {
							note.name = editName
						}
					})
				}
			})

			setCollections(newCollections)
			setEditId(null)
		} else {
			setEditId(id)
			setEditName(name)
		}
	}

	const handleDelete = (id: string, isNote = false) => {
		if (!isNote) {
			setCollections(collections => collections.filter(item => item.id !== id))
		} else {
			setCollections(collections =>
				collections.map(item => ({
					...item,
					notes: item.notes.filter(note => note.id !== id),
				}))
			)
		}
	}

	function dragOverHandler(e: React.DragEvent<HTMLDivElement>, collection) {
		e.preventDefault()
		const dragElement = e.target as HTMLElement

		if (dragElement.className == `${s.note}`) {
			dragElement.style.boxShadow = '0 2px 3px gray'
		}

		// if (
		// 	dragElement.className == `${s.shadowNote}` &&
		// 	currentCollection?.id !== collection?.id
		// ) {
		// 	dragElement.className = clsx(s.shadowNote, s.shadowNoteHover)
		// }
	}

	function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
		;(e.target as HTMLElement).style.boxShadow = 'none'
	}

	function dragStartHandler(e: React.DragEvent<HTMLDivElement>, collection: ICollection, note) {
		setCurrentCollection(collection)
		setCurrentNote(note)
	}

	console.log(currentCollection)
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

		setCollections(
			collections.map(b => {
				if (b.id === collection.id && collection) {
					return collection
				}
				if (currentCollection && b.id === currentCollection.id) {
					return currentCollection
				}

				return b
			})
		)
		;(e.target as HTMLElement).style.boxShadow = 'none'
	}

	function dropCardHandler(e: React.DragEvent<HTMLDivElement>, collection: ICollection) {
		e.stopPropagation()
		if (currentNote !== null) {
			collection.notes.push(currentNote)
			const currentIndex = currentCollection?.notes?.indexOf(currentNote)
			if (currentIndex !== undefined) currentCollection?.notes.splice(currentIndex, 1)
		}

		setCollections(
			collections.map(b => {
				if (b.id === collection.id && collection) {
					return collection
				}
				if (currentCollection && b.id === currentCollection.id) {
					return currentCollection
				}

				return b
			})
		)
		;(e.target as HTMLElement).style.boxShadow = 'none'
	}

	return (
		<div className={s.item}>
			<div>
				{collections.map(collection => (
					<div
						key={collection.id}
						onDragOver={e => dragOverHandler(e, collection)}
						onDrop={e => dropCardHandler(e, collection)}
					>
						<div className={s.collection}>
							<div>
								<button className={s.btnCollapse} onClick={() => {}}>
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
							<div>
								<button onClick={() => handleDelete(collection.id)}>
									<DeleteIcon />
								</button>
								<button onClick={() => handleEdit(collection.id, collection.name)}>
									<EditIcon />
								</button>
							</div>
						</div>
						<div className={s.content}>
							{collection.notes.length !== 0 ? (
								<>
									{collection.notes.map(note => (
										<div
											key={note.id}
											className={s.note}
											draggable={true}
											onDragOver={e => dragOverHandler(e, collection)}
											onDragLeave={e => dragLeaveHandler(e)}
											onDragStart={e => dragStartHandler(e, collection, note)}
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
													/>
												) : (
													note.name
												)}
											</p>

											<button
												onClick={() =>
													handleEdit(note.id, collection.name, true)
												}
											>
												<EditGrayIcon />
											</button>
											<button onClick={() => handleDelete(note.id, true)}>
												<DeleteGrayIcon />
											</button>
										</div>
									))}
									{/*{collection.notes.length === 1 && (*/}
									{/*	<div*/}
									{/*		className={s.shadowNote}*/}
									{/*		onDragOver={e => dragOverHandler(e, collection)}*/}
									{/*		onDrop={e => dropCardHandler(e, collection)}*/}
									{/*	></div>*/}
									{/*)}*/}
								</>
							) : (
								<div className={s.addNote} onClick={() => addNote(collection.id)}>
									<AddIcon /> Add
								</div>
							)}
						</div>
					</div>
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
