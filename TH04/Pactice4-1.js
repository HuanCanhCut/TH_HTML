const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const slide = document.querySelector('.slide')

const imgs = [
    'https://lh7-rt.googleusercontent.com/docsz/AD_4nXfVexbOCVCx1E6bGk35u-ztZ_r_cK7YDMiBR46V65_ZoMyEaYDfHED31XPRERi_cD4VsANPqSzjASdN5KiUSFIy23xEzVMYQqqU3sA8QSYlCdQ1HWGpu7llGPk6qCIFa9_QmarHYOTSEPTei9hKbEXBKqQ_?key=v8ba6Z10Wr-7QNx-8gMTgw',
    'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-1.jpg',
    'https://inkythuatso.com/uploads/images/2022/05/hinh-anh-meo-bua-buon-cuoi-nhat-12-09-56-39.jpg',
    'https://cdn0918.cdn4s1.com/media/blog-images/meme-anh-meo-cute/meme-anh-meo-cute-42.jpg',
]

let index = 0

slide.src = imgs[index]

prev.onclick = () => {
    index--
    if (index < 0) {
        index = imgs.length - 1
    }
    slide.src = imgs[index]
}

next.onclick = () => {
    index++
    if (index > imgs.length - 1) {
        index = 0
    }
    slide.src = imgs[index]
}

setInterval(() => {
    next.click()
}, 3000)
