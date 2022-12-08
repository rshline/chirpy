import { InputType, Field } from "type-graphql";

@InputType()
export class TweetInput {
  @Field()
  text: string;
}