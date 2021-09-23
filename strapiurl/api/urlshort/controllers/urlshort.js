'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const ogs = require('open-graph-scraper');

const ogAsync = (url) => new Promise((resolve, reject) => {
    const options = { url: url };
    ogs(options, (error, results, response) => {
        // console.log('error:', error); // This returns true or false. True if there was an error. The error itself is inside the results object.
        // console.log('results:', results); // This contains all of the Open Graph results
        // console.log('response:', response); // This contains the HTML of page
        resolve(results)
        reject(error)
      });
    // og(url,(err, meta) => {
    //     resolve(meta)
    // })
})
const urlChecKState = ( url ) =>{
    const urlarr = url.split('/')
    if(urlarr.length >=4){
        if(urlarr[3] == 'g' &&
         /([A-z]){8}/.test(urlarr[4]) && urlarr[4].length == 8){
            return false
        }
        return true 
    }
    return true
}
module.exports = {
    putURL:async ctx => {
        const { urlID } = ctx.params;
        const apiDB = strapi.query('urlshort')
        // const count = await apiDB.count({url: `${urlID}`})
        const data = ctx.request.body
        let datameta
        if(urlChecKState(data.url2)){
            let meta = await ogAsync(data.url2)
            datameta = {
                metatitle: meta.ogTitle,
                metatext: meta.ogDescription,
                metaimg: meta.ogImage? meta.ogImage.url: '',
                metadata: meta,
                ...data}
            apiDB.update({id: urlID}, datameta)
            return ctx.send({
                message: 'success',
                result: meta
            }, 200);
        }
        else{
            return ctx.send({
                message: 'This url has already been used',
            }, 202);
        }
    },
    newURL:async ctx => { 
        const { urlID } = ctx.params;
        const apiDB = strapi.query('urlshort')
        const count = await apiDB.count({url: `${urlID}`})
        const data = ctx.request.body
        let datameta
        if(count < 1){
            if(urlChecKState(data.url2)){
                let meta = await ogAsync(data.url2)
                // console.log(meta);
                datameta = {
                    metatitle: meta.ogTitle,
                    metatext: meta.ogDescription,
                    metaimg: meta.ogImage? meta.ogImage.url: '',
                    metadata: meta,
                    url: urlID,
                    ...data}
                const result = await apiDB.create(datameta)
                return ctx.send({
                    message: 'success',
                    result: meta
                }, 201);
            }
            else{
                return ctx.send({
                    message: 'This url wrong site orientation',
                }, 202);
            }
        }
        else{
            return ctx.send({
                message: 'This url has already been used',
            }, 202);
        }
    },
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
