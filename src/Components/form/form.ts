import { MutationFunction } from "@apollo/client";
import { DocumentNode } from "graphql";
import {
  FieldValues,
  UseFormReset,
  UseFormTrigger,
  UseFormGetValues,
  Control,
  FieldErrors,
} from "react-hook-form";
import { AnyObjectSchema } from "yup";
import { FormTemplateDefinition } from "./formTemplate";

export type DataWithIndex = {
  [key: string]: Record<string, string>;
};
export type RefetchQueryExpressionType = {
  query?: DocumentNode;
  sessionEntityPath?: string;
  sessionEntityKey?: string;
  slug: string;
  filters?: Record<string, unknown>;
};
export type FormMainPropTypes<U extends FieldValues = {}> = {
  /***
     BE query to be called in order to REFETCH the ALL_ENTITIES DATA in the table from where the current entity was selected and Edited. EX: GET_SERVICE_BY_ID.
     Mandatory as for the form needs a way of knowing it can retrieve something. 
     It will be used insde "refetchQueries" method on "editTemplateMutation" in order to refetch table data after the actual mutation.
     */
  refetchQueryExpressions?: RefetchQueryExpressionType[];
  /***
     This paramter will decide whether the EWForm component will render as a form or not. 
     Default value: false.

     FALSE: Will render the component as a form. The submot methods and control will be those inside of the form.
     TRUE: Will render the component as a <div></div> with the specified inputs inside. Note that using headlessForm will require to also use "control" object from outside in order to tell the actual inputs the methods to use(ex: register).
     *in case of headlessForm = true: any methods used by react-hook-from should come from outside the component itself.
     */
  headlessForm?: boolean;
  /***
     BE query to be called in order to FETCH data for the specified entity. EX: GET_SERVICE_BY_ID.
     Mandatory as for the form needs a way of knowing it can retrieve something. 
     */
  queryExpression: DocumentNode;
  /***
     Query to fetch data will skip if true. Default : false. 
     !IMPORTANT : Decides if the component will be used as an EDIT OR AN ADD.
     */
  skipQuery?: boolean;
  /***
     BE query to be called in order to MUTATE  data for the specified entity. EX: GET_SERVICE_BY_ID.
     */
  mutationExpression: DocumentNode;
  /***
     FETCH method requires an entity. Not neccessary for ADD_NEW.
     When using the form as and EDIT/VIEW the form needs to know what is the ID of the entity it`s looking for.
     This will get added automatically at the QUERY.
     !IMPORTANT : Also needs "entityVariable" parameter.
     */
  entityID?: string;
  /***
     Custom variables for MUTATING DATA. EX. "role" on AddNewWorker.
      When using the form as and EDIT/VIEW the form needs to know what is the name of the field that will be used to identify the entity. Ex: "contractId"
     This will get added automatically at the QUERY.
     !IMPORTANT : Also needs "entityVariable" parameter.
     */
  entityVariable?: string;
  /***
     Custom variables for MUTATING DATA. EX. "role" on AddNewWorker.
      This will get added to the mutation automatically.
     */
  defaultMutationVariables?: Record<string, string | boolean>;
  /***
     Validation schema for FORM input validation. 
     */
  validationSchema: AnyObjectSchema;
  /***
     Route to redirect after everything successfully completed. Requires redirect: true.
       Note that "formSuccessAction" and "redirectRoute" cannot be used together. This a the first scenario when the form is done and successful.
     */
  redirectRoute?: string;
  /***
     Form template to generate inputs. Can include also additional fields as for the input constraints.
     */
  formTemplate: FormTemplateDefinition<U>;
  /***
     Form observer. After everything successfully completed will add "observer : true" to router. Works together with redirectRoute.
     */
  formSuccessObserver?: string;
  /***
    This will do the opossite of redirecting. For no specified redirectRoute, this function will do something when the form submit is succesfull.
    Note that "formSuccessAction" and "redirectRoute" cannot be used together. This a the second scenario when the form is done and successful.
     */
  formSuccessAction?: () => void;
  /***
     Form title. Ex. "User information"
     */
  formTitle?: string;
  /***
     Key of title attribute from FETCHED data. Required for EDIT FORMS. 
     Passing this argument will force the form to search for an existing title from the fetched data. Ex: "Clean walls"
     */
  formTitleKey?: string;
  /***
     Overwrite function to generate the Section of the Form. Can return an actual Section Title or null.
     Null will practically remove the sectionTitle from Form.
     Note that the actual FormTitle will not be changed by adding this.
     */
  sectionTitleKey?: string;
  /***
     Overwrite function to generate the Section of the Form. Can return an actual Section Title or null.
     Null will practically remove the sectionTitle from Form.
     Note that the actual FormTitle will not be changed by adding this.
     */
  sectionTitle?: string;
  /***
     Overwrite function to generate form buttons with custom behavior. 
     If no value is provided it will generate the default form Buttons: "Cancel" and "Save".
     */
  generateCustomFormButtons?: (
    isDirty?: boolean,
    reset?: UseFormReset<U>,
    trigger?: UseFormTrigger<U>,
    getValues?: UseFormGetValues<U>,
    editEntityTemplateMutation?: MutationFunction
  ) => JSX.Element | null;
  /***
     Overwrite function to generate the Section of the Form. Can return an actual Section Title or null.
     Null will practically remove the sectionTitle from Form.
     Note that the actual FormTitle will not be changed by adding this.
     */
  generateCustomSectionButtons?: () => JSX.Element | null;
  /***
     Overwrite function for CANCEL form button.
     */
  handleCancelButton: () => void;
  /***
     Path to locale file of translated components. EX: "services"
     This will provide the form with the translation file for that specific topic.
     */
  i18nPath?: string;
  /***
     Specific object from root file of translated components. EX: "servicesForm"
     This will allow to selected nested objects from i18nPath file in order to selected only the necessary translations.
     *Note: Can be nested.Ex: "contractsForm.contractDetails"
     */

  showSnackBar?: <T extends {}>(response: T) => void;

  i18nFormObjectPath?: string;
  /***
     Object of styles modifiers: 
     */
  formStylesModifier?: {
    /***
     Modifier for entire form
     */
    containerStyles?: string;
    /***
     Modifier for form container
     */
    formContainerStyles?: string;
    /***
     Modifier for inputs container
     */
    formInputsContainerStyles?: string;
    /***
     Modifier for Section-Title
     */
    formTitleStyles?: string;
    /***
     Modifier for Button-Container
     */
    formButtonContainerStyles?: string;
    /***
     Modifier for InfoBox
     */
    infoBoxContainerStyles?: string;
  };
  /***
     Custom control object from React-hook-form that will override the default control from inside the generic Form. 
     Use this if you are going to use a headless EWForm component as for you will need the control from above the generic Form.
     */
  customFormControl?: Control<U>;
  /***
     Custom error object from React-hook-form that will override the default errors from inside the generic Form. 
     Use this if you are going to use a headless EWForm component as for you will need the errors from above the generic Form.
     */
  customFormErrors?: FieldErrors<U>;
  /***
     Custom data object from React-hook-form that will be used before any query  can be done inside the form. 
     Use this if you are going to use a headless EWForm component as for you will need to tell the form what data should he map in order to generate the inputs correctly.
     */
  customFormData?: unknown;
  /***
     Custom submit handler that will oberwrite the default submit.
    
     */
  customFormSubmit?: (data: unknown, reset?: UseFormReset<U>) => void;
  /***
     Disable dirty behaviour. Default: false. This will provide more control on the form itself as for disableing the dirty behaviour will allow u to customize the "onSave" "onCancel" behaviour in more detail.
     */
  disableDirty?: boolean;
  /***
     Function that will be called before the mutation. This will alter the form DATA as for your specific needs. EX: Used in jobGenerators page in order to generate the "frequencyString" sent to BE based on "true/false" values of the day options.
      Form Data: {
      frequency: "Weekly",
      frequencyDays: {
         monday: true,
         tuesday: false,
         ...
      }
      Desired FormData: frequency: "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TH,FR"
     */
  customMappingFunc?: <U extends {}>(
    formTemplate: FormTemplateDefinition<U>,
    data: U
  ) => Record<string, unknown>;
  /***
   Function that will alter the data from the query inside the form. This will allow to alter the data before introducing it in the form inputs. EX: Used to convert the frequency string back to objects with properties based on that string. 
     Query Data =  {frequency: "FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TH,FR"}
      Desired: {
      frequency: "Weekly",
      frequencyDays: {
         monday: true,
         tuesday: false,
         ...
      }
      Use this whenever you want to control the data from the form and it`s usage by the inputs.
   }
     */
  customGetterMappingFunc?: (data: DataWithIndex) => void;
  /***
     Specific path from root file of translated components. EX: "infoBox"
     This will select desired text from locales and return it as a text inside the infoBox component
     */
  i18nInfoBoxIdentifier?: string | null;
  /***
     Custom width for infoBox component
     */
  infoBoxCustomWidth?: string;
};
