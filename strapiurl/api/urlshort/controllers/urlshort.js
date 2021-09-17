'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {

    getURL:async ctx => {
        const { urlID } = ctx.params;
        const apiDB = strapi.query('urlshort') 
        const result = await apiDB.findOne({url: `${urlID}`})
        if(!result){
            return ctx.send({
                message: 'not found'
            }, 404);
        }
        let viewnum = result["view"] == parseInt(result["view"], 10)? result["view"] * 1 + 1: 0 
        const update = await apiDB.update({id: result['id']},{ view: viewnum })
        return update
    }
};
