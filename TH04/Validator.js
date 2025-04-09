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
            inputElement.oninput = function () {
                errorElement.innerText = ''
                getParentElement(inputElement, options.formGroup).classList.remove('invalid')
            }
            return !errorMessage
        }

        let arrayRules = options.rules
        //? handled submit
        formElement.onsubmit = async function (e) {
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

                    await options.submit(data)
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
                if (inputElement.value === '') {
                    invalid(inputElement, rule)
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

Validator.isUsername = function (selector, errorMessage) {
    return {
        selector: selector,
        test: function (value) {
            console.log(value)
            return /^[a-zA-Z]{1,10}$/.test(value) ? undefined : errorMessage || 'Tên tài khoản không hợp lệ!'
        },
    }
}

Validator.isDate = function (selector, errorMessage) {
    return {
        selector: selector,
        test: function (value) {
            return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})$/.test(value)
                ? undefined
                : errorMessage || 'Ngày không hợp lệ!'
        },
    }
}
