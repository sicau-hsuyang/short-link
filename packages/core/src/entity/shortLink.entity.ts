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
  @Column()
  uuid: string;
  /**
   * 创建时间
   */
  @CreateDateColumn({
    name: 'create_time',
  })
  createTime: Date;
  /**
   * 修改时间
   */
  @UpdateDateColumn({
    name: 'update_time',
  })
  updateTime: Date;
  /**
   * 删除时间
   */
  @DeleteDateColumn({
    name: 'delete_time',
  })
  deleteTime: Date;
  /**
   * 过期时间
   */
  @Column('timestamp', {
    name: 'expire_time',
  })
  expireTime: Date;
  /**
   * 关联的数据id
   */
  @Column({
    name: 'meta_id',
  })
  metaId: number;
  /**
   * 是否被删除
   */
  @Column('bit', {
    name: 'is_del',
  })
  isDel: boolean;
}
