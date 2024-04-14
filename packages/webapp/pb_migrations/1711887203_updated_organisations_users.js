/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2qcrx1hcp406cms")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uw9mo06h",
    "name": "organisationId",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "va6wid8v3gr8xld",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2qcrx1hcp406cms")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uw9mo06h",
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
})
