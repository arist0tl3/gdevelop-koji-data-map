# GDevelop => Koji Data Mapping

This script will take a GDevelop `data.js` file and create the following files:

- `images.json`: A Koji customization file with all of the included images
- `sounds.json`: A Koji customization file with all of the included sounds
- `newData.js`: An updated GDevelop data file with the proper Koji VCC mappings

## Usage

```
npm install
npm start
```

Copy the `data.js` file from your project into the root folder of this project. Replace `gdjs.projectData =` with `const projectData =` and then at the end of the file add `export default projectData`;

You should get the output files in the root folder of this project.

You'll need to add `import Koji from '@withkoji/vcc';` to your `newData.js`, rename to `data.js` and put back into your project.

The customization files should be dropped into the `.koji/customizatoin` folder in your project.

## Next Steps

Right now, you'll need to manually populate the customization files using the Koji VCC tools, but it would be great if that is automated in the future =)