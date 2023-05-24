const request           = require('supertest');
const server            = require('../../src/server');
const db                = require('../../src/@system/database/manager');
const workspaceService  = require('../../src/@client/services/workspace.service');

const TEST_ENTITY_FIRST     = {
    "title"    : "Sample Workflow",
    "overview" : "Sample Overview",
    "category" : "Busines",
    "ownerId"  : 1    
};

const TEST_ENTITY_SECOND     = {
    "title"    : "Sample Workflow 2",
    "overview" : "Sample Overview 2",
    "category" : "Busines",
    "ownerId"  : 2
};

const api = (id) => {
    if(id) return `/api/workspace/${id}`;
    return `/api/workspace`;
}

const $matchWorkflowEntity = (expectation, realtity, id) => {

    expect(expectation            ).toHaveProperty('id');
    expect(expectation            ).toHaveProperty('title');
    expect(expectation            ).toHaveProperty('overview');
    expect(expectation            ).toHaveProperty('category');
    expect(expectation            ).toHaveProperty('owner_id');
    
    expect(expectation.id         ).toBe(id);
    expect(expectation.title      ).toBe(realtity.title);
    expect(expectation.overview   ).toBe(realtity.overview);
    expect(expectation.category   ).toBe(realtity.category);
    expect(expectation.owner_id   ).toBe(realtity.ownerId);
};


describe('CRUD operations in Workspace api', () => {

    beforeEach(async () => {
        await db.truncate('td_workspaces');
    });

    afterAll(async () => {
        await db.truncate('td_workspaces');
    });

    it('should create a new workflow entity', async () => {

        const httpResponse      = await request(server).post(api()).send(TEST_ENTITY_FIRST);
        const httpResponseBody  = httpResponse.body;

        expect(httpResponseBody        ).not.toBeNull();
        expect(httpResponseBody.message).toBe("Workflow created successfuly");
    });


    it('should get sepcific workspace based on id', async () => {

        const dbEntity          = await workspaceService.create(TEST_ENTITY_FIRST);
        const dbEntityId        = dbEntity.insertId;

        const httpResponse      = await request(server).get(api(dbEntityId)).send();
        const httpResponseBody  = httpResponse.body;

        expect(httpResponseBody             ).not.toBeNull();
        expect(httpResponseBody.length      ).toEqual(1);

        $matchWorkflowEntity(httpResponseBody[0], TEST_ENTITY_FIRST, dbEntityId);
    });

    it('should get all workflow records in the database', async () => {

        const dbEntityFirst     = await workspaceService.create(TEST_ENTITY_FIRST);
        const dbEntitySecond    = await workspaceService.create(TEST_ENTITY_SECOND);

        const httpResponse      = await request(server).get(api()).send();
        const httpResponseBody  = httpResponse.body;
        expect(httpResponseBody             ).not.toBeNull();
        expect(httpResponseBody.length      ).toEqual(2);

        $matchWorkflowEntity(httpResponseBody[0], TEST_ENTITY_FIRST, dbEntityFirst.insertId);
        $matchWorkflowEntity(httpResponseBody[1], TEST_ENTITY_SECOND, dbEntitySecond.insertId);
    });

    it('should remove existing workflow entity', async () => {

        const dbEntity          = await workspaceService.create(TEST_ENTITY_FIRST);
        const dbEntityId        = dbEntity.insertId;

        const httpResponse      = await request(server).delete(api(dbEntityId)).send();
        const httpResponseBody  = httpResponse.body;

        expect(httpResponseBody             ).not.toBeNull();
        expect(httpResponseBody.message     ).toBe("Workflow removed successfuly");
    });
});