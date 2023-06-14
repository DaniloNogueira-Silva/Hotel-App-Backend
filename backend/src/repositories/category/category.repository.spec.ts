import { PrismaClient, Category } from "@prisma/client";
import { CategoryRepository } from "./category.repository";

const prisma = new PrismaClient();

describe("CategoryRepository", () => {
  let categoryRepository: CategoryRepository;

  beforeAll(() => {
    categoryRepository = new CategoryRepository();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.category.deleteMany();
  });

  test("findAll should return an array of categories", async () => {
    const categoriesToCreate: Category[] = [
      {
        id: 1,
        name: "Category A",
      },
      {
        id: 2,
        name: "Category B",
      },
    ];

    for (const category of categoriesToCreate) {
      await prisma.category.create({ data: category });
    }

    const categories = await categoryRepository.findAll();

    expect(categories).toHaveLength(2);
    expect(categories[0].name).toBe("Category A");
    expect(categories[1].name).toBe("Category B");
  });

  test("create should create a new category", async () => {
    const newCategory: Category = {
      id: 1,
      name: "Category A",
    };

    const createdCategory = await categoryRepository.create(newCategory);

    expect(createdCategory.id).toBeDefined();
    expect(createdCategory.name).toBe("Category A");
  });

  test("delete should delete a category by id", async () => {
    const createdCategory = await prisma.category.create({
      data: {
        id: 1,
        name: "Category A",
      },
    });

    const deleted = await categoryRepository.delete(createdCategory.id);

    expect(deleted).toBe(true);

    const category = await prisma.category.findUnique({
      where: { id: createdCategory.id },
    });

    expect(category).toBeNull();
  });

  test("update should update a category by id", async () => {
    const createdCategory = await prisma.category.create({
      data: {
        id: 1,
        name: "Category A",
      },
    });

    const updatedCategory = await categoryRepository.update(createdCategory.id, {
      id: 1,
      name: "Updated Category A",
    });

    expect(updatedCategory).toEqual({
      ...createdCategory,
      id: 1,
      name: "Updated Category A",
    });
  });
});
