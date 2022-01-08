import { apiEndpoint } from '../config/endpoint.js';
import { get, post } from '../libs/api.js';
export class WorkspaceApi {
}
WorkspaceApi.getAllWorkflow = () => {
    return get(apiEndpoint("workspace", "/"));
};
/**
 * @author Mihail Petrov
 * @returns
 */
WorkspaceApi.createNewWorkflow = ($workspace) => {
    return post(apiEndpoint("workspace", "/"), $workspace);
};
