/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dq3cwmn9bka1qx5")

  collection.deleteRule = "organisationId ?= @request.auth.organisation_users_via_userId.organisationId"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dq3cwmn9bka1qx5")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
