import request from 'supertest'
import server from '../../../src/server'
import routes from '../../../src/routes'

const app = server(routes)

describe('Test the root path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/health')
        expect(response.statusCode).toBe(200)
    })
})
