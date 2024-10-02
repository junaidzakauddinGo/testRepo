import { formPage } from '../pages/formPage';
import 'cypress-file-upload';

export function validateRequiredFieldsErrors() {
  formPage.submitForm();

  formPage.getFirstNameField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
  formPage.getLastNameField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
  formPage.getUserNumberField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
}

export function validateGenderRadioButtonsBackground() {
  formPage.getGenderRadioButtons().each(($radio) => {
    const errorColor = $radio.css('background-color');
    expect(errorColor).to.eq('rgba(0, 0, 0, 0)');
  });
}

export function fillForm(personObj) {
  formPage.getFirstNameField().type(personObj.fName);
  formPage.getLastNameField().type(personObj.lName);
  formPage.getGenderRadioButtons().contains(personObj.gender).click();
  formPage.getUserNumberField().type(personObj.phoneNumber);

  if(personObj.email){
    formPage.getEmailField().type(personObj.email);
  }

  if (personObj.birthDay && personObj.birthMonth && personObj.birthYear) {
    formPage.getBirthdayField().click();
    formPage.getBirthdaymonth().should('exist');
    formPage.getBirthdayMonthPicker().select(personObj.birthMonth);
    formPage.getBirthdayYearPicker().select(personObj.birthYear);
    formPage.getBithdayDay(personObj.birthDay).click();
  }
  if (personObj.subjects) {
    personObj.subjects.forEach((subject) => {
      formPage.enterSubject(subject);
      formPage.subjectTag()
        .contains(subject)
        .should('exist')
        .parent()
        .find('.subjects-auto-complete__multi-value__remove')
        .should('exist');
    });
  }
  if (personObj.hobby) {
    formPage.selectHobby(personObj.hobby).click({ force: true });
  }
  if (personObj.file) {
    formPage.getFileUploadBtn().click().attachFile(personObj.file);
  }
  if (personObj.address) {
    formPage.getAddressField().type(personObj.address);
  }
  if (personObj.state) {
    formPage.getStateField().type(personObj.state + '{enter}');
  }
  if (personObj.city) {
    formPage.getCityField().type(personObj.city + '{enter}');
  }
}


// export function validateFormValues(personObj){
//     const validationObj = {
//       name: `${personObj.fName} ${personObj.lName}`,
//       email: personObj.email,
//       gender: personObj.gender,
//       mobile: personObj.phoneNumber,
//       birth: `${Number(personObj.birthDay)} ${personObj.birthMonth},${personObj.birthYear}`,
//       subjects: personObj.subjects.join(', '),
//       hobby: personObj.hobby,
//       file: personObj.file,
//       address: personObj.address,
//       stateCity: `${personObj.state} ${personObj.city}`
//     }

//     const validationKeys = Object.keys(validationObj);

//   cy.get('tbody tr').each(($row, index) => {
//     cy.wrap($row).find('td').eq(1).should(($secondTd) => {
//       const expectedValue = validationObj[validationKeys[index]]; 
//       expect($secondTd.text().trim()).to.eq(expectedValue);
//     });
//   });
// }

export function validateFormValues(personObj) {
  let formattedDate = '';
  if(!personObj.birthDay){
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0'); // Get day and pad to 2 digits
    const month = currentDate.toLocaleString('default', { month: 'long' }); // Get full month name
    const year = currentDate.getFullYear()
    formattedDate = `${day} ${month},${year}`
  }
  const validationObj = {
    name: `${personObj.fName} ${personObj.lName}`,
    email: personObj.email || '',
    gender: personObj.gender,
    mobile: personObj.phoneNumber,
    birth: personObj.birthDay
      ? `${Number(personObj.birthDay)} ${personObj.birthMonth},${personObj.birthYear}`
      : formattedDate,
    subjects: personObj.subjects ? personObj.subjects.join(', ') : '',
    hobby: personObj.hobby || '',
    file: personObj.file || '',
    address: personObj.address || '',
    stateCity: personObj.state && personObj.city ? `${personObj.state} ${personObj.city}` : ''
  };

  const validationKeys = Object.keys(validationObj); // Filter out empty values

  cy.get('tbody tr').each(($row, index) => {
    cy.wrap($row).find('td').eq(1).should(($secondTd) => {
      const expectedValue = validationObj[validationKeys[index]]; 
      expect($secondTd.text().trim()).to.eq(expectedValue);
    });
  });
}

