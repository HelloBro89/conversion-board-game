import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tasks' })
class Task {
      
//     @PrimaryGeneratedColumn()
//     id!: string
// 
//     @Column('varchar')
//     taskName: string
// 
//     @Column('boolean')
//     checkBoxStatus: boolean
// 
//     @Column('varchar')
//     dateOfCreation: string

    constructor(/* taskName: string, checkBoxStatus: boolean, dateOfCreation: string */) {
      
//         this.taskName = taskName;
//     
//         this.checkBoxStatus = checkBoxStatus;
// 
//         this.dateOfCreation = dateOfCreation;
      
      }
}

export { Task };