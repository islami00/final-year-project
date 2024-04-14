/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dq3cwmn9bka1qx5")

  collection.indexes = [
    "CREATE INDEX `idx_1UozZfb` ON `department` (\n  `name`,\n  `organisationId`\n)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cvquldgz",
    "name": "organisationId",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "va6wid8v3gr8xld",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dq3cwmn9bka1qx5")

  collection.indexes = []

  // remove
  collection.schema.removeField("cvquldgz")

  return dao.saveCollection(collection)
})
