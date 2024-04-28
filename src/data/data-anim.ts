import CorporateElipse1 from '@assets/pages/graphic-anim/elipses/corporate/ellipse-1.svg'
import CorporateElipse2 from '@assets/pages/graphic-anim/elipses/corporate/ellipse-2.svg'
import CorporateElipse3 from '@assets/pages/graphic-anim/elipses/corporate/ellipse-3.svg'
import CorporateElipse4 from '@assets/pages/graphic-anim/elipses/corporate/ellipse-4.svg'
import HomeElipse1 from '@assets/pages/graphic-anim/elipses/home-finding/ellipse-1.svg'
import HomeElipse2 from '@assets/pages/graphic-anim/elipses/home-finding/ellipse-2.svg'
import HomeElipse3 from '@assets/pages/graphic-anim/elipses/home-finding/ellipse-3.svg'
import HomeElipse4 from '@assets/pages/graphic-anim/elipses/home-finding/ellipse-4.svg'
import PersonalElipse1 from '@assets/pages/graphic-anim/elipses/personal/ellipse-1.svg'
import PersonalElipse2 from '@assets/pages/graphic-anim/elipses/personal/ellipse-2.svg'
import PersonalElipse3 from '@assets/pages/graphic-anim/elipses/personal/ellipse-3.svg'
import PersonalElipse4 from '@assets/pages/graphic-anim/elipses/personal/ellipse-4.svg'
import RelocationElipse1 from '@assets/pages/graphic-anim/elipses/relocation/ellipse-1.svg'
import RelocationElipse2 from '@assets/pages/graphic-anim/elipses/relocation/ellipse-2.svg'
import RelocationElipse3 from '@assets/pages/graphic-anim/elipses/relocation/ellipse-3.svg'
import RelocationElipse4 from '@assets/pages/graphic-anim/elipses/relocation/ellipse-4.svg'
import { IAnim } from '@type/types.ts'

export const dataRelocationElipse: IAnim = {
	id: 1,
	title: 'Relocation',
	icon: [RelocationElipse1, RelocationElipse2, RelocationElipse3, RelocationElipse4],
}

export const dataPersonalElipse: IAnim = {
	id: 2,
	title: 'Personal',
	icon: [PersonalElipse1, PersonalElipse2, PersonalElipse3, PersonalElipse4],
}
export const dataCorporatelElipse: IAnim = {
	id: 3,
	title: 'Corporate',
	icon: [CorporateElipse1, CorporateElipse2, CorporateElipse3, CorporateElipse4],
}
export const dataHomeElipse: IAnim = {
	id: 4,
	title: 'Home Finding',
	icon: [HomeElipse1, HomeElipse2, HomeElipse3, HomeElipse4],
}
