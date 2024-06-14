/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zkcwbmlrxj7yp08")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b2i2zqvc",
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
  const collection = dao.findCollectionByNameOrId("zkcwbmlrxj7yp08")

  // remove
  collection.schema.removeField("b2i2zqvc")

  return dao.saveCollection(collection)
})
