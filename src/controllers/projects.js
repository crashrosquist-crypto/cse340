// Import any needed model functions
import { getAllProjects, getUpcomingProjects, getProjectDetails } from '../models/projects.js';
// FIXED: Imported the correct function name matching line 17!
import { getCategoriesByProjectId } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Define any controller functions
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};  

const showProjectDetailsPage = async (req, res) => {
    try {
        const projectId = req.params.id;
        const projectDetails = await getProjectDetails(projectId);
        const projectCategories = await getCategoriesByProjectId(projectId);
        const title = 'Project Details';
        
        res.render('project', { 
            title, 
            project: projectDetails,
            categories: projectCategories 
        });
    } catch (error) {
        console.error("showProjectDetailsPage error:", error);
        res.status(500).render('errors/500', { title: 'Server Error' });
    }
}

// Export any controller functions
export { showProjectsPage, showProjectDetailsPage };