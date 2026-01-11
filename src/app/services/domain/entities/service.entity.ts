import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ServiceDocument = HydratedDocument<Service>;

@Schema()
export class Service {
  @Prop({ required: true, unique: true, index: true, type: String })
  name: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: false, type: String })
  icon: string;

  @Prop({ required: true, type: Number })
  amount: number;
  id: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
