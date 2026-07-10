import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT 
            p.service_project_id,
            p.organization_id,
            p.service_project_title,
            p.service_project_description,
            p.service_project_location,
            p.service_project_date,
            o.name AS organization_name
        FROM public.service_project p
        INNER JOIN public.organization o ON p.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

export { getAllProjects }