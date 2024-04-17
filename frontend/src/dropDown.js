// src/components/ModuleProjectDropdown.js

import React, { useState } from 'react';
import './dropDown.css'; // Import CSS file for styling

const ModuleProjectDropdown = () => {
  const modules = [
    {
      name: 'Logic',
      projects: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10']
    },
    {
      name: 'Loops',
      projects: ['Project A', 'Project B', 'Project C', 'Project D', 'Project E', 'Project F', 'Project G', 'Project H', 'Project I', 'Project J']
    },
    // Add more modules and projects as needed
  ];

  const [selectedModule, setSelectedModule] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    setSelectedProject('');
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="dropdown-container">
      <select id="moduleDropdown" value={selectedModule} onChange={(e) => handleModuleSelect(e.target.value)}>
        <option value="">Select Module</option>
        {modules.map((module, index) => (
          <option key={index} value={module.name}>{module.name}</option>
        ))}
      </select>
      <select id="projectDropdown" className={selectedModule ? 'show' : ''} value={selectedProject} onChange={(e) => handleProjectSelect(e.target.value)}>
        <option value="">Select Project</option>
        {selectedModule && modules.find(module => module.name === selectedModule).projects.map((project, index) => (
          <option key={index} value={project}>{project}</option>
        ))}
      </select>
      {selectedProject && (
        <img src={`images/${selectedProject}.jpg`} alt={selectedProject} className="show" />
      )}
    </div>
  );
};

export default ModuleProjectDropdown;
