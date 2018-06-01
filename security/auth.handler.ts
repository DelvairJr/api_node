import * as restify from 'restify'
import * as jwt from 'jsonwebtoken'
import { NotAuthorizedError } from 'restify-errors'
import { User } from "./../users/users.model";
import { environment } from "./../common/evironment";


export const authenticate: restify.RequestHandler = (req, resp, next) => {
    const { email, password } = req.body

    User.findByEmail(email, '+password')
        .then(user => {
            if (user && user.matches(password)) {
                const token = jwt.sign({ sub: user.email, iss: 'api' },
                    environment.security.apiSecret)

                resp.json({ name: user.name, email: user.email, accesToke: token })
                return next(false)

            } else {
                return next(new NotAuthorizedError('Invalid Crenentials'))
            }
        }).catch(next)
}