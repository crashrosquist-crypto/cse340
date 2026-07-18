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

export { getAllCategories, getCategoryById, getProjectsByCategoryId, getCategoriesByProjectId }

