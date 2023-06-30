import { Injectable } from '@nestjs/common';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { PrismaService } from '../../config/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createdBy: string,
    userId: string,
    { firstName, lastName, gender }: CreateProfileInput,
  ) {
    try {
      return await this.prisma.profile.create({
        data: {
          firstName,
          lastName,
          gender,
          createdBy,
          createdAt: new Date(),
          userId,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async findAll() {
    try {
      return await this.prisma.profile.findMany({
        where: {
          deletedAt: null,
        },
        include: {
          user: true,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async findOne(userId: string) {
    try {
      return await this.prisma.profile.findFirst({
        where: {
          userId,
          deletedAt: null,
        },
        include: {
          user: true,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async update(
    userId: string,
    updatedBy,
    updateProfileInput: UpdateProfileInput,
  ) {
    try {
      return await this.prisma.profile.update({
        where: {
          userId,
        },
        data: {
          ...updateProfileInput,
          updatedBy,
          updatedAt: new Date(),
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async remove(userId: string, deletedBy: string) {
    try {
      return await this.prisma.profile.update({
        where: {
          userId,
        },
        data: {
          deletedBy,
          deletedAt: new Date(),
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
