import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'Users' })
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public login: string;

    @Column()
    public password: string;
}
