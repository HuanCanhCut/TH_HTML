function Validator(options) {
    let formElement = document.querySelector(options.form)
    let selectorRules = {}

    function getParentElement(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement
        }
    }

    const testPower = (value) => {
        const power = Array.from(document.querySelectorAll('.power-password-item'))
        //Yếu (Chỉ có chữ hoặc số, dưới 8 ký tự)
        if (/^[a-zA-Z0-9]{1,7}$/.test(value)) {
            power[0].style.backgroundColor = 'red'
        } else if (/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/.test(value)) {
            power[0].style.backgroundColor = 'yellow'
            power[1].style.backgroundColor = 'yellow'
        } else if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(value)) {
            power[0].style.backgroundColor = '#41ff41'
            power[1].style.backgroundColor = '#41ff41'
            power[2].style.backgroundColor = '#41ff41'
        }
    }

    if (formElement) {
        //? function invalid
        function invalid(inputElement, rule) {
            let errorElement = getParentElement(inputElement, options.formGroup).querySelector(options.errorSelector)
            let errorMessage

            let rules = selectorRules[rule.selector]
            for (let i = 0; i < rules.length; ++i) {
                errorMessage = rules[i](inputElement.value)
                if (errorMessage) {
                    break
                }
            }

            if (errorMessage) {
                errorElement.innerText = errorMessage
                getParentElement(inputElement, options.formGroup).classList.add('invalid')
            } else {
                errorElement.innerText = ''
                getParentElement(inputElement, options.formGroup).classList.remove('invalid')
            }

            //? input handled
            inputElement.oninput = function (e) {
                testPower(e.target.value)
                errorElement.innerText = ''
                getParentElement(inputElement, options.formGroup).classList.remove('invalid')
            }
            return !errorMessage
        }

        let arrayRules = options.rules
        //? handled submit
        formElement.onsubmit = function (e) {
            e.preventDefault()

            var isFormValid = true

            for (let rule of arrayRules) {
                let inputElement = document.querySelector(rule.selector)
                let isValid = invalid(inputElement, rule)
                if (!isValid) {
                    isFormValid = false
                }
            }

            if (isFormValid) {
                //? submit with javascript
                if (typeof options.submit === 'function') {
                    const enabledInputs = formElement.querySelectorAll('[name]')

                    const data = Array.from(enabledInputs).reduce((value, input) => {
                        return (value[input.name] = input.value) && value
                    }, {})

                    options.submit(data)
                } else {
                    formElement.submit()
                }
            }
        }

        for (let rule of arrayRules) {
            //! Handle the case where there are many overlapping rules
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }

            let inputElement = document.querySelector(rule.selector)

            inputElement.onblur = () => {
                invalid(inputElement, rule)
            }

            inputElement.oninput = (e) => {
                testPower(e.target.value)

                console.log(e.target)

                if (e.target.type === 'email') {
                    document.querySelector('.char-count').textContent = `${e.target.value.length}/100 ký tự`
                }
            }
        }
    }
}

Validator.isRequired = function (selector, errorMessage) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : errorMessage || 'Vui lòng nhập trường này!'
        },
    }
}

Validator.isMinWords = function (selector, min, errorMessage) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim().split(' ').length >= min
                ? undefined
                : errorMessage || `Vui lòng nhập ít nhất ${min} từ!`
        },
    }
}
Validator.isEmail = function (selector, errorMessage) {
    return {
        selector: selector,
        test: function (value) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
                ? undefined
                : errorMessage || 'Email không đúng định dạng!'
        },
    }
}

Validator.isPassword = function (selector, min, errorMessage) {
    return {
        selector: selector,
        test: function (value) {
            const passwordRegex = new RegExp(
                `^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{${min},}$`
            )
            if (!passwordRegex.test(value))
                return (
                    errorMessage ||
                    `Mật khẩu phải có ít nhất ${min} ký tự, chứa chữ hoa, chữ thường, số và ký tự đặc biệt!`
                )
            return undefined
        },
    }
}

Validator.isChecked = function (selector, errorMessage) {
    return {
        selector: selector,
        test: function (value) {
            const checkbox = document.querySelector(selector)
            return checkbox.checked ? undefined : errorMessage || 'Vui lòng đồng ý với điều khoản sử dụng!'
        },
    }
}
