import { PrismaClient, Product } from "@prisma/client";
import { ProductRepository } from "./product.repository";

const prisma = new PrismaClient();

describe("ProductRepository", () => {
  let productRepository: ProductRepository;

  beforeAll(() => {
    productRepository = new ProductRepository();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.product.deleteMany();
  });

  test("findAll should return an array of products", async () => {
    const productsToCreate: Product[] = [
      {
        id: 1,
        name: "Product A",
        quantity: 10,
        price: 9.99,
        id_pub: 1,
        id_category: 1,
        id_fornecedor: 1,
      },
      {
        id: 2,
        name: "Product B",
        quantity: 5,
        price: 14.99,
        id_pub: 1,
        id_category: 1,
        id_fornecedor: 1,
      },
    ];

    for (const product of productsToCreate) {
      await prisma.product.create({ data: product });
    }

    const products = await productRepository.findAll();

    expect(products).toHaveLength(2);
    expect(products[0].name).toBe("Product A");
    expect(products[0].quantity).toBe(10);
    expect(products[0].price).toBe(9.99);
    expect(products[1].name).toBe("Product B");
    expect(products[1].quantity).toBe(5);
    expect(products[1].price).toBe(14.99);
  });

  test("create should create a new product", async () => {
    const newProduct: Product = {
      id: 1,
      name: "Product A",
      quantity: 10,
      price: 9.99,
      id_pub: 1,
      id_category: 1,
      id_fornecedor: 1,
    };

    const createdProduct = await productRepository.create(
      newProduct.id_category,
      newProduct.id_pub,
      newProduct.id_fornecedor,
      newProduct
    );

    expect(createdProduct.id).toBeDefined();
    expect(createdProduct.name).toBe("Product A");
    expect(createdProduct.quantity).toBe(10);
    expect(createdProduct.price).toBe(9.99);
    expect(createdProduct.id_pub).toBe(1);
    expect(createdProduct.id_category).toBe(1);
    expect(createdProduct.id_fornecedor).toBe(1);
  });

  test("delete should delete a product by id", async () => {
    const createdProduct = await prisma.product.create({
      data: {
        id: 1,
        name: "Product A",
        quantity: 10,
        price: 9.99,
        id_pub: 1,
        id_category: 1,
        id_fornecedor: 1,
      },
    });

    const deleted = await productRepository.delete(createdProduct.id);

    expect(deleted).toBe(true);

    const product = await prisma.product.findUnique({
      where: { id: createdProduct.id },
    });

    expect(product).toBeNull();
  });

  test("update should update a product by id", async () => {
    const createdProduct = await prisma.product.create({
      data: {
        id: 1,
        name: "Product A",
        quantity: 10,
        price: 9.99,
        id_pub: 1,
        id_category: 1,
        id_fornecedor: 1,
      },
    });

    const updatedProduct = await productRepository.update(createdProduct.id, {
      id: 1,
      name: "Updated Product A",
      quantity: 5,
      price: 14.99,
      id_pub: 1,
      id_category: 1,
      id_fornecedor: 1,
    });

    expect(updatedProduct).toEqual({
      ...createdProduct,
      id: 1,
      name: "Updated Product A",
      quantity: 5,
      price: 14.99,
      id_pub: 1,
      id_category: 1,
      id_fornecedor: 1,
    });
  });
});
