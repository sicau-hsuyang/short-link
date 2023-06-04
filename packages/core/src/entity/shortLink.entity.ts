import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('short_link')
export class ShortLink {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn()
  id: number;
  /**
   * 加密后的唯一ID
   */
  @Column({
    nullable: false,
  })
  uuid: string;
  /**
   * 短链关联的长链地址
   */
  @Column({
    nullable: false,
  })
  link: string;
  /**
   * 创建时间
   */
  @CreateDateColumn({
    name: 'create_time',
    nullable: false,
  })
  createTime: Date;
  /**
   * 修改时间
   */
  @UpdateDateColumn({
    name: 'update_time',
    nullable: false,
  })
  updateTime: Date;
  /**
   * 删除时间
   */
  @DeleteDateColumn({
    name: 'delete_time',
    nullable: false,
  })
  deleteTime: Date;
  /**
   * 开始有效时间
   */
  @Column('timestamp', {
    name: 'begin_time',
    nullable: true,
  })
  beginTime: Date;
  /**
   * 结束有效时间
   */
  @Column('timestamp', {
    name: 'end_time',
    nullable: true,
  })
  endTime: Date;
  /**
   * 状态
   */
  @Column()
  state: number;
  /**
   * 是否已经启用
   */
  @Column({
    name: 'is_apply',
    nullable: false,
  })
  isApply: boolean;
  /**
   * 投放类型
   */
  @Column({
    name: 'put_type',
    nullable: false,
  })
  putType: number;
  /**
   * 是否被删除
   */
  @Column('bit', {
    name: 'is_del',
    default: false,
  })
  isDel: boolean;
  /**
   * 创建人
   */
  @Column({
    name: 'create_user',
    nullable: false,
  })
  createUser: string;
  /**
   * 更新人
   */
  @Column({
    name: 'update_user',
    nullable: false,
  })
  updateUser: string;
}
