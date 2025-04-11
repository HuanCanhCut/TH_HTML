const switchSignupBtn = document.querySelector('.switch-signup')
const switchLoginBtn = document.querySelector('.switch-login')
const slider = document.querySelector('.slider')

const inputPasswordLogin = document.querySelector('.form-control-group-login .form-control[type="password"]')
const inputPasswordSignup = document.querySelector('.form-control-group-signup .form-control[type="password"]')
const hidePasswordLogin = document.querySelector('.form-control-group-login .fa-eye-slash')
const showPasswordLogin = document.querySelector('.form-control-group-login .fa-eye')
const hidePasswordSignup = document.querySelector('.form-control-group-signup .fa-eye-slash')
const showPasswordSignup = document.querySelector('.form-control-group-signup .fa-eye')

hidePasswordLogin.onclick = () => {
    showPasswordLogin.style.display = 'block'
    hidePasswordLogin.style.display = 'none'
    inputPasswordLogin.type = 'password'
}

showPasswordLogin.onclick = () => {
    hidePasswordLogin.style.display = 'block'
    showPasswordLogin.style.display = 'none'
    inputPasswordLogin.type = 'text'
}

hidePasswordSignup.onclick = () => {
    showPasswordSignup.style.display = 'block'
    hidePasswordSignup.style.display = 'none'
    inputPasswordSignup.type = 'password'
}

showPasswordSignup.onclick = () => {
    hidePasswordSignup.style.display = 'block'
    showPasswordSignup.style.display = 'none'
    inputPasswordSignup.type = 'text'
}

switchLoginBtn.onclick = () => {
    slider.style.transform = `translateX(-50%)`
    window.history.pushState({}, '', '?login')
}

switchSignupBtn.onclick = () => {
    slider.style.transform = `translateX(0px)`
    window.history.pushState({}, '', '?signup')
}
