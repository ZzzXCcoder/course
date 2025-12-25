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
const themeButn : HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('#theme-btn');
function saveCustomTheme(): void {
    type ThemeColors = {
        [cssVar: string]: string;
    };
    const colors: ThemeColors = {};

    document
        .querySelectorAll<HTMLInputElement>('input[type="color"]')
        .forEach(input  => {
            const cssVar: string | undefined= input.dataset.cssVar;
            if (cssVar) {
                colors[cssVar] = input.value;
            }
        });

    localStorage.setItem( 'user-theme', 'custom');
    localStorage.setItem('custom-theme-colors', JSON.stringify(colors));
}

if (themeButn) {
    themeButn.addEventListener('click', () => {
        saveCustomTheme();

    });
}