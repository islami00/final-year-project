/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("heffb545or2phkc")

  collection.indexes = [
    "CREATE INDEX `idx_3LFJ703` ON `status` (\n  `name`,\n  `boardId`\n)",
    "CREATE INDEX `idx_keUdQVK` ON `status` (\n  `order`,\n  `boardId`\n)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kd2icqdq",
    "name": "boardId",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "i233fli6okl1593",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("heffb545or2phkc")

  collection.indexes = [
    "CREATE INDEX `idx_3LFJ703` ON `status` (\n  `name`,\n  `board`\n)",
    "CREATE INDEX `idx_keUdQVK` ON `status` (\n  `order`,\n  `board`\n)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kd2icqdq",
    "name": "board",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "i233fli6okl1593",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
