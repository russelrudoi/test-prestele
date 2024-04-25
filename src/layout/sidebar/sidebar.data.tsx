import AppIcon from '@assets/layout/sidebar/app.svg?react'
import CommunicationIcon from '@assets/layout/sidebar/communication.svg?react'
import DashboardIcon from '@assets/layout/sidebar/dashboard.svg?react'
import DiscountIcon from '@assets/layout/sidebar/discount.svg?react'
import ImagesIcon from '@assets/layout/sidebar/images.svg?react'
import SettingsIcon from '@assets/layout/sidebar/settings.svg?react'
import StatsIcon from '@assets/layout/sidebar/stats.svg?react'
import StoreIcon from '@assets/layout/sidebar/store.svg?react'
import UserIcon from '@assets/layout/sidebar/user.svg?react'
import { INavItem } from '@type/types.ts'

export const NAV_ITEMS: INavItem[] = [
	{
		id: 1,
		title: 'Dashboard',
		icon: <DashboardIcon />,
		links: [{ title: 'Dashboard' }],
	},
	{
		id: 2,
		title: 'Statistics',
		icon: <StatsIcon />,
		links: [{ title: 'Statistics' }],
	},
	{
		id: 3,
		title: 'App Customization',
		icon: <AppIcon />,
		links: [{ title: 'App Builder' }, { title: 'App Customizer' }, { title: 'A/B Testing' }],
	},
	{
		id: 4,
		title: 'Store Management',
		icon: <StoreIcon />,
		links: [
			{ title: 'Content Management' },
			{ title: 'Product Management' },
			{ title: 'Product Referral' },
			{ title: 'Shops Management' },
		],
	},
	{
		id: 5,
		title: 'User Management',
		icon: <UserIcon />,
		links: [
			{ title: 'Employee Management' },
			{ title: 'Customer Management' },
			{ title: 'Partner Management' },
		],
	},
	{
		id: 6,
		title: 'Communication',
		icon: <CommunicationIcon />,
		links: [{ title: 'Chat' }, { title: 'Notifications', isNotific: true }],
	},
	{
		id: 7,
		title: 'Communication',
		icon: <DiscountIcon />,
		links: [{ title: 'Discount' }],
	},
	{
		id: 8,
		title: 'Images',
		icon: <ImagesIcon />,
		links: [{ title: 'Images' }],
	},
	{
		id: 9,
		title: 'Settings',
		icon: <SettingsIcon />,
		links: [{ title: 'Settings' }],
	},
]
