import { validateRequiredFieldsErrors, validateGenderRadioButtonsBackground, fillForm, validateFormValues } from '../wrappers/formWrapper';
import { formPage } from '../pages/formPage';

describe('Validate Form', () => {

    beforeEach(() => {
      formPage.visit();
    });
  it('Validate Required Fields Errors and Radio Button Background', () => {
    validateRequiredFieldsErrors();
    validateGenderRadioButtonsBackground();
  });

  it('Validate filling form and submit', () => {
    const firstName = 'TestFirstName'
    const lastName = 'TestLastName'
    const timeVariable = new Date().toTimeString().slice(0, 5).replace(':', '')
    const email = `abc${timeVariable}@gmail.com`
    const gender = 'Male'
    const phoneNumber = '1234567890'
    const birthDay = '027'
    const birthMonth = 'May'
    const birthYear = '1990'
    const subjects = ['Maths', 'Computer Science']
    const hobby = 'Reading'
    const file = 'textfile.txt'
    const address = 'Test Address'
    const state = 'NCR'
    const city = 'Delhi'
    const personObj = {
      fName: firstName,
      lName: lastName,
      email: email,
      gender: gender,
      phoneNumber: phoneNumber,
      birthDay: birthDay,
      birthMonth: birthMonth,
      birthYear: birthYear,
      subjects: subjects,
      hobby: hobby,
      file: file,
      address: address,
      state: state,
      city: city
    }

    fillForm(personObj)
    formPage.submitForm()

    validateFormValues(personObj)
  })

  it('Validate form with required fields only',()=>{
    const firstName = 'TestFirstName'
    const lastName = 'TestLastName'
    const gender = 'Male'
    const phoneNumber = '1234567890'
    const personObj = {
      fName: firstName,
      lName: lastName,
      gender: gender,
      phoneNumber: phoneNumber,
   }
    fillForm(personObj)
    formPage.submitForm()
    validateFormValues(personObj)
  })
});
