import { redirect, type ClientActionFunctionArgs } from '@remix-run/react';
import { catchJSONPostSubmissionError } from '../../utils/Form/catchPostSubmissionError';
import { specialFields } from '../../utils/Form/specialFields';
import * as jsonForm from './jsonForm';
import { SaveNewFilterFormIntent } from '../../modules/BoardPage/logic/saveNewFilterForm';
import { postSavedFilter } from '../../services/queries/savedFilters/postSavedFilter';

export async function jsonHandler(args: ClientActionFunctionArgs) {
  const { request } = args;
  const jsonData: unknown = await request.json();

  const here = new URL(request.url);

  try {
    const saveFilterData = await jsonForm.schema.parseAsync(jsonData);
    switch (saveFilterData.intent) {
      case SaveNewFilterFormIntent.SAVE_NEW_FILTER:
        // Create saved filter
        await postSavedFilter({ body: saveFilterData.data });
        // Redirect
        here.searchParams.set(specialFields.filter, saveFilterData.data.slug);
        here.searchParams.set(
          specialFields.savedFilter,
          saveFilterData.data.id
        );
        return redirect(here.toString());

      default:
        break;
    }
  } catch (error) {
    return catchJSONPostSubmissionError(error);
  }
}
