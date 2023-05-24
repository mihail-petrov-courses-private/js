const modelService = require('../../@system/model');
const token        = require('../../@system/token');

const TABLE = 'td_cards';

const COLUMNS = {
    id              : {name: 'id'           , type: 'number'                     },
    title           : {name: 'title'        , type: 'string'                     },
    overview        : {name: 'overview'     , type: 'string'                     },
    listId          : {name: 'list_id'      , type: 'number', key: 'listId'      }
};

exports.table           =  TABLE;
exports.columns         =  COLUMNS;
exports.$id             =  COLUMNS.id.name;
exports.$title          =  COLUMNS.title.name;
exports.$overview       =  COLUMNS.overview.name;
exports.$listId         =  COLUMNS.listId.name;

exports.$$create = (parsableObject) => {

    return modelService.parse(parsableObject, [
        COLUMNS.title,
        COLUMNS.overview,
        COLUMNS.listId
    ]);
};

exports.$$update = (object, id) => {

    object[COLUMNS.id.name] = id;
    return object;
}