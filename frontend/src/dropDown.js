import React, { useState } from 'react';
import './dropDown.css'; // Import CSS file for styling (create this file)

const ModuleProjectDropdown = () => {
  // State variables to store selected module and project
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  // Define sample projects for each module
  const sampleProjects = {
    Logic: ['Project 1', 'Project 2', 'Project 3'],
    Loops: ['Project A', 'Project B', 'Project C'],
    Math: ['Project X', 'Project Y', 'Project Z'],
    // Define sample projects for other modules
  };

  // Function to handle module selection
  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    // Clear selected project when a new module is selected
    setSelectedProject('');
  };

  // Function to handle project selection
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    // Load the selected project into the Blockly workspace
    // You need to implement this functionality based on your Blockly integration
    loadProjectIntoWorkspace(project);
  };

  // Function to load project into Blockly workspace
  const loadProjectIntoWorkspace = (project) => {
    // Implement this function to load the selected project into the Blockly workspace
    // You can use the Blockly API to load XML into the workspace
  };

  return (
    <div className="dropdown-container">
      
      <div className="dropdown">
        <button className="dropbtn">{selectedModule || selectedProject || 'Select Module or Project'}</button>
        <div className="dropdown-content">
          {Object.keys(sampleProjects).map((module, index) => (
            <div key={index}>
              <button className="module" onClick={() => handleModuleSelect(module)}>{module}</button>
              {selectedModule === module && (
                <div className="project-dropdown">
                  {sampleProjects[module].map((project, i) => (
                    <button className="project" key={i} onClick={() => handleProjectSelect(project)}>{project}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleProjectDropdown;
