import { forwardRef, Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './users.model'
import { Role } from 'src/roles/roles.model'
import { UserRoles } from 'src/roles/user-roles.model'
import { RolesModule } from 'src/roles/roles.module'
import { AuthModule } from 'src/auth/auth.module'
import { Post } from 'src/posts/posts.model'
import { LikesModule } from 'src/likes/likes.module'
import { FilesModule } from 'src/files/files.module'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Post]),
    FilesModule,
    RolesModule,
    LikesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
