export function render(state) {
    const roads = document.querySelectorAll('.road');

    roads.forEach((road, index) => {
        road.classList.remove('green', 'yellow');

        if (index === state.activeIndex) {
            road.classList.add(state.phase);
        }
    });
}