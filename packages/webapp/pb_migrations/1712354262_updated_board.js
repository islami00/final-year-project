/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId('i233fli6okl1593');

    collection.listRule =
      'departmentId.organisationId = @request.auth.organisation_users_via_userId.organisationId';
    collection.viewRule =
      'departmentId.organisationId = @request.auth.organisation_users_via_userId.organisationId';

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId('i233fli6okl1593');

    collection.listRule = null;
    collection.viewRule = null;

    return dao.saveCollection(collection);
  }
);
