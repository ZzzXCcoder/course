
const links: HTMLAnchorElement[] = Array.from(document.querySelectorAll('a[href^="#"]'));


const sections: HTMLElement[] = links
    .map(link => document.querySelector<HTMLElement>(link.getAttribute('href')!))
    .filter((el): el is HTMLElement => el !== null);


let sectionOffsets: number[] = sections.map(section => section.offsetTop);


window.addEventListener('resize', () => {
    sectionOffsets = sections.map(section => section.offsetTop);
});

links.forEach(link => {
    link.addEventListener('click', (event: MouseEvent) => {
        const href = link.getAttribute('href');
        if (!href) return;
        const target = document.querySelector<HTMLElement>(href);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});


window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const activeIndex = getActiveSectionIndex(scrollY);

    if (activeIndex !== -1) {
       setTimeout(()=>setActiveLink(activeIndex), 20);

    }
});


function getActiveSectionIndex(scrollY: number): number {
    for (let i = 0; i < sections.length; i++) {
        const top = sectionOffsets[i];
        const nextTop = sectionOffsets[i + 1] ?? Infinity;
        if (scrollY >= top && scrollY < nextTop) return i;
    }
    return -1;
}


function setActiveLink(activeIndex: number) {
    links.forEach((link, i) => {
        const li = link.parentElement; // <li>
        if (!li) return;

        if (i === activeIndex) {
            li.classList.add('active');
        } else {
            li.classList.remove('active');
        }
    });
}


