import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  standalone:true,
  imports: [ReactiveFormsModule,MatChipsModule, MatButtonModule, CommonModule ]
})
export class CreatePageComponent {
  private taskService = inject( TaskService );
  private fb = inject( FormBuilder );
  public today = '';
  public myTask = this.fb.group(
    {
      state: [ "Pendiente" ],
      taskName: [ null, [ Validators.required ] ],
      deadline: [ null, [ Validators.required ] ],
      persons: this.fb.array([], [ Validators.required, Validators.maxLength(1) ])
    }
  )
  public person = this.fb.group(
    {
      name: [ '',[ Validators.required, Validators.minLength(5) ] ],
      age: [ null, [ Validators.required, Validators.min(18) ] ],
      skills: this.fb.array([], [ Validators.required, Validators.minLength(1) ])
    }
  )
  constructor(){
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, '0');
  const day = String(todayDate.getDate()).padStart(2, '0');
  this.today = `${year}-${month}-${day}`; 
  }

  
  public newSkill: FormControl = new FormControl('', [Validators. required] );

  public get getSkills(){
    return this.person.get('skills') as FormArray
  }

  public get getPersons(){
    return this.myTask.get('persons') as FormArray
   }


  public onAddSkill():void {
    
     if ( this.newSkill.invalid ) { return; }

    this.getSkills.push(
      new FormControl( this.newSkill.value, [ Validators.required ])
    ); 
    this.newSkill.reset();
    
  }

  public onDeleteSkill(index:number){
    this.getSkills.removeAt(index);
  }

  public onAddPerson(){
    if(this.person.invalid) {
      this.person.markAllAsTouched();
      return;
    };
    this.getPersons.push(
      this.fb.group({
        name: this.person.get('name')?.value,
        age: this.person.get('age')?.value,
        skills: this.fb.array(this.getSkills.controls.map(control => control.value))
      })
    );

    this.onDeletePerson();
    
  }
  public onDeletePerson(){
    this.newSkill.reset();
    this.person.reset();
    this.getSkills.clear();
  }

  public onSelectPerson(person: AbstractControl, index:number){
    this.getPersons.removeAt(index);
    this.person.reset({
      name: person.get('name')?.value,
      age: person.get('age')?.value,
    });
    this.getSkills.clear();

    const personSkills = person.get('skills')?.value || [];
    personSkills.forEach((skill: string) => {
      this.getSkills.push(new FormControl(skill, Validators.required));
    });
  }

  public isInvalidTaskField( field:string ){
    const control = this.myTask.get(field);
    return control?.errors && control.touched ? true : false;
  }

  public isInvalidPersonField( field:string ){
    const control = this.person.get(field);
    return control?.errors && control.touched ? true : false;
  }

  public onClickSave(){
    if( this.myTask.invalid ) {
      this.myTask.markAllAsTouched();
      return;
    }
    this.taskService.saveTask( this.myTask.value );
    this.getPersons.clear();
    this.myTask.reset();
    this.onDeletePerson();
  }

  public messageByError( errors: ValidationErrors | null | undefined ){
    if ( !errors ) return;

    const errorsKeys = Object.keys(errors);

    if ( errorsKeys.includes('required') )  {
      return "Este campo es requerido";
    }

    if ( errorsKeys.includes('minlength') )  {
      const min = errors!['minlength']['requiredLength'];
      const current = errors!['minlength']['actualLength'];
      return`Mínimo ${current}/${ min } caracteres.`;
    }

    if( errorsKeys.includes('min') ){
      const min = errors!['min']['min']
      return `Minimo ${min}`
    }

    return;
    
  }
  
}
