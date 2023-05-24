const modelService = require('../../@system/model');
const token        = require('../../@system/token');

const TABLE = 'td_boards';

const COLUMNS = {
    id              : {name: 'id'           , type: 'number'                     },
    title           : {name: 'title'        , type: 'string'                     },
    visibility      : {name: 'visibility'   , type: 'string', default: 'public'  },
    theme           : {name: 'theme'        , type: 'string'                     },
    workspaceId     : {name: 'workspace_id' , type: 'number', key: 'workspaceId' },
    ownerId         : {name: 'owner_id'     , type: 'number', key: 'ownerId'     }
};

exports.table           =  TABLE;
exports.columns         =  COLUMNS;
exports.$id             =  COLUMNS.id.name;
exports.$title          =  COLUMNS.title.name;
exports.$visibility     =  COLUMNS.visibility.name;
exports.$theme          =  COLUMNS.theme.name;
exports.$workspaceId    =  COLUMNS.workspaceId.name;
exports.$ownerId        =  COLUMNS.ownerId.name;

exports.$$create = (parsableObject) => {

    parsableObject[COLUMNS.ownerId.key] = token.getUserId();

    return modelService.parse(parsableObject, [
        COLUMNS.title,
        COLUMNS.visibility,
        COLUMNS.theme,
        COLUMNS.workspaceId,
        COLUMNS.ownerId
    ]);
};

exports.$$update = (object, id) => {

    object[COLUMNS.id.name] = id;
    return object;
}