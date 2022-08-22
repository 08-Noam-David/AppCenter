/*
 * The JSON properties and the table column names don't match one-to-one.
 * The function takes a raw SQL result and makes sure it does,
 * In addition to converting snake_case to camelCase
 */
const normalizeAppProperties = (app) => {
    const normApp = { ...app };

    normApp.id = normApp.app_id;
    delete normApp.app_id;

    normApp.imageUrl = normApp.image_url;
    delete normApp.image_url;

    normApp.name = normApp.app_name;
    delete normApp.app_name;

    normApp.desc = normApp.description;
    delete normApp.description;

    normApp.companyName = normApp.company_name;
    delete normApp.company_name;

    normApp.createdAt = normApp.created_at;
    delete normApp.created_at;

    return normApp;
};

export { normalizeAppProperties };