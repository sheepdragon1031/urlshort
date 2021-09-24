'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    login:async ctx => {
        const apiDB = strapi.query('user', 'users-permissions')
        const data = ctx.request.body
        const result = await apiDB.findOne({
            email: data.identifier,
            // password: data.password,
        })
        const user = {
            name: result.username,
            email: result.email,
            image: null
        }
        return ctx.send({
            user
        }, 200);
    },
    Credentials: async ctx => {
        const apiDB = strapi.query('user', 'users-permissions')
        const data = ctx.request.body
        const result = await apiDB.findOne({
            email: data.identifier,
            // password: data.password,
        })
        return ctx.send({
            jwt: '',
            user: {
                id: 3,
                username: result.username,
                email: result.email,
                provider: 'google',
            }
        }, 200);
    }
};
