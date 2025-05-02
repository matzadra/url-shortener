import { Test, TestingModule } from "@nestjs/testing";
import { UrlsService } from "./urls.service";
import { PrismaService } from "../prisma/prisma.service";

describe("UrlsService", () => {
  let service: UrlsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlsService,
        {
          provide: PrismaService,
          useValue: {
            url: {
              create: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              findFirst: jest.fn(),
              findUnique: jest.fn(), // <== necessário para update e remove
            },
          },
        },
      ],
    }).compile();

    service = module.get<UrlsService>(UrlsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it("deve ser definido", () => {
    expect(service).toBeDefined();
  });

  it("deve criar uma URL com userId", async () => {
    const dto = { originalUrl: "https://example.com" };
    const mockResult = {
      id: 1,
      shortUrl: "abc123",
      originalUrl: dto.originalUrl,
      clicks: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      userId: 1,
    };

    jest.spyOn(prisma.url, "create").mockResolvedValue(mockResult);

    const result = await service.create(1, dto);
    expect(result).toEqual(mockResult);
    expect(prisma.url.create).toHaveBeenCalledWith({
      data: {
        originalUrl: dto.originalUrl,
        shortUrl: expect.any(String),
        userId: 1,
      },
    });
  });

  it("deve retornar todas as URLs do usuário", async () => {
    const userId = 1;
    const mockResult = [
      {
        id: 1,
        shortUrl: "abc123",
        originalUrl: "https://example.com",
        clicks: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        userId,
      },
    ];

    jest.spyOn(prisma.url, "findMany").mockResolvedValue(mockResult);

    const result = await service.findAll(userId);
    expect(result).toEqual(mockResult);
    expect(prisma.url.findMany).toHaveBeenCalledWith({
      where: { userId, deletedAt: null },
    });
  });

  it("deve atualizar a URL de destino", async () => {
    const updateDto = { originalUrl: "https://atualizada.com" };
    const mockResult = {
      id: 1,
      shortUrl: "abc123",
      originalUrl: updateDto.originalUrl,
      clicks: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      userId: 1,
    };

    jest.spyOn(prisma.url, "findUnique").mockResolvedValue(mockResult);
    jest.spyOn(prisma.url, "update").mockResolvedValue(mockResult);

    const result = await service.update(1, updateDto);
    expect(result).toEqual(mockResult);
    expect(prisma.url.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        originalUrl: updateDto.originalUrl,
        updatedAt: expect.any(Date),
        userId: mockResult.userId,
      },
    });
  });

  it("deve fazer soft delete da URL", async () => {
    const mockResult = {
      id: 1,
      shortUrl: "abc123",
      originalUrl: "https://apagada.com",
      clicks: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      userId: 1,
    };

    jest.spyOn(prisma.url, "findUnique").mockResolvedValue(mockResult);
    jest.spyOn(prisma.url, "update").mockResolvedValue({
      ...mockResult,
      deletedAt: new Date(),
    });

    const result = await service.remove(1);
    expect(result).toEqual({
      ...mockResult,
      deletedAt: expect.any(Date),
    });
    expect(prisma.url.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { deletedAt: expect.any(Date) },
    });
  });
});
