import fs from 'fs';
import projectData from './data';

const imageVCCFile = {
  images: {},
  '@@editor': [
    {
      key: "images",
      name: "Images",
      icon: "🍄",
      source: "images.json",
      fields: []
    }
  ]
};

const soundVCCFile = {
  sounds: {},
  '@@editor': [
    {
      key: "sounds",
      name: "Sounds",
      icon: "🎵",
      source: "sounds.json",
      fields: []
    }
  ]
};

function snakeToCamel(s){
  return s.replace(/(\-\w)/g, function(m){return m[1].toUpperCase();});
}

const resources = projectData.resources.resources;

const newResources = resources.map((resource) => {
  const key = snakeToCamel(resource.file.split('.')[0]).replace(/ /g, '').replace(/\(/g, 'OP').replace(/\)/g, 'CL');
  const nameArray = resource.name.split('/');
  const name = nameArray[nameArray.length - 1].replace(/\\/g, ' ');

  if (resource.kind === 'audio') {
    soundVCCFile.sounds[key] = '';
    soundVCCFile['@@editor'][0].fields.push({
      key,
      description: `Previous filename: ${resource.file}`,
      name,
      type: 'sound',
    });

    return {
      ...resource,
      file: `$$Koji.config.sounds.${key}$$`,
    }
  }

  if (resource.kind === 'image') {
    imageVCCFile.images[key] = '';
    imageVCCFile['@@editor'][0].fields.push({
      key,
      description: `Previous filename: ${resource.file}`,
      name,
      type: 'image',
    });

    return {
      ...resource,
      file: `$$Koji.config.images.${key}$$`,
    }
  }

  return resource;
});

const newProjectData = {
  ...projectData,
};

newProjectData.resources.resources = newResources;

fs.writeFileSync('images.json', JSON.stringify(imageVCCFile));
fs.writeFileSync('sounds.json', JSON.stringify(soundVCCFile));
fs.writeFileSync('newData.js', JSON.stringify(newProjectData).replace(/\"\$\$/g, '').replace(/\$\$\"/g, ''));
