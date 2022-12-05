// import {
//     BeforeInsert,
//       BeforeUpdate,
//       Column,
//       CreateDateColumn,
//       DeleteDateColumn,
//       Entity,
//       Generated,
//       PrimaryGeneratedColumn,
//   } from 'typeorm';
//   import * as bcrypt from 'bcrypt';
// import { UserType } from '../enum/user.types';
  
  
//   @Entity({ name: 'doctors' })
//   export class User {
//     @PrimaryGeneratedColumn()
//     id: number;  
  
//     @Column()
//     name: string;
  
//     @Column({unique: true})
//     userName: string;
  
//     @Column({unique: true})
//     contactNumber: string;
  
//     @Column({unique: true})
//     contactEmail: string;
  
//     @CreateDateColumn()
//     addDate: Date;
  
//     @DeleteDateColumn()
//     deletedAt : Date
  
//     @Column({nullable:true})
//     joinDate: Date;
  
//     @Column()
//     password: string;
    
//     @Column({
//         type: 'enum',
//         enum: UserType,
//         nullable:true,
//       })
//     userType: UserType;
  
//     @Column({
//       nullable: true,
//       default : false
//     })
//     isDeleted : boolean;
// }
  