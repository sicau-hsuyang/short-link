import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('short_link_data')
export class ShortLinkData {
  /**
   * 数据ID
   */
  @PrimaryGeneratedColumn()
  id: number;
  /**
   * 关联的短链ID
   */
  @Column({
    name: 'short_link_id',
  })
  shortLinkId: number;
  /**
   * 存储的数据内容
   */
  @Column({
    type: 'text',
  })
  document: string;
  /**
   * 创建时间
   */
  @CreateDateColumn({
    name: 'create_time',
  })
  createTime: Date;
  /**
   * 更新时间
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
   * 是否被删除
   */
  @Column('bit', {
    name: 'is_del',
  })
  isDel: boolean;
}
