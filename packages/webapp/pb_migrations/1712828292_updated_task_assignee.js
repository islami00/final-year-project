/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7gxj5bvheyycz1c")

  collection.createRule = "taskId.boardId.departmentId.organisationId = @request.auth.organisation_users_via_userId.organisationId"
  collection.updateRule = "taskId.boardId.departmentId.organisationId = @request.auth.organisation_users_via_userId.organisationId"
  collection.deleteRule = "taskId.boardId.departmentId.organisationId = @request.auth.organisation_users_via_userId.organisationId"
  collection.listRule = "taskId.boardId.departmentId.organisationId = @request.auth.organisation_users_via_userId.organisationId"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7gxj5bvheyycz1c")

  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null
  collection.listRule = null

  return dao.saveCollection(collection)
})
