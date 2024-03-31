/// <reference path="../pb_data/types.d.ts" />
// @ts-check

// Mock module
// Todo: Clean this up, likely by moving to GO
(function () {
  // Run
  /** @type {import("./utils.cjs")} */
  const utils = require(`${__hooks}/utils.cjs`);

  onModelAfterCreate((e) => {
    // UTILS
    /** @type {import("./utils.cjs")} */
    const typesMod = require(`${__hooks}/utils.cjs`);
    /**
     * @param {import("./types").DefinedModelEvent} event
     */
    function linkToOrg(event) {
      const { dao, model } = event;
      /** @type {import("../app/models/Organization.model").OrganizationApi}  */
      const org_record = JSON.parse(JSON.stringify(model));

      dao.runInTransaction((txDao) => {
        /** @type {import("./types").OrganisationUserCreate} */
        const createRequest = {
          organisationId: org_record.id,
          userId: org_record.ownerId,
        };

        // Create a record in tx

        const org_users_collection = txDao.findCollectionByNameOrId(
          typesMod.DbTables.ORGANISATION_USERS
        );
        const record = new Record(org_users_collection);
        const form = new RecordUpsertForm($app, record);
        form.setDao(txDao);
        form.loadData(createRequest);
        form.submit();
      });
    }

    // RUN

    if (!e.dao) {
      throw new ApiError(400, 'Missing Dao');
    }

    linkToOrg({
      dao: e.dao,
      model: e.model,
    });
  }, utils.DbTables.ORGANISATION);
})();
