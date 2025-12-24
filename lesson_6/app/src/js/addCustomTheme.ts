const colorInputs : NodeListOf<HTMLInputElement> = document.querySelectorAll<HTMLInputElement>(
    'input[type="color"][data-css-var]'
);

for (const colorInput of colorInputs) {
    if(colorInput){
        SetColorValue(colorInput);
    }
}
function SetColorValue(htmlInput: HTMLInputElement) : void {
    htmlInput.addEventListener('input', () => {
        if (htmlInput.dataset.cssVar) {
            document.documentElement.style.setProperty(htmlInput.dataset.cssVar, htmlInput.value);
        }
})
}