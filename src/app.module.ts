import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { User } from './users/users.model'
import { RolesModule } from './roles/roles.module'
import { Role } from './roles/roles.model'
import { UserRoles } from './roles/user-roles.model'
import { AuthModule } from './auth/auth.module'
import { PostsModule } from './posts/posts.module'
import { Post } from './posts/posts.model'
import { FilesModule } from './files/files.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { CommentsModule } from './comments/comments.module'
import { LikesModule } from './likes/likes.module'
import * as path from 'path'
import Like from './likes/likes.model'
import { Comment } from './comments/comments.model'
import { CategoriesModule } from './categories/categories.module'
import { Category } from './categories/categories.model'
import { MailModule } from './mail/mail.module'

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Post, Like, Comment, Category],
      autoLoadModels: true,
      // synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
    CommentsModule,
    LikesModule,
    CategoriesModule,
    MailModule,
  ],
})
export class AppModule {}
