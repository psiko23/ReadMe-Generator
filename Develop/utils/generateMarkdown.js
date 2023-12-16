function renderLicenseBadge(license) {
  if (!license || license.length === 0) {
    return '';
  }
  license = license[0].replace(/-/g,'_');
  return `https://img.shields.io/badge/license-${license}-blue`;
}

function renderLicenseUrl (license) {
if (!license || license.length ===0) {
  return '';
}
return `http://choosealicense.com/licenses/${license}/`;
}

function generateMarkdown(data) {
  const badgeUrl = renderLicenseBadge(data.license);
  const licenseLink = renderLicenseUrl(data.license).toLocaleLowerCase()
  const githubUrl = `https://github.com/${data.github}`;

  return `
  # ${data.title}
  ![License Badge](${badgeUrl})
  ## Description
  ${data.description}
  ## Installation
  ${data.installation}
  ## Usage
  ${data.applicationUsage}
  ## Contributing
  ${data.contributionGuidlines}
  ## Tests
  ${data.tests}
  ## License
  View License Details: [${data.license}](${licenseLink})
  ## Questions
  [Github](${githubUrl}) \n
  Contact me at ${data.email}
  `;
}

module.exports = generateMarkdown;