// src/app.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Asset, Order } from '@prisma/client';

@Controller('api/assets')
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async listAssets(): Promise<Asset[]> {
    return this.prisma.asset.findMany();
  }

  @Post()
  async createAsset(@Body() assetData: Asset): Promise<Asset> {
    return this.prisma.asset.create({
      data: assetData,
    });
  }
}

@Controller('api/orders')
export class OrdersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async listOrders(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  @Post()
  async createOrder(@Body() orderData: Order): Promise<Order> {
    const { assetId, price } = orderData;
    return this.prisma.order.create({
      data: {
        asset: {
          connect: { id: assetId },
        },
        price,
        status: 'open',
      },
    });
  }
}
