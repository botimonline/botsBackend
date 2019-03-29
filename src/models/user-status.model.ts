import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn } from 'typeorm';

import { Platform, Status, Reason } from '../core';
import { MAX_PAGE_REPORTS } from '../core/config';

@Entity({ name: 'user_statuses' })
@Unique(['platform', 'userId', 'postId', 'commentId', 'replyCommentId'])
export class UserStatus {
  @PrimaryGeneratedColumn() private id: number;

  @Column({ type: 'enum', enum: Platform, nullable: false })
  public platform: Platform;

  @Column({ name: 'user_id', type: 'varchar', length: 30, nullable: false })
  public userId: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  public username?: string;

  @Column({ name: 'post_id', type: 'varchar', length: 30, nullable: false })
  public postId: string;

  @Column({ name: 'comment_id', type: 'varchar', length: 30, nullable: true })
  public commentId?: string;

  @Column({ name: 'reply_comment_id', type: 'varchar', length: 30, nullable: true })
  public replyCommentId?: string;

  @Column({ type: 'enum', enum: Reason, array: true, nullable: false })
  public reasons: Reason[];

  @Column({ type: 'enum', enum: Status, nullable: false })
  public status?: Status;

  @Column({ type: 'varchar', length: 200, nullable: true })
  public description?: string;

  @Column({ name: 'reporter_key', type: 'varchar', length: 30, nullable: false })
  // optional for the report route validations
  public reporterKey?: string;

  @CreateDateColumn({ name: 'reported_at', nullable: false })
  // optional for the report route validations
  public reportedAt?: Date;

  constructor(private userStatus?: Partial<UserStatus>) {
    if (userStatus) {
      Object.assign(this, userStatus);
    }
  }
}

export class UsersStatusPage {
  public maxPageReports: number;
  constructor(public reports: UserStatus[], public totalReports: number) {
    this.maxPageReports = MAX_PAGE_REPORTS;
  }
}
