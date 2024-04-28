import { dataSlider } from '@data/data-slider.ts'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { useEffect, useState } from 'react'
import s from './style.module.scss'

type DirectionSwipe = 'forward' | 'back'

export default function HoverAnim() {
	const [currentSlideId, setCurrentSlideId] = useState(0)
	const [staticPosition, setStaticPosition] = useState(0)
	const [currentPosition, setCurrentPosition] = useState(0)
	const [currentColor, setCurrentColor] = useState('')
	const [prevColor, setPrevColor] = useState('')
	const [nextColor, setNextColor] = useState('')
	const [directionSwipe, setDirectionSwipe] = useState<DirectionSwipe | null>(null)
	const [slideCenteredId, setSlideCenteredId] = useState(0)
	const [showSlider, setShowSlider] = useState(false)
	const [slides, setSlides] = useState<HTMLElement[]>([])

	const [sliderRef] = useKeenSlider(
		{
			slides: {
				origin: 'center',
				perView: 2,
			},
			created(e) {
				setCurrentColor('#EBFFFC')
				setPrevColor('#EBFFFC')
				setSlides(e.slides)
			},
		},
		[
			slider => {
				slider.on('slideChanged', e => {
					setSlideCenteredId(e.track.details.abs)
				})
				slider.on('detailsChanged', () => {
					const position = +slider?.track?.details?.progress.toFixed(2)
					setCurrentPosition(position)
				})
				slider.on('dragStarted', e => {
					setCurrentSlideId(e.track.details.abs)
				})
				slider.on('animationEnded', e => {
					const position = +slider?.track?.details?.progress.toFixed(2)
					setStaticPosition(position)
					setDirectionSwipe(null)
					setCurrentSlideId(e.track.details.abs)
				})
			},
		]
	)

	useEffect(() => {
		const progress = getProgressInterpolate()
		interpolateColors(progress)
		getDirectionSwipe()
	}, [currentPosition])

	useEffect(() => {
		getNextColor(slides, currentSlideId)
	}, [directionSwipe])

	useEffect(() => {
		const color = slides[currentSlideId]?.getAttribute('data-color')

		if (color !== null && color !== nextColor) {
			setPrevColor(color)
		}
	}, [currentSlideId, slides, nextColor])

	const getDirectionSwipe = () => {
		if (currentPosition > staticPosition) {
			setDirectionSwipe('forward')
		}

		if (currentPosition < staticPosition) {
			setDirectionSwipe('back')
		}
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-expect-error
	const getNextColor = (slides, index: number) => {
		if (!slides || !slides.length) return

		if (directionSwipe === 'forward') {
			if (slides.length - 1 === index) {
				setNextColor(slides[index].getAttribute('data-color'))
				return
			}

			setNextColor(slides[index + 1].getAttribute('data-color'))
			return
		}

		if (directionSwipe === 'back') {
			if (index === 0) {
				setNextColor(slides[index].getAttribute('data-color'))
				return
			}

			setNextColor(slides[index - 1].getAttribute('data-color'))
			return
		}
	}

	const getProgressInterpolate = () => {
		if (!slides || !slides.length) return 0

		const stepSwipe = 0.5

		if (directionSwipe === 'forward') {
			return currentSlideId > 0
				? Math.round(((currentPosition - stepSwipe) * 100) / stepSwipe)
				: Math.round((currentPosition * 100) / stepSwipe)
		}

		if (directionSwipe === 'back') {
			return currentSlideId > 1
				? Math.round((1 - (currentPosition - stepSwipe) / stepSwipe) * 100)
				: Math.round((1 - currentPosition / stepSwipe) * 100)
		}

		return 0
	}

	function interpolateColors(progress: number) {
		const newColor = gsap.utils.interpolate(
			`${prevColor}`,
			`${!nextColor ? prevColor : nextColor}`,
			progress / 100
		)

		setCurrentColor(newColor)
	}

	return (
		<>
			<div className={s.wrapper} key={'slider'} style={{ backgroundColor: currentColor }}>
				<p className={s.info}>
					Here you can exchange boxes
					<br /> with a drag and drop
				</p>
				<div className={s.wrapperSlider}>
					<div ref={sliderRef} className={clsx('keen-slider', s.slider)}>
						{dataSlider.map(slide => (
							<div
								key={slide.id}
								className={clsx('keen-slider__slide', s.slide, {
									[s.slideCentered]: slideCenteredId + 1 === slide.id,
								})}
								data-color={slide.backgroundColor}
							>
								<img src={slide.image} alt="Product" />
							</div>
						))}
					</div>
				</div>

				<AnimatePresence>
					{!showSlider && (
						<motion.div
							className={s.preview}
							initial={{ opacity: 1, y: 0 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: '-100%', transition: { duration: 1 } }}
							key={'products'}
						>
							<p className={s.info} onClick={() => setShowSlider(false)}>
								This is a small hover animation. <br /> When pressed, it scrolls
							</p>
							<div className={s.productWrapper}>
								{dataSlider.map(slide => (
									<img
										src={slide.image}
										alt="Product"
										key={slide.id}
										className={s[`product-${slide.id}`]}
									/>
								))}
							</div>
							<button className={s.btn} onClick={() => setShowSlider(true)}>
								See all Product
							</button>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	)
}
