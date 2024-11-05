const API_COUNT_LIMIT = 100
const PAGES_FOR_API_COUNT_LIMIT = '7'

EDIT_GAME_EQUIVALENCES = {
    'Name': 'name',
    'Description': 'description',
    'Release date': 'released',
    'Rating': 'rating',
    'Platforms': 'platforms',
    'Genres': 'genre',
    'Image': 'background_image'
}

module.exports = { API_COUNT_LIMIT, PAGES_FOR_API_COUNT_LIMIT, EDIT_GAME_EQUIVALENCES }