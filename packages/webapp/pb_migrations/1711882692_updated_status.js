/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("heffb545or2phkc")

  // remove
  collection.schema.removeField("wgk5e4ao")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9h6rnrqg",
    "name": "color",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "red.6",
        "gray.6",
        "blue.6",
        "green.6"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("heffb545or2phkc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wgk5e4ao",
    "name": "color",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("9h6rnrqg")

  return dao.saveCollection(collection)
})
