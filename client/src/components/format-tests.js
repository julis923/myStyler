import randomstring from 'randomstring';
import { resumeObject } from './ResumeData';


const resumeObjectCopy = JSON.parse(JSON.stringify(resumeObject));


const generateText = (minWords, maxWords, maxChars) => {
    let string = ''
    let words = Math.floor(Math.random() * maxWords) + 1
    if (words < minWords) words = minWords;
    for (let i = 1; i <= words; i++) {
        let newWord = randomstring.generate({ 
            length: Math.floor(Math.random() * maxChars || 8 ) + 3,
            charset: 'alphabetic',
            capitalization: 'lowercase'
          }) + ' '
        string += newWord
    }
    return string;
}

const generateData = (obj) => {
  obj.headerInput.name = generateText(2, 3)
  obj.headerInput.title = generateText(1, 3, 8)
  let contactInputs = Math.floor(Math.random() * 8) + 1
  for (let i = 0; i <= contactInputs; i++) {
    obj.contactInput[i].text = generateText(1, i === 0 ? 3 : 2)
  }
  obj.summaryInput = generateText(20, 50)
  let educationInputs = Math.floor(Math.random() * 2)
  for (let x = 0; x <= educationInputs; x++) {
    obj.educationInput[x] = JSON.parse(JSON.stringify(resumeObjectCopy.educationInput[0]));
    obj.educationInput[x].institution.text = generateText(1, 3)
    obj.educationInput[x]['start-date'].text = generateText(1, 2, 8)
    obj.educationInput[x]['end-date'].text = generateText(1, 2, 4)
    let degreeInputs = Math.floor(Math.random() * 2);
    for (let z = 0; z <= degreeInputs; z++) {
      obj.educationInput[x].degrees[z] = JSON.parse(JSON.stringify(resumeObjectCopy.educationInput[0].degrees[0]));
      obj.educationInput[x].degrees[z]['degree-type'].text = generateText(1, 2)
      obj.educationInput[x].degrees[z]['degree-field'].text = generateText(1, 3)
    }
  }
  let skillsInputs = Math.floor(Math.random() * 2)
  for (let y = 0; y <= skillsInputs; y++) {
    obj.skillsInput[y] = JSON.parse(JSON.stringify(resumeObjectCopy.skillsInput[0]));
    obj.skillsInput[y]['skill-category'].text = generateText(1, 2)
    obj.skillsInput[y]['skills'].text = generateText(4, 10)

  }
  let experienceInputs = Math.floor(Math.random() * 2) + 1
  for (let a = 0; a <= experienceInputs; a++) {
    obj.experienceInput[a] = JSON.parse(JSON.stringify(resumeObjectCopy.experienceInput[0]));
    obj.experienceInput[a]['job-title'].text = generateText(1, 3)
    obj.experienceInput[a]['company'].text = generateText(1, 3)
    obj.experienceInput[a]['start-date'].text = generateText(1, 1)
    obj.experienceInput[a]['end-date'].text = generateText(1, 2, 4)
    obj.experienceInput[a]['summary'].text = generateText(10, 20)
    let listItems = Math.floor(Math.random() * 2) + 1
    for (let b = 0; b <= listItems; b++) {
      obj.experienceInput[a]['details'][b] = JSON.parse(JSON.stringify(resumeObjectCopy.experienceInput[0]['details'][0]));
      obj.experienceInput[a]['details'][b].text = generateText(10, 20)
    }
  }
  let style = Math.floor(Math.random() * 12)
  obj.resumeStyle = style;
}

export {
    generateData,
    generateText
}
