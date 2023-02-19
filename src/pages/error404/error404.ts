import i18next from 'i18next';

const Error404 = {
  render: async () => {
    const view = `
            <section class="section main_404">
                <h2 class="numbers-404">404</h2>
                <h2 class="header-404">${i18next.t('404Page')}</h2>
            </section>
        `;
    return view;
  },
  after_render: async () => {},
};
export default Error404;
