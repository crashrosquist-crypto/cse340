import db from './db.js'

const getAllCategories = async () => {
    const query = `
    SELECT category_id, category_name
    FROM categories;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async (category_id) => {
    const query = `SELECT * FROM categories WHERE category_id = $1`;
    const result = await db.query(query, [category_id]);
    return result.rows[0];
};

const getCategoriesByProjectId = async (service_project_id) => {
    const query = `
    SELECT c.category_id, c.category_name
    FROM categories c
    JOIN project_categories pc ON c.category_id = pc.category_id
    WHERE pc.service_project_id = $1`;

    const result = await db.query(query, [service_project_id]);
    return result.rows;
};

const getProjectsByCategoryId = async (category_id) => {
    const query = `
    SELECT p.service_project_title, p.service_project_id
    FROM service_project p
    JOIN project_categories pc ON p.service_project_id = pc.service_project_id
    JOIN categories c ON c.category_id = pc.category_id
    WHERE c.category_id = $1`;

    const result = await db.query(query, [category_id]);
    return result.rows;
};

const assignCategoryToProject = async (projectId, categoryId) => {
    const query = `
    INSERT INTO project_categories (service_project_id, category_id)
    VALUES ($1, $2);
    `;

    await db.query(query, [projectId, categoryId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
const deleteQuery = `
    DELETE FROM project_categories
    WHERE service_project_id =$1;
    `;

    await db.query(deleteQuery, [projectId]);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId);
    }
};

export { getAllCategories, getCategoryById, getProjectsByCategoryId, getCategoriesByProjectId, updateCategoryAssignments }

