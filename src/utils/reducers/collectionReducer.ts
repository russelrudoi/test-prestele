import { ICollection } from '@type/types.ts'

export const collectionsReducer = (state: ICollection[], action: any): ICollection[] => {
	switch (action.type) {
		case 'ADD_COLLECTION':
			return [...state, action.payload]
		case 'ADD_NOTE':
			return state.map(collection =>
				collection.id === action.payload.collectionId
					? { ...collection, notes: [...collection.notes, action.payload.note] }
					: collection
			)
		case 'EDIT_COLLECTION':
			return state.map(collection =>
				collection.id === action.payload.id
					? { ...collection, name: action.payload.editName }
					: collection
			)
		case 'EDIT_NOTE':
			return state.map(collection => ({
				...collection,
				notes: collection.notes.map(note =>
					note.id === action.payload.id
						? { ...note, name: action.payload.editName }
						: note
				),
			}))
		case 'DELETE_COLLECTION':
			return state.filter(collection => collection.id !== action.payload)
		case 'DELETE_NOTE':
			return state.map(collection => ({
				...collection,
				notes: collection.notes.filter(note => note.id !== action.payload),
			}))
		case 'UPDATE_COLLECTIONS':
			return state.map(collection => {
				if (collection.id === action.payload.collection.id && action.payload.collection) {
					return action.payload.collection
				}

				if (
					action.payload.currentCollection &&
					collection.id === action.payload.currentCollection.id
				) {
					return action.payload.currentCollection
				}

				return collection
			})
		default:
			return state
	}
}
