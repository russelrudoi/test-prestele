import { dataCategories } from '@data/data-category.ts'
import MainLayout from '@layout/main-layout/MainLayout.tsx'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import CategoryItem from '@components/category-item/CategoryItem.tsx'
import AddIcon from '@assets/pages/admin-panel/add-icon.svg?react'
import s from './style.module.scss'

const AdminPanel = () => {
	const [categories, setCategories] = useState(dataCategories)
	function addCategory() {
		setCategories([{ id: uuidv4(), collections: [] }, ...categories])
	}

	return (
		<motion.section
			className={s.wrapper}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 2 } }}
			exit={{ opacity: 0 }}
		>
			<MainLayout>
				<div className={s.content}>
					<div className={s.header}>
						<div>
							<h1 className={s.title}>Manage Category Page</h1>
							<p className={s.subtitle}>
								Is simply dummy text of the printing and typesetting industry.
							</p>
						</div>

						<button className={s.btnAdd} onClick={addCategory}>
							<AddIcon />
							Create New Category
						</button>
					</div>

					<ul className={s.list}>
						{categories.map(item => (
							<CategoryItem item={item} key={item.id} />
						))}
					</ul>
				</div>
			</MainLayout>
		</motion.section>
	)
}

export default AdminPanel
