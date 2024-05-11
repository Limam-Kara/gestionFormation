import { Component } from '@angular/core';

@Component({
  selector: 'app-evalution-form',
  templateUrl: './evalution-form.component.html',
  styleUrls: ['./evalution-form.component.scss']
})
export class EvalutionFormComponent {
  evaluationQuestions: any[] = [
    {
      text: 'How satisfied are you with the service?',
      type: 'single-choice',
      options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
      selectedOption: ''
    },
    {
      text: 'Did the product meet your expectations?',
      type: 'single-choice',
      options: ['Yes, completely', 'Mostly', 'Partially', 'Not at all'],
      selectedOption: ''
    },
    {
      text: 'Which features do you like the most?',
      type: 'single-choice',
      options: ['Ease of use', 'Performance', 'Design', 'Customer support'],
      selectedOptions: ''
    },
    {
      text: 'How likely are you to recommend us to a friend?',
      type: 'dropdown',
      options: ['Very likely', 'Likely', 'Neutral', 'Unlikely', 'Very unlikely'],
      selectedOption: ''
    },
    // Add more questions here...
  ];

  submitEvaluation() {
    console.log('Submitted Evaluation:', this.evaluationQuestions);
    // Here you can handle the submission logic, like sending the data to a server
    // or processing it locally.
  }
}
