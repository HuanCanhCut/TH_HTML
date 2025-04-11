const slider = document.querySelector('.slider')
const prevButton = document.querySelector('.slider-wrapper__button.prev')
const nextButton = document.querySelector('.slider-wrapper__button.next')
const sliderWrapper = document.querySelector('.slider-wrapper')

const app = {
    slideUrl: [
        {
            url: 'img/categories/cat-1.jpg',
            title: 'Fresh Juice',
        },
        {
            url: 'img/categories/cat-2.jpg',
            title: 'Dried Fruit',
        },
        {
            url: 'img/categories/cat-3.jpg',
            title: 'Vegetables',
        },
        {
            url: 'img/categories/cat-4.jpg',
            title: 'Drinks Fruit',
        },
        {
            url: 'img/categories/cat-5.jpg',
            title: 'Drinks Fruit',
        },
    ],

    renderSlider() {
        const htmls = this.slideUrl.map((item) => {
            return `
                <div class="slider__item">
                    <img src="${item.url}" alt="" />
                    <h3 class="slider__item__title">${item.title}</h3>
                </div>
            `
        })

        slider.innerHTML = htmls.join('')
    },

    handleEvent() {
        const gap = 25
        const itemWidth = slider.querySelector('.slider__item').offsetWidth

        prevButton.addEventListener('click', () => {
            const slideList = document.querySelectorAll('.slider__item')
            slider.insertBefore(slideList[slideList.length - 1], slideList[0])

            Object.assign(slider.style, {
                transition: 'none',
                transform: `translateX(-${itemWidth + gap}px)`,
            })

            setTimeout(() => {
                Object.assign(slider.style, {
                    transition: 'all 0.3s linear',
                    transform: 'translateX(0)',
                })
            }, 10)
        })

        nextButton.addEventListener('click', () => {
            const slideList = document.querySelectorAll('.slider__item')

            Object.assign(slider.style, {
                transition: 'all 0.3s linear',
                transform: `translateX(-${itemWidth + gap}px)`,
            })

            setTimeout(() => {
                slider.appendChild(slideList[0])
                Object.assign(slider.style, {
                    transition: 'none',
                    transform: 'translateX(0)',
                })
            }, 300)
        })

        setInterval(() => {
            nextButton.click()
        }, 3000)
    },

    init() {
        this.renderSlider()
        this.handleEvent()
    },
}

app.init()
