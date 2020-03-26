// step4.js
class ViewModel {
    constructor(element, data) {
        this.element = element;
        this.element.addEventListener('input', (e) => this.onInput(e));

        this.dataTextElements = this.element.querySelectorAll('[data-text]');
        this.dataValueElements = this.element.querySelectorAll('[data-value]');

        this.proxy = new Proxy(data, {
            set: (target, propertyName, value) => this.onSet(target, propertyName, value)
        });

        // do initial text and value propagation
        Object.keys(data).forEach((key) => {
            this.onSet(data, key, data[key]);
        });
    }

    onInput(e) {
        const inputElement = e.target;
        const propertyName = inputElement.dataset.value;
        if (propertyName) {
            if (inputElement.type === 'number') {
                this.proxy[propertyName] = inputElement.valueAsNumber;
            } else {
                this.proxy[propertyName] = inputElement.value;
            }
        }
    }

    onSet(target, propertyName, value) {
        target[propertyName] = value;
        for (let element of this.dataTextElements) {
            if (element.dataset.text === propertyName) {
                element.textContent = value;
                break;
            }
        }
        for (let element of this.dataValueElements) {
            if (element.dataset.value === propertyName) {
                if (element.type === 'number') {
                    element.valueAsNumber = value;
                } else {
                    element.value = value;
                }
                break;
            }
        }
        return true;
    }
}

const forms = document.querySelectorAll('form');
const viewModels = [];
for (let form of forms) {
    const viewModel = new ViewModel(form, {
        name: 'John',
        age: 20
    });
    viewModels.push(viewModel);
}