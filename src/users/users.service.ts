import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private UserRepository: typeof User, private roleService: RolesService) {}

    async findByEmail(email: string){
        const user = await this.UserRepository.findOne({where: {email}});
        if(!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async findById(id: number) {
        const user = await this.UserRepository.findByPk(id);
        if(!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async updatePassword(id: number, newPassword: string) {
        const user = await this.findById(id);
        const hashedPassword = await bcrypt.hash(newPassword, 5);
        user.password = hashedPassword;
        await user.save()
    }

    async createUser(dto: CreateUserDto){
        const user = await this.UserRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER")
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }

    async getAllUsers() {
        const users = await this.UserRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.UserRepository.findOne({where: {email}, include: {all: true}});
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.UserRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        console.log(role.value);
        console.log(user.id)
        if (role && user) {
            await user.$add('role', role.id)
            await user.reload({ include: { all: true } }) 
            return user.roles
        }
        throw new HttpException('User or role are not found', HttpStatus.NOT_FOUND)
    }

    async ban(dto: BanUserDto) {
        const user = await this.UserRepository.findByPk(dto.userId)
        if (!user) {
            throw new HttpException(
                'User is not found',
                HttpStatus.NOT_FOUND
            )

        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }


}
