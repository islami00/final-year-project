/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2qcrx1hcp406cms")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2qcrx1hcp406cms")

  collection.listRule = "  userId = @request.auth.id"
  collection.viewRule = "  userId = @request.auth.id"

  return dao.saveCollection(collection)
})
