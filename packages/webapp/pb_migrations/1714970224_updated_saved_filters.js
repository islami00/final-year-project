/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zkcwbmlrxj7yp08")

    collection.indexes = [
    "CREATE INDEX `idx_Ux2oqdK` ON `saved_filters` (`slug`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x464eqg5",
    "name": "slug",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iu6nwuul",
    "name": "createdBy",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))



  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zkcwbmlrxj7yp08")

  collection.indexes = []

  // remove
  collection.schema.removeField("x464eqg5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iu6nwuul",
    "name": "createdBy",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))



  return dao.saveCollection(collection)
})
