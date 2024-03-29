/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2qcrx1hcp406cms")

  collection.createRule = "userId  = @request.auth.id"
  collection.updateRule = "userId  = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2qcrx1hcp406cms")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
