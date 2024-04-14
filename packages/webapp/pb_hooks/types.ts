/// <reference path="../pb_data/types.d.ts" />
export * from '../app/models/Task.model';

export interface DefinedModelEvent {
  dao: daos.Dao;
  model: models.Model;
}

export interface OrganisationUserCreate {
  userId: string;
  organisationId: string;
}
