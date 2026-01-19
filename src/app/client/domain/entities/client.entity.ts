import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema()
export class Client {
  @Prop({
    required: true,
    type: String,
    index: true,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
    index: true,
  })
  phone: string;

  @Prop({
    required: false,
    type: String,
  })
  address: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
