let language = navigator.language
let invoice = '' + (Math.random()*1000000)

window.onload = function () {
    let btn = document.getElementById('payButton')
    btn.addEventListener('click', pay)
}

function pay() {
    let test = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        price: parseFloat(document.getElementById('amount').value),
        payerInfo: document.getElementById('email').value,
        currency: document.querySelector('[name="currency"]').value,
        description: document.getElementById('description').value,
        publicId: 'pk_7f9fe7a27555c1f2ec5ceada550d4',
        invoiceId: invoice.substr(0,6),
        phone: document.getElementById('phone').value
    }

    let data = {
        firstName: test.firstName,
        lastName: test.lastName,
        phone: test.phone,
    }

    let recurrent = document.getElementById('recurrent')
    if (recurrent.checked) {
        data.CloudPayments = {
            recurrent: {
                interval: 'Month',
                period: 1
            } //один раз в месяц начиная со следующего месяца
        }
    }

    let widget = new cp.CloudPayments({
        language: language
    })
    widget.pay('charge', // или 'charge'
        { //options
            publicId: test.publicId, //id из личного кабинета
            description: test.description, //назначение
            amount: test.price, //сумма
            currency: test.currency, //валюта
            accountId: test.payerInfo,
            email: test.payerInfo,
            data: data,
            invoiceId: test.invoiceId
        }, {

            onSuccess: function (options) { // success
                alert('Оплата успешна')
                document.location.reload()
            },
            onFail: function (reason, options) { // fail
                alert('Fail')
                document.location.reload()
            },
            onComplete: function (paymentResult, options) { //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
                //например вызов вашей аналитики Facebook Pixel
            }
        }
    )
}

