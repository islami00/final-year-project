/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zj22rb8dlt92u1a")

  collection.updateRule = "boardId.departmentId.organisationId = @request.auth.organisation_users_via_userId.organisationId"
  collection.deleteRule = "boardId.departmentId.organisationId = @request.auth.organisation_users_via_userId.organisationId"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zj22rb8dlt92u1a")

  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
