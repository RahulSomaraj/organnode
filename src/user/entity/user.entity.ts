import {
    BeforeInsert,
      BeforeUpdate,
      Column,
      CreateDateColumn,
      DeleteDateColumn,
      Entity,
      Generated,
      PrimaryGeneratedColumn,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
import { UserType } from '../enum/user.types';
  
  
  @Entity({ name: 'users' })
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
  
    @Column()
    name: string;

    @Column({nullable:true})
    age: number;

    @Column({nullable:true})
    gender: string;

    @Column({nullable:true})
    bloodGroup: string;

    @Column({nullable:true})
    address: string;
  
    @Column({unique: true})
    userName: string;
  
    @Column({unique: true})
    contactNumber: string;
  
    @Column({unique: true})
    contactEmail: string;
  
    @CreateDateColumn()
    addDate: Date;
  
    @DeleteDateColumn()
    deletedAt : Date
  
    @Column({nullable:true})
    joinDate: Date;

    @Column({nullable:true})
    department: string;
  
    @Column()
    password: string;
    
    @Column({
        type: 'enum',
        enum: UserType,
        nullable:true,
      })
    userType: UserType;
  
    @Column({
      nullable: true,
      default : false
    })
    isDeleted : boolean;
  
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
      return this.password && await new Promise(async (resolve, reject) =>{
        if (this.password) {
            this.password = await bcrypt.hash(
              this.password,
              parseInt(process.env.SALT_ROUNDS),
            );
            resolve(this.password)
        }    
      })
    }
}
  