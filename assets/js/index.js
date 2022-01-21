class Calculator {
    constructor (homePriceInput, firstPaymentInput, creditTimeInput, radioInputs, percentInput) {
        this.homePriceInput = homePriceInput;
        this.firstPaymentInput = firstPaymentInput;
        this.creditTimeInput = creditTimeInput;
        this.radioInputs = radioInputs;
        this.percentInput = percentInput;
    }
    init() {
        this.addListeners(this.homePriceInput);
        this.addListeners(this.firstPaymentInput);
        this.addListeners(this.creditTimeInput);
        console.log(this.radioInputs);
    }
    formatToString(inputValue) {
        const valueString = String(inputValue);
        const valueArray = valueString.split("");
        const length = valueArray.length;
        const symbolsToSeparate = length % 3;
        const nonSeparateSymbols = valueArray.slice(0, symbolsToSeparate);
        nonSeparateSymbols.push(' ');
        nonSeparateSymbols.reverse();
        valueArray.splice(0, symbolsToSeparate);
        valueArray.splice(3, 0, ' ');
        valueArray.splice(7, 0, ' ');
        nonSeparateSymbols.forEach((e) => {
            valueArray.splice(0, 0, e);
        });
        const value = valueArray.join("");
        return value;
    }
    formatToNumber() {

    }
    addListeners(rangeInput) {
        rangeInput.addEventListener('input', this.updateValue.bind(this));
        radioInputs.forEach((e) => {
            e.addEventListener('input', this.getPercents.bind(this));
        })
    }
    getPercents(input) {
        const target = input.target;
        this.percentInput.value = target.getAttribute('data-percent');
    }
    updateValue(rangeInput) {
        const target = rangeInput.target;
        this.updateText(target, +target.value);
        this.printRangeBg(target, +target.value);
    }
    updateText(input, inputValue) {
        const textInput = input.parentNode.querySelector('.range-text__input');
        textInput.value = this.formatToString(inputValue);
    }
    printRangeBg(input, inputValue) {
        const min = +input.getAttribute('min');
        const max = +input.getAttribute('max');
        let percentage =  (inputValue - min) / (max - min) * 100;
        console.log(percentage);
        input.style = 'background: linear-gradient(to right, #DDB157, #DDB157 ' + percentage + '%, transparent ' + percentage + '%, transparent 100%)';
    }
}

const homePriceInput = document.querySelector('.home-price__input');
const firstPaymentInput = document.querySelector('.first-payment__input');
const creditTimeInput = document.querySelector('.credit-time__input');
const radioInputs = document.querySelectorAll('input[type=radio]');
const percentInput = document.querySelector('.percents_input');

const calculator = new Calculator(homePriceInput, firstPaymentInput, creditTimeInput, radioInputs, percentInput);
calculator.init();