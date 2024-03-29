/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("va6wid8v3gr8xld")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("va6wid8v3gr8xld")

  collection.listRule = "organisation_users_via_organisationId.userId = @request.auth.id"
  collection.viewRule = "organisation_users_via_organisationId.userId = @request.auth.id"

  return dao.saveCollection(collection)
})
