/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("heffb545or2phkc")

  collection.indexes = [
    "CREATE INDEX `idx_3LFJ703` ON `status` (\n  `name`,\n  `board`\n)",
    "CREATE INDEX `idx_keUdQVK` ON `status` (\n  `order`,\n  `board`\n)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dx5bpyvq",
    "name": "order",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("heffb545or2phkc")

  collection.indexes = [
    "CREATE INDEX `idx_3LFJ703` ON `status` (\n  `name`,\n  `board`\n)"
  ]

  // remove
  collection.schema.removeField("dx5bpyvq")

  return dao.saveCollection(collection)
})
