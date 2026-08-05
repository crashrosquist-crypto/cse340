import db from './db.js'




// -----------------------------------------------------VOLUNTEER SCRIPTS------------------------------------------------
// Add a user as a volunteer
 const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO project_volunteers (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id) DO NOTHING;
        `;
        await db.query(query, [userId, projectId]);
 };
// Removes a user as a volunteer from a specific project. 

const removeVolunteer = async (userId, projectId) => {
    const query = `
    DELETE FROM project_volunteers
    WHERE user_id = $1 AND project_id = $2;
    `;
    await db.query(query, [userId, projectId]);
};
// Checks if user is volunteering for a project. Returns true or false.
const isUserVolunteering = async (userId, projectId) => {
    const query = `
    SELECT 1
    FROM project_volunteers
    WHERE user_id = $1 AND project_id = $2;
    `;
    const result = await db.query(query, [userId, projectId]);
    return result.rows.length > 0;
};

const getVolunteeredProjectsForUser = async (userId) => {
    const query = `
        SELECT 
            p.service_project_id,
            p.service_project_title,
            p.service_project_description,
            p.service_project_location,
            p.service_project_date,
            o.name AS organization_name
        FROM project_volunteers pv
        INNER JOIN service_project p ON pv.project_id = p.service_project_id
        INNER JOIN organization o ON p.organization_id = o.organization_id
        WHERE pv.user_id = $1
        ORDER BY p.service_project_date ASC;
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
}; 

// ---------------------------------------  VOLUNTEER SCRIPTS  ----------------------------------------







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
      service_project_title AS service_project_title,
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
      service_project_title AS service_project_title,
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
      service_project_title AS service_project_title,
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

const createProject = async (title, description, location, date, organizationId) => {
  const query = `
  INSERT INTO service_project (organization_id, service_project_title, service_project_description, service_project_location, service_project_date)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING service_project_id;
  `;

  const queryParams = [organizationId, title, description, location, date];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to create project');
  }

  return result.rows[0].service_project_id;
};

/**
 * Updates an existing service project in the database.
 */
const updateProject = async (
    service_project_title,
    service_project_description,
    service_project_date,
    service_project_location,
    organization_id,
    service_project_id
) => {
    const query = `
        UPDATE service_project
        SET service_project_title = $1,
            service_project_description = $2,
            service_project_date = $3,
            service_project_location = $4,
            organization_id = $5
        WHERE service_project_id = $6
        RETURNING *;
    `;

    const values = [
        service_project_title,
        service_project_description,
        service_project_date,
        service_project_location,
        organization_id,
        service_project_id
    ];

    const result = await db.query(query, values);

    if (result.rowCount === 0) {
        throw new Error('Project not found or update failed');
    }

    return result.rows[0];
};


export { 
    getAllProjects, 
    getProjectsByOrganizationId, 
    getUpcomingProjects, 
    getProjectDetails, 
    createProject, 
    updateProject,
    addVolunteer,
    removeVolunteer,
    isUserVolunteering,
    getVolunteeredProjectsForUser
}