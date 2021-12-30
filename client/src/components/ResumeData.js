import HeaderSection from './HeaderSection';
import SummarySection from './SummarySection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import ExperienceSection from './ExperienceSection';
import ContactSection from './ContactSection';

const resumeObject = {

    'headerInput': {'name': '', 'title': ''},

    'summaryInput': '',

    'educationInput': [
      {
        'degrees': [{
          'degree-type': {
            label: 'Degree Type',
            text: '',
            placeholder: 'BA'
          }, 
          'degree-field': {
            label: 'Degree Field',
            text: '',
            placeholder: 'Computer Science'
          }
        }],
        'institution': {
          label: 'Institution',
          text: '',
          placeholder: 'UC Berkeley'
        }, 
        'start-date': {
          label: 'Start Date',
          text: '',
          placeholder: 'August 2015'
        }, 
        'end-date': {
          label: 'End Date',
          text: '',
          placeholder: 'May 2019'
        }, 
        'additional-info': {
          label: 'Additional Info (separated by comma)',
          text: '',
          placeholder: `Highest Honors, Dean's List...`
        }
      }
    ],

    'contactInput': [
      {
        label: 'Location',
        text: '',
        placeholder: 'ex: San Francisco, CA',
        image: 'LocationIcon'
      },
      {
        label: 'Phone',
        text: '',
        placeholder: 'ex: 123 456 7890',
        image: 'PhoneIcon'
      },
      {
        label: 'Email',
        text: '',
        placeholder: 'ex: johnsmith@gmail.com',
        image: 'EmailIcon'
      },
      {
        label: 'Website',
        text: '',
        placeholder: 'ex: www.johnsmith.com',
        image: 'WebsiteIcon'
      },
      {
        label: 'LinkedIn',
        text: '',
        placeholder: 'ex: linkedin.com/in/johnsmith001',
        image: 'LinkedinIcon'
      },
      {
        label: 'Twitter',
        text: '',
        placeholder: 'ex: @johnsmith001',
        image: 'TwitterIcon'
      },
      {
        label: 'Instagram',
        text: '',
        placeholder: '@johnsmithdesign',
        image: 'InstagramIcon'
      },
      {
        label: 'Github',
        text: '',
        placeholder: 'ex: github.com/johnsmith001',
        image: 'GithubIcon'
      },
      [
        {
          label: 'Other',
          text: '',
          placeholder: 'ex: johnsmith001.medium.com',
          image: 'OtherIcon'
        },
      ]
    ],

    'experienceInput': [
      {
        'job-title': {
          label: "Job Title",
          text: "",
          placeholder: "ex: Junior Frontend Engineer"
        },
        'company': {
          label: "Company",
          text: '',
          placeholder: 'ex: Google'
        },
        'start-date': {
          label: "Start Date",
          text: "",
          placeholder: "ex: Nov 2019"
        },
        'end-date': {
          label: "End Date",
          text: "",
          placeholder: 'ex: Present'
        },
        'summary': {
          label: "Summary",
          text: "",
          placeholder: "ex: Leave blank or include a 1-2 sentence summary of your job function"
        },
        'details': [
          {
            label: "Detail",
            placeholder: "ex: Used React to develop client-side components...",
            text: ''
          },
          {
            label: "Detail",
            placeholder: "ex: Designed responsive UI/UX for various applications...",
            text: ''
          },
          {
            label: "Detail",
            placeholder: "ex: Tested and debugged code using Mocha...",
            text: ''
          },
        ]
      }
    ],

    'skillsInput': [
      {
        'skill-category': {
          label: 'Skill Category',
          text: '',
          placeholder: 'ex: Design'
        },
        'skills': {
          label: 'Skills (separated by comma)',
          text: '',
          placeholder: 'ex: Adobe XD, Figma...'
        }
      },
      {
        'skill-category': {
          label: 'Skill Category',
          text: '',
          placeholder: 'ex: Programming'
        },
        'skills': {
          label: 'Skills (separated by comma)',
          text: '',
          placeholder: 'ex: React, Node.js...'
        }
      },
    ],
    resumeStyle: '0',
    resumeTitle: 'Untitled',
    resumeId: '',
    resumeThumbnail: '',
}

const inputsObject = {
    'header': {
      label: 'Header',
      component: HeaderSection,
    },
    'contact': {
      label: 'Contact',
      component: ContactSection
    },
    'summary': {
      label: 'Summary',
      component: SummarySection,
    },
    'education': {
      label: 'Education',
      component: EducationSection,
    },
    'skills': {
      label: 'Skills',
      component: SkillsSection,
    },
    'experience': {
      label: 'Experience',
      component: ExperienceSection,
    }
}

const duplication = (section, sectionIndex, key, resumeData) => {
    let resumeDataUpdate = {...resumeData}

    const resumeObjectCopy = JSON.parse(JSON.stringify(resumeObject));
    if (sectionIndex !== null && key !== null) {
        let addOn = resumeData[section][sectionIndex][key].length
        resumeData[section][sectionIndex][key][addOn] = resumeObjectCopy[section][0][key][0];
    } else {
        let addOn = resumeData[section].length
        resumeDataUpdate[section][addOn] = resumeObjectCopy[section][0]
    }
    return (resumeDataUpdate)
}

export {
    duplication,
    resumeObject,
    inputsObject,
}

