import { apiEndpoint    } from '../config/endpoint.js';
import { get, post      } from '../libs/api.js';
import { WorkspaceType  } from '../types/workspace.type.js';

export class WorkspaceApi {

    public static getAllWorkflow = () => {
        return get(apiEndpoint("workspace", "/"));
    }
    
    /**
     * @author Mihail Petrov
     * @returns 
     */
     public static createNewWorkflow = ($workspace: WorkspaceType) => {
        return post(apiEndpoint("workspace", "/"), $workspace);
    }
}