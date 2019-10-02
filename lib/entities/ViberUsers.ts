import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('viber_users')
export class ViberUsers extends BaseEntity {
    @PrimaryColumn()
    public id: string;

    @Column()
    public fullName: string;

    @Column()
    public firstConnect: Date;

    @Column()
    public blockedBot: boolean;

    @Column()
    public lastInteraction: Date;

    @Column()
    public messagesAmount: number;

    @Column()
    public language: string;
}
