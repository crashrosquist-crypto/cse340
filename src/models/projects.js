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


const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT
      service_project_id,
      organization_id,
      service_project_title AS title,
      service_project_description AS description, -- Added prefix & aliased
      service_project_location AS location,       -- Added prefix & aliased
      service_project_date AS date                 -- Added prefix & aliased
    FROM service_project
    WHERE organization_id = $1
    ORDER BY date;
  `;
  
  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
    SELECT
      service_project_id,
      service_project_title AS title,
      service_project_description AS description,
      service_project_date AS date,
      service_project_location AS location,
      service_project.organization_id,
      name AS organization_name
    FROM service_project
    INNER JOIN organization ON service_project.organization_id = organization.organization_id
    ORDER BY service_project_date ASC
    LIMIT $1;
    `;

    const result = await db.query(query, [number_of_projects]);
    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
    SELECT
      service_project_id,
      service_project_title AS title,
      service_project_description AS description,
      service_project_date AS date,
      service_project_location AS location,
      service_project.organization_id,
      name AS organization_name
    FROM service_project
    INNER JOIN organization ON service_project.organization_id = organization.organization_id
    WHERE service_project_id = $1;
    `;

    const result = await db.query(query, [id]);
    return result.rows[0];
};


export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails }