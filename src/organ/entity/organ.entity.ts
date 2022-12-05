import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

  
  
  @Entity({ name: 'organs' })
  export class Organ {
    @PrimaryGeneratedColumn()
    id: number;  
  
    @Column()
    name: string;
  
    @Column({nullable: true})
    bloodGroup: string;
  
    @Column({nullable: true})
    organ: string;
  
    @Column({nullable: true})
    hospitalName: string;
  
    @Column({nullable: true})
    doctor: string;
  
    @DeleteDateColumn()
    deletedAt : Date
  
    @Column({nullable:true})
    joinDate: Date;
  
    @Column()
    contactNumber: string;
}
  