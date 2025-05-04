
import React from 'react';
import { aboutData } from '../data/about';
import { skillsData } from '../data/skills';
import { projectsData } from '../data/projects';
import { experienceData } from '../data/experience';
import { educationData } from '../data/education';

export const about = (
  <div className="mb-4">
    <p className="mb-2 text-terminal-blue font-bold">{aboutData.name}</p>
    <div className="pl-2 border-l-2 border-terminal-darkgray">
      <p className="mb-1">{aboutData.location} • {aboutData.phone}</p>
      <p className="mb-1">{aboutData.email}</p>
      <p className="mb-1">{aboutData.website}</p>
      <p className="mb-2">
        <a href={aboutData.linkedin} target="_blank" rel="noopener noreferrer" className="text-terminal-blue hover:underline">LinkedIn</a> • 
        <a href={aboutData.github} target="_blank" rel="noopener noreferrer" className="text-terminal-blue hover:underline ml-2">GitHub</a>
      </p>
      <p className="mt-4 text-terminal-gray">{aboutData.summary}</p>
    </div>
  </div>
);

export const skills = (
  <div className="mb-4">
    <p className="mb-2 text-terminal-blue font-bold">Technical Skills:</p>
    <div className="pl-2 border-l-2 border-terminal-darkgray">
      <div className="mb-2">
        <p className="font-medium text-terminal-green">Languages & Frameworks:</p>
        <p className="pl-4 text-terminal-gray">{skillsData.languages.join(', ')}</p>
      </div>
      
      <div className="mb-2">
        <p className="font-medium text-terminal-green">Databases:</p>
        <p className="pl-4 text-terminal-gray">{skillsData.databases.join(', ')}</p>
      </div>
      
      <div className="mb-2">
        <p className="font-medium text-terminal-green">Tools & Platforms:</p>
        <p className="pl-4 text-terminal-gray">{skillsData.tools.join(', ')}</p>
      </div>
      
      <div className="mb-2">
        <p className="font-medium text-terminal-green">Other:</p>
        <p className="pl-4 text-terminal-gray">{skillsData.other.join(', ')}</p>
      </div>
    </div>
  </div>
);

export const projects = (
  <div className="mb-4">
    <p className="mb-2 text-terminal-blue font-bold">Projects:</p>
    
    {projectsData.map((project, index) => (
      <div key={index} className="mb-3 pl-2 border-l-2 border-terminal-darkgray">
        <p className="font-bold text-terminal-green">{project.name}</p>
        <p className="pl-4 italic text-xs text-terminal-gray">Technologies: {project.technologies}</p>
        <ul className="list-disc list-inside pl-4 text-terminal-gray">
          {project.description.map((item, i) => (
            <li key={i} className="text-sm">{item}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export const experience = (
  <div className="mb-4">
    <p className="mb-2 text-terminal-blue font-bold">Work Experience:</p>
    
    {experienceData.map((job, index) => (
      <div key={index} className="mb-3 pl-2 border-l-2 border-terminal-darkgray">
        <div className="flex justify-between">
          <p className="font-bold text-terminal-green">{job.title}</p>
          <p className="text-terminal-gray text-sm">{job.period}</p>
        </div>
        <ul className="list-disc list-inside pl-4 text-terminal-gray">
          {job.responsibilities.map((responsibility, i) => (
            <li key={i} className="text-sm">{responsibility}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export const education = (
  <div className="mb-4">
    <p className="mb-2 text-terminal-blue font-bold">Education:</p>
    
    {educationData.map((edu, index) => (
      <div key={index} className="mb-2 pl-2 border-l-2 border-terminal-darkgray">
        <div className="flex justify-between">
          <p className="font-bold text-terminal-green">{edu.degree}</p>
          <p className="text-terminal-gray text-sm">{edu.period}</p>
        </div>
        <p className="text-terminal-gray">{edu.institution}</p>
      </div>
    ))}
  </div>
);

export const contact = (
  <div className="mb-4">
    <p className="mb-2 text-terminal-blue font-bold">Contact Information:</p>
    <div className="pl-2 border-l-2 border-terminal-darkgray">
      <p className="text-terminal-gray"><span className="text-terminal-green">Email:</span> {aboutData.email}</p>
      <p className="text-terminal-gray"><span className="text-terminal-green">Phone:</span> {aboutData.phone}</p>
      <p className="text-terminal-gray"><span className="text-terminal-green">GitHub:</span> <a href={aboutData.github} target="_blank" rel="noopener noreferrer" className="text-terminal-blue hover:underline">{aboutData.github}</a></p>
      <p className="text-terminal-gray"><span className="text-terminal-green">LinkedIn:</span> <a href={aboutData.linkedin} target="_blank" rel="noopener noreferrer" className="text-terminal-blue hover:underline">{aboutData.linkedin}</a></p>
      <p className="text-terminal-gray"><span className="text-terminal-green">Website:</span> <a href={aboutData.website} target="_blank" rel="noopener noreferrer" className="text-terminal-blue hover:underline">{aboutData.website}</a></p>
    </div>
  </div>
);
