import React, { useState } from 'react';
import './dropDown.css'; // Import CSS file for styling

const ModuleProjectDropdown = ({ onSelectImage }) => {
  const modules = [
    {
      name: 'Turtle',
      projects: [
        { name: 'Turtle Square', imageUrl: './media/projects/turtle/turtle-square.jpeg' },
        { name: 'Turtle Star', imageUrl: './media/projects/turtle/turtle-star.jpeg' },
        // Add more projects with image URLs as needed
      ]
    },
    {
      name: 'Loops',
      projects: [
        { name: 'Project A', imageUrl: 'images/projectA.jpg' },
        { name: 'Project B', imageUrl: 'images/projectB.jpg' },
        // Add more projects with image URLs as needed
      ]
    },
    // Add more modules and projects as needed
  ];

  const [selectedModule, setSelectedModule] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    setSelectedProject('');
    setSelectedImage(null);
  };

  const handleProjectSelect = (project) => {
    const selectedModuleObj = modules.find(module => module.name === selectedModule);
    if (selectedModuleObj) {
      const selectedProjectObj = selectedModuleObj.projects.find(p => p.name === project);
      if (selectedProjectObj) {
        setSelectedProject(project);
        setSelectedImage(selectedProjectObj.imageUrl);
        onSelectImage(selectedProjectObj.imageUrl); // Ensure onSelectImage is properly called here
      }
    }
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
          <option key={index} value={project.name}>{project.name}</option>
        ))}
      </select>
      {selectedImage && (
        <img src={selectedImage} alt={selectedProject} className="show" />
      )}
    </div>
  );
};

export default ModuleProjectDropdown;
