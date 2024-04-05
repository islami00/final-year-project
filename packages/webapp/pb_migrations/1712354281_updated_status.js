/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId('heffb545or2phkc');

    collection.listRule =
      'boardId.departmentId.organisationId = @request.auth.organisation_users_via_userId.organisationId';
    collection.viewRule =
      'boardId.departmentId.organisationId = @request.auth.organisation_users_via_userId.organisationId';

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId('heffb545or2phkc');

    collection.listRule = null;
    collection.viewRule = null;

    return dao.saveCollection(collection);
  }
);
