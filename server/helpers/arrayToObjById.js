/**
 * Created by nirbenya on 26/01/2018.
 */
const _  = require('lodash');

module.exports =  array => _.assign({}, ...array.map(meme => {
    return { [meme.id]: meme }
}))