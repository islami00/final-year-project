/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i233fli6okl1593")

  collection.createRule = "departmentId.organisationId ?= @request.auth.organisation_users_via_userId.organisationId"
  collection.updateRule = "departmentId.organisationId ?= @request.auth.organisation_users_via_userId.organisationId"
  collection.deleteRule = "departmentId.organisationId ?= @request.auth.organisation_users_via_userId.organisationId"

  collection.listRule = "departmentId.organisationId ?= @request.auth.organisation_users_via_userId.organisationId"
  collection.viewRule = "departmentId.organisationId ?= @request.auth.organisation_users_via_userId.organisationId"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i233fli6okl1593")

  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  collection.listRule = "departmentId.organisationId = @request.auth.organisation_users_via_userId.organisationId"
  collection.viewRule = "departmentId.organisationId = @request.auth.organisation_users_via_userId.organisationId"

  return dao.saveCollection(collection)
})
