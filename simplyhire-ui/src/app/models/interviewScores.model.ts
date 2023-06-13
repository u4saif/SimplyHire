export class interviewBasicDetails {
  public data = [
    {
      tabName: 'Details',
      containt: {
        name: '',
        email: '',
        mobile: '',
        otherNumber: '',
        interviewDate: '',
        qualification: '',
        skills: [],
        resume: '',
      },
    },
    {
      tabName: 'Job Discriton',
      containt: {
        purpouse: '',
        roleResponsiblity: '',
      },
    },
    {
      tabName: 'Assessment Scores',
      containt: {
        skills:[{
          skillName: '',
          comment: '',
          score: '',
        }],
        overAllScore: '',
      },
    },
    { tabName: 'Resume', containt: {} },
  ];
}
