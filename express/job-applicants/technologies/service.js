import { getTechnologiesDetails } from './model.js';
const technologiesList = ['js', 'java', 'php', 'sql'];
const proficiencyLevels = ['beginner', 'intermediate', 'expert']

// export function getTechnologiesList() {
//     return technologiesList
// }

// async function setInsertParams(postPayload) {
//     const technologiesKeys = Object.keys(postPayload);
//     console.debug('technologiesKeys', technologiesKeys);
//     const technologies = await getTechnologiesDetails(postPayload.applicantId);
//     console.debug('technolgies', technologies);

//     for (let i = 0; i < technologiesKeys.length; i++) {
//         const technologyKey = technologiesKeys[i];

//         for (let j = 0; j < technologiesKeys.length; j++) {
//             console.debug(`technologies[${j}] `, technologies[j])
//             if (technologies[j].label === technologyKey) {
//                 const level = postPayload[technologyKey]; // is_expert
//                 console.debug('level ', level)
//                 return technologies[j][level];
//             }
//         }
//     }
// }

export { technologiesList, proficiencyLevels };