import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../../config/prisma/prisma.service';
import { UserInterface } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async createMany(data: UserInterface[]) {
    try {
      return await this.prisma.user.createMany({
        data,
        skipDuplicates: true,
      });
    } catch (e) {
      throw e;
    }
  }

  async create(data: UserInterface) {
    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (e) {
      throw e;
    }
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany({
        where: {
          deletedAt: null,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          deletedAt: null,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async update(
    id: string,
    updatedBy: string,
    updateUserInput: UpdateUserInput,
  ) {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...updateUserInput,
          updatedBy,
          updatedAt: new Date(),
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async remove(id: string, deletedBy: string) {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          deletedAt: new Date(),
          deletedBy,
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
