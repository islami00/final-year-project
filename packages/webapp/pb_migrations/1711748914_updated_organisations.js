/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("va6wid8v3gr8xld")

  collection.createRule = "ownerId = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("va6wid8v3gr8xld")

  collection.createRule = null

  return dao.saveCollection(collection)
})
