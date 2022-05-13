const modelService = require('../../@system/model');
const token        = require('../../@system/token');

const TABLE = 'td_comments';

const COLUMNS = {
    id       : {name: 'id'       , type: 'number'                       },
    content  : {name: 'content'  , type: 'string'                       },
    cardId   : {name: 'card_id'  , type: 'number', key: 'cardId'        },
    boardId  : {name: 'board_id' , type: 'number', key: 'boardId'       },
    userId   : {name: 'user_id'  , type: 'number', key: 'userId'        }
};

exports.table           =  TABLE;
exports.columns         =  COLUMNS;
exports.$id             =  COLUMNS.id.name;
exports.$content        =  COLUMNS.content.name;
exports.$cardId         =  COLUMNS.cardId.name;
exports.$boardId        =  COLUMNS.boardId.name;
exports.$userId         =  COLUMNS.userId.name;

exports.$$create = (parsableObject) => {

    parsableObject[COLUMNS.userId.key] = token.getUserId();

    return modelService.parse(parsableObject, [
        COLUMNS.content,
        COLUMNS.cardId,
        COLUMNS.boardId,
        COLUMNS.userId
    ]);
};

exports.$$update = (object, id) => {

    object[COLUMNS.id.name] = id;
    return object;
}