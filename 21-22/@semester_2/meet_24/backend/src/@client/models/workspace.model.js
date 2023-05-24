const modelService = require('../../@system/model');
const token        = require('../../@system/token');

const TABLE = 'td_workspaces';

const COLUMNS = {
    id          : {name: 'id'       , type: 'number' },
    title       : {name: 'title'    , type: 'string' },
    overview    : {name: 'overview' , type: 'string' },
    category    : {name: 'category' , type: 'string' },
    ownerId     : {name: 'owner_id' , type: 'number', key: 'ownerId' }
};

exports.table       =  TABLE;
exports.columns     =  COLUMNS;
exports.$id         =  COLUMNS.id.name;
exports.$title      =  COLUMNS.title.name;
exports.$overview   =  COLUMNS.overview.name;
exports.$category   =  COLUMNS.category.name;
exports.$ownerId    =  COLUMNS.ownerId.name;

exports.$$create = (parsableObject) => {

    parsableObject[COLUMNS.ownerId.key] = token.getUserId();

    return modelService.parse(parsableObject, [
        COLUMNS.title,
        COLUMNS.overview,
        COLUMNS.category,
        COLUMNS.ownerId
    ]);
};

exports.$$update = (object, id) => {

    object[COLUMNS.id.name] = id;

    console.log('@@@@');
    console.log(object);
    console.log(id);

    return object;
}