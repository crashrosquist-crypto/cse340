import express from 'express';

// Controllers & Validation Imports
import { showHomePage } from './controllers/index.js';
import { 
    showOrganizationsPage, 
    showOrganizationDetailsPage, 
    showNewOrganizationForm, 
    processNewOrganizationForm, 
    organizationValidation,
    showEditOrganizationForm, 
    processEditOrganizationForm 
} from './controllers/organizations.js';

import { 
    showProjectsPage, 
    showProjectDetailsPage, 
    showNewProjectForm, 
    processNewProjectForm, 
    projectValidation,
    showEditProjectForm, 
    processEditProjectForm 
} from './controllers/projects.js';

import { 
    showCategoriesPage, 
    showCategoryDetailsPage, 
    showAssignmentCategoriesForm, 
    processAssignCategoriesForm,
    categoryValidation,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm
} from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

// --- Home Route ---
router.get('/', showHomePage);

// --- Organization Routes ---
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// --- Project Routes ---
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);

router.get('/edit-project/:id', showEditProjectForm); // 👈 Fixed missing '/' here!
router.post('/edit-project/:id', processEditProjectForm);

router.get('/assign-categories/:projectId', showAssignmentCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// --- Category Routes ---
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);

router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

// --- Error Handling Test Route ---
router.get('/test-error', testErrorPage);

export default router;