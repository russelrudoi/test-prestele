import SearchInput from '@components/search-input/SearchInput.tsx'
import User from '@components/user/User.tsx'
import s from './style.module.scss'

const Header = () => {
	return (
		<header className={s.header}>
			<SearchInput />
			<User />
		</header>
	)
}

export default Header
