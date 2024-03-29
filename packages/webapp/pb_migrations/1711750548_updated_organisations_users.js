/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2qcrx1hcp406cms")

  collection.updateRule = "(userId  = @request.auth.id) ||\n(userId = organisationId.ownerId)\n"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2qcrx1hcp406cms")

  collection.updateRule = "userId  = @request.auth.id"

  return dao.saveCollection(collection)
})
