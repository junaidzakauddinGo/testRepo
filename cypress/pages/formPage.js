class FormPage {
    visit() {
      cy.visit('https://demoqa.com/automation-practice-form/', { timeout: 100000 });
    }
    submitForm() {
      cy.get('#submit').click();
    }
    getFirstNameField() {
      return cy.get('#firstName');
    }
    getLastNameField() {
      return cy.get('#lastName');
    }
    getEmailField(){
        return cy.get('#userEmail')
    }
    getGenderRadioButtons() {
        return cy.get('.col-md-9.col-sm-12 .custom-radio');
    }
    getUserNumberField() {
      return cy.get('#userNumber');
    }
    getBirthdayField(){
        return cy.get('#dateOfBirthInput')
    }
    getBirthdaymonth(){
        return cy.get('.react-datepicker__month-container')
    }
    getBirthdayMonthPicker(){
        return cy.get('.react-datepicker__month-select')
    }
    getBirthdayYearPicker(){
        return cy.get('.react-datepicker__year-select')
    }
    getBithdayDay(day){
        return cy.get(`.react-datepicker__day--${day}`)
    }
    getSubjectsField(){
        return cy.get('#subjectsContainer')
    }
    enterSubject(subject) {
        this.getSubjectsField()
          .type(subject+'{enter}')
    }
    subjectTag(){
        return cy.get('.subjects-auto-complete__multi-value')
    }
    getHobbiesField(){
        return cy.get('.custom-control-label')
    }
    selectHobby(hobby) {
        return this.getHobbiesField()
          .contains(hobby).parent().find('[type="checkbox"]')
      }
    getAddressField(){
        return cy.get('#currentAddress')
    }
    getStateField(){
        return cy.get('#state')
    }
    getCityField(){
        return cy.get('#city')
    }
    getFileUploadBtn(){
        return cy.get('#uploadPicture')
    }
}
  
  export const formPage = new FormPage();
  