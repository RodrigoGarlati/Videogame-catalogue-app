const app = require('../../src/app')
const utilsDb = require('../../src/common/getGamesFromDb')
const utilsApi = require('../../src/common/getGamesFromApi')
const request = require('supertest')
const { Videogame } = require('../../src/db')
const TEST_MAX_TIMEOUT = 20000

describe('Testing get all games:', () => {
  const spyOnGetDbGames = jest.spyOn(utilsDb, 'getGamesFromDb')
  const spyOnGetCountDbGames = jest.spyOn(utilsDb, 'getCountGamesFromDb')
  const spyOnGetApiGames = jest.spyOn(utilsApi, 'getGamesFromApi')

  afterEach(() => {
    jest.clearAllMocks()
  })
  
  test('It should obtain all games', async () => {
    await request(app).get('/videogames/all?page=7')

    expect(spyOnGetCountDbGames).toBeCalled()
    expect(spyOnGetDbGames).toBeCalled()
    expect(spyOnGetApiGames).toBeCalled()
  }, TEST_MAX_TIMEOUT)

  test('It receives necesary data for obtaining all games', async () => {
    await request(app).get('/videogames/all?page=7')

    expect(spyOnGetCountDbGames).toHaveBeenCalledWith(undefined)
    expect(spyOnGetDbGames).toHaveBeenCalledWith(undefined, '7')
    expect(spyOnGetApiGames).toHaveBeenCalledWith(undefined, '7', false)
  }, TEST_MAX_TIMEOUT)

  test('It paginates correctly based on the current page', async () => {
    await request(app).get('/videogames/all?page=1')

    expect(spyOnGetCountDbGames).toBeCalledTimes(1)
    expect(spyOnGetApiGames).toBeCalledTimes(1)
    expect(spyOnGetApiGames).toHaveBeenCalledWith(undefined, '1', false)

    await request(app).get('/videogames/all?page=8')

    expect(spyOnGetCountDbGames).toBeCalledTimes(2)
    expect(spyOnGetDbGames).toBeCalledTimes(1)
    expect(spyOnGetApiGames).toBeCalledTimes(2)
    expect(spyOnGetApiGames).toHaveBeenCalledWith(undefined, '8', true)
  }, TEST_MAX_TIMEOUT)

  test('It search correctly by game name', async () => {
    await request(app).get('/videogames/all?page=7&game_name=grand')

    expect(spyOnGetDbGames).toHaveBeenCalledWith('grand', '7')
    expect(spyOnGetCountDbGames).toHaveBeenCalledWith('grand')
    expect(spyOnGetApiGames).toHaveBeenCalledWith('grand', '7', false)
  }, TEST_MAX_TIMEOUT)
})

describe('Testing get created games:', () => {
  const spyOnGetGamesUtils = jest.spyOn(utilsDb, 'getGamesFromDb')
  const spyOnGetCountGames = jest.spyOn(utilsDb, 'getCountGamesFromDb')
  const spyOnGetDbGameById = jest.spyOn(Videogame, 'findByPk');

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('It should obtain and count db videogames', async () => {
    await request(app).get('/db/videogames?page=1')

    expect(spyOnGetGamesUtils).toBeCalled()
    expect(spyOnGetCountGames).toBeCalled()
  }, TEST_MAX_TIMEOUT)
  
  test('It receives necesary data for obtaining games', async () => {
    await request(app).get('/db/videogames?page=1')
    await request(app).get('/db/videogames?page=2')

    expect(spyOnGetGamesUtils).toHaveBeenCalledWith(undefined, '1', true)
    expect(spyOnGetGamesUtils).toHaveBeenCalledWith(undefined, '2', true)
  }, TEST_MAX_TIMEOUT)

  test('It correctly obtain a created game by ID', async () => {
    await request(app).get('/db/videogames/1')

    expect(spyOnGetDbGameById).toHaveBeenCalledWith('1')
  }, TEST_MAX_TIMEOUT)
})

describe('Testing get api games:', () => {
  const spyOnGetApiGames = jest.spyOn(utilsApi, 'getGamesFromApi')
  const spyOnGetApiGameById = jest.spyOn(utilsApi, 'getApiGameById')
  
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('It correctly call get api games method', async ()=>{
    await request(app).get('/videogames/api?page=8')
    
    expect(spyOnGetApiGames).toBeCalled()
    expect(spyOnGetApiGames).toHaveBeenCalledWith(undefined, '8')
  }, TEST_MAX_TIMEOUT)

  test('It correctly obtain an api game by ID', async () => {
    await request(app).get('/videogames/api/1234')
    
    expect(spyOnGetApiGameById).toHaveBeenCalledWith('1234')
  }, TEST_MAX_TIMEOUT)
})
