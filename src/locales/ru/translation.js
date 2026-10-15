export default {
  searchForm: {
    title: 'RSS агрегатор',
    description: 'Начните читать RSS сегодня! Это легко, это красиво.',
    label: 'Ссылка RSS',
    inputPlaceholder: 'ссылка RSS',
    submitBtn: 'Добавить',
    example: 'Пример: https://lorem-rss.hexlet.app/feed',
    messageSuccess: 'RSS успешно загружен',
    errors: {
      required: 'Поле не должно быть пустым',
      url: 'Ссылка должна быть валидным URL',
      network: 'Ошибка сети',
      notFound: 'Ресурс не содержит валидный RSS',
      rssStillExists: 'RSS уже существует',
    },
  },
  contents: {
    'posts-title': 'Посты',
    'feed-title': 'Фиды',
  }
}
