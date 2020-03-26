// step1.js
const data = {
    name: 'John'
};

// find all elements with the `data-text` attribute
const dataTextElements = document.querySelectorAll(`[data-text]`);

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
    }
};

// create a proxy
const viewModel = new Proxy(data, handler);

// do initial text propagation
for (let element of dataTextElements) {
    const propertyName = element.dataset.text;
    handler.set(data, propertyName, data[propertyName]);
}

// change some values
setTimeout(() => {
    viewModel.name = 'Julliet';
}, 2000);