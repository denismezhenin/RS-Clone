const createTooltip = (event: Event) => {
  if (event.target && event.target instanceof HTMLButtonElement) {
    const tooltipText = event.target.dataset.tooltip;
    if (!tooltipText) {
      return;
    }

    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip-block');
    tooltip.innerHTML = tooltipText;
    document.body.append(tooltip);

    const position = event.target.getBoundingClientRect();
    const left = position.left + (event.target.offsetWidth - tooltip.offsetWidth) / 2;
    const top = position.top - tooltip.offsetHeight;

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }
};

export default createTooltip;
