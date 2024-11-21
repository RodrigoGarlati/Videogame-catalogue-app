const app = require('../../src/app')
const utilsDb = require('../../src/common/getGamesFromDb')
const utilsApi = require('../../src/common/getGamesFromApi')
const request = require('supertest')

// describe('Test get all games', () => {
//   test('It should obtain all games', () => {

//   })
// })

describe('Testing get all created games', () => {
  test('It should obtain and count db videogames', async () => {
    const spyOnGetGamesUtils = jest.spyOn(utilsDb, 'getGamesFromDb')
    const spyOnGetCountGames = jest.spyOn(utilsDb, 'getCountGamesFromDb')

    await request(app).get('/db/videogames?page=1')

    expect(spyOnGetGamesUtils).toBeCalled()
    expect(spyOnGetCountGames).toBeCalled()
  })
  
  test('It receives necesary data for obtaining games', async () => {
    const spyOnGetGamesUtils = jest.spyOn(utilsDb, 'getGamesFromDb')

    await request(app).get('/db/videogames?page=1')
    await request(app).get('/db/videogames?page=2')

    expect(spyOnGetGamesUtils).toHaveBeenCalledWith(undefined, '1', true)
    expect(spyOnGetGamesUtils).toHaveBeenCalledWith(undefined, '2', true)
  })
})
