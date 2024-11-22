const app = require('../../src/app')
const getApiGenresUtils = require('../../src/common/getGenresFromApi')
const request = require('supertest')
const { Genre } = require('../../src/db')

describe('Testing get genres: ', () => {
    const spyOnGetApiGenres = jest.spyOn(getApiGenresUtils, 'getGenresFromApi')
    const spyOnGetCreatedGenres = jest.spyOn(Genre, 'findAll')

    test('It should obtain all genres: ', async () => {
        await request(app).get('/db/genres/initial')

        expect(spyOnGetApiGenres).toBeCalled()
        expect(spyOnGetCreatedGenres).toBeCalled()
    })
})