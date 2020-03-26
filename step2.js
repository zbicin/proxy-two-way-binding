// step2.js
const data = {
    name: 'John'
};

// find all elements with the `data-text` attribute
const dataTextElements = document.querySelectorAll(`[data-text]`);
// find all elements with the `data-value` attribute
const dataValueElements = document.querySelectorAll(`[data-value]`);

const handler = {
    set: function (target, propertyName, value, receiver) {
        // keep the default behavior, propagate value to the actual data object
        target[propertyName] = value;

        // update elements whose text is bound to this property
        for (let element of dataTextElements) {
            if (element.dataset.text === propertyName) {
                element.textContent = value;
            }
        }

        // update elements whose value is bound to this property
        for (let element of dataValueElements) {
            if (element.dataset.value === propertyName) {
                element.value = value;
            }
        }
    }
};

// create a proxy
const viewModel = new Proxy(data, handler);

// do initial text and value propagation
for (let element of dataTextElements) {
    const propertyName = element.dataset.text;
    handler.set(data, propertyName, data[propertyName]);
}
for (let element of dataValueElements) {
    const propertyName = element.dataset.value;
    handler.set(data, propertyName, data[propertyName]);
}

// catch all 'input' type events and propagate new value from UI to the viewModel 
document.body.addEventListener('input', (e) => {
    const inputElement = e.target;
    const propertyName = inputElement.dataset.value;
    if (propertyName) {
        viewModel[propertyName] = inputElement.value;
    }
});