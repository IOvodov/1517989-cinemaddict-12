export const createAdditionalBlockTemplate = (blockTitle) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${blockTitle}</h2>

      <div class="films-list__container"></div>
    </section>`
  )
}
