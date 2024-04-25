import AvatarIcon from '@assets/layout/header/avatar.png'
import s from './style.module.scss'

const User = () => {
	return (
		<div className={s.user}>
			<div className={s.info}>
				<p className={s.name}>Alex Kognitiv</p>
				<p className={s.email}>Alexkognitiv@gmail.com</p>
			</div>
			<img className={s.avatar} src={AvatarIcon} alt="Avatar" />
		</div>
	)
}

export default User
