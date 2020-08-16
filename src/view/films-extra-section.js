export const createFilmsExtraSectionTemplate = (sectionTitle) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${sectionTitle}</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};
