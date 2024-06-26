import { Schema, model } from 'mongoose';
import {
  ProductMethods,
  ProductModel,
  TInventory,
  TProduct,
  TVariant,
} from './product.interface';

const VariantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const InventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be less than 0'],
  },
  inStock: { type: Boolean, required: true },
});

const ProductSchema = new Schema<TProduct, ProductModel, ProductMethods>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [VariantSchema], required: true },
  inventory: { type: InventorySchema, required: true },
}, {versionKey:false});

ProductSchema.methods.isUserExists = async function (id: string) {
  const existProduct = await Product.findOne({ id });
  return existProduct;
};

export const Product = model<TProduct, ProductModel>('Product', ProductSchema);
