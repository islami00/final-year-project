/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("va6wid8v3gr8xld")

  collection.name = "organisations"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_KJWi844` ON `organisations` (`name`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("va6wid8v3gr8xld")

  collection.name = "organisation"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_KJWi844` ON `organisation` (`name`)"
  ]

  return dao.saveCollection(collection)
})
