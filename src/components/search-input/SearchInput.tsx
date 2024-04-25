import s from './style.module.scss'

const SearchInput = () => {
	return (
		<div className={s.searchInput}>
			<input type="text" placeholder={'Search for the desired information'} />
		</div>
	)
}

export default SearchInput
