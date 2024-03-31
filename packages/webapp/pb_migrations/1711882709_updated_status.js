/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("heffb545or2phkc")

  collection.indexes = [
    "CREATE INDEX `idx_3LFJ703` ON `status` (\n  `name`,\n  `board`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("heffb545or2phkc")

  collection.indexes = []

  return dao.saveCollection(collection)
})
