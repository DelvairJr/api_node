import { Server } from './Server/server'
import { usersRouter } from './users/users.router'
import { restaurantRouter } from './restaurants/restaurants.router'
import { reviewsRouters } from './reviews/reviews.router';

const server = new Server()

server.bootstrap([
    usersRouter,
    restaurantRouter,
    reviewsRouters
]).then(server => {
    console.log('Server is listening on: ', server.application.address())
}).catch(error => {
    console.log('Server failed start')
    console.error(error)
    process.exit(1)
})

