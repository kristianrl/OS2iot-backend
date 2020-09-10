import { Injectable, Logger } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindOneOptions, getManager } from "typeorm";
import { CreateUserDto } from "./create-user.dto";
import * as bcrypt from "bcryptjs";
import { Permission } from "@entities/permission.entity";
import { IsEmail } from "class-validator";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    private readonly logger = new Logger(UserService.name, true);

    async isEmailUsedByAUser(email: string): Promise<boolean> {
        return (
            (await this.userRepository.count({
                email: email,
            })) > 0
        );
    }

    async findOneUserByEmailWithPassword(email: string): Promise<User> {
        return await this.userRepository.findOne(
            { email: email },
            {
                select: [
                    "id",
                    "name",
                    "email",
                    "active",
                    "passwordHash", // This is requiredsince passwordHash normally is hidden.
                    "lastLogin",
                ],
            }
        );
    }

    async findUserPermissions(id: number): Promise<Permission[]> {
        return (
            await this.userRepository.findOne(id, {
                relations: ["permissions"],
            })
        ).permissions;
    }

    async updateLastLoginToNow(user: User): Promise<void> {
        await this.userRepository
            .createQueryBuilder()
            .update(User)
            .set({ lastLogin: new Date() })
            .where("id = :id", { id: user.id })
            .execute();
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = new User();
        const mappedUser = this.mapDtoToUser(user, dto);

        // Hash password with bcrpyt
        this.logger.verbose("Generating salt");
        const salt = await bcrypt.genSalt(10);
        this.logger.verbose("Generating hash");
        mappedUser.passwordHash = await bcrypt.hash(dto.password, salt);
        this.logger.verbose(`Generated hash: '${mappedUser.passwordHash}'`);

        return await this.userRepository.save(mappedUser);
    }

    private mapDtoToUser(user: User, dto: CreateUserDto): User {
        user.name = dto.name;
        user.email = dto.email;
        user.permissions = [];
        user.active = dto.active;

        return user;
    }

    async findManyUsersById(userIds: number[]): Promise<User[]> {
        return await this.userRepository.findByIds(userIds);
    }
}
