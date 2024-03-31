/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2qcrx1hcp406cms")

  collection.name = "organisation_users"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_yGOgLV5` ON `organisation_users` (\n  `userId`,\n  `organisationId`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2qcrx1hcp406cms")

  collection.name = "organisations_users"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_yGOgLV5` ON `organisations_users` (\n  `userId`,\n  `organisationId`\n)"
  ]

  return dao.saveCollection(collection)
})
